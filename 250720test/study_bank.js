document.addEventListener('DOMContentLoaded', () => {
    const bankDisplay = document.getElementById('bank-display');
    const totalPointsText = document.getElementById('total-points');
    const timeInput = document.getElementById('study-time');
    const depositBtn = document.getElementById('deposit-btn');
    let totalPoints = 0;

    depositBtn.addEventListener('click', () => {
        const time = parseInt(timeInput.value, 10);
        if (isNaN(time) || time <= 0) {
            alert('正しい勉強時間を入力してください。');
            return;
        }
        totalPoints += time; // 1分 = 1ポイント
        totalPointsText.textContent = `${totalPoints} P`;
        
        const coin = document.createElement('div');
        coin.className = 'coin';
        coin.textContent = '🪙';
        bankDisplay.appendChild(coin);

        timeInput.value = '';
    });
});
// Append CSS
const bankCss = `
#piggy-bank { text-align: center; }
#bank-display { font-size: 8em; min-height: 150px; background: #fffde7; border-radius: 20px; padding: 10px; position: relative; overflow: hidden; }
.coin { position: absolute; font-size: 0.5em; animation: drop 1s; }
@keyframes drop { 0% { top: -50px; } 100% { top: 60%; } }
#total-points { font-size: 1.5em; font-weight: bold; }
`;
// This is a simplified representation.
const existingCss = document.querySelector('link[href="sogo_apps.css"]');
if (existingCss) {
    const style = document.createElement('style');
    style.textContent = bankCss;
    document.head.appendChild(style);
}
