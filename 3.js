// 轮播图
// 每个网站包括苹果都有的轮播图组件（什么是组件）
/*
1. 写一个 div 里面有 3 个 img 标签
2. 只显示当前活动的 img 标签
3. 加 1 个按钮，点击的时候切换图片
*/
/*
✔ 1. 点击下一页可以切换到下一张图片
✔ 2. 点击上一页可以切换到上一张图片
✔ 3. 点击按钮时, 切换小圆点
✔ 4. 移动到小圆点, 可以切换到相应图片
5. 自动播放图片
*/

var nextIndex = function(slide, offset) {
    // var self = button
    // var slide = self.closest('.gua-slide')
    // 得到图片总数和当前图片下标
    // 因为得到的是 string 类型, 要转成数字
    // parseInt(string, base)
    // var numberOfImgs = parseInt(slide.dataset.imgs, 10)
    // var activeIndex = parseInt(slide.dataset.active, 10)
    var numberOfImgs = Number(slide.dataset.imgs)
    var activeIndex = Number(slide.dataset.active)
    // log('click slide')
    // 求出下一张图片的 id
    // 上一张图片的 offset 是 -1
    // 下一张图片的 offset 是 1
    // var offset = Number(self.dataset.offset)
    // 切换图片
    var index = (activeIndex + offset + numberOfImgs) % numberOfImgs
    return index
}

var bindEventSlide = function() {
    var selector = '.gua-slide-button'
    bindAll(selector, 'click', function(event) {
        log('click next')
        var self = event.target
        // 找到 slide div
        var slide = self.parentElement
        var offset = Number(self.dataset.offset)
        // 计算出下一张图片的 index
        var index = nextIndex(slide, offset)
        // 显示下一张图片
        showImageAtIndex(slide, index)
    })
}

var showImageAtIndex = function(slide, index) {
    // 用 nextIndex 接一下 indx 变量, 就只需要在这里变动, 而不是在函数里每个地方都变动
    var nextIndex = index
    // 切换图片
    // 设置父节点的 data-active
    slide.dataset.active = nextIndex
    // 删除当前图片的 class 给下一张图片加上 class
    var className = 'gua-active'
    removeClassAll(className)
    // 得到下一张图片的选择器
    var nextSelector = '#id-guaimage-' + String(nextIndex)
    var img = e(nextSelector)
    img.classList.add(className)

    // 切换小圆点
    // 1. 删除当前小圆点的 class
    var indicatorClassName = 'gua-white'
    removeClassAll(indicatorClassName)
    // 2. 得到下一个小圆点的选择器
    var indicatorSelector = '#id-indicator-' + String(nextIndex)
    var indicator = e(indicatorSelector)
    indicator.classList.add(indicatorClassName)
}


var bindEventIndicator = function() {
    var selector = '.gua-slide-indi'
    bindAll(selector, 'mouseover', function(event) {
        log('indicator in mouseover')
        var self = event.target
        var index = Number(self.dataset.index)
        log('index', index, typeof index)
        // 直接播放第 n 张图片
        var slide = self.closest('.gua-slide')
        showImageAtIndex(slide, index)
    })
}

var intervalDemo = function() {
    // setTimeout（回调函数，延时）
    // 第一个参数是回调函数, 定时之后会被调用
    // 第二个参数是延迟的时间, 以毫秒为单位, 1s = 1000ms
    // setTimeout 之后执行一次
    // log('timeout demo', new Date())
    // setTimeout(function() {
    //     log('timeout', new Date())
    // }, 2000)

    // setInterval（回调函数，延时）
    // 第一个参数是回调函数, 定时之后会被调用
    // 第二个参数是延迟的时间, 以毫秒为单位, 1s = 1000ms
    // setInterval 会无限执行
    // log('interval demo', new Date())
    // setInterval(function() {
    //     log('interval', new Date())
    // }, 2000)

    // setTimeout 和 setInterval 都有一个返回值
    // 返回值可以用来清除定时器函数
    // var clockId = setInterval(function() {
    //     log('interval', new Date())
    // }, 1000)
    // log('用来删除定时器的 id', clockId)
    // clearInterval(clockId)
}

var playNextImage = function() {
    var slide = e('.gua-slide')
    // 求出下一张图片的 index
    var offset = 1
    var index = nextIndex(slide, offset)
    showImageAtIndex(slide, index)
}

var autoPlay = function() {
    var interval = 2000
    setInterval(function() {
        // 每 2s 都会调用这个函数
        playNextImage()
    }, interval)
}

var __main = function() {
    bindEventSlide()
    bindEventIndicator()
    //autoPlay()

    // intervalDemo()
}

__main()
