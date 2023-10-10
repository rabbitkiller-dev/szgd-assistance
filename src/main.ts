import mainHtml from './html/main.html';

import { auto_use_skill } from './auto_use_skill';
import {
  ActionQueue,
  autoCollection,
} from './test_auto';


//等待截屏权限申请并同意
threads.start(function () {
  if (!images.requestScreenCapture(true)) {
    toast('请求截图失败');
    exit();
  }
});
//等待截屏权限申请并同意
threads.start(function () {
  //安卓版本高于Android 9
  if (device.sdkInt > 28) {
    packageName('com.android.systemui').text('立即开始').waitFor();
    text('立即开始').click();
  }
});

ui.layout(mainHtml);

const autoMaskLianjin = ui.findView('autoMaskLianjin');
// 炼金师的自动采集
autoMaskLianjin.click(function () {
  threads.start(function () {
    if (!app.launchApp('森之国度')) {
      toast('启动森之国度失败');
    }
    const queue: Array<ActionQueue> = [
      {
        type: 'collection',
        materials: [
          { key: '手艺材料_浓稠汁液', num: 0 },
          { key: '手艺材料_铁矿石', num: 0 },
          { key: '手艺材料_白云石', num: 0 },
        ],
      },
      {
        type: 'make',
        materials: [
          { key: '手艺品_中级动力装置', num: 0 },
        ],
      }
    ];
    auto_use_skill();
    autoCollection(queue).then();
  });
});


const autoMask = ui.findView('autoMask');
// 工匠的自动采集
autoMask.click(function () {
  threads.start(function () {
    if (!app.launchApp('森之国度')) {
      toast('启动森之国度失败');
    }
    // 队列任务
    const queues3: Array<ActionQueue> = [
      {
        type: 'collection',
        materials: [
          { key: '手艺材料_韧性树脂', num: 0 },
          { key: '手艺材料_耐火粘土', num: 0 },
        ],
      },
      {
        type: 'make',
        materials: [
          { key: '手艺品_灵翠矿镐箱', num: 0 },
          { key: '手艺品_灵翠剪刀箱', num: 0 },
        ]
      },
      {
        type: 'collection',
        materials: [
          { key: '手艺材料_韧性树脂', num: 0 },
          { key: '手艺材料_耐火粘土', num: 0 },
        ],
      },
      {
        type: 'make',
        materials: [
          { key: '手艺品_灵翠手斧箱', num: 0 },
          { key: '手艺品_灵翠钓竿箱', num: 0 },
        ]
      },
    ];
    auto_use_skill();
    autoCollection(queues3).then();
  });
});

const autoColl = ui.findView('autoColl');
// 工匠的自动采集
autoColl.click(function () {
  threads.start(function () {
    if (!app.launchApp('森之国度')) {
      toast('启动森之国度失败');
    }
    // 队列任务
    const queues3: Array<ActionQueue> = [
      {
        type: 'collection',
        materials: [
          { key: '手艺材料_韧性树脂', num: 0 },
          { key: '手艺材料_耐火粘土', num: 0 },
        ],
      },
    ];
    auto_use_skill();
    autoCollection(queues3).then();
  });
});


const autoMaskChushi = ui.findView('autoMaskChushi');
// 工匠的自动采集
autoMaskChushi.click(function () {
  threads.start(function () {
    if (!app.launchApp('森之国度')) {
      toast('启动森之国度失败');
    }
    // 队列任务
    const queues3: Array<ActionQueue> = [
      {
        type: 'collection',
        materials: [
          { key: '手艺材料_紫菜', num: 0 },
        ],
      },
      {
        type: 'make',
        materials: [
          { key: '手艺品_炸鱼套餐', num: 0 },
        ],
      },
    ];
    auto_use_skill();
    autoCollection(queues3).then();
  });
});

const autoUseSkill = ui.findView('autoUseSkill');

// 工匠的自动采集
autoUseSkill.click(function () {
  threads.start(function () {
    if (!app.launchApp('森之国度')) {
      toast('启动森之国度失败');
    }
    // 队列任务
    auto_use_skill();
    setInterval(function () {
    }, 1000);
  });
});
// try {
// findCraft('手艺品_青铜包边').then((expandPoint)=>{
//   let startMake = false;
//   if (expandPoint) {
//     console.log(`找到手艺品: 手艺品_壹型熔炉石`);
//     click(expandPoint.x, expandPoint.y);
//   }
// })
// console.show();
// threads.start(auto_use_skill);

// autoCollection().then();

// const obj2 = images.findImage(images.captureScreen(), Utils.getKey('手艺材料_树脂'), { threshold: 0.6 });
// click(obj2.x, obj2.y);
// sleep(1000);
// } catch (e) {
//   console.log('失败');
//   console.log(e);
// }

// console.log('结束');

setInterval(function () {
}, 1000);

