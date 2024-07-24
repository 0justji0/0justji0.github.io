document.addEventListener('DOMContentLoaded', (event) => {
    const words = ['javascript', 'hangman', 'coding', 'developer', 'computer'];
    let selectedWord = '';
    let guessedLetters = [];
    let mistakes = 0;
    const maxMistakes = 6;

    const hangmanArea = document.getElementById('hangmanArea');
    const hangmanInputArea = document.getElementById('hangmanInputArea');
    const hangmanInput = document.getElementById('hangmanInput');
    const backButton = document.getElementById('backButton');
    const gameOverMessage = document.getElementById('gameOverMessage');

    function startHangmanGame() {
        selectedWord = words[Math.floor(Math.random() * words.length)];
        guessedLetters = [];
        mistakes = 0;
        hangmanArea.innerHTML = '';
        updateHangmanDisplay();
        hangmanInputArea.style.display = 'block';
        hangmanInput.value = '';
        hangmanInput.focus();
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
               / \    |
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
