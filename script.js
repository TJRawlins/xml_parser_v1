"use strict";
const removeAdsBtn = document.getElementById("noAds");

function removeAds() {
        if(document.body.contains(document.querySelector('iframe'))) {
                document.querySelector('iframe').remove()
                console.log('ads removed');
                
        } else {
                // alert('Initiate a search first')
        }
}

removeAdsBtn.addEventListener('click', ()=> {
        removeAds();
})
     
document.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
                removeAds();
        }
});

document.onclick= function(event) {
        if (event===undefined) event= window.event;
        let target= 'target' in event? event.target : event.srcElement;
        removeAds()
};

window.onload = removeAds;
    
window.onload = function() {
        let reloading = sessionStorage.getItem("reloading");
        if (reloading) {
            sessionStorage.removeItem("reloading");
            setTimeout(removeAds(),2000)
            console.log('ads removed');
            
        }
    }
    
    function reloadP() {
        sessionStorage.setItem("reloading", "true");
        document.location.reload();
    }
