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

    square.id = col + ',' + row;

    square.style.left = (col * SQUARE_SIZE) + 'px';
    square.style.top = (row * SQUARE_SIZE) + 'px';
    square.style.width = SQUARE_SIZE + 'px';
    square.style.height = SQUARE_SIZE + 'px';

    square.setAttribute('data-color', 0);
    square.classList.add('color-0');

    container.appendChild(square);
}

function onClick(e) {
    if (e.target.classList.contains('square')) {
        var square = e.target;

        var colorNum = +square.getAttribute('data-color');

        if (colorNum) {
            square.classList.remove('color-' + colorNum);

            if (colorNum === 11) {
                colorNum = 1;
            } else {
                colorNum += 1;
            }
        } else {
            colorNum = Math.ceil(Math.random() * 11);
        }

        square.setAttribute('data-color', colorNum);
        square.classList.add('color-' + colorNum);

        firebase.database().ref('squares/' + square.id).set({
            color: colorNum,
        });
    }
}

function onData(snapshot) {
    console.log(snapshot.key, snapshot.val().color);

    var square = document.getElementById(snapshot.key);

    var colorNum = +square.getAttribute('data-color');
    square.classList.remove('color-' + colorNum);

    var newColorNum = snapshot.val().color;
    square.setAttribute('data-color', newColorNum);
    square.classList.add('color-' + newColorNum);
}

firebase.initializeApp({
    apiKey: 'AIzaSyDWTJ9QAbhFAIPEtpuH8IcVbbJad-EAYUw',
    authDomain: 'homepage-9c7e9.firebaseapp.com',
    databaseURL: 'https://homepage-9c7e9.firebaseio.com',
    storageBucket: 'homepage-9c7e9.appspot.com',
    messagingSenderId: '534583644053'
});

var squaresRef = firebase.database().ref('squares');
squaresRef.on('child_added', onData);
squaresRef.on('child_changed', onData);

setupSquares();
document.addEventListener('click', onClick);
