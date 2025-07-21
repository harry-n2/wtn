document.addEventListener('DOMContentLoaded', () => {
    const plant = document.getElementById('plant');
    const gaugeBar = document.getElementById('gauge-bar');
    const quizText = document.getElementById('quiz-text');
    const optionsDiv = document.getElementById('options');

    const quizzes = [
        { q: '光合成に必要なのは？', a: '二酸化炭素', c: ['酸素', '窒素'] },
        { q: '根から吸収するのは？', a: '水', c: ['栄養', '空気'] },
        { q: '葉が緑色なのはなぜ？', a: '葉緑体', c: ['血液', '細胞壁'] },
    ];
    const plantStages = ['🌱', '🌿', '🌳', '🌲'];
    let growth = 0;
    let currentQ;

    function newQuiz() {
        currentQ = quizzes[Math.floor(Math.random() * quizzes.length)];
        quizText.textContent = currentQ.q;
        
        const options = [currentQ.a, ...currentQ.c].sort(() => Math.random() - 0.5);
        optionsDiv.innerHTML = '';
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'gr-button';
            btn.textContent = opt;
            btn.onclick = () => checkAnswer(opt);
            optionsDiv.appendChild(btn);
        });
    }

    function checkAnswer(answer) {
        if (answer === currentQ.a) {
            alert('正解！植物が成長した！');
            growth += 25;
            if (growth > 100) growth = 100;
            updatePlant();
        } else {
            alert('不正解...');
        }
        newQuiz();
    }

    function updatePlant() {
        gaugeBar.style.width = `${growth}%`;
        const stage = Math.floor(growth / 26);
        plant.textContent = plantStages[stage];
        plant.style.fontSize = `${2 + stage * 1.5}em`;
    }

    newQuiz();
    updatePlant();
});
