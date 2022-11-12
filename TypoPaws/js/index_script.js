// --> variables declaration
import Language from "../languages/language.js";

const punctuationSet = [",", ".", "!", "?", ":", ";"];
const typingField = document.getElementById("typing-field");
let typerOn = true;
let lines = [];
let generatedText = [];
let linesIndicator = 0;
let currentLine = 0;
let careet = 0;
let startingTime = 0;
let mistakes = 0;
let isMistake = false;

const wordsBar = document.getElementById("words-bar");
const words = document.getElementById("Words");
const selectorWords = document.getElementById("selector-words");

const punctuationBar = document.getElementById("punctuation-bar");
const punctuation = document.getElementById("Punctuation");
const selectorPunctuation = document.getElementById("selector-punctuation");

const modalContainer = document.getElementById("modal-container");

let width = 0;
let left = 0;

const fonts = new Map();
fonts.set("Anonymous Pro", ["20px", "10.9"]);
fonts.set("Roboto Mono", ["18px", "10.8"]);
fonts.set("Fira Mono", ["18px", "10.8"]);
fonts.set("Ubuntu Mono", ["20px", "10"]);

punctuation.addEventListener("input", () => punctuationCount());
words.addEventListener("input", () => wordsCount());

// --> event listeners for ranges
words.addEventListener("mouseover", () => {
  words.focus;
});
selectorWords.addEventListener("mouseover", () => {
  words.focus;
});
wordsBar.addEventListener("mouseover", () => {
  words.focus;
});
punctuation.addEventListener("mouseover", () => {
  words.focus;
});
punctuationBar.addEventListener("mouseover", () => {
  punctuation.focus;
});
selectorPunctuation.addEventListener("mouseover", () => {
  punctuation.focus;
});

// --> functions for ranges
function createDisplay() {
  let div = document.createElement("div");
  div.className = "typing-display-container";
  let p = document.createElement("p");
  p.className = "typing-display";
  p.id = "typing-display";
  div.append(p);
  typingField.append(div);
  checkSettings();
}

function createLines(wordsSet, firstLine = true) {
  if (wordsSet.length <= 0) {
    return true;
  }

  const p = document.createElement("p");
  p.id = `p${linesIndicator}`;
  typingField.append(p);
  let currentP = document.getElementById(`p${linesIndicator}`);

  for (let j = 1, i = 0; i < wordsSet.length; i++) {
    let word = document.createElement("span");
    word.id = `word${linesIndicator}_${i}`;
    word.appendChild(document.createTextNode(wordsSet[i]));
    document.getElementById(`p${linesIndicator}`).append(word);

    if (currentP.clientHeight > 30) {
      do {
        currentP.removeChild(
          document.getElementById(`word${linesIndicator}_${i - j}`)
        );
        j++;
      } while (currentP.clientHeight > 30);
      ++linesIndicator;

      return createLines(wordsSet.slice(i + 1), false);

      // }
    }
  }
}

function displayWords(value) {
  left = ((value - 20) / 80) * 100;
  width = ((value - 20) / 80) * 100;
  wordsBar.style.width = `calc(${width}% - 8px)`;
  selectorWords.style.left = left + "%";
}

function displayPunctuation(value) {
  left = (value / 50) * 100;
  width = (value / 50) * 100;
  punctuationBar.style.width = `calc(${width}% - 8px)`;
  selectorPunctuation.style.left = left + "%";
}

function counter(node, value) {
  node.innerText = value;
}

function setWords(number, percent) {
  const typerSet = Language.getCurrentLang().typerSet;
  generatedText = [];
  typingField.innerHTML = "";
  typingField.innerText = "";

  if (!localStorage.getItem("custom-text")) {
    for (
      let i = 0, j = Math.floor(100 / percent), string = "";
      i < number;
      i++
    ) {
      if (i !== 0 && i % j === 0) {
        string =
          typerSet[Math.floor(Math.random() * typerSet.length)] +
          punctuationSet[Math.floor(Math.random() * 6)] +
          " ";
      } else
        string = typerSet[Math.floor(Math.random() * typerSet.length)] + " ";
      generatedText.push(string);
    }
  } else {
    let localArray = localStorage.getItem("custom-text").split(/\s/g);
    if (number > localArray.length) {
      for (let i = 0, j = number; j > 0; j--, i++) {
        if (i >= localArray.length) i = 0;
        let string = localArray[i] + " ";
        generatedText.push(string);
      }
    } else {
      let randomPos = 0;
      do {
        randomPos = Math.floor(localArray.length * Math.random());
      } while (randomPos > localArray.length - 1 - number);

      for (let i = randomPos, j = number; j > 0; j--, i++) {
        let string = localArray[i] + " ";
        generatedText.push(string);
      }
    }
  }

  createLines(generatedText);
  // document.getElementById(`p${linesIndicator}`).textContent +=
  //   generatedText[generatedText.length - 1];

  createDisplay();
}

