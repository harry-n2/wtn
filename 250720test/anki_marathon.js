document.addEventListener('DOMContentLoaded', () => {
    const timerText = document.getElementById('timer');
    const questionText = document.getElementById('question');
    const answerInput = document.getElementById('answer');
    const startBtn = document.getElementById('start-btn');
    const scoreDisplay = document.getElementById('score-display');

    const quiz = [{q:'日本の首都',a:'東京'},{q:'1+1',a:'2'},{q:'犬の鳴き声',a:'わん'}];
    let score, timer, timeLeft, currentQ;

    function startGame() {
        score = 0;
        timeLeft = 60;
        scoreDisplay.textContent = score;
        timerText.textContent = `Time: ${timeLeft}`;
        startBtn.style.display = 'none';
        answerInput.style.display = 'block';
        answerInput.focus();

        newQuestion();
        timer = setInterval(() => {
            timeLeft--;
            timerText.textContent = `Time: ${timeLeft}`;
            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
    }

    function newQuestion() {
        currentQ = quiz[Math.floor(Math.random() * quiz.length)];
        questionText.textContent = currentQ.q;
        answerInput.value = '';
    }

    function endGame() {
        clearInterval(timer);
        alert(`終了！スコアは ${score} でした！`);
        questionText.textContent = '';
        answerInput.style.display = 'none';
        startBtn.style.display = 'block';
    }

    answerInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            if (answerInput.value === currentQ.a) {
                score++;
                scoreDisplay.textContent = score;
            }
            newQuestion();
        }
    });

    startBtn.addEventListener('click', startGame);
});
// Append CSS
const marathonCss = `
#marathon-track { text-align: center; }
#answer { display: none; }
`;
// This is a simplified representation.
const existingCss = document.querySelector('link[href="sogo_apps.css"]');
if (existingCss) {
    const style = document.createElement('style');
    style.textContent = marathonCss;
    document.head.appendChild(style);
}
