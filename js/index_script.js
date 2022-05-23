// --> variables declaration
const text = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis architecto nihil exercitationem porro commodi ? Deleniti in itaque doloremque quisquam officiis perferendis iure! Dolores repellat illum temporibus nam recusandae laborum maiores iure ex beatae aliquid est, voluptas cumque eaque sit rem sint quaerat ad saepe fugit ? Quos aliquam, commodi quas sit, unde cum pariatur eligendi beatae distinctio laudantium dolores voluptatibus iste quia natus culpa sint quae hic perspiciatis consequatur laboriosam minima nisi.Officia, nesciunt expedita placeat deserunt quam iste! Unde aliquid, assumenda explicabo minima earum eum ipsa nobis fuga, deleniti, debitis pariatur blanditiis odio tempore saepe maxime nostrum necessitatibus asperiores expedita! Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis architecto nihil exercitationem porro commodi ? Deleniti in itaque doloremque quisquam officiis perferendis iure! Dolores repellat illum temporibus nam recusandae laborum maiores iure ex beatae aliquid est, voluptas cumque eaque sit rem sint quaerat ad saepe fugit ? Quos aliquam, commodi quas sit, unde cum pariatur eligendi beatae distinctio laudantium dolores voluptatibus iste quia natus culpa sint quae hic perspiciatis consequatur laboriosam minima nisi.Officia, nesciunt expedita placeat deserunt quam iste! Unde aliquid, assumenda explicabo minima earum eum ipsa nobis fuga, deleniti, debitis pariatur blanditiis odio tempore saepe maxime nostrum necessitatibus asperiores expedita!'
const typerSet = text.split(/\W\s*/).filter(i => i != '').map(i => i.toLowerCase());
const punctuationSet = [',', '.', '!', '?', ':', ';']

const typingField = document.getElementById('typing-field');
let lines = [];
let generatedText = [];
let linesIndicator = 0;
let currentLine = 0;
let careet = 0;
let startingTime = 0;
let mistakes = 0;

const wordsBar = document.getElementById('words-bar');
const words = document.getElementById('Words');
const selectorWords = document.getElementById('selector-words');

const punctuationBar = document.getElementById('punctuation-bar');
const punctuation = document.getElementById('Punctuation');
const selectorPunctuation = document.getElementById('selector-punctuation');

const keys = document.getElementsByClassName('keyboard_keyrows-keys');
const wideKeys = document.getElementsByClassName('keyboard_keyrows-keys-wider');
const commandKeys = document.getElementsByClassName('keyboard_keyrows-keys-command');
const space = document.querySelector('.keyboard_keyrows-keys-space');

const modalContainer = document.getElementById('modal-container');

let width = 0;
let left = 0;


// --> event listeners for ranges
words.addEventListener('mouseover', () => {
    this.focus;
})
selectorWords.addEventListener('mouseover', () => {
    words.focus;
})
wordsBar.addEventListener('mouseover', () => {
    words.focus;
})
punctuation.addEventListener('mouseover', () => {
    this.focus;
})
punctuationBar.addEventListener('mouseover', () => {
    punctuation.focus;
})
selectorPunctuation.addEventListener('mouseover', () => {
    punctuation.focus;
})


// --> functions for ranges
function createDisplay() {
    let div = document.createElement('div');
    div.className = 'typing-display-container';
    let p = document.createElement('p');
    p.className = 'typing-display';
    p.id = 'typing-display';
    div.append(p);
    typingField.append(div);
}

function createLines(wordsSet) {
    console.log(wordsSet.length)
    if (wordsSet.length <= 0) {
        return;
    }

    const p = document.createElement('p');
    p.id = `p${linesIndicator}`;
    typingField.append(p);
    currentP = document.getElementById(`p${linesIndicator}`);

    for (let i = 0, j = 1; i < wordsSet.length; i++) {
        let word = document.createElement('span');
        word.id = `word${linesIndicator}_${i}`;
        word.appendChild(document.createTextNode(wordsSet[i]));
        document.getElementById(`p${linesIndicator}`).append(word);

        if (currentP.clientHeight > 30) {
            do {
                currentP.removeChild(document.getElementById(`word${linesIndicator}_${i - j}`));
                j++;
            } while (currentP.clientHeight > 30)
            ++linesIndicator;

            return createLines(wordsSet.slice(i));
        }
    }
}

function displayWords(value) {
    left = (value - 20) / 80 * 100;
    width = (value - 20) / 80 * 100;
    wordsBar.style.width = `calc(${width}% - 8px)`;
    selectorWords.style.left = left + '%';
}

function displayPunctuation(value) {
    left = value / 50 * 100;
    width = value / 50 * 100;
    punctuationBar.style.width = `calc(${width}% - 8px)`;
    selectorPunctuation.style.left = left + '%';
}

function counter(node, value) {
    node.innerText = value;
}

function setWords(number, percent) {
    generatedText = [];
    typingField.innerHTML = '';
    typingField.innerText = '';
    for (let i = 0, j = Math.floor(100 / percent), string = ''; i < number; i++) {
        if (i !== 0 && i % j === 0) {
            string = typerSet[Math.floor(Math.random() * typerSet.length)] + punctuationSet[Math.floor(Math.random() * 6)] + ' ';
        }
        else string = typerSet[Math.floor(Math.random() * typerSet.length)] + ' ';
        generatedText.push(string);
    }

    createLines(generatedText);
    createDisplay();
}

function resetDisplay() {
    document.getElementById('typing-display').innerHTML = '';
}

