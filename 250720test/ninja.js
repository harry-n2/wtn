document.addEventListener('DOMContentLoaded', () => {
    // DOM要素
    const gameScreen = document.getElementById('game-screen');
    const resultScreen = document.getElementById('result-screen');
    const scoreDisplay = document.getElementById('score');
    const timeLeftDisplay = document.getElementById('time-left');
    const livesDisplay = document.getElementById('lives');
    const problemText = document.getElementById('problem-text');
    const problemScroll = document.getElementById('problem-scroll');
    const answerInput = document.getElementById('answer-input');
    const startBtn = document.getElementById('start-btn');
    const retryBtn = document.getElementById('retry-btn');
    const finalScoreDisplay = document.getElementById('final-score');

    // ゲーム設定
    const GAME_TIME = 30;
    const MAX_LIVES = 3;

    // ゲーム状態
    let score, timeLeft, lives, timer, currentProblem;
    let isPlaying = false;

    function initGame() {
        score = 0;
        timeLeft = GAME_TIME;
        lives = MAX_LIVES;
        isPlaying = false;
        
        scoreDisplay.textContent = score;
        timeLeftDisplay.textContent = timeLeft;
        updateLivesDisplay();
        
        answerInput.disabled = true;
        answerInput.value = '';
        problemText.textContent = '下の「開始」で修行を始めるでござる！';
        
        gameScreen.classList.remove('hidden');
        resultScreen.classList.add('hidden');
        startBtn.classList.remove('hidden');
        startBtn.disabled = false;
    }

    function startGame() {
        isPlaying = true;
        startBtn.classList.add('hidden');
        answerInput.disabled = false;
        answerInput.focus();
        
        generateProblem();
        
        timer = setInterval(() => {
            timeLeft--;
            timeLeftDisplay.textContent = timeLeft;
            if (timeLeft <= 0) {
                gameOver();
            }
        }, 1000);
    }

    function generateProblem() {
        const num1 = Math.floor(Math.random() * 9) + 1;
        const num2 = Math.floor(Math.random() * 9) + 1;
        const operator = ['+', '-', '×'][Math.floor(Math.random() * 3)];
        
        let question, answer;
        switch (operator) {
            case '+':
                question = `${num1} + ${num2}`;
                answer = num1 + num2;
                break;
            case '-':
                // 答えがマイナスにならないように調整
                if (num1 < num2) {
                    question = `${num2} - ${num1}`;
                    answer = num2 - num1;
                } else {
                    question = `${num1} - ${num2}`;
                    answer = num1 - num2;
                }
                break;
            case '×':
                question = `${num1} × ${num2}`;
                answer = num1 * num2;
                break;
        }
        
        currentProblem = { question, answer };
        problemText.textContent = question;
    }

    function checkAnswer() {
        const userAnswer = parseInt(answerInput.value, 10);
        if (userAnswer === currentProblem.answer) {
            // 正解
            score++;
            scoreDisplay.textContent = score;
            problemScroll.classList.add('correct-animation');
        } else {
            // 不正解
            lives--;
            updateLivesDisplay();
            gameScreen.classList.add('wrong-animation');
            if (lives <= 0) {
                gameOver();
                return;
            }
        }
        
        answerInput.value = '';
        generateProblem();

        // アニメーションクラスを削除
        setTimeout(() => {
            problemScroll.classList.remove('correct-animation');
            gameScreen.classList.remove('wrong-animation');
        }, 500);
    }

    function updateLivesDisplay() {
        livesDisplay.textContent = '❤️'.repeat(lives) + '♡'.repeat(MAX_LIVES - lives);
    }

    function gameOver() {
        clearInterval(timer);
        isPlaying = false;
        answerInput.disabled = true;
        
        finalScoreDisplay.textContent = score;
        gameScreen.classList.add('hidden');
        resultScreen.classList.remove('hidden');
    }

    // イベントリスナー
    startBtn.addEventListener('click', startGame);
    retryBtn.addEventListener('click', initGame);
    answerInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && isPlaying) {
            checkAnswer();
        }
    });

    // 初期化
    initGame();
});
