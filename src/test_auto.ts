import { Keys, Utils } from './utils';

// const objs: Array<{ key: Keys, num: number }> = [
//   {key: '手艺品_树脂', num: 1},
//   {key: '手艺品_雪松木', num: 3},
//   {key: '手艺品_铜矿石', num: 3},
// ];
// const minObj: Array<{ key: Keys, num: number }> = [
//   {key: '手艺品_树脂', num: 200},
//   {key: '手艺品_雪松木', num: 300},
//   {key: '手艺品_铜矿石', num: 300},
// ];
// 1. 优化开始采集: 如果有采集队列或者上次采集完成没点击完成, 则删除采集队列, 点击完成然后再开始采集

export async function autoCollection(): Promise<void> {
  let num = 1;
  while (num < 20) {
    console.log(`第${num++}次采集`);

    startCollection();
    // 等待采集完成
    await waitCollection()
    // 关闭采集助手
    const closeBtn = images.findImage(images.captureScreen(), Utils.getKey('手艺_采集_采集助手_关闭'));
    console.log('关闭采集助手');
    click(closeBtn.x, closeBtn.y);
    sleep(1000);

    console.log('开始制造');
    await startMake();
    const closeBtn2 = images.findImage(images.captureScreen(), Utils.getKey('手艺_采集_采集助手_关闭'));
    console.log('关闭采集界面');
    click(closeBtn2.x, closeBtn2.y);
    sleep(1000);
  }

}


/**
 * 开启采集
 */
export function startCollection(): void {
  // 打开手艺界面
  openCraft();
  // 点击采集 打开采集界面
  console.log('点击采集');
  const collBtn = images.findImage(images.captureScreen(), Utils.getKey('手艺_采集_未激活'));
  click(collBtn.x, collBtn.y);
  sleep(2000);
  console.log('点击采集助手');
  // 点击采集助手 打开采集助手界面
  const collAss = images.findImage(images.captureScreen(), Utils.getKey('手艺_采集_采集助手'));
  click(collAss.x, collAss.y);
  sleep(2000);

  /**
   * 计划1: 工具箱
   */
  function plan1() {
    swipe(600, 800, 600, 680, 1000);
    const obj = images.findImage(images.captureScreen(), Utils.getKey('手艺材料_紫杉木'), { threshold: 0.6 });
    click(obj.x, obj.y);
    sleep(1000);
    const confirmPoint = images.findImage(images.captureScreen(), Utils.getKey('手艺_采集_采集助手_选择数量'));
    // 点击确定(确认位置不会变)
    click(confirmPoint.x, confirmPoint.y);
    sleep(1000);
    const obj2 = images.findImage(images.captureScreen(), Utils.getKey('手艺材料_铁矿石'), { threshold: 0.6 });
    click(obj2.x, obj2.y);
    sleep(1000);
    const confirmPoint2 = images.findImage(images.captureScreen(), Utils.getKey('手艺_采集_采集助手_选择数量'));
    // 点击确定(确认位置不会变)
    click(confirmPoint2.x, confirmPoint2.y);
    sleep(1000);
  }

  /**
   * 计划2: 声望
   */
  function plan2() {
    console.log('选择: 手艺材料_白云石');
    const obj2 = images.findImage(images.captureScreen(), Utils.getKey('手艺材料_白云石'), { threshold: 0.6 });
    click(obj2.x, obj2.y);
    sleep(1000);
    const confirmPoint = images.findImage(images.captureScreen(), Utils.getKey('手艺_采集_采集助手_选择数量'));
    // 点击确定(确认位置不会变)
    click(confirmPoint.x, confirmPoint.y);
    sleep(1000);
  }


  plan2();
  // console.log('选择: 手艺材料_树脂');
  // const obj2 = images.findImage(images.captureScreen(), Utils.getKey('手艺材料_树脂'), { threshold: 0.6 });
  // click(obj2.x, obj2.y);
  // sleep(1000);
  // const confirmPoint = images.findImage(images.captureScreen(), Utils.getKey('手艺_采集_采集助手_选择数量'));
  // // 点击确定(确认位置不会变)
  // click(confirmPoint.x, confirmPoint.y);
  // sleep(1000);
  // const point = images.findImage(images.captureScreen(), Utils.getKey('手艺材料_粘土'), { threshold: 0.6 });
  // click(point.x, point.y);
  // sleep(1000);
  // click(confirmPoint.x, confirmPoint.y);
  // sleep(1000);

  const startBtn = images.findImage(images.captureScreen(), Utils.getKey('手艺_采集_采集助手_开始'));
  click(startBtn.x, startBtn.y);
  sleep(1000);
}


/**
 * 等待采集完成
 */
export function waitCollection(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    async function loop() {
      const status = await getCurrentStatus();
      if (status === 'CollectionCompleted') {
        console.log('采集完成');
        resolve(true);
        return;
      }
      if (status === 'Collectioning') {
        console.log('正在采集');
      }
      if (status === 'Unknow') {
        console.log('未知状态');
      }
      setTimeout(() => {
        loop().then();
      }, 1000);
    }

    loop().then();
  });
}

