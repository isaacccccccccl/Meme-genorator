'use strict'

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'img/2.jpg', keywords: ['funny', 'cat'] },
    { id: 3, url: 'img/3.jpg', keywords: ['funny', 'cat'] },
    { id: 4, url: 'img/4.jpg', keywords: ['funny', 'cat'] },
    { id: 5, url: 'img/5.jpg', keywords: ['funny', 'cat'] },
    { id: 6, url: 'img/6.jpg', keywords: ['funny', 'cat'] },
    { id: 7, url: 'img/7.jpg', keywords: ['funny', 'cat'] },
    { id: 8, url: 'img/8.jpg', keywords: ['funny', 'cat'] },
    { id: 9, url: 'img/9.jpg', keywords: ['funny', 'cat'] },
    { id: 10, url: 'img/10.jpg', keywords: ['funny', 'cat'] },
    { id: 11, url: 'img/11.jpg', keywords: ['funny', 'cat'] },
    { id: 12, url: 'img/12.jpg', keywords: ['funny', 'cat'] },
    { id: 13, url: 'img/13.jpg', keywords: ['funny', 'cat'] },
    { id: 14, url: 'img/14.jpg', keywords: ['funny', 'cat'] },
    { id: 15, url: 'img/15.jpg', keywords: ['funny', 'cat'] },
    { id: 16, url: 'img/16.jpg', keywords: ['funny', 'cat'] },
    { id: 17, url: 'img/17.jpg', keywords: ['funny', 'cat'] },
    { id: 18, url: 'img/18.jpg', keywords: ['funny', 'cat'] }
]

var gMeme = {
        selectedImgId: 1,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'first image!!',
                size: 50,
                color: '#ff0000',
                isDrag: false,
                pos: {x:0, y:0}
            }
        ]
    }

// var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getImgs() {
    return gImgs
}

function findImg(imgId) {
    return gMeme.selectedImgId === imgId

}

function createGMeme(imgId) {
    const meme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'Write here',
                size: 25,
                color: '#000000',
                isDrag: false,
                pos: {x: gElCanvas.width / 4, y:gElCanvas.height / 8}
            }
        ]
    }
    gMeme = meme

    return meme
}

function addLine() {
    const line = {
        txt: 'Write here',
        size: 20,
        color: '#000000',
        isDrag: false,
        pos: {x: gElCanvas.width / 4, y:gElCanvas.height}
    }
    gMeme.lines.push(line)
}

function getMeme() {
    return gMeme
}

function updatelineIdx(line) {
    gMeme.selectedLineIdx = line
}

function updateGmemes(elVal, val) {
    gMeme.lines[gMeme.selectedLineIdx][val] = elVal
}

function updateGmemesPos(pos) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x = pos.x
    gMeme.lines[gMeme.selectedLineIdx].pos.y = pos.y
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx,1)
}

//////////////////////////////////////////////////
//Check if the click is inside the circle 
function isBoxClicked(clickedPos) {
    const { pos, memeWidth , size} = gMeme.lines[gMeme.selectedLineIdx]
    console.log(pos.x, memeWidth, clickedPos.x, pos.y, size, clickedPos.y)
    if(pos.x < clickedPos.x && pos.y > clickedPos.y && pos.x + memeWidth > clickedPos.x && pos.y - size < clickedPos.y) {
        console.log('true')
        return true
    } else {
        console.log('flase')
        return false
    }
}

function setBoxDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

// Move the circle in a delta, diff from the pervious pos
function moveBox(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x += dx
    gMeme.lines[gMeme.selectedLineIdx].pos.y += dy
    // console.log(gMeme.lines[gMeme.selectedLineIdx].pos.x)
}

function updateFont(elFont) {
    gMeme.lines[gMeme.selectedLineIdx].fontFamily = elFont
}


