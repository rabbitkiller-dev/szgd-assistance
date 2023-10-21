import { findMaterial, openCraft } from './test_auto';
import { Utils } from './utils';

export async function run() {
  await test_open_collection();
  await test_find_m();
}

async function test_open_collection() {
  // 打开手艺界面
  await openCraft();
  const point = Utils.waitKeyPoint('手艺_采集_未激活');
  if (point) {
    click(point.x, point.y);
    sleep(2000);
  }
  const collAss = images.findImage(images.captureScreen(), Utils.getKey('手艺_采集_采集助手'));
  click(collAss.x, collAss.y);
  sleep(2000);
}

async function test_find_m() {
  const point = await findMaterial('手艺材料_燃火黏土');
  if (point) {
    click(point.x, point.y);
  } else {
    throw new Error('找不到 手艺材料_燃火黏土');
  }
}
