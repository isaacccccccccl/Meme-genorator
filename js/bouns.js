'use strict'

const SORAGE_KEY = 'memesDB'
var gSave = []
var gFilter

function onRandomImage() {
    onInit()
    renderCards()
    const imgs = getImgs()
    const random = getRandomInt(0, imgs.length)
    const elImg = document.querySelector(`.img-${imgs[random].id}`)
    onImageClick(elImg, imgs[random].id)
}

function onSave() {
    const dataUrl = gElCanvas.toDataURL()
    // elLink.href = dataUrl
    onSaveImg(gCurrMeme, dataUrl)
}

function onSaveImg(gCurrMeme, data) {
    gSave = loadFromStorage(SORAGE_KEY)
    if (!gSave) gSave = []
    gSave.push({ gCurrMeme, data })
    saveToStorage(SORAGE_KEY, gSave)
}

function onRenderSaved() {
    // cover canvas with img
    const images = loadFromStorage(SORAGE_KEY)

    if (!images || images.length === 0) {
        console.log('No saved images found.')
        return
    }

    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')


    // Create HTML for each saved image
    let strHTML = ''
    images.forEach((image) => {
        strHTML += `
                <img src="${image.data}" onclick="onImageClick(this, ${image.gCurrMeme.selectedImgId})" class="img-${image.gCurrMeme.selectedImgId}">
                ` 
            }
            )

    // Render the images in a container element
    const elCard = document.querySelector('.card')
    elCard.innerHTML = strHTML

}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function onFilter(elFilter) {
    gFilter = filterBy(elFilter)
    renderCards()
}