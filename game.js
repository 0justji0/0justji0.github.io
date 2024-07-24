const gameArea = document.getElementById('gameArea');
const wordInput = document.getElementById('wordInput');
const gameOverMessage = document.getElementById('gameOverMessage');
const startButton = document.getElementById('startButton');
const hangmanButton = document.getElementById('hangmanButton');
const backButton = document.getElementById('backButton');
const inputArea = document.getElementById('inputArea');
const words = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew'];
let fallingWords = [];
let gameInterval;
const wordHeight = 30; // 단어의 대략적인 높이
const wordWidth = 100; // 단어의 대략적인 너비

function startGame() {
    gameArea.style.display = 'block';
    inputArea.style.display = 'block';
    startButton.style.display = 'none';
    hangmanButton.style.display = 'none';
    backButton.style.display = 'block';
    wordInput.disabled = false;
    wordInput.focus();
    gameOverMessage.style.display = 'none';
    fallingWords = [];
    gameArea.innerHTML = '';
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
        leftPosition = Math.random() * (gameArea.clientWidth - wordWidth);
        attempts++;
    } while (isOverlapping(leftPosition, 0) && attempts < 100);

    wordElement.style.left = leftPosition + 'px';
    wordElement.style.top = '0px';
    gameArea.appendChild(wordElement);
    fallingWords.push(wordElement);
}

function isOverlapping(leftPosition, topPosition) {
    for (let word of fallingWords) {
        const wordLeft = parseInt(word.style.left);
        const wordTop = parseInt(word.style.top) || 0;
        if (leftPosition < wordLeft + wordWidth &&
            leftPosition + wordWidth > wordLeft &&
            topPosition < wordTop + wordHeight &&
            topPosition + wordHeight > wordTop) {
            return true;
        }
    }
    return false;
}

function moveWords() {
    fallingWords.forEach(word => {
        const newTop = (parseInt(word.style.top) || 0) + 10; // 속도 조절
        word.style.top = newTop + 'px';
        if (newTop + wordHeight >= gameArea.clientHeight) {
            gameOver();
        }
    });
}

function gameOver() {
    clearInterval(gameInterval);
    wordInput.disabled = true;
    gameOverMessage.style.display = 'block';
}

function resetGame() {
    clearInterval(gameInterval);
    gameArea.style.display = 'none';
    inputArea.style.display = 'none';
    hangmanArea.style.display = 'none';
    hangmanInputArea.style.display = 'none';
    startButton.style.display = 'block';
    hangmanButton.style.display = 'block';
    backButton.style.display = 'none';
    gameOverMessage.style.display = 'none';
    wordInput.value = '';
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

startButton.addEventListener('click', startGame);
backButton.addEventListener('click', resetGame);
