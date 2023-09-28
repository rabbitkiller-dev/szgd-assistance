import { Keys, Utils } from './utils';
import { CraftSkillKeys } from './constant';

const skills: CraftSkillKeys[] = ['手艺技能_丰收强化_紫1', '手艺技能_幸运附体_紫1', '手艺技能_幸运附体_蓝1', '手艺技能_丰收强化_蓝1'];
/**
 * 自动使用手艺技能
 * 识别技能图标: 查询自己当前有哪些技能, 目前游戏最多同时可用2个技能, 识别出来后, 识图只需要识别这两个技能即可, 避免识图所有技能导致性能下降
 * 识别技能状态: 识别技能图标后, 识别技能状态, 如果技能状态是可用的, 则点击技能图标
 * 1. 如果第一次执行, 先识别技能图标, 在执行技能
 * 2. 如果第二次执行, 先识别技能状态, 如果技能状态是可用的, 则点击技能图标, 点击后异步阻塞60秒
 * 3. 如果120秒内没有执行过, 则重新执行第一步
 * 4. 执行技能60秒后, 才执行第二步
 */
export async function auto_use_skill() {
  let lastTime = 0;
  const useSkill: CraftSkillKeys[] = [];

  while (true) {
    // 如果120秒内没有执行过, 则进行第一步(第一次执行必定会执行第一步)
    if (new Date().getTime() - lastTime > 120 * 1000) {
      console.log(`[自动使用手艺技能] 第一步: 识别技能图标`);
      const currentScreen = images.captureScreen();
      const colling = Utils.getKeysSync(['主界面_采集助手'], (keys) => {
        return images.findImage(images.captureScreen(), keys['主界面_采集助手'], {threshold: 0.5})
      });
      // 如果找到采集助手, 说明正在采集, 可以使用技能
      if (colling) {
        console.log(`[自动使用手艺技能] 识别到采集助手, 识别技能图标`);
        useSkill.length = 0;
        for (const skill of skills) {
          const skillPoint = images.findImage(currentScreen, Utils.getKey(skill));
          if (skillPoint) {
            useSkill.push(skill);
          }
        }
        console.log(`[自动使用手艺技能] 识别到技能图标: ${useSkill.join(', ')}`);
      }
    }

    // 第二步
    if (useSkill.length > 0) {
      console.log(`[自动使用手艺技能] 第二步: 识别技能状态`);
      const currentScreen = images.captureScreen();
      let canUseSkill = false;
      for (const skill of skills) {
        const skillPoint = images.findImage(currentScreen, Utils.getKey(skill));
        if (skillPoint) {
          console.log(`[自动使用手艺技能] 触发手艺技能: ${skill}`);
          click(skillPoint.x, skillPoint.y);
          canUseSkill = true;
        }
      }
      if (canUseSkill) {
        lastTime = new Date().getTime();
        console.log(`[自动使用手艺技能] 等待60秒`);
        // 异步阻塞60秒
        await new Promise(resolve => setTimeout(resolve, 60 * 1000)).then();
      }
    }

    // 如果没有执行过, 则等待1秒
    console.log(`[自动使用手艺技能] 等待1秒`);
    await new Promise(resolve => setTimeout(resolve, 1 * 1000)).then();
  }

}
