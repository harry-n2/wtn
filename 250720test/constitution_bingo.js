document.addEventListener('DOMContentLoaded', () => {
    const bingoCard = document.getElementById('bingo-card');
    const articleText = document.getElementById('article-text');
    const drawBtn = document.getElementById('draw-btn');

    const articles = [
        { num: 1, text: '天皇は、日本国の象徴' },
        { num: 9, text: '戦争の放棄' },
        { num: 14, text: '法の下の平等' },
        { num: 25, text: '生存権' },
        { num: 96, text: '憲法改正の手続' },
        { num: 11, text: '基本的人権の享有' },
        { num: 13, text: '個人の尊重' },
        { num: 20, text: '信教の自由' },
        { num: 21, text: '集会・結社・表現の自由' },
    ];
    let cardNumbers = [];
    let drawnNumbers = [];

    function setup() {
        cardNumbers = articles.map(a => a.num).sort(() => Math.random() - 0.5).slice(0, 9);
        bingoCard.innerHTML = '';
        for (let i = 0; i < 3; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < 3; j++) {
                const cell = document.createElement('td');
                cell.textContent = cardNumbers[i * 3 + j];
                cell.id = `cell-${cardNumbers[i * 3 + j]}`;
                row.appendChild(cell);
            }
            bingoCard.appendChild(row);
        }
    }

    drawBtn.addEventListener('click', () => {
        const available = articles.filter(a => !drawnNumbers.includes(a.num));
        if (available.length === 0) {
            alert('全ての条文を引きました！');
            return;
        }
        const drawn = available[Math.floor(Math.random() * available.length)];
        drawnNumbers.push(drawn.num);
        articleText.textContent = `第${drawn.num}条: ${drawn.text}`;
        
        const hitCell = document.getElementById(`cell-${drawn.num}`);
        if (hitCell) {
            hitCell.classList.add('hit');
        }
        // 簡単化のためビンゴ判定は省略
    });

    setup();
});