function resetDisplay() {
  document.getElementById("typing-display").innerHTML = "";
}

function fillLinesArr(counter) {
  for (let i = 0; i <= counter; i++) {
    if (document.getElementById(`p${i}`))
      lines.push(document.getElementById(`p${i}`).textContent.split(""));
  }
}

function Reset() {
  careet = 0;
  linesIndicator = 0;
  lines = [];
  generatedText = [];
  currentLine = 0;
  startingTime = 0;
  mistakes = 0;
}

function typerCursor() {
  let cursor = document.querySelector(".typer-cursor");
  if (lines[currentLine].length == careet) {
    cursor.style.left = 16 + "px";
    cursor.style.top = (currentLine + 1) * 30 + 20 + "px";
    return;
  }

  cursor.style.left =
    careet * parseFloat(fonts.get(localStorage.getItem("font"))[1]) + 16 + "px";
  cursor.style.top = currentLine * 30 + 20 + "px";
}

// --> main ranges functions
function wordsCount(Words = words.value, Punctuation = punctuation.value) {
  Reset();
  resetDisplay();
  displayWords(Words);
  counter(document.getElementById("words-indicator-counter"), Words);
  setWords(Words, Punctuation);
  fillLinesArr(linesIndicator);
  localStorage.removeItem("wordsValue");
  localStorage.setItem("wordsValue", words.value);
}

function punctuationCount(
  Words = words.value,
  Punctuation = punctuation.value
) {
  Reset();
  resetDisplay();
  displayPunctuation(Punctuation);
  counter(
    document.getElementById("punctuation-indicator-counter"),
    Punctuation
  );
  setWords(Words, Punctuation);
  fillLinesArr(linesIndicator);
  localStorage.removeItem("punctuationValue");
  localStorage.setItem("punctuationValue", punctuation.value);
}

// --> keyboards functions
function pressed(node) {
  node.classList.add("pressed_key");
}

function released(node) {
  node.classList.remove("pressed_key");
}

function removeFocus() {
  for (let keyboard of document.getElementsByClassName("keyboard")) {
    keyboard.style.opacity = 1;
  }
  document.querySelector(".typer_regulators").style.opacity =
    document.querySelector(".fingers_img").style.opacity =
    document.querySelector(".footer").style.opacity =
    document.querySelector(".nav").style.opacity =
      1;
}

function focus() {
  for (let keyboard of document.getElementsByClassName("keyboard")) {
    keyboard.style.opacity = 0;
  }

  document.querySelector(".typer_regulators").style.opacity =
    document.querySelector(".fingers_img").style.opacity =
    document.querySelector(".footer").style.opacity =
    document.querySelector(".nav").style.opacity =
      0;

  window.addEventListener("click", () => {
    removeFocus();
  });
}

