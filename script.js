"use strict";
const removeAdsBtn = document.getElementById("noAds");
const search = document.getElementById('.gsc-search-button')
const pageNum = document.querySelector('.gsc-cursor-page')

function removeAds() {
        if(document.body.contains(document.querySelector('iframe'))) {
                document.querySelector('iframe').remove()
        } else {
                alert('Error')
        }
}

removeAdsBtn.addEventListener('click', ()=> {
        removeAds();
})

search.addEventListener('click', ()=> {
        removeAds()
})