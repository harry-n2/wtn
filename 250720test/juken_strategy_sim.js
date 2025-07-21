document.addEventListener('DOMContentLoaded', () => {
    const daysLeftText = document.getElementById('days-left');
    const abilityScoreText = document.getElementById('ability-score');
    const planButtons = document.getElementById('plan-buttons');
    let days = 30;
    let ability = 50;

    const plans = [
        { name: '基礎固め', cost: 5, gain: 5 },
        { name: '応用問題', cost: 7, gain: 10 },
        { name: '休息', cost: 1, gain: -2 },
    ];

    function update() {
        daysLeftText.textContent = `${days}日`;
        abilityScoreText.textContent = ability;
        if (days <= 0) {
            alert(`シミュレーション終了！最終学力: ${ability}`);
        }
    }

    planButtons.innerHTML = '';
    plans.forEach(plan => {
        const btn = document.createElement('button');
        btn.className = 'gr-button';
        btn.textContent = `${plan.name} (${plan.cost}日消費)`;
        btn.onclick = () => {
            if (days >= plan.cost) {
                days -= plan.cost;
                ability += plan.gain;
                update();
            } else {
                alert('日数が足りません！');
            }
        };
        planButtons.appendChild(btn);
    });

    update();
});
// Append CSS
const simCss = `
#sim-status { text-align: center; }
#plan-buttons { display: flex; flex-direction: column; gap: 10px; }
`;
// This is a simplified representation.
const existingCss = document.querySelector('link[href="game_apps.css"]');
if (existingCss) {
    const style = document.createElement('style');
    style.textContent = simCss;
    document.head.appendChild(style);
}
