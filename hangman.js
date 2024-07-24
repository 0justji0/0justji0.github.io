document.addEventListener('DOMContentLoaded', (event) => {
    const words = [
        {word: 'javascript', hint: 'A popular programming language.'},
        {word: 'hangman', hint: 'A classic word guessing game.'},
        {word: 'coding', hint: 'Writing instructions for computers.'},
        {word: 'developer', hint: 'A person who creates software.'},
        {word: 'computer', hint: 'An electronic device for storing and processing data.'}
    ];
    let selectedWord = '';
    let selectedHint = '';
    let guessedLetters = [];
    let mistakes = 0;
    const maxMistakes = 6;

    const hangmanArea = document.getElementById('hangmanArea');
    const hangmanInputArea = document.getElementById('hangmanInputArea');
    const hangmanInput = document.getElementById('hangmanInput');
    const backButton = document.getElementById('backButton');
    const gameOverMessage = document.getElementById('gameOverMessage');

    function startHangmanGame() {
        const randomIndex = Math.floor(Math.random() * words.length);
        selectedWord = words[randomIndex].word;
        selectedHint = words[randomIndex].hint;
        guessedLetters = [];
        mistakes = 0;
        hangmanArea.innerHTML = '';
        updateHangmanDisplay();
        hangmanInputArea.style.display = 'block';
        hangmanInput.value = '';
        hangmanInput.focus();
        gameOverMessage.style.display = 'none'; // 팝업 메시지 숨기기
    }

    function updateHangmanDisplay() {
        hangmanArea.innerHTML = '';
        let wordDisplay = '';
        for (let letter of selectedWord) {
            if (guessedLetters.includes(letter)) {
                wordDisplay += letter + ' ';
            } else {
                wordDisplay += '_ ';
            }
        }
        hangmanArea.innerHTML = `<p>${wordDisplay}</p>`;
        hangmanArea.innerHTML += `<p>Hint: ${selectedHint}</p>`;
        hangmanArea.innerHTML += `<p>Mistakes: ${mistakes}/${maxMistakes}</p>`;
        drawHangman();
    }

    function drawHangman() {
        const hangmanStages = [
            `
                _______
                |     |
                |     |
                      |
                      |
                      |
            `,
            `
                _______
                |     |
                |     |
                ●     |
                      |
                      |
            `,
            `
                _______
                |     |
                |     |
                ●     |
                |     |
                      |
            `,
            `
                _______
                |     |
                |     |
                ●     |
               -|     |
                      |
            `,
            `
                _______
                |     |
                |     |
                ●     |
               -|-    |
                      |
            `,
            `
                _______
                |     |
                |     |
                ●     |
               -|-    |
               /      |
            `,
            `
                _______
                |     |
                |     |
                ●     |
               -|-    |
               / \\    |
            `
        ];
        hangmanArea.innerHTML += `<pre>${hangmanStages[mistakes]}</pre>`;
    }

    function checkGameOver() {
        if (mistakes >= maxMistakes) {
            gameOverMessage.innerText = 'Game Over! The word was ' + selectedWord;
            gameOverMessage.style.display = 'block';
            hangmanInputArea.style.display = 'none';
        } else if (!selectedWord.split('').some(letter => !guessedLetters.includes(letter))) {
            gameOverMessage.innerText = 'You Win! The word was ' + selectedWord;
            gameOverMessage.style.display = 'block';
            hangmanInputArea.style.display = 'none';
            setTimeout(startHangmanGame, 5000);
        }
    }

    hangmanInput.addEventListener('keyup', (event) => {
        const inputLetter = event.target.value.toLowerCase();
        if (inputLetter && inputLetter.length === 1 && /^[a-z]$/.test(inputLetter)) {
            if (!guessedLetters.includes(inputLetter)) {
                guessedLetters.push(inputLetter);
                if (!selectedWord.includes(inputLetter)) {
                    mistakes++;
                }
                updateHangmanDisplay();
                checkGameOver();
            }
            hangmanInput.value = '';
        }
    });

    document.getElementById('hangmanButton').addEventListener('click', () => {
        document.getElementById('startButton').style.display = 'none';
        document.getElementById('hangmanButton').style.display = 'none';
        hangmanArea.style.display = 'block';
        backButton.style.display = 'block';
        gameOverMessage.style.display = 'none';
        startHangmanGame();
    });

    backButton.addEventListener('click', () => {
        document.getElementById('startButton').style.display = 'inline';
        document.getElementById('hangmanButton').style.display = 'inline';
        hangmanArea.style.display = 'none';
        hangmanInputArea.style.display = 'none';
        backButton.style.display = 'none';
    });
});
