/**
 * 这个脚本是用来检查更新的
 * 但是出于方便, 真正的更新脚本是放在了 hot-update.js
 * 先从gitee获取最新的更新脚本, 然后执行
 */
function main() {
  // 获取最新的版本信息
  const result = http.get('https://gitee.com/api/v5/repos/rabbitkiller/szgd-assistance/releases/latest');
  const releasesDetailVO = result.body.json();
  // 获取最新的更新脚本
  const script = http.get(`https://gitee.com/rabbitkiller/szgd-assistance/releases/download/${releasesDetailVO.tag_name}/hot-update.js`);
  // 执行更新脚本
  engines.execScript("hotUpdate", script.body.string());
}
main();
