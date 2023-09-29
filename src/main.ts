import mainHtml from './html/main.html';

import { auto_use_skill } from './auto_use_skill';
import {
  ActionQueue,
  autoCollection,
} from './test_auto';

ui.layout(mainHtml);

const autoMaskLianjin = ui.findView('autoMaskLianjin');

// 炼金师的自动采集
autoMaskLianjin.click(function () {

//安卓版本高于Android 9
  if (device.sdkInt > 28) {
    //等待截屏权限申请并同意
    threads.start(function () {
      packageName('com.android.systemui').text('立即开始').waitFor();
      text('立即开始').click();
    });
  }
  if (!app.launchApp('森之国度')) {
    toast('启动森之国度失败');
    exit();
  }
  if (!images.requestScreenCapture(true)) {
    toast('请求截图失败');
    exit();
  }
  sleep(3000);
  const queue: Array<ActionQueue> = [
    {
      type: 'collection',
      materials: [
        {key: '手艺材料_树莓', num: 0},
      ],
    },
  ];
  auto_use_skill();
  autoCollection(queue).then();
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
