document.addEventListener('DOMContentLoaded', () => {
    const approvalRateText = document.getElementById('approval-rate');
    const actionsDiv = document.getElementById('actions');
    let approvalRate = 10;

    const actions = [
        { name: '街頭演説', effect: 5 },
        { name: 'ポスター貼り', effect: 2 },
        { name: '討論会に参加', effect: 8 },
    ];

    function renderActions() {
        actionsDiv.innerHTML = '';
        actions.forEach(action => {
            const btn = document.createElement('button');
            btn.className = 'gr-button';
            btn.textContent = `${action.name} (+${action.effect}%)`;
            btn.onclick = () => doAction(action.effect);
            actionsDiv.appendChild(btn);
        });
    }

    function doAction(effect) {
        const answer = prompt('公約を発表！「減税」or「福祉」？ (ダミー)');
        if (answer) {
            alert(`「${answer}」を訴えた！`);
            approvalRate = Math.min(100, approvalRate + effect);
            approvalRateText.textContent = `${approvalRate}%`;
            if (approvalRate >= 50) {
                alert('当選！おめでとうございます！');
            }
        }
    }

    renderActions();
});
