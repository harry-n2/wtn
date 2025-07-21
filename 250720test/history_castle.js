document.addEventListener('DOMContentLoaded', () => {
    const eventText = document.getElementById('event-text');
    const goroText = document.getElementById('goro-text');
    const yearInput = document.getElementById('year-input');
    const answerBtn = document.getElementById('answer-btn');
    const castleDisplay = document.getElementById('castle-display');
    const levelDisplay = document.getElementById('level');

    const historyData = [
        { year: 794, event: '平安京遷都', goro: '鳴くよウグイス平安京' },
        { year: 1192, event: '鎌倉幕府成立', goro: 'いい国作ろう鎌倉幕府' },
        { year: 1467, event: '応仁の乱', goro: '人の世むなしい応仁の乱' },
        { year: 1603, event: '江戸幕府成立', goro: 'ヒーローおっさん徳川家康' },
        { year: 1867, event: '大政奉還', goro: '一夜でむなしい大政奉還' }
    ];

    let currentQuestionIndex = 0;
    let castleLevel = 0;

    function loadQuestion() {
        const q = historyData[currentQuestionIndex];
        eventText.textContent = q.event;
        goroText.textContent = `「${q.goro}」`;
        yearInput.value = '';
        yearInput.focus();
    }

    function checkAnswer() {
        const userAnswer = parseInt(yearInput.value, 10);
        const correctAnswer = historyData[currentQuestionIndex].year;

        if (userAnswer === correctAnswer) {
            alert('正解！石垣が積まれた！');
            addStone();
            currentQuestionIndex = (currentQuestionIndex + 1) % historyData.length;
            loadQuestion();
        } else {
            alert('残念！もう一度！');
        }
    }

    function addStone() {
        castleLevel++;
        levelDisplay.textContent = castleLevel;

        const row = document.createElement('div');
        row.className = 'stone-row';
        const stoneCount = Math.floor(Math.random() * 3) + 8; // 8-10個の石
        for (let i = 0; i < stoneCount; i++) {
            const stone = document.createElement('div');
            stone.className = 'stone';
            row.appendChild(stone);
        }
        castleDisplay.appendChild(row);
    }

    answerBtn.addEventListener('click', checkAnswer);
    yearInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') checkAnswer();
    });

    // 初期化
    loadQuestion();
});
