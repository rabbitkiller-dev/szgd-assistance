function testOne() {
  console.time('截图一次');
  images.captureScreen();
  console.timeEnd('截图一次');
}

//等待截屏权限申请并同意

if (!images.requestScreenCapture(true)) {
  toast('请求截图失败');
  exit();
}
//等待截屏权限申请并同意
threads.start(function () {
  //安卓版本高于Android 9
  if (device.sdkInt > 28) {
    packageName('com.android.systemui').text('立即开始').waitFor();
    text('立即开始').click();
  }
});

sleep(3000)
testOne();
