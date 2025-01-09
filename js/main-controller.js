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
    gCurrMeme = findImg(imgId)
    // console.log(gCurrMeme)
    gCurrMeme =  (!gCurrMeme) ? createGMeme(imgId) : getMeme()
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
            gCtx.fillText(gCurrMeme.lines[i].txt,  gCurrMeme.lines[i].pos.x,  gCurrMeme.lines[i].pos.y)
        } else {
            gCtx.fillText(gCurrMeme.lines[i].txt,  gCurrMeme.lines[i].pos.x,  gCurrMeme.lines[i].pos.y)
        }

    }
    createRect()
}

/// create a box for the line that i am on
function createRect() {
    gCurrMeme.lines[gCurrMeme.selectedLineIdx].memeWidth =  gCtx.measureText(gCurrMeme.lines[gCurrMeme.selectedLineIdx].txt).width
    updateGmemes(gCurrMeme.lines[gCurrMeme.selectedLineIdx].memeWidth,'memeWidth')
    // updateGmemes(gCurrMeme.lines[gCurrMeme.selectedLineIdx].pos,'pos')
    gCtx.rect(gCurrMeme.lines[gCurrMeme.selectedLineIdx].pos.x, gCurrMeme.lines[gCurrMeme.selectedLineIdx].pos.y - gCurrMeme.lines[gCurrMeme.selectedLineIdx].size, gCtx.measureText(gCurrMeme.lines[gCurrMeme.selectedLineIdx].txt).width,
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

////////////////////////////////////////////////////////////

function onDown(ev) {
    // console.log('onDown')
  
    // Get the ev pos from mouse or touch
    // console.log(gCurrMeme)
    const pos = getEvPos(ev)
    if (!isBoxClicked(pos)) return
  
    setBoxDrag(true)
    gCurrMeme.lines[gCurrMeme.selectedLineIdx].isDrag = true
    //Save the pos we start from
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
  }
  
  function onMove(ev) {

    const { isDrag } = gCurrMeme.lines[gCurrMeme.selectedLineIdx]
    if (!isDrag) return

    const pos = getEvPos(ev)
    // Calc the delta, the diff we moved
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveBox(dx, dy)
    // Save the last pos, we remember where we`ve been and move accordingly
    gStartPos = pos
    // The canvas is render again after every move
    renderMeme(gElImg)
  }
  
  function onUp() {
    console.log('onUp')
  
    setBoxDrag(false)
    document.body.style.cursor = 'grab'
  }

  function getEvPos(ev) {  
    // console.log('ev',ev)
    let pos = {
      x: ev.offsetX,
      y: ev.offsetY,
    }

    return pos
  }