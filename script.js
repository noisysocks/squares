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
    square.className = 'square';

    square.id = col + ',' + row;

    square.style.left = (col * SQUARE_SIZE) + 'px';
    square.style.top = (row * SQUARE_SIZE) + 'px';
    square.style.width = SQUARE_SIZE + 'px';
    square.style.height = SQUARE_SIZE + 'px';

    container.appendChild(square);
}

function onClick(e) {
    var square = e.target;

    if (square.classList.contains('square')) {
        var colorNum;

        if (square.hasAttribute('data-color')) {
            colorNum = +square.getAttribute('data-color');
            colorNum = (colorNum + 1) % 12;
            square.setAttribute('data-color', colorNum);
        } else {
            colorNum = Math.ceil(Math.random() * 11);
        }

        firebase.database().ref('squares/' + square.id).set({
            color: colorNum
        });
    }
}

function onData(snapshot) {
    var square = document.getElementById(snapshot.key);

    var colorNum = snapshot.val().color;
    square.setAttribute('data-color', colorNum);
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
