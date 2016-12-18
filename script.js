var SQUARE_SIZE = 50;

var container = document.getElementById('container');

var selectedSquare = null;
var startMouseX = null;
var startMouseY = null;

function setupSquares() {
    for (var gen = 3; gen <= 16; gen++) {
        for (var col = -gen; col <= gen; col++) {
            makeSquare(col, -gen);
        }
        for (var row = -gen + 1; row <= gen; row++) {
            makeSquare(gen, row);
        }
        for (var col = gen - 1; col >= -gen; col--) {
            makeSquare(col, gen);
        }
        for (var row = gen - 1; row >= -gen + 1; row--) {
            makeSquare(-gen, row);
        }
    }
}

function makeSquare(col, row) {
    var square = document.createElement('div');
    square.classList.add('square');

    square.setAttribute('data-col', col);
    square.setAttribute('data-row', row);
    square.style.left = (col * SQUARE_SIZE) + 'px';
    square.style.top = (row * SQUARE_SIZE) + 'px';
    square.style.width = SQUARE_SIZE + 'px';
    square.style.height = SQUARE_SIZE + 'px';

    var colorNum = Math.ceil(Math.random() * 11);
    square.setAttribute('data-color', colorNum);
    square.classList.add('color-' + colorNum);

    container.appendChild(square);
}

function onClick(e) {
    if (e.target.classList.contains('square')) {
        var colorNum = +e.target.getAttribute('data-color');

        e.target.classList.remove('color-' + colorNum);

        if (colorNum === 11) {
            colorNum = 1;
        } else {
            colorNum += 1;
        }

        e.target.setAttribute('data-color', colorNum);
        e.target.classList.add('color-' + colorNum);
    }
}

setupSquares();
document.addEventListener('click', onClick);
