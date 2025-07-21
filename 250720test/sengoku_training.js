document.addEventListener('DOMContentLoaded', () => {
    const statusBarsDiv = document.getElementById('status-bars');
    const trainingDiv = document.getElementById('training-buttons');

    const stats = { '武力': 10, '知力': 10, '政治': 10 };
    const trainings = [
        { name: '剣術修行', stat: '武力' }, { name: '兵法学習', stat: '知力' },
        { name: '茶会', stat: '政治' }, { name: '鷹狩り', stat: '武力' },
    ];

    function renderStatus() {
        statusBarsDiv.innerHTML = '';
        for (const stat in stats) {
            statusBarsDiv.innerHTML += `
                <div class="status-bar">
                    <span class="status-label">${stat}</span>
                    <div class="gauge"><div class="gauge-inner" style="width: ${stats[stat]}%;"></div></div>
                </div>`;
        }
    }

    function setupTraining() {
        trainingDiv.innerHTML = '';
        trainings.forEach(t => {
            const btn = document.createElement('button');
            btn.className = 'gr-button';
            btn.textContent = t.name;
            btn.onclick = () => doTraining(t.stat);
            trainingDiv.appendChild(btn);
        });
    }

    function doTraining(stat) {
        const answer = prompt(`${stat}に関するクイズ！ 1+1=? (ダミー)`);
        if (answer === '2') {
            alert('正解！能力が上がった！');
            stats[stat] = Math.min(100, stats[stat] + 10);
            renderStatus();
        } else {
            alert('不正解...');
        }
    }

    renderStatus();
    setupTraining();
});
