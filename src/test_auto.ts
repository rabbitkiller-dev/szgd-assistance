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

export type ActionQueue = CollectionQueue | MakeQueue;

/**
 * 采集队列
 */
export interface CollectionQueue {
  type: 'collection',
  // 材料数组
  materials: Array<{ key: Keys, num: number }>
}

/**
 * 制造队列
 */
export interface MakeQueue {
  type: 'make',
  // 材料数组
  materials: Array<{ key: Keys, num: number }>
}


// 队列任务
const queues: Array<ActionQueue> = [
  {
    type: 'collection',
    materials: [
      {key: '手艺材料_白云石', num: 0},
      {key: '手艺材料_铁矿石', num: 0},
      {key: '手艺材料_紫杉木', num: 0},
      {key: '手艺材料_树脂', num: 0},
    ],
  },
  {
    type: 'make',
    materials: [
      {key: '手艺品_强韧钓竿箱', num: 0},
    ]
  },
  {
    type: 'collection',
    materials: [
      {key: '手艺材料_紫杉木', num: 0},
      {key: '手艺材料_粘土', num: 0},
      {key: '手艺材料_树脂', num: 0},
    ],
  },
  {
    type: 'make',
    materials: [
      {key: '手艺品_强韧手斧箱', num: 0},
    ]
  },
];

// 队列任务
const queues2: Array<ActionQueue> = [
  {
    type: 'collection',
    materials: [
      {key: '手艺材料_粘土', num: 0},
      {key: '手艺材料_白云石', num: 0},
      {key: '手艺材料_铁矿石', num: 0},
      {key: '手艺材料_紫杉木', num: 0},
    ],
  },
  {
    type: 'make',
    materials: [
      {key: '手艺品_强韧矿镐箱', num: 0},
    ]
  },
  {
    type: 'collection',
    materials: [
      {key: '手艺材料_树脂', num: 0},
      {key: '手艺材料_紫杉木', num: 0},
    ],
  },
  {
    type: 'make',
    materials: [
      {key: '手艺品_强韧手斧箱', num: 0},
    ]
  },
];


// 队列任务
const queues4: Array<ActionQueue> = [
  {
    type: 'collection',
    materials: [
      {key: '手艺材料_翠晶石', num: 0},
    ],
  },
  {
    type: 'make',
    materials: [
      {key: '手艺品_青铜包边', num: 0},
    ]
  },
];

// 1. 优化开始采集: 如果有采集队列或者上次采集完成没点击完成, 则删除采集队列, 点击完成然后再开始采集
// 2. 未知时间过久, 重新开始采集
// 3. 所有步骤尝试等待重新执行
// 4. 向下翻找极限值, 几个屏幕范围, 没有找到就回到最上面, 在找一次, 还找不到就跳过

export async function autoCollection(queues: Array<ActionQueue>): Promise<void> {
  let num = 1;
  while (num < 20) {
    console.log(`第${num++}次采集`);

    for (const action of queues) {
      if (action.type === 'collection') {
        console.log('采集');
        await startCollection(action.materials);
        await waitCollection();
        // 关闭采集助手
        const closeBtn = images.findImage(images.captureScreen(), Utils.getKey('手艺_采集_采集助手_关闭'));
        console.log('关闭采集助手');
        click(closeBtn.x, closeBtn.y);
        sleep(800);
      }

      if (action.type == 'make') {
        console.log('开始制造');
        await startMake(action.materials);
        const closeBtn2 = images.findImage(images.captureScreen(), Utils.getKey('手艺_采集_采集助手_关闭'));
        console.log('关闭采集界面');
        click(closeBtn2.x, closeBtn2.y);
        sleep(1000);
      }
    }


    // startCollection();
    // // 等待采集完成
    // await waitCollection();
    // // 关闭采集助手
    // const closeBtn = images.findImage(images.captureScreen(), Utils.getKey('手艺_采集_采集助手_关闭'));
    // console.log('关闭采集助手');
    // click(closeBtn.x, closeBtn.y);
    // sleep(1000);
    //
    // console.log('开始制造');
    // await startMake();
    // const closeBtn2 = images.findImage(images.captureScreen(), Utils.getKey('手艺_采集_采集助手_关闭'));
    // console.log('关闭采集界面');
    // click(closeBtn2.x, closeBtn2.y);
    // sleep(1000);
  }

}


