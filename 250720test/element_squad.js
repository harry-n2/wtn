document.addEventListener('DOMContentLoaded', () => {
    const squadDiv = document.getElementById('squad');
    const choicesDiv = document.getElementById('choices');
    const messageBoard = document.querySelector('#message-board p');
    const enemyImg = document.querySelector('.enemy-img');

    const elements = [
        { name: '水素', symbol: 'H', color: '#f44336', face: '🔥' },
        { name: '酸素', symbol: 'O', color: '#2196f3', face: '💧' },
        { name: '炭素', symbol: 'C', color: '#607d8b', face: '💎' },
        { name: '窒素', symbol: 'N', color: '#9c27b0', face: '⚡' },
        { name: '鉄', symbol: 'Fe', color: '#795548', face: '🔩' }
    ];

    let currentQuestion;

    function setupSquad() {
        squadDiv.innerHTML = '';
        elements.forEach(el => {
            const heroDiv = document.createElement('div');
            heroDiv.className = 'hero';
            heroDiv.style.backgroundColor = el.color;
            heroDiv.innerHTML = `<div class="hero-face">${el.face}</div><div class="hero-name">${el.name}</div>`;
            squadDiv.appendChild(heroDiv);
        });
    }

    function generateQuestion() {
        // 正解の元素をランダムに選ぶ
        currentQuestion = elements[Math.floor(Math.random() * elements.length)];
        messageBoard.textContent = `司令：元素記号「${currentQuestion.symbol}」の元素で攻撃せよ！`;

        // 選択肢を作成（正解を含むダミー選択肢）
        let options = [currentQuestion];
        while (options.length < 3) {
            const dummy = elements[Math.floor(Math.random() * elements.length)];
            if (!options.some(opt => opt.symbol === dummy.symbol)) {
                options.push(dummy);
            }
        }
        // 選択肢をシャッフル
        options.sort(() => Math.random() - 0.5);

        choicesDiv.innerHTML = '';
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'gr-button choice-btn';
            btn.textContent = opt.name;
            btn.addEventListener('click', () => checkAnswer(opt));
            choicesDiv.appendChild(btn);
        });
    }

    function checkAnswer(selectedOption) {
        if (selectedOption.symbol === currentQuestion.symbol) {
            messageBoard.textContent = `「${currentQuestion.name}」の攻撃！会心の一撃！`;
            enemyImg.style.animation = 'shake 0.5s';
        } else {
            messageBoard.textContent = `違う！それは「${selectedOption.name}」だ！攻撃失敗...`;
            enemyImg.style.animation = 'none';
        }
        
        setTimeout(() => {
            enemyImg.style.animation = 'float 2s infinite';
            generateQuestion();
        }, 1500);
    }

    // 初期化
    setupSquad();
    generateQuestion();
});
