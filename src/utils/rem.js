function setRem() {

    // 320 默认大小16px; 320px = 20rem ;每个元素px基础上/16
    let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
    let htmlDom = document.getElementsByTagName('html')[0];
    if (htmlWidth <= 750) {
        htmlDom.style.fontSize = 80 + 'px';
    } else if (htmlWidth > 750) {
        htmlDom.style.fontSize = 100 + 'px';
    }
    //得到html的Dom元素

    //设置根元素字体大小

}
// 初始化
setRem();
// 改变窗口大小时重新设置 rem
window.onresize = function() {
    setRem()
}