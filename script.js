document.getElementById('game1').addEventListener('click', () => loadGame('rock-paper-scissors'));
document.getElementById('game2').addEventListener('click', () => loadGame('quiz'));
document.getElementById('game3').addEventListener('click', () => loadGame('lucky-draw'));
document.getElementById('game4').addEventListener('click', () => loadGame('memory-game'));

let score = 0;

function updateScore(points) {
    score += points;
    document.getElementById('score').textContent = score;
}

function loadGame(game) {
    const gameContainer = document.getElementById('game-container');
    gameContainer.classList.remove('show');
    gameContainer.innerHTML = '';
    
    setTimeout(() => {
        if (game === 'rock-paper-scissors') {
            gameContainer.innerHTML = `
                <h2>Rock Paper Scissors</h2>
                <p>Rules: Choose Rock, Paper, or Scissors. You have 3 rounds to beat the computer. Each win gives you 10 points, and each loss deducts 5 points.</p>
                <div class="choices">
                    <button class="choice" id="rock">🪨 Rock</button>
                    <button class="choice" id="paper">📄 Paper</button>
                    <button class="choice" id="scissors">✂️ Scissors</button>
                </div>
                <div class="result">
                    <p id="user-choice"></p>
                    <p id="computer-choice"></p>
                    <h2 id="result-text"></h2>
                </div>
                <button class="exit" onclick="exitGame()">Exit</button>
            `;
            initRockPaperScissors();
        } else if (game === 'quiz') {
            gameContainer.innerHTML = `
                <h2>Quiz</h2>
                <p>Rules: Answer the questions. Each correct answer gives you 10 points, and each wrong answer deducts 5 points.</p>
                <div class="quiz-question"></div>
                <h2 id="quiz-result-text"></h2>
                <button class="exit" onclick="exitGame()">Exit</button>
            `;
            initQuiz();
        } else if (game === 'lucky-draw') {
            gameContainer.innerHTML = `
                <h2>Lucky Draw</h2>
                <p>Rules: Draw a number 3 times. Each draw gives you points equal to the drawn number.</p>
                <button id="draw-button">Draw a number</button>
                <h2 id="lucky-number"></h2>
                <button class="exit" onclick="exitGame()">Exit</button>
            `;
            initLuckyDraw();
        } else if (game === 'memory-game') {
            gameContainer.innerHTML = `
                <h2>Memory Game</h2>
                <p>Rules: Match the pairs. Each correct match gives you 10 points.</p>
                <div class="memory-grid"></div>
                <button class="exit" onclick="exitGame()">Exit</button>
            `;
            initMemoryGame();
        }
        gameContainer.classList.add('show');
    }, 300);
}

function exitGame() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.classList.remove('show');
    setTimeout(() => {
        gameContainer.innerHTML = '';
    }, 300);
}

function initRockPaperScissors() {
    const choices = document.querySelectorAll('.choice');
    const userChoiceDisplay = document.getElementById('user-choice');
    const computerChoiceDisplay = document.getElementById('computer-choice');
    const resultDisplay = document.getElementById('result-text');
    let rounds = 3;
    let userScore = 0;
    let computerScore = 0;

    choices.forEach(choice => {
        choice.addEventListener('click', (e) => {
            if (rounds > 0) {
                const userChoice = e.target.id;
                const computerChoice = getComputerChoice();
                const result = getResult(userChoice, computerChoice);
                
                userChoiceDisplay.textContent = `You chose: ${userChoice}`;
                computerChoiceDisplay.textContent = `Computer chose: ${computerChoice}`;
                resultDisplay.textContent = result;

                if (result === 'You win!') {
                    userScore++;
                    updateScore(10);
                } else if (result === 'You lose!') {
                    computerScore++;
                    updateScore(-5);
                }
                
                rounds--;
                if (rounds === 0) {
                    resultDisplay.textContent += ` Final Score: You - ${userScore}, Computer - ${computerScore}`;
                }
            }
        });
    });

    function getComputerChoice() {
        const choices = ['rock', 'paper', 'scissors'];
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    }

    function getResult(userChoice, computerChoice) {
        if (userChoice === computerChoice) {
            return "It's a draw!";
        } else if (
            (userChoice === 'rock' && computerChoice === 'scissors') ||
            (userChoice === 'paper' && computerChoice === 'rock') ||
            (userChoice === 'scissors' && computerChoice === 'paper')
        ) {
            return 'You win!';
        } else {
            return 'You lose!';
        }
    }
}

