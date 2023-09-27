export type Keys = 'xxx'
  | '手艺'
  | '主界面_风讯议'
  | '主界面_收起'
  | '主界面_采集助手'
  | '手艺_采集_未激活'
  | '手艺_采集_采集助手'
  | '手艺_采集_采集助手_选择数量'
  | '手艺_采集_采集助手_开始'
  | '手艺_采集_采集助手_未开始'
  | '手艺_采集_采集助手_完成'
  | '手艺_采集_采集助手_关闭'
  | '手艺_制造_制造中工匠图标'
  | '手艺_制造_最大数量按钮'
  | '手艺_制造_制作按钮'
  | '手艺技能_丰收强化_金1'
  | '手艺技能_丰收强化_紫1'
  | '手艺技能_幸运附体_紫1'
  | '手艺技能_幸运附体_蓝1'
  | '手艺技能_丰收强化_蓝1'
  | '手艺技能_零耗_蓝1'
  | CraftKeys
  | CraftMaterialKeys;

/**
 * 手艺品分类
 */
export type CraftKeys = 'xxx'
  | '手艺品_初心矿镐箱'
  | '手艺品_强韧剪刀箱'
  | '手艺品_强韧手斧箱'
  | '手艺品_强韧矿镐箱'
  | '手艺品_强韧钓竿箱'
  | '手艺品_青翠剪刀箱'
  | '手艺品_青翠手斧箱'
  | '手艺品_青翠矿镐箱'
  | '手艺品_青翠钓竿箱'
  | '手艺品_大猫修补锤'
  | '手艺品_壹型熔炉石'
  | '手艺品_铁皮包边'
  | '手艺品_青铜包边'

/**
 * 手艺材料
 */
export type CraftMaterialKeys = 'xxx'
  | '手艺材料_树脂'
  | '手艺材料_白云石'
  | '手艺材料_粘土'
  | '手艺材料_紫杉木'
  | '手艺材料_红乔木'
  | '手艺材料_翠晶石'
  | '手艺材料_耐火粘土'
  | '手艺材料_钴铁矿'
  | '手艺材料_铁矿石'
  | '手艺材料_韧性树脂'
  | '手艺材料_雪松木'
  | '手艺材料_铜矿石'

export enum KeysEnum {
  Craft
}

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
    if (key.startsWith('手艺品_') || key.startsWith('手艺材料_')) {
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
  static getKeysSync<T extends Keys[]>(keys: T, callback: (images: Record<T[number], Image>) => void) {
    const images: Record<T[number], Image> = {} as any;
    for (const key of keys) {
      images[key] = Utils.getKey(key);
    }
    callback(images);
    for (const key of keys) {
      images[key].recycle();
    }
  }
}

