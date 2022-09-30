// --> preferences functions
function animate(element, child) {
    document.getElementById(child).style.transition = 'right 0.2s, opacity 0.5s';
    let id;
    let pos = 0;
    if (document.getElementById(element).checked) {
        id = setInterval(() => {
            if (pos == 5)
                clearInterval(id);
            else {
                pos++;
                document.getElementById(child).style.right = `${50 - pos * 10}` + 'px';
            }

        }, 10);
    } else
        id = setInterval(() => {
            if (pos == 5)
                clearInterval(id);
            else {
                pos++;
                document.getElementById(child).style.right = `${pos * 10}` + 'px';
            }

        }, 10);
}

function changeSetting(name, checked) {
    if (checked) {
        localStorage.removeItem(name);
        localStorage.setItem(name, 'on');
        return;
    }

    localStorage.removeItem(name);
    localStorage.setItem(name, 'off')
}

function addText() {
    localStorage.removeItem('custom-text');
    localStorage.setItem('custom-text', document.getElementById('custom-text').value);
}


// --> preferences events 
document.getElementById('skip-mistakes').addEventListener('click', () => {
    animate('skip-mistakes', 'skip-mistakes-checker');
    changeSetting('skip-mistakes', document.getElementById('skip-mistakes').checked);
});
document.getElementById('bold').addEventListener('click', () => {
    animate('bold', 'bold-checker');
    changeSetting('bold', document.getElementById('bold').checked);
});
document.getElementById('focus').addEventListener('click', () => {
    animate('focus', 'focus-checker');
    changeSetting('focus', document.getElementById('focus').checked);
});
document.getElementById('points').addEventListener('click', () => {
    animate('points', 'points-checker');
    changeSetting('points', document.getElementById('points').checked);
});

document.getElementById('font').addEventListener('change', e => {
    localStorage.removeItem('font');
    localStorage.setItem('font', e.target.value);
})

// --> window events
window.addEventListener('load', () => {
    ['skip-mistakes', 'bold', 'focus', 'points'].forEach(a => {
        if (localStorage.getItem(a) == 'on') {
            document.getElementById(`${a}-checker`).style.transition = 'none';
            document.getElementById(a).checked = true;
            document.getElementById(`${a}-checker`).style.right = '0px';
        }
    });

    let select = document.getElementById('font');
    for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].hasAttribute('selected')) {
            select.options[i].removeAttribute('selected');
        }
        if (select.options[i].value == localStorage.getItem('font')) {
            select.options[i].setAttribute('selected', 'selected');
        }
    }

    document.getElementById('custom-text').value = localStorage.getItem('custom-text');
});