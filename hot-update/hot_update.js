var LAST_RELEASE_ID_FILE_PATH = "".concat(files.cwd(), "/szgd-assistance/.last_release_id");
/**
 * 进行热更新/下载
 */
function hotUpdate() {
    var needUpdate = checkUpdate();
    if (!needUpdate) {
        console.log('无需更新');
        return;
    }
    console.log('开始更新');
    // 先从github releases获取最新的版本信息
    // const result = http.get('https://api.github.com/repos/rabbitkiller-dev/szgd-assistance/releases/latest');
    // const releasesDetailVO: ReleasesDetailVO = result.body.json();
    // const assets = releasesDetailVO.assets[0];
    // if (assets) {
    //
    // }
}
/**
 * 判断是否需要更新
 * 通过比较release资源id来判断, 每次更新信息都在szgd-assistance目录中
 */
function checkUpdate() {
    var result = http.get('https://api.github.com/repos/rabbitkiller-dev/szgd-assistance/releases/latest');
    var releasesDetailVO = result.body.json();
    var assets = releasesDetailVO.assets[0];
    // 先判断是否有文件
    if (!files.isFile(LAST_RELEASE_ID_FILE_PATH)) {
        return true;
    }
    if (assets) {
        var lastReleaseId = assets.id;
        var currentReleaseId = files.read("".concat(files.cwd(), "/szgd-assistance/.last_release_id"));
        return lastReleaseId !== currentReleaseId;
    }
    return false;
}