/**
 * 获取当前采集状态
 */
async function getCurrentStatus(): Promise<'CollectionCompleted' | 'Collectioning' | 'Unknow'> {
  // 当前界面
  const currentScreen = images.captureScreen();
  // 如果找到完成按钮，说明采集完成
  const finishBtn = images.findImage(currentScreen, Utils.getKey('手艺_采集_采集助手_完成'));
  if (finishBtn) {
    click(finishBtn.x, finishBtn.y);
    return 'CollectionCompleted';
  }
  // 如果找到未开始按钮，也说明采集完成
  const unStartBtn = images.findImage(currentScreen, Utils.getKey('手艺_采集_采集助手_未开始'));
  if (unStartBtn) {
    return 'CollectionCompleted';
  }

  // 如果找不到完成按钮，说明正在采集
  if (images.findImage(currentScreen, Utils.getKey('主界面_采集助手'), { threshold: 0.5 })) {
    const skills: Keys[] = ['手艺技能_丰收强化_紫1', '手艺技能_幸运附体_紫1', '手艺技能_幸运附体_蓝1', '手艺技能_丰收强化_蓝1'];
    for (const skill of skills) {
      const skillPoint = images.findImage(currentScreen, Utils.getKey(skill));
      if (skillPoint) {
        console.log('触发手艺技能');
        click(skillPoint.x, skillPoint.y);
      }
    }
    return 'Collectioning';
  }

  return 'Unknow';
}

/**
 * 开始制造
 */
export async function startMake(): Promise<void> {
  // 打开手艺界面
  openCraft();
  // 制造列表
  const makeList: Array<{
    key: Keys,
    num: number,
  }> = [
      { key: '手艺品_初心矿镐箱', num: 0 },
    ];

  await makeCraft('手艺品_铁皮包边');
  sleep(1000);

  // await makeCraft('手艺品_壹型熔炉石');
  // sleep(1000);
}

/**
 * 制造手艺品
 */
export async function makeCraft(key: Keys): Promise<boolean> {
  const expandPoint = await findCraft(key);
  let startMake = false;
  if (expandPoint) {
    console.log(`找到手艺品: ${key}`);
    click(expandPoint.x, expandPoint.y);
    sleep(1000);
    const maxBtn = images.findImage(images.captureScreen(), Utils.getKey('手艺_制造_最大数量按钮'));
    if (maxBtn) {
      console.log('点击最大数量按钮');
      click(maxBtn.x, maxBtn.y);

      console.log('点击制作按钮');
      const makeBtn = images.findImage(images.captureScreen(), Utils.getKey('手艺_制造_制作按钮'));
      if (makeBtn) {
        click(makeBtn.x, makeBtn.y);
        sleep(1000);
        startMake = true;
      }
    }
  }
  if (!startMake) {
    console.log(`找不到手艺品: ${key}`);
    return false;
  }
  // 等待制造完成
  const flag = await waitMake();
  return true;
}

/**
 * 找到目标手艺品
 * @param key
 */
export async function findCraft(key: Keys): Promise<Point> {
  return new Promise((resolve, reject) => {
    function loop() {
      const expandPoint = images.findImage(images.captureScreen(), Utils.getKey(key), { threshold: 0.95 });
      if (expandPoint) {
        resolve(expandPoint);
        return;
      }
      swipe(600, 800, 600, 400, 1000);
      setTimeout(async () => {
        loop();
      }, 1000);
    }
    loop();
  });

}

/**
 * 等待制造完成
 */
export function waitMake(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    async function loop() {
      // 并且如果找到未激活采集按钮，说明制造完成
      const unStartBtn = images.findImage(images.captureScreen(), Utils.getKey('手艺_采集_未激活'));
      if (unStartBtn) {
        console.log('制造完成');
        resolve(true);
        return;
      }
      console.log('制造中');
      setTimeout(async () => {
        loop();
      }, 1000);
    }

    loop().then();
  });
}

/**
 * 打开手艺界面
 */
export function openCraft() {
  // 手艺按钮在主界面收起菜单中, 先展开
  MainUtils.expand();
  // 点击手艺
  console.log('打开手艺界面');
  const currentScreen = images.captureScreen();
  const expandPoint = images.findImage(currentScreen, Utils.getKey('手艺'), { threshold: 0.5 });
  click(expandPoint.x, expandPoint.y);
  sleep(1000);
}

/**
 * 主界面类
 */
export class MainUtils {
  static expand() {
    // 点击手艺
    const expandPoint = images.findImage(images.captureScreen(), Utils.getKey('主界面_收起'), { threshold: 0.5 });
    if (expandPoint) {
      click(expandPoint.x, expandPoint.y);
      sleep(1000);
      return;
    }
    const craftPoint = images.findImage(images.captureScreen(), Utils.getKey('手艺'), { threshold: 0.5 });
    if (!craftPoint) {
      throw new Error('找不到手艺按钮, 有可能不在主界面');
    }
  }
}