function typeSymbol(symbol) {
  if (localStorage.getItem("focus") == "on") focus();

  if (
    lines.length == currentLine + 1 &&
    lines[currentLine].length - 1 == careet
  ) {
    calculateStats(startingTime.getTime(), mistakes);
    drawStats();

    document.querySelector(".typer-cursor").style.display = "none";
    modalContainer.style.display = "flex";
    document.querySelector(".modal-window").scrollTo(0, 0);
    animateModal();
    return;
  }

  const typingDisplay = document.getElementById("typing-display");

  if (lines[currentLine].length == careet) {
    typingDisplay.appendChild(document.createElement("br"));
    ++currentLine;
    careet = 0;
  }

  const span = document.createElement("span");

  if (lines[currentLine][careet] == " ") {
    span.classList.add("space");
    span.innerText = "_";

    if (lines[currentLine][careet] == symbol) {
      if (isMistake) {
        span.classList.remove("space");
        span.classList.add("mistake");
        isMistake = false;
      }
      typingDisplay.append(span);
    } else {
      ++mistakes;
      if (localStorage.getItem("skip-mistakes") == "off") {
        isMistake = true;
        careet--;
      } else {
        span.classList.remove("space");
        span.classList.add("mistake");
        typingDisplay.append(span);
      }
    }
  } else if (lines[currentLine][careet] == symbol) {
    if (isMistake) {
      span.classList.add("mistake");
      isMistake = false;
      span.appendChild(document.createTextNode(lines[currentLine][careet]));
    } else span.appendChild(document.createTextNode(symbol));
    typingDisplay.append(span);
  } else {
    ++mistakes;
    if (localStorage.getItem("skip-mistakes") == "off") {
      careet--;
      isMistake = true;
    } else {
      span.appendChild(document.createTextNode(lines[currentLine][careet]));
      span.classList.add("mistake");
      typingDisplay.append(span);
    }
  }

  ++careet;

  if (
    currentLine == 0 &&
    careet == 1 &&
    !document.querySelector(".typer-cursor")
  ) {
    startingTime = new Date();
    let typerCursor = document.createElement("div");
    typerCursor.className = "typer-cursor";
    typingField.append(typerCursor);
  }

  typerCursor();
}

// --> functions for stats
function calculateStats(start, mistakes) {
  const stats = localStorage.getItem("stats")
    ? JSON.parse(localStorage.getItem("stats"))
    : [0];

  const statsSpeed = stats.map((i) => i.speed);
  const statsAccuracy = stats.map((i) => i.accuracy);
  const statsPoints = stats.map((i) => i.points);

  const finish = new Date();
  let sum = 0;
  lines.forEach((a) => {
    sum += a.length;
  });
  sum--;

  const speed = Math.round((sum * 10) / ((finish.getTime() - start) / 1000));
  document.getElementById("wpm").innerText = `${speed} WPM`;
  calculateImprovements(speed, statsSpeed, "wpm_improvement");

  const accuracy = (((sum - mistakes) / sum) * 100).toFixed(2);
  document.getElementById("accuracy").innerText = `${accuracy}%`;
  calculateImprovements(accuracy, statsAccuracy, "accuracy_improvement");

  const points = Math.round(speed * accuracy);
  document.getElementById("display_points").innerText = `${points}`;
  calculateImprovements(points, statsPoints, "display_points_improvement");

  saveStats(speed, accuracy, points);
}

function calculateImprovements(currentValue, stats, elId) {
  let improvement = Math.ceil(
    currentValue - stats.reduce((a, b) => a + b) / stats.length
  );
  if (!improvement) improvement = 0;

  const el = document.getElementById(elId);
  el.classList.remove("positive", "negative");

  if (improvement > 0) {
    el.innerText = `+${improvement}`;
    el.classList.add("positive");
  } else {
    el.innerText = improvement;
    el.classList.add("negative");
  }
}

function saveStats(speed, accuracy, points) {
  const stats = JSON.parse(localStorage.getItem("stats"));

  const result = {
    speed: speed,
    accuracy: accuracy,
    points: points,
  };

  if (!stats) {
    localStorage.setItem("stats", JSON.stringify([result]));
    return;
  }

  if (stats.length >= 50) {
    stats.shift();
  }
  stats.push(result);
  localStorage.setItem("stats", JSON.stringify(stats));
}

function drawStats() {
  const stats = JSON.parse(localStorage.getItem("stats"));
  const speedData = [],
    accuracyData = [],
    pointsData = [];

  stats.forEach((i) => {
    speedData.push(i.speed);
    accuracyData.push(i.accuracy);
    pointsData.push(i.points);
  });
  displayChart(speedData, "speed_canvas");
  displayChart(accuracyData, "accuracy_canvas");
  displayChart(pointsData, "points_canvas");
}

