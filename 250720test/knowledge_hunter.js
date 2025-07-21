document.addEventListener('DOMContentLoaded', () => {
    const monsterDiv = document.getElementById('monster');
    const attackBtn = document.getElementById('attack-button');
    let monsterHp = 100;

    function renderMonster() {
        monsterDiv.innerHTML = `<h2>数学ドラゴン</h2><p>HP: ${monsterHp}</p>`;
    }

    attackBtn.addEventListener('click', () => {
        const ans = prompt('問題：x²=4 の時、xは？');
        if (ans === '2' || ans === '±2') {
            const damage = Math.floor(Math.random() * 20) + 10;
            monsterHp -= damage;
            alert(`${damage}のダメージ！`);
            if (monsterHp <= 0) {
                alert('討伐成功！');
                monsterHp = 100;
            }
        } else {
            alert('攻撃失敗！');
        }
        renderMonster();
    });

    renderMonster();
});
// Append CSS
const hunterCss = `
#hunting-ground { text-align: center; background: #ffcdd2; }
#monster h2 { margin: 0; }
#monster p { font-size: 1.5em; font-weight: bold; }
`;
// This is a simplified representation.
const existingCss = document.querySelector('link[href="game_apps.css"]');
if (existingCss) {
    const style = document.createElement('style');
    style.textContent = hunterCss;
    document.head.appendChild(style);
}
