import main from './html/main.html';

//安卓版本高于Android 9
import { auto_use_skill } from './auto_use_skill';

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

import { autoCollection, findCraft, MainUtils, makeCraft, openCraft, startMake, waitCollection } from './test_auto';


try {
  // findCraft('手艺品_青铜包边').then((expandPoint)=>{
  //   let startMake = false;
  //   if (expandPoint) {
  //     console.log(`找到手艺品: 手艺品_壹型熔炉石`);
  //     click(expandPoint.x, expandPoint.y);
  //   }
  // })
  // console.show();
  // threads.start(auto_use_skill);
  auto_use_skill();

  autoCollection().then();

  // const obj2 = images.findImage(images.captureScreen(), Utils.getKey('手艺材料_树脂'), { threshold: 0.6 });
  // click(obj2.x, obj2.y);
  // sleep(1000);
} catch (e) {
  console.log('失败');
  console.log(e);
}

console.log('结束');
