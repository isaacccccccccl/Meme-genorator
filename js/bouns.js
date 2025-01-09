'use strict'

function onRandomImage() {
    const imgs = getImgs()
    const random = getRandomInt(0, imgs.length)
    console.log('imgs[random]', imgs[random])
    console.log('imgs[random]', imgs[random].id)
    const elImg = document.querySelector(`.img-${imgs[random].id}`)
    onImageClick(elImg, imgs[random].id)
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }