document.addEventListener('DOMContentLoaded', () => {
    const monsterName = document.getElementById('monster-name');
    const monsterDisplay = document.getElementById('monster-display');
    const levelText = document.getElementById('level');
    const expBar = document.getElementById('exp-bar');
    const studyBtn = document.getElementById('study-btn');
    const restBtn = document.getElementById('rest-btn');

    const monsterStages = ['🥚', '🐣', '🐤', '🐔', '🔥🐔'];
    let level = 1;
    let exp = 0;

    const quizzes = [
        { q: '徳川家康が江戸幕府を開いた年は？', a: '1603' },
        { q: '水の化学式は？', a: 'H2O' },
        { q: 'Appleの日本語訳は？', a: 'りんご' },
    ];

    function updateStatus() {
        levelText.textContent = level;
        expBar.style.width = `${exp}%`;
        monsterDisplay.textContent = monsterStages[level - 1] || '🏆';
        monsterDisplay.style.transform = `scale(${1 + level * 0.1})`;
    }

    studyBtn.addEventListener('click', () => {
        const quiz = quizzes[Math.floor(Math.random() * quizzes.length)];
        const answer = prompt(`【クイズ】${quiz.q}`);
        if (answer && answer.toLowerCase() === quiz.a.toLowerCase()) {
            alert('正解！経験値ゲット！');
            exp += 20;
            if (exp >= 100) {
                level++;
                exp = 0;
                alert('レベルアップ！モンスターが進化した！');
            }
        } else {
            alert('不正解...。でも頑張った！');
        }
        updateStatus();
    });

    restBtn.addEventListener('click', () => {
        alert('モンスターは休憩して満足そうだ。');
        monsterDisplay.style.transform += ' rotate(360deg)';
    });

    updateStatus();
});
