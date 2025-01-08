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

var gMeme = [
    {
        selectedImgId: 1,
        selectedLineIdx: 0,
        lines: [
            {
                pos,
                isDrag: false,
                txt: 'first image!!',
                size: 50,
                color: '#ff0000',
            }
        ]
    },

    {
        selectedImgId: 2,
        selectedLineIdx: 0,
        lines: [
            {
                pos,
                isDrag: false,
                txt: 'I sometimes eat Falafel',
                size: 20,
                color: 'black'
            }
        ]
    }
]

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

//Check if the click is inside the circle 
function isBoxClicked(clickedPos) {
    const { pos } = gCircle
    // Calc the distance between two dots
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    // console.log('distance', distance)
    //If its smaller then the radius of the circle we are inside
    return distance <= gCircle.size
}


function setBoxDrag(isDrag) {
    gCircle.isDrag = isDrag
}

// Move the circle in a delta, diff from the pervious pos
function moveBox(dx, dy) {
    gCircle.pos.x += dx
    gCircle.pos.y += dy

}
function getImgs() {
    return gImgs
}

function createGMeme(imgId) {

    const meme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [
            {
                pos,
                isDrag: false,
                txt: '',
                size: 25,
                color: 'black'
            }
        ]
    }
    gMeme.splice(imgId - 1, 0, meme)

    return meme
}

function addLine(gCurrMeme) {
    const index = gMeme.findIndex(meme => gCurrMeme.selectedImgId === meme.selectedImgId)
    const line = {
        txt: 'Write here',
        size: 20,
        color: 'black'
    }
    gMeme[index].lines.push(line)
}

function findImg(imgId) {
    return gImgs.find(image => imgId === image.id)
}

function getMeme(imgId) {
    return gMeme.find(meme => imgId === meme.selectedImgId)
}

function updatelineIdx(num) {
    const index = gMeme.findIndex(meme => gCurrMeme.selectedImgId === meme.selectedImgId)
    gMeme[index].selectedLineIdx = num
}

function updateGmemes(elVal, gCurrMeme, val) {
    const index = gMeme.findIndex(meme => gCurrMeme.selectedImgId === meme.selectedImgId)
    // console.log(gMeme[index].lines[gMeme[index].selectedLineIdx])
    gMeme[index].lines[gMeme[index].selectedLineIdx][val] = elVal
}