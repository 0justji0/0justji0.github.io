const gameArea = document.getElementById('gameArea');
const wordInput = document.getElementById('wordInput');
const gameOverMessage = document.getElementById('gameOverMessage');
const words = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew'];
let fallingWords = [];
let gameInterval;

function startGame() {
    gameInterval = setInterval(() => {
        createWord();
        moveWords();
    }, 1000);
}

function createWord() {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    const wordElement = document.createElement('div');
    wordElement.className = 'falling-word';
    wordElement.innerText = randomWord;

    let leftPosition;
    let attempts = 0;
    do {
        leftPosition = Math.random() * (gameArea.clientWidth - 100);
        attempts++;
    } while (isOverlapping(leftPosition) && attempts < 100);

    wordElement.style.left = leftPosition + 'px';
    gameArea.appendChild(wordElement);
    fallingWords.push(wordElement);
}

function isOverlapping(leftPosition) {
    const wordWidth = 100; // 단어의 대략적인 너비
    for (let word of fallingWords) {
        const wordLeft = parseInt(word.style.left);
        if (leftPosition < wordLeft + wordWidth && leftPosition + wordWidth > wordLeft) {
            return true;
        }
    }
    return false;
}

function moveWords() {
    fallingWords.forEach(word => {
        word.style.top = (parseInt(word.style.top) || 0) + 5 + 'px';
        if (parseInt(word.style.top) > gameArea.clientHeight) {
            gameOver();
        }
    });
}

function gameOver() {
    clearInterval(gameInterval);
    wordInput.disabled = true; // 입력창 비활성화
    gameOverMessage.style.display = 'block'; // 게임 오버 메시지 표시
}

wordInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const inputWord = wordInput.value.trim();
        const wordIndex = fallingWords.findIndex(word => word.innerText === inputWord);
        if (wordIndex !== -1) {
            gameArea.removeChild(fallingWords[wordIndex]);
            fallingWords.splice(wordIndex, 1);
        }
        wordInput.value = '';
    }
});

startGame();