function displayChart(data, canvasId) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");
  const min = Math.min(...data);
  const max = Math.max(...data);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let xStep = Math.round((canvas.width - 50) / data.length);
  let yStep = Math.round((canvas.height - 50) / (max - min));

  if (!yStep && max > 0) yStep = (canvas.height - 50) / (max - 1);

  ctx.lineWidth = 2;
  ctx.strokeStyle = "#ffad73";

  ctx.beginPath();
  ctx.moveTo(25, canvas.height - 25);
  ctx.setLineDash([0, 0]);

  for (let i = 0; i < data.length; i++) {
    ctx.lineTo(
      xStep * (i + 1) + 25,
      canvas.height - 25 - yStep * (data[i] - min)
    );
    ctx.stroke();
  }
  ctx.closePath();

  ctx.beginPath();

  ctx.font = "8px Arial";
  ctx.fillStyle = "#c4c4c4";
  ctx.setLineDash([5, 5]);
  ctx.strokeStyle = "#c4c4c4";

  ctx.moveTo(25, 25);
  ctx.lineTo(canvas.width, 25);
  ctx.fillText(max, 2, 25);

  ctx.moveTo(25, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.fillText(Math.round((max + min) / 2), 2, canvas.height / 2);

  ctx.moveTo(25, canvas.height - 25);
  ctx.lineTo(canvas.width, canvas.height - 25);
  ctx.fillText(0, 2, canvas.height - 25);

  ctx.lineWidth = 0.3;

  ctx.moveTo(25, 25);
  ctx.lineTo(25, canvas.height - 25);

  ctx.stroke();
  ctx.closePath();
}

// --> window events
window.addEventListener("resize", () => {
  wordsCount();
});

window.addEventListener("load", () => {
  Language.changeLang(localStorage.getItem("lang"));
  if (localStorage.getItem("file_name")) {
    filePar.innerHTML = localStorage.getItem("file_name");
    fileDel.style.display = "block";
  }
  const wordsValue = localStorage.getItem("wordsValue")
    ? localStorage.getItem("wordsValue")
    : 60;
  document.getElementById("Words").setAttribute("value", wordsValue);

  const punctuationValue = localStorage.getItem("punctuationValue")
    ? localStorage.getItem("punctuationValue")
    : 25;
  document
    .getElementById("Punctuation")
    .setAttribute("value", punctuationValue);

  checkSettings();
  wordsCount(wordsValue, punctuationValue);
  punctuationCount(wordsValue, punctuationValue);
  start();
});

function start() {
  function keyDown(array, event, symbol = null) {
    if (event.key == "Shift" || event.key == "Control" || event.key == "Alt") {
      defineSide(event);
      return;
    }
    for (let button of array) {
      for (let span of button.children) {
        if (
          span.innerText == event.key ||
          span.innerText.toLowerCase() == event.key
        ) {
          pressed(button);
          if (!symbol) typeSymbol(event.key);
          return;
        }
      }
    }
  }

  function keyUp(array) {
    for (let button of array) {
      if (button.classList.contains("pressed_key")) {
        button.classList.remove("pressed_key");
      }
    }
  }

  function defineSide(event) {
    if (event.location == 1) {
      if (event.key == "Shift") pressed(document.getElementById("leftShift"));
      if (event.key == "Alt") pressed(document.getElementById("leftAlt"));
      if (event.key == "Control") pressed(document.getElementById("leftCtrl"));
      return;
    }

    if (event.key == "Shift") pressed(document.getElementById("rightShift"));
    if (event.key == "Alt") pressed(document.getElementById("rightAlt"));
    if (event.key == "Control") pressed(document.getElementById("rightCtrl"));
  }

  window.addEventListener("keydown", (event) => {
    const parentEl = document.getElementById(
      Language.getCurrentLang().keyboardId
    );
    const keys = parentEl.getElementsByClassName("keyboard_keyrows-keys");
    const wideKeys = parentEl.getElementsByClassName(
      "keyboard_keyrows-keys-wider"
    );
    const commandKeys = parentEl.getElementsByClassName(
      "keyboard_keyrows-keys-command"
    );
    const space = parentEl.querySelector(".keyboard_keyrows-keys-space");

    if (typerOn && modalContainer.style.display !== "flex") {
      event.preventDefault();
      keyDown(keys, event);
      keyDown(wideKeys, event, `_`);
      keyDown(commandKeys, event, `_`);

      if (event.key == " ") {
        pressed(space);
        typeSymbol(" ");
      }
    }
  });

  window.addEventListener("keyup", (event) => {
    const parentEl = document.getElementById(
      Language.getCurrentLang().keyboardId
    );
    const keys = parentEl.getElementsByClassName("keyboard_keyrows-keys");
    const wideKeys = parentEl.getElementsByClassName(
      "keyboard_keyrows-keys-wider"
    );
    const commandKeys = parentEl.getElementsByClassName(
      "keyboard_keyrows-keys-command"
    );
    const space = parentEl.querySelector(".keyboard_keyrows-keys-space");

    if (typerOn) {
      event.preventDefault();
      keyUp(keys, event);
      keyUp(wideKeys, event);
      keyUp(commandKeys, event);
      if (event.key == " ") {
        released(space);
      }
    }
  });
}

