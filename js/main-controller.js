'use strict'
var gElCanvas
var gCtx
var gCurrMeme
var gElImg

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderCards()
}

function renderCards() {

    const images = getImgs()
    let strHTML = ``
    images.forEach((image, i) => {
        strHTML += `<img src="${image.url}" onclick="onImageClick(this, ${image.id})">`
    })

    const elCard = document.querySelector('.card')
    elCard.innerHTML = strHTML

}

// pick image and put it in canvas
function onImageClick(elImg, imgId) {
    // show the canvas and upload the image with the text
    memeController()
    gElImg = elImg
    gCurrMeme = getMeme(imgId)
    // console.log(gCurrMeme)
    if (!gCurrMeme) gCurrMeme = createGMeme(imgId)
    setInputs()
    renderMeme(gElImg, gCurrMeme)
}

function renderMeme(elImg) {
    // cover canvas with img
    coverCanvasWithImg(elImg)
    // create a text on the image
    for (var i = 0; i < gCurrMeme.lines.length; i++) {

        gCtx.font = `${gCurrMeme.lines[i].size}px serif`
        gCtx.fillStyle = gCurrMeme.lines[i].color
        // console.log(gCurrMeme.lines.length)
        if (i > 0) {
            gCtx.fillText(gCurrMeme.lines[i].txt, elImg.width / 4, 400)
        } else {
            gCtx.fillText(gCurrMeme.lines[i].txt, elImg.width / 4, 80)
        }

    }
    createRect()
}

/// create a box for the line that i am on
function createRect() {
    const width = (gCurrMeme.selectedLineIdx !== 0) ? 400: 80
    gCtx.rect(gElImg.width / 4, width - gCurrMeme.lines[gCurrMeme.selectedLineIdx].size, gCtx.measureText(gCurrMeme.lines[gCurrMeme.selectedLineIdx].txt).width,
                gCurrMeme.lines[gCurrMeme.selectedLineIdx].size)
            gCtx.stroke()
}

//display the image 
function memeController() {
    const elCards = document.querySelector('.cards')
    elCards.style.display = 'none'
    const elCanvas = document.querySelector('.canvas-container')
    elCanvas.style.display = 'flex'
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
    gCurrMeme = getMeme(gCurrMeme.selectedImgId)
    renderMeme(gElImg)


}

// switch between lines
function onSwitchLine() {
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