/**
 * 开启采集
 */
export async function startCollection(materials: Array<{ key: Keys, num: number }>): Promise<void> {
  // 打开手艺界面
  await openCraft();
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
    const obj = images.findImage(images.captureScreen(), Utils.getKey('手艺材料_紫杉木'), {threshold: 0.6});
    click(obj.x, obj.y);
    sleep(1000);
    const confirmPoint = images.findImage(images.captureScreen(), Utils.getKey('手艺_采集_采集助手_选择数量'));
    // 点击确定(确认位置不会变)
    click(confirmPoint.x, confirmPoint.y);
    sleep(1000);
    const obj2 = images.findImage(images.captureScreen(), Utils.getKey('手艺材料_铁矿石'), {threshold: 0.6});
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
    swipe(600, 800, 600, 680, 1000);
    const obj2 = images.findImage(images.captureScreen(), Utils.getKey('手艺材料_白云石'), {threshold: 0.6});
    click(obj2.x, obj2.y);
    console.log('选择: 手艺材料_白云石');
    sleep(1000);
    const confirmPoint = images.findImage(images.captureScreen(), Utils.getKey('手艺_采集_采集助手_选择数量'));
    // 点击确定(确认位置不会变)
    click(confirmPoint.x, confirmPoint.y);
    sleep(1000);
  }

  /**
   * 计划2: 声望
   */
  function plan3() {
    console.log('选择: 手艺材料_树脂');
    const obj2 = images.findImage(images.captureScreen(), Utils.getKey('手艺材料_树脂'), {threshold: 0.6});
    click(obj2.x, obj2.y);
    sleep(1000);
    const confirmPoint = images.findImage(images.captureScreen(), Utils.getKey('手艺_采集_采集助手_选择数量'));
    // 点击确定(确认位置不会变)
    click(confirmPoint.x, confirmPoint.y);
    sleep(1000);
    const point = images.findImage(images.captureScreen(), Utils.getKey('手艺材料_粘土'), {threshold: 0.6});
    click(point.x, point.y);
    sleep(1000);
    click(confirmPoint.x, confirmPoint.y);
    sleep(1000);
  }

  let confirmPoint: Point | undefined;

  // 选择材料
  for (const material of materials) {
    const obj = await findMaterial(material.key);
    if (!obj) {
      console.log(`找不到目标材料或者材料已满: ${material.key}`);
      continue;
    }
    click(obj.x, obj.y);
    sleep(800);
    if (!confirmPoint) {
      confirmPoint = images.findImage(images.captureScreen(), Utils.getKey('手艺_采集_采集助手_选择数量'));
    }
    // 点击确定(确认位置不会变)
    click(confirmPoint.x, confirmPoint.y);
    sleep(800);
  }

  // 开始采集
  const startBtn = images.findImage(images.captureScreen(), Utils.getKey('手艺_采集_采集助手_开始'));
  click(startBtn.x, startBtn.y);
  sleep(800);
}

/**
 * 找到目标材料
 */
// 查找次数
let loopIndex = 0;
// 滑动次数
let swipeIndex = 0;

