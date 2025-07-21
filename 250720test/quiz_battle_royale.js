document.addEventListener('DOMContentLoaded', () => {
    const survivorCount = document.getElementById('survivor-count');
    const questionText = document.getElementById('br-question');
    const optionsDiv = document.getElementById('br-options');
    let survivors = 100;

    const quizzes = [
        { q: '一番大きい惑星は？', a: '木星', c: ['地球', '火星', '金星'] },
        { q: '1分は何秒？', a: '60秒', c: ['30秒', '100秒', '120秒'] },
    ];

    function newQuestion() {
        if (survivors <= 1) {
            questionText.textContent = '最後の1人になった！おめでとう！';
            optionsDiv.innerHTML = '';
            return;
        }
        const currentQ = quizzes[Math.floor(Math.random() * quizzes.length)];
        questionText.textContent = currentQ.q;
        const options = [currentQ.a, ...currentQ.c].sort(() => Math.random() - 0.5);
        optionsDiv.innerHTML = '';
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'gr-button';
            btn.textContent = opt;
            btn.onclick = () => checkAnswer(opt === currentQ.a);
            optionsDiv.appendChild(btn);
        });
    }

    function checkAnswer(isCorrect) {
        if (isCorrect) {
            const eliminated = Math.floor(survivors * 0.3); // 30%脱落
            survivors -= eliminated;
            alert(`正解！ ${eliminated}人が脱落した！`);
        } else {
            alert('不正解！君は脱落だ...');
            survivors = 100;
        }
        survivorCount.textContent = survivors;
        newQuestion();
    }
    newQuestion();
});
// Append CSS
const brCss = `
#battle-royale { text-align: center; }
#br-options { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 15px; }
`;
// This is a simplified representation.
const existingCss = document.querySelector('link[href="game_apps.css"]');
if (existingCss) {
    const style = document.createElement('style');
    style.textContent = brCss;
    document.head.appendChild(style);
}
