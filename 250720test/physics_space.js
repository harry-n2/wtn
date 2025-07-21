document.addEventListener('DOMContentLoaded', () => {
    const missionText = document.getElementById('mission-text');
    const formulasDiv = document.getElementById('formulas');
    const ship = document.getElementById('ship');

    const missions = [
        { mission: '力', formula: 'F = ma', choices: ['F = ma', 'E = mc²', 'V = IR', 'P = IV'] },
        { mission: '電圧', formula: 'V = IR', choices: ['V = IR', 'F = ma', 'E = mc²', 'P = IV'] },
        { mission: 'エネルギー', formula: 'E = mc²', choices: ['E = mc²', 'V = IR', 'F = ma', 'P = IV'] },
    ];
    let currentMission;

    function newMission() {
        currentMission = missions[Math.floor(Math.random() * missions.length)];
        missionText.textContent = `ミッション: 「${currentMission.mission}」を求めよ！`;
        
        formulasDiv.innerHTML = '';
        currentMission.choices.sort(() => Math.random() - 0.5).forEach(choice => {
            const btn = document.createElement('button');
            btn.className = 'gr-button formula-btn';
            btn.textContent = choice;
            btn.onclick = () => checkAnswer(choice);
            formulasDiv.appendChild(btn);
        });
    }

    function checkAnswer(choice) {
        if (choice === currentMission.formula) {
            alert('エンジン起動！ワープ！');
            ship.style.transform = `translateX(${Math.random() * 100 - 50}px) translateY(${Math.random() * -50}px) rotate(${Math.random() * 20 - 10}deg)`;
            newMission();
        } else {
            alert('エネルギー不足...！');
        }
    }
    newMission();
});
