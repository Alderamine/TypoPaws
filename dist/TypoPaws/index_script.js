// --> variables declaration
const text = `the be and a of to in i you it have to that for do he with on this n’t we that not but they say at what his from go or by get she my can as know if me your all who about their will so would make just up think time there see her as out one come people take year him them some want how when which now like other could our into here then than look way more these no thing well because also two use tell good first man day find give more new one us any those very her need back there should even only many really work life why right down on try let something too call woman may still through mean after never no world in feel yeah great last child oh over ask when as school state much talk out keep leave put like help big where same all own while start three high every another become most between happen family over president old yes house show again student so seem might part hear its place problem where believe country always week point hand off play turn few group such against run guy about case question work night live game number write bring without money lot most book system government next city company story today job move must bad friend during begin love each hold different american little before ever word fact right read anything nothing sure small month program maybe right under business home kind stop pay study since issue name idea room percent far away law actually large though provide lose power kid war understand head mother real best team eye long long side water young wait okay both yet after meet service area important person hey thank much someone end change however only around hour everything national four line girl around watch until father sit create information car learn least already kill minute party include stand together back follow health remember often reason speak ago set black member community once social news allow win body lead continue whether enough spend level able political almost boy university before stay add later change five probably center among face public die food else history buy result morning off parent office course send research walk door white several court home grow better open moment including consider both such little within second late street free better everyone policy table sorry care low human please hope TRUE process teacher data offer death whole experience plan easy education build expect fall himself age hard sense across show early college music appear mind class police use effect season tax heart son art possible serve break although end market even air force require foot up listen agree according anyone baby wrong love cut decide republican full behind pass interest sometimes security eat report control rate local suggest report nation sell action support wife decision receive value base pick phone thanks event drive strong reach remain explain site hit pull church model perhaps relationship six fine movie field raise less player couple million themselves record especially difference light development federal former role pretty myself view price effort nice quite along voice finally department either toward leader because photo wear space project return position special million film need major type town article road form chance drug economic situation choose practice cause happy science join teach early develop share yourself carry clear brother matter dead image star cost simply post society picture piece paper energy personal building military open doctor activity exactly american media miss evidence product realize save arm technology catch comment look term color cover describe guess choice source mom soon director international rule campaign ground election face uh check page fight itself test patient produce certain whatever half video support throw third care rest recent available step ready opportunity official oil call organization character single current likely county future dad whose less shoot industry second list general stuff figure attention forget risk no focus short fire dog red hair point condition wall daughter before deal author truth upon husband period series order officer close land note computer thought economy goal bank behavior sound deal certainly nearly increase act north well blood culture medical ok everybody top difficult close language window response population lie tree park worker draw plan drop push earth cause per private tonight race than letter other gun simple course wonder involve hell poor each answer nature administration common no hard message song enjoy similar congress attack past hot seek amount analysis store defense bill like cell away performance hospital bed board protect century summer material individual recently example represent fill state place animal fail factor natural sir agency usually significant help ability mile statement entire democrat floor serious career dollar vote sex compare south forward subject financial identify beautiful decade bit reduce sister quality quickly act press worry accept enter mention sound thus plant movement scene section treatment wish benefit interesting west candidate approach determine resource claim answer prove sort enough size somebody knowledge rather hang sport tv loss argue left note meeting skill card feeling despite degree crime that sign occur imagine vote near king box present figure seven foreign laugh disease lady beyond discuss finish design concern ball east recognize apply prepare network huge success district cup name physical growth rise hi standard force sign fan theory staff hurt legal september set outside et strategy clearly property lay final authority perfect method region since impact indicate safe committee supposed dream training shit central option eight particularly completely opinion main ten interview exist remove dark play union professor pressure purpose stage blue herself sun pain artist employee avoid account release fund environment treat specific version shot hate reality visit club justice river brain memory rock talk camera global various arrive notice bit detail challenge argument lot nobody weapon best station island absolutely instead discussion instead affect design little anyway respond control trouble conversation manage close date public army top post charge seat`

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
let isMistake = false;

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

const fonts = new Map();
fonts.set('Inconsolata', ['1.25rem', '10']);
fonts.set('Roboto Mono', ['18px', '10.8']);
fonts.set('Overpass Mono', ['18px', '11.09']);
fonts.set('JetBrains Mono', ['18px', '10.804']);

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
    checkSettings();
}

