'use strict'
var gElCanvas
var gCtx
var gCurrMeme
var gElImg
// var gIsClicked = false
// var gCurrMeme  = {
//     id,
//     currTxtpos,
//     getMeme,
//     lines
// }

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
    setInputs()
    renderMeme(gElImg, gCurrMeme)
}

function renderMeme(elImg) {
    // cover canvas with img
    coverCanvasWithImg(elImg)
    // create a text on the image
    gCtx.font = `${gCurrMeme.lines[0].size}px serif`
    gCtx.fillText(gCurrMeme.lines[0].txt, elImg.width / 4, 80)
}

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

function onUpdateText(elVal) {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
    gCurrMeme.lines[0].txt = elVal
    updateGmemesText(elVal, gCurrMeme) 
    renderMeme(gElImg)
}

function setInputs() {
    const elInputTxt = document.querySelector('.txt')
    elInputTxt.value = gCurrMeme.lines[0].txt
}