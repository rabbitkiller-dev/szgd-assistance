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

// function MyAnnotation(target: any) {
//     target.prototype.name = '哈哈哈';
// }
// @MyAnnotation
// class Person {

//     public age: number;

//     public name!: string;

//     public constructor() {
//         this.age = 18;
//     }

//     public toObject(): object {
//         return {
//             name: this.name,
//             age: this.age,
//         };
//     }

// }
// const p = new Person();
// console.log('Persontest:', p.toObject());
import { Utils } from './utils';
import { autoCollection, findCraft, MainUtils, makeCraft, openCraft, startMake, waitCollection } from './test_auto';

function debugGetCount() {
  // console.log(files.path('./cache/黏土.png'));
  const currentScreen = images.captureScreen();
  // console.log(1)
  // const clip = images.clip(img, 548, 618, 125, 125);
  // console.log(3)
  // images.save(clip, files.path('./cache/黏土.png'));
  // console.log(4)
  // let result = gmlkit.ocr(clip, "zh");
  // log(result.text);
  const expandPoint = images.findImage(currentScreen, Utils.getKey('手艺品_粘土'));
  console.log(`识别到的坐标: ${expandPoint.x}, ${expandPoint.y}`);
  const clip = images.clip(currentScreen, expandPoint.x, expandPoint.y, 125, 125);
  images.save(clip, files.path('./cache/黏土2.png'));
}

function debugClose() {
  // 关闭采集助手
  const closeBtn = images.findImage(images.captureScreen(), Utils.getKey('手艺_采集_采集助手_关闭'));
  console.log('关闭采集助手');
  click(closeBtn.x, closeBtn.y);
}

function debugMainExpand() {
  // 关闭采集助手
  const closeBtn = images.findImage(images.captureScreen(), Utils.getKey('主界面_收起'), { threshold: 0.5 });
  console.log('展开');
  click(closeBtn.x + 290, closeBtn.y);
}
async function testClickCraft() {
  openCraft();
  const flag = await makeCraft('手艺品_大猫修补锤');
}
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

  autoCollection().then();


  // const obj2 = images.findImage(images.captureScreen(), Utils.getKey('手艺材料_树脂'), { threshold: 0.6 });
  // click(obj2.x, obj2.y);
  // sleep(1000);
} catch (e) {
  console.log('失败');
  console.log(e);
}

console.log('结束');
