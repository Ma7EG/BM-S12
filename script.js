
let audio1 = document.getElementById('backgroundSound');

function runScript() {
    document.getElementById('myButton').style.display = 'none';
    audio1.play();

    const images = [
        'assets/img1.png', 'assets/img2.png', 'assets/img3.png', 'assets/img4.png',
        'assets/img5.png', 'assets/img6.png', 'assets/img7.png', 'assets/img8.png',
        'assets/img1.png', 'assets/img2.png', 'assets/img3.png', 'assets/img4.png',
        'assets/img5.png', 'assets/img6.png', 'assets/img7.png', 'assets/img8.png'
    ];

    

    const gameBoard = document.getElementById('spongGame');
    const resetButton = document.getElementById('reset-button');
    let flipPhoto = [];
    let equalTwo = 0;
    const totalTwo = 8;
    let timeout;

  function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    
    
    }


    function createBoard() {
     
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



    function flipCard(card) {
        if (flipPhoto.length === 2 || card.classList.contains('flipped')) return;

        card.classList.add('flipped');
        flipPhoto.push(card);

        clearTimeout(timeout);

        if (flipPhoto.length === 2) {
           matchingPhoto();
        } else {
            timeout = setTimeout(() => {
                card.classList.remove('flipped');
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
        gameBoard.querySelectorAll('.card').forEach(card => card.classList.remove('flipped'));
        flipPhoto = [];
    }




    resetButton.addEventListener('click', () => {
        createBoard();
        equalTwo = 0;
        clearTimeout(timeout);
    });

    createBoard();
}





function mute() {
   
    var muteIcon = document.getElementById('muteIcon');
    var muteText = document.getElementById('muteButton').querySelector('span');

    if (audio1.muted) {
        audio1.muted = false;
        muteIcon.textContent = '🔈';
        muteText.textContent = 'كتم الصوت';
    } else {
        audio1.muted = true;
        muteIcon.textContent = '🔇';
        muteText.textContent = 'إلغاء الكتم';
    }
}
