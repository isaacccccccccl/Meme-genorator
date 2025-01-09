'use strict'
var gElCanvas
var gCtx
var gCurrMeme
var gElImg
var gStartPos

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderCards()
}

function renderCards() {

    const images = getImgs()
    let strHTML = ``
    images.forEach((image, i) => {
        strHTML += `<img src="${image.url}" onclick="onImageClick(this, ${image.id})" class="img-${image.id}">`
    })

    const elCard = document.querySelector('.card')
    elCard.innerHTML = strHTML

}

// pick image and put it in canvas
function onImageClick(elImg, imgId) {
    // show the canvas and upload the image with the text
    memeController()
    gElImg = elImg
    gCurrMeme = findImg(imgId)
    console.log(elImg, imgId)

    gCurrMeme = (!gCurrMeme) ? createGMeme(imgId) : getMeme()
    gCurrMeme.lines[gCurrMeme.selectedLineIdx].pos.x = gElCanvas.width / 4
    gCurrMeme.lines[gCurrMeme.selectedLineIdx].pos.y = gElCanvas.width / 8
    gCurrMeme.lines[gCurrMeme.selectedLineIdx].size = gElCanvas.width * 0.1
    updateGmemesPos(gCurrMeme.lines[gCurrMeme.selectedLineIdx].pos)
    updateGmemes(gElCanvas.width * 0.1, 'size')
    setInputs()
    renderMeme(gElImg, gCurrMeme)
}

function renderMeme(elImg) {
    // cover canvas with img
    coverCanvasWithImg(elImg)
    // create a text on the image
    if (!gCurrMeme.lines.length) return
    for (var i = 0; i < gCurrMeme.lines.length; i++) {
        gCtx.font = `${gCurrMeme.lines[i].size}px ${gCurrMeme.lines[i].fontFamily}`
        gCtx.fillStyle = gCurrMeme.lines[i].color
        if (i > 0) {
            gCtx.fillText(gCurrMeme.lines[i].txt, gCurrMeme.lines[i].pos.x, gCurrMeme.lines[i].pos.y)
            gCurrMeme.lines[i].memeWidth = gCtx.measureText(gCurrMeme.lines[gCurrMeme.selectedLineIdx].txt).width
            updateGmemes(gCurrMeme.lines[i].memeWidth, 'memeWidth')
        } else {
            gCtx.fillText(gCurrMeme.lines[i].txt, gCurrMeme.lines[i].pos.x, gCurrMeme.lines[i].pos.y)
            gCurrMeme.lines[i].memeWidth = gCtx.measureText(gCurrMeme.lines[gCurrMeme.selectedLineIdx].txt).width
            updateGmemes(gCurrMeme.lines[i].memeWidth, 'memeWidth')
        }

    }
    console.log(gCurrMeme.selectedLineIdx)
    createRect()
}

/// create a box for the line that i am on
function createRect() {
    gCtx.rect(gCurrMeme.lines[gCurrMeme.selectedLineIdx].pos.x, gCurrMeme.lines[gCurrMeme.selectedLineIdx].pos.y - gCurrMeme.lines[gCurrMeme.selectedLineIdx].size, gCurrMeme.lines[gCurrMeme.selectedLineIdx].memeWidth,
        gCurrMeme.lines[gCurrMeme.selectedLineIdx].size)
    gCtx.stroke()
}

//display the image 
function memeController() {
    const elCards = document.querySelector('.cards')
    elCards.style.display = 'none'
    const elCanvas = document.querySelector('.canvas-container')
    elCanvas.style.display = 'flex'
    resizeCanvas()
}

function coverCanvasWithImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

// update color text
function onUpdate(elVal, val) {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    gCurrMeme.lines[gCurrMeme.selectedLineIdx][val] = elVal

    updateGmemes(elVal, gCurrMeme, val)
    renderMeme(gElImg)
}

