let audio1 = document.getElementById('backgroundSound');
let images = [
    'assets/img1.png', 'assets/img2.png', 'assets/img3.png', 'assets/img4.png',
    'assets/img5.png', 'assets/img6.png', 'assets/img7.png', 'assets/img8.png',
    'assets/img1.png', 'assets/img2.png', 'assets/img3.png', 'assets/img4.png',
    'assets/img5.png', 'assets/img6.png', 'assets/img7.png', 'assets/img8.png'
];

function runScript() {
    document.getElementById('myButton').style.display = 'none';
    audio1.play();
    createBoard();
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


function createBoard() {
    const gameBoard = document.getElementById('spongGame');
    gameBoard.innerHTML = ''; 
    shuffle(images);

    images.forEach((src, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = index;

        const frontFace = document.createElement('img');
        frontFace.src = 'assets/back.png';
        frontFace.classList.add('back');

        const backFace = document.createElement('img');
        backFace.src = src;
        backFace.classList.add('front');

        card.appendChild(frontFace);
        card.appendChild(backFace);
        gameBoard.appendChild(card);

        setTimeout(() => {
            card.classList.add('flipped');
            setTimeout(() => {
                card.classList.remove('flipped');
            }, 5000);
        }, 1000);

        card.addEventListener('click', () => flipCard(card));
    });

    setTimeout(startGame, 6000);
}

let flipPhoto = [];
let equalTwo = 0;
const totalTwo = 8;
let timeout;

function flipCard(card) {
    if (flipPhoto.length === 2 || card.classList.contains('flipped')) return;

    card.classList.add('flipped');
    flipPhoto.push(card);

    clearTimeout(timeout);

    if (flipPhoto.length === 2) {
        setTimeout(matchingPhoto, 1000);
    } else {
        timeout = setTimeout(() => {
            flipPhoto.forEach(card => card.classList.remove('flipped'));
            flipPhoto = [];
        }, 5000);
    }
}

function matchingPhoto() {
    const [card1, card2] = flipPhoto;
    const index1 = card1.dataset.index;
    const index2 = card2.dataset.index;

    if (images[index1] === images[index2]) {
        setTimeout(() => {
            card1.style.visibility = 'hidden';
            card2.style.visibility = 'hidden';
            flipPhoto = [];
            equalTwo++;
            if (equalTwo === totalTwo) {
                document.getElementById('message').style.display = 'block';
            }
        }, 1000);
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flipPhoto = [];
        }, 1000);
    }
}

function startGame() {
    const gameBoard = document.getElementById('spongGame');
    gameBoard.querySelectorAll('.card').forEach(card => card.classList.remove('flipped'));
    flipPhoto = [];
}

document.getElementById('reset-button').addEventListener('click', () => {
    createBoard();
    equalTwo = 0;
    clearTimeout(timeout);
});

function mute() {
    var muteIcon = document.getElementById('muteIcon');
    var muteText = document.getElementById('muteButton').querySelector('span');

    if (audio1.muted) {
        audio1.muted = false;
        muteIcon.textContent = '🔈';
        muteText.textContent = 'Mute';
    } else {
        audio1.muted = true;
        muteIcon.textContent = '🔇';
        muteText.textContent = 'Unmute';
    }
}