function initQuiz() {
    const questions = [
        { question: 'What is the capital of France?', answers: ['Paris', 'London', 'Berlin', 'Madrid'], correct: 'Paris' },
        { question: 'What is 2 + 2?', answers: ['3', '4', '5', '6'], correct: '4' },
        { question: 'What is the capital of Japan?', answers: ['Tokyo', 'Beijing', 'Seoul', 'Bangkok'], correct: 'Tokyo' },
        // Add more questions here
    ];
    let currentQuestionIndex = 0;
    let quizScore = 0;

    function loadQuestion() {
        if (currentQuestionIndex < questions.length) {
            const question = questions[currentQuestionIndex];
            const quizQuestion = document.querySelector('.quiz-question');
            quizQuestion.innerHTML = `
                <p>${question.question}</p>
                ${question.answers.map(answer => `<button class="quiz-choice" data-answer="${answer}">${answer}</button>`).join('')}
            `;

            const quizChoices = document.querySelectorAll('.quiz-choice');
            quizChoices.forEach(choice => {
                choice.addEventListener('click', (e) => {
                    const selectedAnswer = e.target.getAttribute('data-answer');
                    const isCorrect = selectedAnswer === question.correct;
                    quizScore += isCorrect ? 10 : -5;
                    updateScore(isCorrect ? 10 : -5);
                    document.getElementById('quiz-result-text').textContent = isCorrect ? 'Correct!' : 'Wrong!';
                    currentQuestionIndex++;
                    setTimeout(loadQuestion, 1000);
                });
            });
        } else {
            document.querySelector('.quiz-question').innerHTML = '<p>Quiz Completed!</p>';
        }
    }

    loadQuestion();
}

function initLuckyDraw() {
    const drawButton = document.getElementById('draw-button');
    const luckyNumberDisplay = document.getElementById('lucky-number');
    let rounds = 3;

    drawButton.addEventListener('click', () => {
        if (rounds > 0) {
            const luckyNumber = Math.floor(Math.random() * 100) + 1;
            luckyNumberDisplay.textContent = `Your lucky number is: ${luckyNumber}`;
            updateScore(luckyNumber);
            rounds--;
            if (rounds === 0) {
                luckyNumberDisplay.textContent += ' No more draws left!';
            }
        }
    });
}

function initMemoryGame() {
    const memoryGrid = document.querySelector('.memory-grid');
    const cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'];
    let flippedCards = [];
    let matchedCards = 0;

    cards.sort(() => 0.5 - Math.random());
    memoryGrid.innerHTML = cards.map(card => `<div class="memory-card" data-card="${card}">${card}</div>`).join('');

    const memoryCards = document.querySelectorAll('.memory-card');
    memoryCards.forEach(card => {
        card.addEventListener('click', () => {
            if (!card.classList.contains('flipped') && flippedCards.length < 2) {
                card.classList.add('flipped');
                flippedCards.push(card);
                if (flippedCards.length === 2) {
                    setTimeout(checkMatch, 500);
                }
            }
        });
    });

    function checkMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.card === card2.dataset.card) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedCards += 2;
            updateScore(10);
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }
        flippedCards = [];
        if (matchedCards === cards.length) {
            setTimeout(() => alert('You have matched all cards!'), 100);
        }
    }
}
