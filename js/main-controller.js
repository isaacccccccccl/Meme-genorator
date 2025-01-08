'use strict'

function onInit () {
    renderCards()
}

function renderCards() {
    const images = getImgs()
    console.log('images', images)
    let strHTML = ``
    images.forEach((image, i) => {
        strHTML += `<img src="${image.url}" onclick="onImageClick(${image.id})">`
    })
    
    const elCard = document.querySelector('.card')
    elCard.innerHTML = strHTML
}

function onImageClick(imgId) {
    console.log('Hi.........')
    console.log('Hi.........', imgId)


}