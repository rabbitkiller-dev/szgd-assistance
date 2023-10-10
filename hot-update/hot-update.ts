/**
 * Github Releases API 返回的数据结构(部分)
 */
interface ReleasesDetailVO {
  url: string;
  tag_name: string;
  assets: ReleasesDetailAssetsVO[];
}

interface ReleasesDetailAssetsVO {
  name: string;
  browser_download_url: string;
}

const LAST_RELEASE_ID_FILE_PATH = `${files.cwd()}/szgd-assistance/.last_release_id`;

/**
 * 进行热更新/下载
 */
function hotUpdate() {
  // 先判断是否有文件
  if (!files.isFile(LAST_RELEASE_ID_FILE_PATH)) {
    toast('初次使用, 开始安装脚本');
  }
  const needUpdate = checkUpdate();
  if (!needUpdate) {
    console.log('无需更新');
    return;
  }
  // 先从github releases获取最新的版本信息
  const result = http.get('https://gitee.com/api/v5/repos/rabbitkiller/szgd-assistance/releases/latest');
  const releasesDetailVO = result.body.json() as ReleasesDetailVO;
  const assets = releasesDetailVO.assets.find(asset => asset.name === 'szgd-assistance.7z');

  toast(`脚本有更新. 正在更新版本为: ${releasesDetailVO.tag_name}`);
  if (assets) {
    console.log(assets);
    // 存在文件, 先删除
    if (files.isFile(`${files.cwd()}/szgd-assistance.7z`)) {
      files.remove(`${files.cwd()}/szgd-assistance.7z`);
    }
    if (files.isDir(`${files.cwd()}/szgd-assistance`)) {
      files.removeDir(`${files.cwd()}/szgd-assistance`);
    }
    downloadFile(assets.browser_download_url);
  }
}

/**
 * 判断是否需要更新
 * 通过比较release资源id来判断, 每次更新信息都在szgd-assistance目录中
 */
function checkUpdate(): boolean {
  const result = http.get('https://gitee.com/api/v5/repos/rabbitkiller/szgd-assistance/releases/latest');
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

function downloadFile(url: string) {
  toastLog('开始下载');
  const response = http.get(url);
  const zipFile = response.body.bytes();
  const filepath = `${files.cwd()}/szgd-assistance.7z`;
  const folderPath = `${files.cwd()}`;
  files.writeBytes(filepath, zipFile);
  toastLog('下载完成');
  toastLog('开始解压');
  switch (zips.X(filepath, folderPath)) {
    case 0:
      toastLog("解压缩成功！请到 " + folderPath + " 目录下查看。")
      break;
    case 1:
      toastLog("压缩结束，存在非致命错误（例如某些文件正在被使用，没有被压缩）")
      break;
    case 2:
      toastLog("致命错误")
      break;
    case 7:
      toastLog("命令行错误")
      break;
    case 8:
      toastLog("没有足够内存")
      break;
    case 255:
      toastLog("用户中止操作")
      break;
    default: toastLog("未知错误")
  }
  console.log(folderPath);
  return folderPath;
}

hotUpdate();

