'use strict'
var gSelectedLine
var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny'] },
    { id: 2, url: 'img/2.jpg', keywords: ['funny', 'happy'] },
    { id: 3, url: 'img/3.jpg', keywords: ['funny', 'happy'] },
    { id: 4, url: 'img/4.jpg', keywords: ['cat'] },
    { id: 5, url: 'img/5.jpg', keywords: ['funny','sarcastic'] },
    { id: 6, url: 'img/6.jpg', keywords: ['funny'] },
    { id: 7, url: 'img/7.jpg', keywords: ['funny', 'happy', 'sarcastic'] },
    { id: 8, url: 'img/8.jpg', keywords: ['funny', 'sarcastic'] },
    { id: 9, url: 'img/9.jpg', keywords: ['funny'] },
    { id: 10, url: 'img/10.jpg', keywords: ['scary'] },
    { id: 11, url: 'img/11.jpg', keywords: ['funny'] },
    { id: 12, url: 'img/12.jpg', keywords: ['funny', 'happy'] },
    { id: 13, url: 'img/13.jpg', keywords: ['scary'] },
    { id: 14, url: 'img/14.jpg', keywords: ['sad', 'scary'] },
    { id: 15, url: 'img/15.jpg', keywords: ['sad', 'scary'] },
    { id: 16, url: 'img/16.jpg', keywords: ['funny'] },
    { id: 17, url: 'img/17.jpg', keywords: ['sad', 'scary'] },
    { id: 18, url: 'img/18.jpg', keywords: ['funny', 'sad', 'scary'] }
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
            pos: { x: 0, y: 0 }
        }
    ]
}

function getImgs() {
    if (gFilter) return gFilter
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
                pos: { x: gElCanvas.width / 4, y: gElCanvas.height / 8 }
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
        pos: { x: gElCanvas.width / 4, y: gElCanvas.height }
    }
    gMeme.lines.push(line)
}

function getMeme() {
    return gMeme
}

function updatelineIdx(line) {
    gMeme.selectedLineIdx = line
}

function updateGmemesWidth(elVal, val, idx) {
    gMeme.lines[idx][val] = elVal
}

function updateGmemes(elVal, val) {
    gMeme.lines[gMeme.selectedLineIdx][val] = elVal
}

function updateGmemesPos(pos) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x = pos.x
    gMeme.lines[gMeme.selectedLineIdx].pos.y = pos.y
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

//////////////////////////////////////////////////

function isBoxClicked(clickedPos) {
    const foundLine = gMeme.lines.some((meme, i) => {
        const { pos, memeWidth, size } = meme
        if (pos.x < clickedPos.x && pos.y > clickedPos.y && pos.x + memeWidth > clickedPos.x && pos.y - size < clickedPos.y) {
            gSelectedLine = i
            return true
        }
        return false
    })
    if (foundLine) {
        return [true, gSelectedLine]
    }
    return [false, null]
}

function setBoxDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

// Move the circle in a delta, diff from the pervious pos
function moveBox(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x += dx
    gMeme.lines[gMeme.selectedLineIdx].pos.y += dy
}

function updateFont(elFont) {
    gMeme.lines[gMeme.selectedLineIdx].fontFamily = elFont
}

///////////////////////////////
function filterBy(elVal) {
    return gImgs.filter(img => img.keywords.some(keyword => keyword.toLowerCase().includes(elVal.toLowerCase())))
}


