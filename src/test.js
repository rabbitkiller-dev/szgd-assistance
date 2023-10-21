"ui";

if (!images.requestScreenCapture(true)) {
  toast('请求截图失败');
  exit();
}

var main_default = '<vertical padding="16" id="main">\r\n  <button w="auto" id="autoMask" text="制作声望垃圾" />\r\n  <button w="auto" id="autoMaskLianjin" text="炼金紫药" />\r\n  <button w="auto" id="autoUseSkill" text="自动触发手艺技能" />\r\n</vertical>\r\n';

console.log('???')
