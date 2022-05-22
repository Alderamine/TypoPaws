// --> preferences functions
function animate(element, child) {
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
                console.log(child)
                document.getElementById(child).style.right = `${pos * 10}` + 'px';
            }

        }, 10);
}

// --> preferences events 
document.getElementById('skip-mistakes').addEventListener('click', () => animate('skip-mistakes', 'skip-mistakes-checker'));
document.getElementById('bold').addEventListener('click', () => animate('bold', 'bold-checker'));
document.getElementById('focus').addEventListener('click', () => animate('focus', 'focus-checker')); 
document.getElementById('points').addEventListener('click', () => animate('points', 'points-checker'));