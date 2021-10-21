"use strict";

const btn = document.querySelector("form button");
const textarea = document.querySelector("form textarea");
const xmlCheckbox = document.getElementById("newline");
const results = document.getElementById("results");

const re = /(?<=erml:)\w*\s|[\s\w]*(?=<)/g;
let textList = [];

function showResults() {
  const text = textarea.value;
  // if xml has line breaks
  if (xmlCheckbox.checked) {
    const textSplit = text.split("\n");
    for (let i = 0; i < textSplit.length; i++) {
      if (textSplit[i].match("erml")) {
        textList.push(textSplit[i]);
      }
    }
    console.log(textList);
    textarea.value = "";
    for (let i = 0; i < textList.length; i++) {
      // only grab elements with a property and a value
      if (textList[i].match(re).length > 2) {
        let xmlProperty = textList[i].match(re)[1];
        let xmlVlaue = textList[i].match(re)[2];
        let xmlData = `${xmlProperty}: ${xmlVlaue}`;
        if (xmlProperty !== undefined || xmlVlaue !== undefined) {
          textarea.value += xmlData + "\n";
        }
      }
    }
  } else {
    const textSplit = text.split("><");
    for (let i = 0; i < textSplit.length; i++) {
      if (textSplit[i].match("erml")) {
        textList.push(textSplit[i]);
      }
    }
    textarea.value = "";
    for (let i = 0; i < textList.length; i++) {
      // only grab elements with a property and a value
      if (textList[i].match(re).length > 2) {
        let xmlProperty = textList[i].match(re)[0];
        let xmlVlaue = textList[i].match(re)[1];
        let xmlData = `${xmlProperty}: ${xmlVlaue}`;
        if (xmlData !== "undefined: undefined") {
          textarea.value += xmlData + "\n";
        }
      }
    }
  }
}

btn.addEventListener("click", () => {
  showResults();
  textList = [];
});
