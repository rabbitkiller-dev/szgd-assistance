import { Keys } from './constant';

export { Keys };

export class Utils {
  static getKey(key: Keys) {
    const image = images.read(Utils.getKeyPath(key));
    if (!image) {
      console.log(`找不到Key: ${key}`);
      exit();
    }
    return image;
  }

  static getKeyPath(key: Keys): string {
    if (key.startsWith('手艺品_') || key.startsWith('手艺材料_') || key.startsWith('手艺技能_')) {
      return `./key/${key.replace('_', '/')}.png`;
    } else {
      return `./key/${key}.png`;
    }
  }

  /**
   * 获取所有的key, 并执行回调. 在回调结束后, 会释放所有的key
   */
  static async getKeys<T extends Keys[]>(keys: T, callback: (images: Record<T[number], Image>) => Promise<void> | void) {
    const images: Record<T[number], Image> = {} as any;
    for (const key of keys) {
      images[key] = Utils.getKey(key);
    }
    await callback(images);
    for (const key of keys) {
      images[key].recycle();
    }
  }

  /**
   * 获取所有的key, 并执行回调. 在回调结束后, 会释放所有的key
   */
  static getKeySync<R>(key: Keys, callback: (image: Image) => R): R {
    const image = Utils.getKey(key)
    const result = callback(image);
    image.recycle();
    return result;
  }
  /**
   * 获取所有的key, 并执行回调. 在回调结束后, 会释放所有的key
   */
  static getKeysSync<T extends Keys[], R>(keys: T, callback: (images: Record<T[number], Image>) => R): R {
    const images: Record<T[number], Image> = {} as any;
    for (const key of keys) {
      images[key] = Utils.getKey(key);
    }
    const result = callback(images);
    for (const key of keys) {
      images[key].recycle();
    }
    return result;
  }

  static waitKeyPoint(key: Keys): Point | undefined {
    const point = Utils.getKeySync(key, (image) => {
      return Utils.waitFindImagePoint(image);
    });
    return point;
  }

  /**
   * 查找图片位置并且等待
   * timeout: 秒
   */
  static waitFindImagePoint(template: Image, options?: { threshold?: number, timeout: number }) {
    const currentTime = new Date().getTime();
    const currentScreen = images.captureScreen();
    const point = images.findImage(currentScreen, template, { threshold: 0.5 });
    if (point) {
      return point;
    }
    return point;
  }
}

