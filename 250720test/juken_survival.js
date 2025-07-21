document.addEventListener('DOMContentLoaded', () => {
    const dayCount = document.getElementById('day-count');
    const statusBars = document.getElementById('status-bars');
    const actionButtons = document.getElementById('action-buttons');
    let day = 1;
    let status = { '体力': 100, '食料': 50 };

    function updateStatus() {
        statusBars.innerHTML = '';
        for(const key in status) {
            statusBars.innerHTML += `<p>${key}: ${status[key]}</p>`;
        }
    }

    function nextDay() {
        day++;
        status['体力'] -= 10;
        status['食料'] -= 10;
        if (status['体力'] <= 0 || status['食料'] <= 0) {
            alert('ゲームオーバー...');
            day = 1; status = { '体力': 100, '食料': 50 };
        }
        dayCount.textContent = `${day}日目`;
        updateStatus();
    }

    const actions = [
        { name: '食料を探す', quiz: {q:'食べられるキノコは？', a:'しいたけ'}, success: 30 },
        { name: '家を建��る', quiz: {q:'てこの原理で使う棒は？', a:'くさび'}, success: 20 },
    ];

    actionButtons.innerHTML = '';
    actions.forEach(act => {
        const btn = document.createElement('button');
        btn.className = 'gr-button';
        btn.textContent = act.name;
        btn.onclick = () => {
            const ans = prompt(act.quiz.q);
            if (ans === act.quiz.a) {
                alert('成功！');
                if(act.name === '食料を探す') status['食料'] += act.success;
            } else {
                alert('失敗...');
            }
            nextDay();
        };
        actionButtons.appendChild(btn);
    });

    updateStatus();
});
// Append CSS
const survivalCss = `
#island-view { background: #a5d6a7; text-align: center; }
#status-bars p { display: inline-block; margin: 0 10px; }
#action-buttons { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
`;
// This is a simplified representation.
const existingCss = document.querySelector('link[href="game_apps.css"]');
if (existingCss) {
    const style = document.createElement('style');
    style.textContent = survivalCss;
    document.head.appendChild(style);
}