function createLines(wordsSet) {
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

    if (!localStorage.getItem('custom-text')) {
        for (let i = 0, j = Math.floor(100 / percent), string = ''; i < number; i++) {
            if (i !== 0 && i % j === 0) {
                string = typerSet[Math.floor(Math.random() * typerSet.length)] + punctuationSet[Math.floor(Math.random() * 6)] + ' ';
            }
            else string = typerSet[Math.floor(Math.random() * typerSet.length)] + ' ';
            generatedText.push(string);
        }
    }
    else {
        let localArray = localStorage.getItem('custom-text').split(/\s/g);
        if (number > localArray.length) {
            for (let i = 0, j = number; j > 0; j--, i++) {
                if (i == localArray.length - 1)
                    i = 0;
                string = localArray[i] + ' ';
                generatedText.push(string);
            }
        }
        else {
            let randomPos = 0;
            do {
                randomPos = Math.floor(localArray.length * Math.random());
            } while (randomPos > localArray.length - 1 - number)

            for (let i = randomPos, j = number; j > 0; j--, i++) {
                string = localArray[i] + ' ';
                generatedText.push(string);
            }
        }
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

    cursor.style.left = (careet * parseFloat(fonts.get(localStorage.getItem('font'))[1]) + 16) + 'px';
    cursor.style.top = (currentLine * 30 + 20) + 'px'
}

// --> main ranges functions
function wordsCount(Words = words.value, Punctuation = punctuation.value) {
    Reset();
    resetDisplay();
    displayWords(Words);
    counter(document.getElementById('words-indicator-counter'), Words);
    setWords(Words, Punctuation);
    fillLinesArr(linesIndicator);
    localStorage.removeItem('wordsValue');
    localStorage.setItem('wordsValue', words.value);
}

function punctuationCount(Words = words.value, Punctuation = punctuation.value) {
    Reset();
    resetDisplay();
    displayPunctuation(Punctuation);
    counter(document.getElementById('punctuation-indicator-counter'), Punctuation);
    setWords(Words, Punctuation);
    fillLinesArr(linesIndicator);
    localStorage.removeItem('punctuationValue');
    localStorage.setItem('punctuationValue', punctuation.value);
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

function removeFocus() {
    document.querySelector('.keyboard').style.opacity = document.querySelector('.typer_regulators').style.opacity = document.querySelector('.ad-centralizer').style.opacity = document.querySelector('.footer').style.opacity = document.querySelector('.nav').style.opacity = 1;
}

function focus() {
    document.querySelector('.keyboard').style.opacity = document.querySelector('.typer_regulators').style.opacity = document.querySelector('.ad-centralizer').style.opacity = document.querySelector('.footer').style.opacity = document.querySelector('.nav').style.opacity = 0;

    window.addEventListener('click', () => {
        removeFocus();
    })
}

function typeSymbol(symbol) {
    if (localStorage.getItem('focus') == 'on')
        focus();

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
        span.innerText = '_';

        if (lines[currentLine][careet] == symbol) {
            if (isMistake) {
                span.classList.remove('space');
                span.classList.add('mistake')
                isMistake = false;
            }
            typingDisplay.append(span);
        } else {
            ++mistakes;
            if (localStorage.getItem('skip-mistakes') == 'off') {
                isMistake = true;
                careet--;
            } else {
                span.classList.remove('space');
                span.classList.add('mistake');
                typingDisplay.append(span);
            }
        }

    } else if (lines[currentLine][careet] == symbol) {
        if (isMistake) {
            span.classList.add('mistake')
            isMistake = false;
            span.appendChild(document.createTextNode(lines[currentLine][careet]));
        } else
            span.appendChild(document.createTextNode(symbol));
        typingDisplay.append(span);
    } else {
        ++mistakes;
        if (localStorage.getItem('skip-mistakes') == 'off') {
            careet--;
            isMistake = true;
        } else {
            span.appendChild(document.createTextNode(lines[currentLine][careet]));
            span.classList.add('mistake');
            typingDisplay.append(span);
        }
    }

    ++careet;

    if (currentLine == 0 && careet == 1 && !document.querySelector('.typer-cursor')) {
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
    const wordsValue = localStorage.getItem('wordsValue') ? localStorage.getItem('wordsValue') : 60;
    document.getElementById('Words').setAttribute('value', wordsValue);

    const punctuationValue = localStorage.getItem('punctuationValue') ? localStorage.getItem('punctuationValue') : 25;
    document.getElementById('Punctuation').setAttribute('value', punctuationValue);

    checkSettings();
    wordsCount(wordsValue, punctuationValue);
    punctuationCount(wordsValue, punctuationValue);
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

function checkSettings() {
    if (!localStorage.getItem('bold')) {
        localStorage.setItem('skip-mistakes', 'on');
        localStorage.setItem('focus', 'off');
        localStorage.setItem('points', 'on');
        localStorage.setItem('bold', 'off');
        localStorage.setItem('font', 'Inconsolata')
        localStorage.setItem('custom-text', '')
    }
    if (localStorage.getItem('bold') == 'on') {
        typingField.style.fontWeight = 'bold';
        document.querySelector('#typing-display').style.fontWeight = 'bold';
    }

    if (localStorage.getItem('points') == 'off') {
        document.getElementById('pointsContainer').style.display = 'none';
    } else {
        document.getElementById('pointsContainer').style.display = 'flex';
    }

    document.getElementById('typing-display').style.fontFamily = typingField.style.fontFamily = `${localStorage.getItem('font')}, monospace`;

    document.getElementById('typing-display').style.fontSize = typingField.style.fontSize = fonts.get(localStorage.getItem('font'))[0];
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



