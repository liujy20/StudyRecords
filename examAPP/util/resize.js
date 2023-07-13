(function (win, doc) {
    // 核心代码
    function setFontSize() {
        // 获取window 宽度
        var winWidth = window.innerWidth;
        // 750 是当前 UI 设计图的宽度  ,如果原稿是1200，下面就改成1200
        doc.documentElement.style.fontSize = (winWidth / 750) * 100 + 'px';
    }


    // 下列代码用于优化移动设备上的字体大小，以确保在旋转设备或调整窗口大小时能够适应不同的屏幕尺寸。
    var evt = 'onorientationchange' in win ? 'orientationchange' : 'resize';

    var timer = null;

    win.addEventListener(evt, function () {
        clearTimeout(timer);

        timer = setTimeout(setFontSize, 300);
    }, false);

    win.addEventListener("pageshow", function (e) {
        if (e.persisted) {
            clearTimeout(timer);

            timer = setTimeout(setFontSize, 300);
        }
    }, false);

    //初始化
    setFontSize();

})(window, document);