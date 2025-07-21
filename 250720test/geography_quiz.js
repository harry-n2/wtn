document.addEventListener('DOMContentLoaded', () => {
    const locationText = document.getElementById('current-location');
    const questionText = document.getElementById('question-text');
    const optionsDiv = document.getElementById('options');

    const quizzes = [
        { q: 'エジプトの首都は？', a: 'カイロ', c: ['東京', 'パリ'], next: 'エジプト' },
        { q: 'フランスの首都は？', a: 'パリ', c: ['ロンドン', 'ローマ'], next: 'フランス' },
        { q: 'ブラジルの公用語は？', a: 'ポルトガル語', c: ['スペイン語', '英語'], next: 'ブラジル' },
    ];
    let currentQ;

    function newQuestion() {
        currentQ = quizzes[Math.floor(Math.random() * quizzes.length)];
        questionText.textContent = currentQ.q;
        
        const options = [currentQ.a, ...currentQ.c].sort(() => Math.random() - 0.5);
        optionsDiv.innerHTML = '';
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'gr-button';
            btn.textContent = opt;
            btn.onclick = () => checkAnswer(opt);
            optionsDiv.appendChild(btn);
        });
    }

    function checkAnswer(answer) {
        if (answer === currentQ.a) {
            alert('正解！次の国へ！');
            locationText.textContent = currentQ.next;
            newQuestion();
        } else {
            alert('不正解！もう一度挑戦！');
        }
    }
    newQuestion();
});