function fillLinesArr(counter) {
    for (let i = 0; i <= counter; i++) {
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
    let cursor = document.querySelector('.typer-cursor');
    if (lines[currentLine].length == careet) {
        cursor.style.left = 16 + 'px';
        cursor.style.top = ((currentLine + 1) * 30 + 20) + 'px'
        return;
    }

    cursor.style.left = (careet * 10 + 16) + 'px';
    cursor.style.top = (currentLine * 30 + 20) + 'px'
}

// --> main ranges functions
function wordsCount() {
    Reset();
    resetDisplay();
    displayWords(words.value);
    counter(document.getElementById('words-indicator-counter'), words.value);
    setWords(words.value, punctuation.value);
    fillLinesArr(linesIndicator);
}

function punctuationCount() {
    Reset();
    resetDisplay();
    displayPunctuation(punctuation.value);
    counter(document.getElementById('punctuation-indicator-counter'), punctuation.value);
    setWords(words.value, punctuation.value);
    fillLinesArr(linesIndicator);
}


// --> keyboards functions
function pressed(node) {
    node.style.background = '#FFCFAC';
    node.style.border = 'none';
}

function released(node) {
    node.style.background = '#FFF';
    node.style.border = '2px solid #FFEFE3 '
}

function typeSymbol(symbol) {
    if (lines.length == currentLine + 1 && lines[currentLine].length - 1 == careet) {
        calculateStats(startingTime.getTime(), mistakes);
        document.querySelector('.typer-cursor').style.display = 'none';
        modalContainer.style.display = 'flex';
        animateModal();
    }

    const typingDisplay = document.getElementById('typing-display');

    if (lines[currentLine].length == careet) {
        typingDisplay.appendChild(document.createElement('br'));
        ++currentLine;
        careet = 0;
    }

    const span = document.createElement('span');

    if (lines[currentLine][careet] == ' ') {
        span.classList.add('space');
        span.innerText = '5';

        if (lines[currentLine][careet] == symbol) {
            typingDisplay.append(span);
        } else {
            ++mistakes;
            span.classList.add('mistake');
            typingDisplay.append(span);
        }
    } else if (lines[currentLine][careet] == symbol) {
        span.appendChild(document.createTextNode(symbol));
        typingDisplay.append(span);
    } else {
        ++mistakes;
        span.appendChild(document.createTextNode(lines[currentLine][careet]));
        span.classList.add('mistake');
        typingDisplay.append(span);
    }

    ++careet;

    if (currentLine == 0 && careet == 1) {
        startingTime = new Date();
        let typerCursor = document.createElement('div');
        typerCursor.className = 'typer-cursor';
        typingField.append(typerCursor);
    }

    typerCursor();
}

// --> functions for stats 
function calculateStats(start, mistakes) {
    const finish = new Date();
    let sum = 0;
    lines.forEach(a => {
        sum += a.length
    });
    sum--;
    const speed = Math.round(sum * 10 / ((finish.getTime() - start) / 1000));
    document.getElementById('wpm').innerText = `${speed} WPM`;

    const accuracy = ((sum - mistakes) / sum * 100).toFixed(2);
    document.getElementById('accuracy').innerText = `${accuracy}%`;

    const points = Math.round(speed * accuracy);
    document.getElementById('points').innerText = `${points}`;
}

// --> window events
window.addEventListener('resize', () => {
    wordsCount();
})

window.addEventListener('load', () => {
    wordsCount();
    start();
})

function start() {
    function keyDown(array, event, symbol = null) {
        if (event.key == 'Shift' || event.key == "Control" || event.key == 'Alt') {
            defineSide(event);
            return;
        }
        for (let button of array) {
            let list = [...button.classList];
            for (let i = 0; i < list.length; i++) {
                if (list[i] == event.key) {
                    pressed(button);
                    if (!symbol)
                        typeSymbol(event.key);
                    break;
                }
            }
        }
    }

    function keyUp(array, event) {
        for (let button of array) {
            let list = [...button.classList];
            for (let i = 0; i < list.length; i++) {
                if (list[i] == event.key) {
                    released(button);
                    break;
                }
            }
        }
    }

    function defineSide(event) {
        if (event.location == 1) {
            if (event.key == 'Shift')
                pressed(document.getElementById('leftShift'));
            if (event.key == 'Alt')
                pressed(document.getElementById('leftAlt'));
            if (event.key == 'Control')
                pressed(document.getElementById('leftCtrl'));
            return;
        }

        if (event.key == 'Shift')
            pressed(document.getElementById('rightShift'));
        if (event.key == 'Alt')
            pressed(document.getElementById('rightAlt'));
        if (event.key == 'Control')
            pressed(document.getElementById('rightCtrl'));
    }

    window.addEventListener('keydown', event => {
        event.preventDefault();
        keyDown(keys, event);
        keyDown(wideKeys, event, `_`);
        keyDown(commandKeys, event, `_`);

        if (event.key == ' ') {
            pressed(space);
            typeSymbol(' ');
        }
    })

    window.addEventListener('keyup', event => {
        event.preventDefault();
        keyUp(keys, event);
        keyUp(wideKeys, event);
        keyUp(commandKeys, event);
        if (event.key == ' ')
            released(space);
    })
}

// --> modal window
function closeModal() {
    modalContainer.style.display = 'none';
    wordsCount();
}

function animateModal() {
    let pos = 100;
    let id = setInterval(() => {
        if (pos == -1)
            clearInterval(id);
        else {
            pos--;
            document.querySelector('.modal-window').style.transform = `translateY(${pos * 0.2}px)`;
            document.querySelector('.modal-window').style.opacity = `${1 - pos * 0.005}`
        }

    }, 1);
}


// --> close Ad 
document.getElementById('closeAd').addEventListener('click', () => {
    let pos = 0;
    let id = setInterval(() => {
        if (pos == 45)
            clearInterval(id);
        else {
            pos++;
            document.getElementById('adBox').style.transform = `translateY(-${pos * 2}px)`;
        }
    }, 20);
})



