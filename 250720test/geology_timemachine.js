document.addEventListener('DOMContentLoaded', () => {
    const fossilDisplay = document.getElementById('fossil-display');
    const eraButtonsDiv = document.getElementById('era-buttons');

    const fossils = [
        { name: 'アンモナイト', era: '中生代', emoji: '🐚' },
        { name: '三葉虫', era: '古生代', emoji: ' Trilobite ' },
        { name: 'マンモス', era: '新生代', emoji: '🐘' },
    ];
    const eras = ['古生代', '中生代', '新生代'];
    let currentFossil;

    function newQuestion() {
        currentFossil = fossils[Math.floor(Math.random() * fossils.length)];
        fossilDisplay.textContent = currentFossil.emoji;
        fossilDisplay.title = currentFossil.name;
        
        eraButtonsDiv.innerHTML = '';
        eras.forEach(era => {
            const btn = document.createElement('button');
            btn.className = 'gr-button era-btn';
            btn.textContent = era;
            btn.onclick = () => checkAnswer(era);
            eraButtonsDiv.appendChild(btn);
        });
    }

    function checkAnswer(era) {
        if (era === currentFossil.era) {
            alert('タイムトラベル成功！');
            newQuestion();
        } else {
            alert('時空が歪んでいる...！');
        }
    }
    newQuestion();
});
