"use strict";

const btn = document.querySelector("form button");
const textarea = document.querySelector("form textarea");
const xmlCheckbox = document.getElementById("newline");
const results = document.getElementById("results");

const re = /(?<=erml:)\w*\s|[-\/\\%^$*+?.()@,|[\]{}\-\s\w]*(?=<)/g;
const re2 = /(?<=tooltip=")[().,\w\s]*|[-\/\\%^$*+?.()@,|[\]{}\-\d\s\w]*(?=<)/g;
let textList = [];

function getElementValues() {
  // split chunk
  const text = textarea.value;
  const loopArray = (index1, index2, splitString) => {
    const textSplit = text.split(splitString);
    for (let i = 0; i < textSplit.length; i++) {
      if (textSplit[i].match("erml")) {
        textList.push(textSplit[i]);
        //console.log(textSplit[i]); // <erml:State tooltip="State Recorded">MN</erml:State>
      }
    }
    textarea.value = "";

    for (let i = 0; i < textList.length; i++) {
      let regex = textList[i].match("tooltip") ? re2 : re;

      // only grab elements with a property and a value
      console.log([...textList[i].match(regex)]);
      let lineArray = [...textList[i].match(regex)]; // *** BUG ***
      lineArray = lineArray.filter((n) => n);

      if (Object.keys(lineArray).length === 2) {
        let xmlProperty = lineArray.filter((n) => n)[index1];
        let xmlVlaue = lineArray.filter((n) => n)[index2];
        let xmlData = `${xmlProperty}: ${xmlVlaue}`;
        textarea.value += xmlData + "\n";
      }
    }
  };

  // xml has line breaks
  if (xmlCheckbox.checked) {
    loopArray(0, 1, "\n");
  } else {
    textarea.value = formatXml(textarea.value);
    loopArray(0, 1, "\n");
  }
}

function formatXml(xml) {
  var formatted = "";
  xml.split(/>\s*</).forEach(function (node) {
    formatted += "<" + node + ">\r\n";
  });
  return formatted.substring(1, formatted.length - 3);
}

btn.addEventListener("click", () => {
  getElementValues();
  textList = [];
});
