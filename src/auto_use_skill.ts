import { Keys, Utils } from './utils';

export function auto_use_skill() {
  // 如果找主界面的采集助手，说明正在采集
  console.log('auto: 1');
  images.captureScreen();
  console.log('auto: 2');
  if (images.findImage(images.captureScreen(), Utils.getKey('主界面_采集助手'), {threshold: 0.5})) {
    console.log('auto: 3');
    const skills: Keys[] = ['手艺技能_丰收强化_紫1', '手艺技能_幸运附体_紫1', '手艺技能_幸运附体_蓝1', '手艺技能_丰收强化_蓝1'];
    for (const skill of skills) {
      console.log(`auto: 4 ${skill}`);
      const skillPoint = images.findImage(images.captureScreen(), Utils.getKey(skill));
      console.log(`auto: 5 ${skill}`);
      if (skillPoint) {
        console.log('触发手艺技能');
        click(skillPoint.x, skillPoint.y);
      }
    }
  }
}
