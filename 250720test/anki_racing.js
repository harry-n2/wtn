document.addEventListener('DOMContentLoaded', () => {
    const playerCar = document.getElementById('player-car');
    const enemyCar = document.getElementById('enemy-car');
    const question = document.getElementById('race-question');
    const answer = document.getElementById('race-answer');
    const btn = document.getElementById('answer-race-btn');
    let playerPos = 0, enemyPos = 0;

    const quizzes = [{q:'1+1', a:'2'}, {q:'日本の首都', a:'東京'}];
    let currentQ;

    function newQuestion() {
        currentQ = quizzes[Math.floor(Math.random() * quizzes.length)];
        question.textContent = currentQ.q;
        answer.value = '';
    }

    function moveEnemy() {
        enemyPos += Math.random() * 15;
        enemyCar.style.left = `${enemyPos}%`;
        if (enemyPos >= 85) alert('負けた...');
    }

    btn.addEventListener('click', () => {
        if (answer.value === currentQ.a) {
            playerPos += 20;
            playerCar.style.left = `${playerPos}%`;
            if (playerPos >= 85) {
                alert('勝利！');
                playerPos = 0; enemyPos = 0;
            }
        } else {
            alert('不正解！');
        }
        moveEnemy();
        newQuestion();
    });

    newQuestion();
});
// Append CSS
const raceCss = `
#race-track { position: relative; height: 100px; background: #bdbdbd; border-bottom: 5px dashed #fff; }
#player-car, #enemy-car { font-size: 2em; position: absolute; transition: left 0.5s; }
#player-car { top: 10px; left: 0; }
#enemy-car { top: 50px; left: 0; }
`;
// This is a simplified representation.
const existingCss = document.querySelector('link[href="game_apps.css"]');
if (existingCss) {
    const style = document.createElement('style');
    style.textContent = raceCss;
    document.head.appendChild(style);
}
