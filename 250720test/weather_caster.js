document.addEventListener('DOMContentLoaded', () => {
    const questionText = document.getElementById('question-text');
    const symbolsDiv = document.getElementById('symbols');

    const questions = [
        { text: '高気圧に覆われている', symbol: '☀️', answer: '☀️' },
        { text: '前線が通過中', symbol: '🌧️', answer: '🌧️' },
        { text: '冬型の気圧配置', symbol: '❄️', answer: '❄️' },
    ];
    const symbols = ['☀️', '🌧️', '☁️', '❄️'];
    let currentQ;

    function newQuestion() {
        currentQ = questions[Math.floor(Math.random() * questions.length)];
        questionText.textContent = `情報: ${currentQ.text}`;
        
        symbolsDiv.innerHTML = '';
        symbols.forEach(s => {
            const btn = document.createElement('button');
            btn.className = 'gr-button symbol-btn';
            btn.textContent = s;
            btn.onclick = () => checkAnswer(s);
            symbolsDiv.appendChild(btn);
        });
    }

    function checkAnswer(symbol) {
        if (symbol === currentQ.answer) {
            alert('予報成功！素晴らしいキャスターです！');
            newQuestion();
        } else {
            alert('予報失敗...。もう一度天気図を！');
        }
    }
    newQuestion();
});
