document.addEventListener('DOMContentLoaded', () => {
    const enemyWord = document.getElementById('enemy-word');
    const optionsDiv = document.getElementById('options');
    const playerHp = document.getElementById('player-hp');
    let hp = 100;

    const vocabulary = [
        { word: 'あはれなり', choices: ['しみじみと趣深い', 'あきらかだ', '素晴らしい'], answer: 'しみじみと趣深い' },
        { word: 'いと', choices: ['とても', 'いとこ', '良くない'], answer: 'とても' },
        { word: 'うつくし', choices: ['かわいらしい', '美しい', '面白い'], answer: 'かわいらしい' },
        { word: 'おかし', choices: ['趣がある', 'おかしい', 'こわい'], answer: '趣がある' },
    ];
    let currentQ;

    function newQuestion() {
        currentQ = vocabulary[Math.floor(Math.random() * vocabulary.length)];
        enemyWord.textContent = `「${currentQ.word}」`;
        optionsDiv.innerHTML = '';
        currentQ.choices.sort(() => Math.random() - 0.5).forEach(choice => {
            const btn = document.createElement('button');
            btn.className = 'gr-button';
            btn.textContent = choice;
            btn.onclick = () => checkAnswer(choice);
            optionsDiv.appendChild(btn);
        });
    }

    function checkAnswer(choice) {
        if (choice === currentQ.answer) {
            alert('正解！モンスターにダメージ！');
        } else {
            alert('不正解！HPが10減った！');
            hp -= 10;
            playerHp.textContent = `HP: ${hp}`;
            if (hp <= 0) {
                alert('HPが0になった...ゲームオーバー');
                hp = 100;
                playerHp.textContent = `HP: ${hp}`;
            }
        }
        newQuestion();
    }
    newQuestion();
});