export async function findMaterial(key: Keys): Promise<Point | undefined> {
  function reset(num: number) {
    let i = 0;
    while (i < num) {
      i++;
      swipe(590, 600, 650, 800, 500);
    }
  }

  loopIndex = 0;
  if (swipeIndex !== 0) {
    reset(swipeIndex + 1);
  }
  return new Promise((resolve, reject) => {
    function loop() {
      let obj: Point | undefined;
      Utils.getKeysSync([key], (result) => {
        obj = images.findImage(images.captureScreen(), result[key], {threshold: 0.96});
        console.log(`寻找目标材料: ${key}, ${obj}`);
      });
      if (obj) {
        resolve(obj);
        return;
      }
      // 没有找到的时候, 向下滑动
      swipe(590, 800, 650, 600, 1200);
      sleep(1000);
      swipeIndex++;
      setTimeout(() => {
        if (loopIndex == 2) {
          resolve(undefined);
          return;
        }
        if (swipeIndex === 7) {
          reset(8);
          loopIndex++;
          swipeIndex = 0;
        }
        // 继续滑动
        loop();
      }, 1000);
    }

    loop();
  });

}

/**
 * 等待采集完成
 */
export function waitCollection(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    async function loop() {
      const status = await getCurrentStatus();
      if (status === 'CollectionCompleted') {
        console.log('采集中识别: 采集完成');
        resolve(true);
        return;
      }
      if (status === 'Collectioning') {
        console.log('采集中识别: 正在采集');
      }
      if (status === 'Unknow') {
        console.log('采集中识别: 未知状态');
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
  let currentScreen = images.captureScreen();
  // 如果找到完成按钮，说明采集完成
  const finishBtn = images.findImage(currentScreen, Utils.getKey('手艺_采集_采集助手_完成'));
  if (finishBtn) {
    click(finishBtn.x, finishBtn.y);
    return 'CollectionCompleted';
  }
  // 如果找到未开始按钮，也说明采集完成
  // const unStartBtn = images.findImage(currentScreen, Utils.getKey('手艺_采集_采集助手_未开始'));
  // if (unStartBtn) {
  //   return 'CollectionCompleted';
  // }
  // 如果找不到完成按钮，说明正在采集
  if (images.findImage(currentScreen, Utils.getKey('主界面_采集助手'), {threshold: 0.5})) {
    // const currentScreen = images.captureScreen();
    const skills: Keys[] = ['手艺技能_丰收强化_金1', '手艺技能_丰收强化_紫1', '手艺技能_幸运附体_紫1', '手艺技能_幸运附体_蓝1', '手艺技能_丰收强化_蓝1', '手艺技能_零耗_蓝1'];
    for (const skill of skills) {
      const skillPoint = images.findImage(images.captureScreen(), Utils.getKey(skill));
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
export async function startMake(materials: Array<{ key: Keys, num: number }>): Promise<void> {
  // 打开手艺界面
  await openCraft();

  for (const material of materials) {
    await makeCraft(material.key);
    sleep(1000);
  }
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
      const expandPoint = images.findImage(images.captureScreen(), Utils.getKey(key), {threshold: 0.97});
      if (expandPoint) {
        resolve(expandPoint);
        return;
      }
      swipe(600, 800, 600, 500, 1200);
      sleep(1000);
      setTimeout(() => {
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
export async function openCraft() {
  // 手艺按钮在主界面收起菜单中, 先展开
  await MainUtils.expandCraft();
  // 点击手艺
  console.log('打开手艺界面');
  const currentScreen = images.captureScreen();
  const expandPoint = images.findImage(currentScreen, Utils.getKey('手艺'), {threshold: 0.5});
  click(expandPoint.x, expandPoint.y);
  sleep(1000);
}

/**
 * 主界面类
 */
export class MainUtils {
  static waitMain() {

  }

  static async expandCraft(): Promise<boolean> {
    // 循环找到手艺按钮
    while (true) {
      // 点击手艺
      const expandPoint = images.findImage(images.captureScreen(), Utils.getKey('主界面_收起'), {threshold: 0.5});
      if (expandPoint) {
        click(expandPoint.x, expandPoint.y);
        sleep(1000);
      }
      const craftPoint = images.findImage(images.captureScreen(), Utils.getKey('手艺'), {threshold: 0.5});
      if (craftPoint) {
        return true;
      }
      await new Promise(resolve => setTimeout(resolve, 1000)).then();
    }

  }
}