function setInputs() {
    const elInputTxt = document.querySelector('.txt')
    elInputTxt.value = gCurrMeme.lines[gCurrMeme.selectedLineIdx].txt

    const elInputColor = document.querySelector('.color')
    elInputColor.value = gCurrMeme.lines[gCurrMeme.selectedLineIdx].color
}

// download image
function onDownload(elLink) {
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
    elLink.download = 'my-project'
}

// add new line
function onAddLine() {
    addLine(gCurrMeme)
    gCurrMeme = getMeme()
    renderMeme(gElImg)
}

// switch between lines
function onSwitchLine() {
    if (!gCurrMeme.lines.length) return
    gCurrMeme.selectedLineIdx = (gCurrMeme.lines.length > gCurrMeme.selectedLineIdx + 1) ? gCurrMeme.selectedLineIdx + 1 : 0

    updatelineIdx(gCurrMeme.selectedLineIdx)
    setInputs()
    renderMeme(gElImg)

}

function onUpdateSize(val) {
    // console.log(gCurrMeme.lines[gCurrMeme.selectedLineIdx].size)
    const elval = gCurrMeme.lines[gCurrMeme.selectedLineIdx].size + val
    onUpdate(elval, 'size')
}

function onMoveText(val) {
    gCurrMeme.lines[gCurrMeme.selectedLineIdx].pos.y += val
    moveBox(0, val)
    renderMeme(gElImg)
}

function onMoveTextSide(val) {
    gCurrMeme.lines[gCurrMeme.selectedLineIdx].pos.x += val
    moveBox(val, 0)
    renderMeme(gElImg)
}

function onChangeFont(elVal) {
    console.log(elVal)
    gCurrMeme.lines[gCurrMeme.selectedLineIdx].fontFamily = elVal
    updateFont(elVal)
    renderMeme(gElImg)
}

function onDeleteLine() {
    gCurrMeme.lines.splice(gCurrMeme.selectedLineIdx, 1)
    deleteLine()
    if (!gCurrMeme.lines.length) {
        renderMeme(gElImg)
    } else {
        onSwitchLine()

    }
}
////////////////////////////////////////////////////////////
function switchLineTap(selectLine) {
    if (!gCurrMeme.lines.length) return
    gCurrMeme.selectedLineIdx = selectLine

    updatelineIdx(gCurrMeme.selectedLineIdx)
    setInputs()
    renderMeme(gElImg)

}

function onDown(ev) {
    // console.log('onDown')

    // Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    var [isClicked, selectLined] = isBoxClicked(pos)
    if (!isClicked) {
        setBoxDrag(false)
        return
    }
    switchLineTap(selectLined)


    setBoxDrag(true)
    gCurrMeme.lines[gCurrMeme.selectedLineIdx].isDrag = true
    //Save the pos we start from
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    if (!gCurrMeme.lines.length) return
    const { isDrag } = gCurrMeme.lines[gCurrMeme.selectedLineIdx]
    if (!isDrag) return
    ////////////////////////////////////////////////////////////////////////////////
    const pos = getEvPos(ev)
    // Calc the delta, the diff we moved
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    gCurrMeme.lines[gCurrMeme.selectedLineIdx].pos.x += dx * 0.2
    gCurrMeme.lines[gCurrMeme.selectedLineIdx].pos.y += dy * 0.2
    moveBox(dx, dy)
    // Save the last pos, we remember where we`ve been and move accordingly
    gStartPos = pos
    // The canvas is render again after every move
    renderMeme(gElImg)
}

function onUp() {
    console.log('gCurr',)

    setBoxDrag(false)
    document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
    // console.log('ev',ev)
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }

    return pos
}

function onResize() {
    var isTrue = resizeCanvas()
    //Create the circle in the center
    if (!isTrue) return
    renderMeme(gElImg)
}

function resizeCanvas() {
    console.log('hi resizing')
    const elCanvas = document.querySelector('.canvas-container')
    if (elCanvas.style.display === 'none') return false
    gElCanvas.width = elCanvas.offsetWidth / 2
    gElCanvas.height = elCanvas.offsetHeight / 2
    return true
    // console.log(gElCanvas.width)
}