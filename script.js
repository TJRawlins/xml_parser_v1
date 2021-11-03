"use strict";

const parseBtn = document.querySelector("#parse");
const clearBtn = document.querySelector("#clear");
const copyBtn = document.querySelector("#copy");
const textarea = document.querySelector("form textarea");
const xmlCheckbox = document.getElementById("newline");
const msg = document.querySelector(".message");
const easternTime = document.getElementById("eastern");
const centralTime = document.getElementById("central");
const mountainTime = document.getElementById("mountain");
const pacificTime = document.getElementById("pacific");
const alaskaTime = document.getElementById("alaska");
const hawaiiTime = document.getElementById("hawaii");

const re = /(?<=erml:)\w*|[-\/\\%^$*+?.:;&=()@,|[\]{}\-\s\w]*(?=<)/g;
const re2 = /(?<=tooltip=")[().,\w\s]*|[-\/\\%^$*+?.()@,|[\]{}\-\d\s\w]*(?=<)/g;
const re3 = /(?<=erml:)\w*|(?<=Name=")[-\/\\%^$*+?.()@,|[\]{}\-\d\s\w]*/g;
let textList = [];

function getElementValues() {
  // split chunk
  const text = textarea.value;
  const loopArray = (index1, index2, splitString) => {
    const textSplit = text.split(splitString);
    for (let i = 0; i < textSplit.length; i++) {
      if (textSplit[i].match("erml")) {
        textList.push(textSplit[i].replace(/(?<!.)\s*/, ""));
        console.log(textSplit[i].replace(/(?<!.)\s*/, "")); // <erml:State tooltip="State Recorded">MN</erml:State>
      }
    }
    textarea.value = "";

    for (let i = 0; i < textList.length; i++) {
      let regex = textList[i].match("tooltip") ? re2 : re;
      if (textList[i].match("Attachment")) {
        regex = re3;
      }

      // only grab elements with a property and a value
      // console.log([...textList[i].match(regex)]);
      let lineArray = [...textList[i].match(regex)];
      lineArray = lineArray.filter((n) => n);
      // console.log(lineArray);

      if (Object.keys(lineArray).length >= 2) {
        let xmlProperty = lineArray.filter((n) => n)[index1];
        let xmlVlaue = lineArray.filter((n) => n)[index2];
        let xmlData = `${xmlProperty}: ${xmlVlaue}`;
        textarea.value += xmlData + "\n";
      }
    }
  };

  // xml has line breaks
  loopArray(0, 1, "\n");
}

function displayMessage(btnClicked) {
  msg.innerText = btnClicked;
  msg.style.opacity = "0.2";
  setTimeout(() => {
    msg.style.opacity = "0";
  }, 1000);
}

// SHOW TIMEZONES
function showTimeZones(timeZoneElement, country, city) {
  let date = new Date(new Date()).toLocaleString("en-US", {
    timeZone: `${country}/${city}`,
    hour12: true,
  });
  timeZoneElement.innerText = `${date.match(/\s\d*:\d*/)} ${date.match(
    /\s\wM/
  )}`;
  setTimeout(showTimeZones, null, timeZoneElement, country, city, null, 6000);
}

showTimeZones(easternTime, "America", "New_York");
showTimeZones(centralTime, "America", "Chicago");
showTimeZones(mountainTime, "America", "Phoenix");
showTimeZones(pacificTime, "America", "Los_Angeles");
showTimeZones(alaskaTime, "America", "Anchorage");
showTimeZones(hawaiiTime, "Pacific", "Honolulu");

// Event Listeners
parseBtn.addEventListener("click", () => {
  displayMessage("PARSED");
  getElementValues();
  textList = [];
});

clearBtn.addEventListener("click", () => {
  displayMessage("CLEARED");
  textarea.value = "";
});

copyBtn.addEventListener("click", () => {
  displayMessage("COPIED");
  textarea.select();
  navigator.clipboard.writeText(textarea.value);
});
