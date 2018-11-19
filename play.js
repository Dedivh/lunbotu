
const nextIndex = function(slide, offset) 
    let numberOfImgs = Number(slide.dataset.imgs)
    let activeIndex = Number(slide.dataset.active)
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
    let nextIndex = index
    slide.dataset.active = nextIndex
    let className = 'gua-active'
    removeClassAll(className)
    let nextSelector = '#id-guaimage-' + String(nextIndex)
    let img = e(nextSelector)
    img.classList.add(className)


    removeClassAll(indicatorClassName)

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
        let slide = self.closest('.gua-slide')
        showImageAtIndex(slide, index)
    })
}


const playNextImage = function() {
    let slide = e('.gua-slide')
    let offset = 1
    let index = nextIndex(slide, offset)
    showImageAtIndex(slide, index)
}

const autoPlay = function() {
    let interval = 2000
    setInterval(function() {
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
