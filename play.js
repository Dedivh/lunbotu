
const nextIndex = function(slide, offset) {
    // 得到图片总数和当前图片下标
    // 因为得到的是 string 类型, 要转成数字
    let numberOfImgs = Number(slide.dataset.imgs)
    let activeIndex = Number(slide.dataset.active)
    // log('click slide')
    // 求出下一张图片的 id
    // 上一张图片的 offset 是 -1
    // 下一张图片的 offset 是 1
    // var offset = Number(self.dataset.offset)
    // 切换图片
    let index = (activeIndex + offset + numberOfImgs) % numberOfImgs
    return index
}

const bindEventSlide = function() {
    let selector = '.gua-slide-button'
    bindAll(selector, 'click', function(event) {
        log('click next')
        let self = event.target
        // 找到 slide div
        let slide = self.parentElement
        let offset = Number(self.dataset.offset)
        // 计算出下一张图片的 index
        let index = nextIndex(slide, offset)
        // 显示下一张图片
        showImageAtIndex(slide, index)
    })
}

const showImageAtIndex = function(slide, index) {
    // 用 nextIndex 接一下 indx 变量, 就只需要在这里变动, 而不是在函数里每个地方都变动
    let nextIndex = index
    // 切换图片
    // 设置父节点的 data-active
    slide.dataset.active = nextIndex
    // 删除当前图片的 class 给下一张图片加上 class
    let className = 'gua-active'
    removeClassAll(className)
    // 得到下一张图片的选择器
    let nextSelector = '#id-guaimage-' + String(nextIndex)
    let img = e(nextSelector)
    img.classList.add(className)

    // 切换小圆点
    // 1. 删除当前小圆点的 class
    let indicatorClassName = 'gua-white'
    removeClassAll(indicatorClassName)
    // 2. 得到下一个小圆点的选择器
    let indicatorSelector = '#id-indicator-' + String(nextIndex)
    let indicator = e(indicatorSelector)
    indicator.classList.add(indicatorClassName)
}


const bindEventIndicator = function() {
    let selector = '.gua-slide-indi'
    bindAll(selector, 'mouseover', function(event) {
        log('indicator in mouseover')
        let self = event.target
        let index = Number(self.dataset.index)
        log('index', index, typeof index)
        // 直接播放第 n 张图片
        let slide = self.closest('.gua-slide')
        showImageAtIndex(slide, index)
    })
}


const playNextImage = function() {
    let slide = e('.gua-slide')
    // 求出下一张图片的 index
    let offset = 1
    let index = nextIndex(slide, offset)
    showImageAtIndex(slide, index)
}

const autoPlay = function() {
    let interval = 2000
    setInterval(function() {
        // 每 2s 都会调用这个函数
        playNextImage()
    }, interval)
}

const __main = function() {
    bindEventSlide()
    bindEventIndicator()
    autoPlay()

    // intervalDemo()
}

__main()
