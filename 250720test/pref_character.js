document.addEventListener('DOMContentLoaded', () => {
    const charDisplay = document.getElementById('character-display');
    const prefName = document.getElementById('pref-name');
    const optionsDiv = document.getElementById('options');

    const prefs = [
        { name: '北海道', char: '🐻', hint: '熊' },
        { name: '青森', char: '🍎', hint: 'りんご' },
        { name: '東京', char: '🗼', hint: '東京タワー' },
        { name: '大阪', char: '🐙', hint: 'たこ焼き' },
    ];
    let currentQ;

    function newQuestion() {
        currentQ = prefs[Math.floor(Math.random() * prefs.length)];
        charDisplay.textContent = currentQ.char;
        prefName.textContent = '？？？';
        
        const options = [currentQ.name, ...prefs.filter(p => p.name !== currentQ.name).sort(() => Math.random() - 0.5).slice(0, 3)].sort(() => Math.random() - 0.5);
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
        if (answer === currentQ.name) {
            alert('正解！');
            prefName.textContent = currentQ.name;
            setTimeout(newQuestion, 1500);
        } else {
            alert('不正解！');
        }
    }
    newQuestion();
});
