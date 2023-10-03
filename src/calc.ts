/**
 * 材料计算器
 */

import { CraftKeys, CraftMaterialKeys, Keys } from './constant';

/**
 * 配方(固定)
 */
export interface Recipe {
  key: CraftKeys,
  material: RecipeMaterial[]
}

/**
 * 材料
 */
export interface RecipeMaterial {
  key: CraftMaterialKeys,
  count: number
}

/**
 * 材料计算器
 */
const RECIPES: Recipe[] = [
  {
    key: '手艺品_青翠矿镐箱',
    material: [
      { key: '手艺材料_钴铁矿', count: 4 },
      { key: '手艺材料_白云石', count: 1 },
      { key: '手艺材料_铁矿石', count: 1 },
    ]
  },
  {
    key: '手艺品_青翠剪刀箱',
    material: [
      { key: '手艺材料_翠晶石', count: 6 },
      { key: '手艺材料_红乔木', count: 5 },
      { key: '手艺材料_紫杉木', count: 3 },
    ]
  },
  {
    key: '手艺品_青翠手斧箱',
    material: [
      { key: '手艺材料_钴铁矿', count: 4 },
      { key: '手艺材料_红乔木', count: 4 },
      { key: '手艺材料_紫杉木', count: 2 },
    ]
  },
  {
    key: '手艺品_青翠钓竿箱',
    material: [
      { key: '手艺材料_翠晶石', count: 6 },
      { key: '手艺材料_白云石', count: 2 },
      { key: '手艺材料_铁矿石', count: 2 },
    ]
  },
  {
    key: '手艺品_青翠钓竿箱',
    material: [
      { key: '手艺材料_翠晶石', count: 6 },
      { key: '手艺材料_白云石', count: 2 },
      { key: '手艺材料_铁矿石', count: 2 },
    ]
  },
];

export interface InputMaterial {
  key: CraftKeys,
  count: number
}

export interface OutputMaterial {
  key: CraftMaterialKeys,
  count: number
}

/**
 * 计算要制作的手艺品要多少材料
 * @param inputs
 */
function calc(inputs: InputMaterial[]): OutputMaterial[] {
  const result = new Map<CraftMaterialKeys, number>();
  for (const input of inputs) {
    const recipe = RECIPES.find((recipe) => recipe.key === input.key);
    if (recipe) {
      for (const material of recipe.material) {
        const count = result.get(material.key) || 0;
        result.set(material.key, count + (material.count) * input.count);
      }
    } else {
      console.log(`未找到配方: ${input.key}`);
    }
  }
  return Array.from(result.entries()).map(([key, count]) => ({ key, count }));
}

export function testCalc() {
  const result = calc([
    { key: '手艺品_青翠剪刀箱' , count: 30 },
    { key: '手艺品_青翠手斧箱' , count: 50 },
    { key: '手艺品_青翠矿镐箱' , count: 50 },
    { key: '手艺品_青翠钓竿箱' , count: 30 },
  ]);

  console.log(result);
  console.log(calc([
    { key: '手艺品_青翠手斧箱' , count: 50 },
    { key: '手艺品_青翠钓竿箱' , count: 30 },
  ]));
  console.log(calc([
    { key: '手艺品_青翠矿镐箱' , count: 50 },
    { key: '手艺品_青翠剪刀箱' , count: 30 },
  ]));
}

function main() {
  testCalc();
}

main();
