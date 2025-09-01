document.addEventListener('DOMContentLoaded', () => {
    // ---*** ใส่รูปภาพ 6 รูปของคุณตรงนี้ (เกมต้องการ 6 คู่ = 12 ช่อง) ***---
    const images = [
        '1.jpg',
        '2.jpg',
        '3.jpg',
        '4.jpg',
        '5.jpg',
        '6.jpg'
    ];

    const gameBoard = document.querySelector('.game-board');
    const winMessage = document.getElementById('winMessage');
    const resetBtn = document.getElementById('resetBtn');

    let flippedCards = [];
    let matchedPairs = 0;

    function createBoard() {
        const cardImages = [...images, ...images]; // สร้างคู่
        cardImages.sort(() => 0.5 - Math.random()); // สลับการ์ด

        gameBoard.innerHTML = '';
        matchedPairs = 0;
        winMessage.classList.add('hidden');

        cardImages.forEach(image => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.image = image;
            
            card.innerHTML = `
                <div class="card-face card-front"></div>
                <div class="card-face card-back">
                    <img src="${image}" alt="Memory">
                </div>
            `;
            
            card.addEventListener('click', () => flipCard(card));
            gameBoard.appendChild(card);
        });
    }

    function flipCard(card) {
        if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
            card.classList.add('flipped');
            flippedCards.push(card);

            if (flippedCards.length === 2) {
                setTimeout(checkForMatch, 1000);
            }
        }
    }

    function checkForMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.image === card2.dataset.image) {
            matchedPairs++;
            card1.removeEventListener('click', () => flipCard(card1));
            card2.removeEventListener('click', () => flipCard(card2));
            if (matchedPairs === images.length) {
                winMessage.classList.remove('hidden');
            }
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }
        flippedCards = [];
    }
    
    resetBtn.addEventListener('click', createBoard);
    createBoard();
});

