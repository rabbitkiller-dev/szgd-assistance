/**
 * Github Releases API 返回的数据结构(部分)
 */
interface ReleasesDetailVO {
  url: string;
  assets: ReleasesDetailAssetsVO[];
}

interface ReleasesDetailAssetsVO {
  name: string;
  url: string;
}

const LAST_RELEASE_ID_FILE_PATH = `${files.cwd()}/szgd-assistance/.last_release_id`;

/**
 * 进行热更新/下载
 */
function hotUpdate() {
  const needUpdate = checkUpdate();
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
function checkUpdate(): boolean {
  const result = http.get('https://api.github.com/repos/rabbitkiller-dev/szgd-assistance/releases/latest');
  const releasesDetailVO: ReleasesDetailVO = result.body.json();
  const assets = releasesDetailVO.assets[0];
  // 先判断是否有文件
  if (!files.isFile(LAST_RELEASE_ID_FILE_PATH)) {
    return true;
  }
  if (assets) {
    const lastReleaseId = assets.id;
    const currentReleaseId = files.read(`${files.cwd()}/szgd-assistance/.last_release_id`);
    return lastReleaseId !== currentReleaseId;
  }
  return false;
}