export function checkSettings() {
  if (!localStorage.getItem("bold")) {
    localStorage.setItem("skip-mistakes", "on");
    localStorage.setItem("focus", "off");
    localStorage.setItem("points", "on");
    localStorage.setItem("bold", "off");
    localStorage.setItem("font", "Roboto Mono");
    localStorage.setItem("custom-text", "");
  }

  if (localStorage.getItem("bold") == "on") {
    typingField.style.fontWeight = "bold";
    document.querySelector("#typing-display").style.fontWeight = "bold";
  } else {
    typingField.style.fontWeight = "";
  }

  if (localStorage.getItem("points") == "off") {
    document.getElementById("pointsContainer").style.display = "none";
    document.getElementById("points_stat").style.display = "none";
  } else {
    document.getElementById("pointsContainer").style.display = "flex";
    document.getElementById("points_stat").style.display = "";
  }

  document.getElementById("typing-display").style.fontFamily =
    typingField.style.fontFamily = `${localStorage.getItem("font")}, monospace`;

  document.getElementById("typing-display").style.fontSize =
    typingField.style.fontSize = fonts.get(localStorage.getItem("font"))[0];
}

// --> modal window
function closeModal() {
  modalContainer.style.display = "none";
  wordsCount();
}

document
  .getElementById("modal-window-restart")
  .addEventListener("click", closeModal);
document
  .getElementById("modal-window-close")
  .addEventListener("click", closeModal);

function animateModal() {
  let pos = 100;
  let id = setInterval(() => {
    if (pos == -1) clearInterval(id);
    else {
      pos--;
      document.querySelector(".modal-window").style.transform = `translateY(${
        pos * 0.2
      }px)`;
      document.querySelector(".modal-window").style.opacity = `${
        1 - pos * 0.005
      }`;
    }
  }, 1);
}

// switch between tabs
for (let link of document.getElementsByClassName("window_link")) {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    for (let tab of document.getElementsByClassName("tab")) {
      tab.style.display = "none";
    }
    document.getElementById(link.id.split("__link").join("")).style.display =
      "";
    typerOn = false;

    if (link.id === "typer_window__link") {
      wordsCount();
      typerOn = true;
    }
  });
}

const fileButton = document.getElementById("file_button");
const fileInput = document.getElementById("file_input");
const filePar = document.getElementById("file_name");
const fileDel = document.getElementById("delete");
const textArea = document.getElementById("custom-text");

fileButton.addEventListener("click", (e) => {
  e.preventDefault();
  fileInput.click();
});

fileInput.addEventListener("change", (e) => {
  filePar.innerText = fileInput.files[0].name;
  localStorage.setItem("file_name", fileInput.files[0].name);
  const reader = new FileReader();

  reader.onload = (function (reader) {
    return function () {
      var contents = reader.result;
      console.log(contents);
      textArea.value = contents;
      localStorage.setItem("custom-text", textArea.value);
    };
  })(reader);

  reader.readAsText(fileInput.files[0]);
  fileDel.style.display = "block";
});

fileDel.addEventListener("click", () => {
  fileInput.value = "";
  filePar.innerText = "";
  fileDel.style.display = "";
  textArea.value = "";
  localStorage.setItem("custom-text", "");
  localStorage.removeItem("file_name");
});

