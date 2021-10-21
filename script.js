"use strict";

const btn = document.querySelector("form button");
const textarea = document.querySelector("form textarea");
const xmlCheckbox = document.getElementById("newline");
const results = document.getElementById("results");

const re = /(?<=erml:)\w*\s|[\s\w]*(?=<)/g;
const re2 = /(?<=tooltip=")[\w\s]*|[\s\w]*(?=<)/g;
let textList = [];

function getElementValues() {
  const text = textarea.value;
  const loopArray = (index1, index2, splitString) => {
    const textSplit = text.split(splitString);
    for (let i = 0; i < textSplit.length; i++) {
      if (textSplit[i].match("erml")) {
        textList.push(textSplit[i]);
      }
    }
    textarea.value = "";
    for (let i = 0; i < textList.length; i++) {
      let regex = null;
      textList[i].match("tooltip") ? (regex = re2) : (regex = re);
      // only grab elements with a property and a value
      if (textList[i].match(regex).length > 2) {
        let xmlProperty = textList[i].match(regex)[index1];
        let xmlVlaue = textList[i].match(regex)[index2];
        let xmlData = `${xmlProperty}: ${xmlVlaue}`;
        textarea.value += xmlData + "\n";
      }
    }
  };

  // xml has line breaks
  if (xmlCheckbox.checked) {
    loopArray(1, 2, "\n");
  } else {
    loopArray(0, 1, "><");
  }
}

btn.addEventListener("click", () => {
  getElementValues();
  textList = [];
});
