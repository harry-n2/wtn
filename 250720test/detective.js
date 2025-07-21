document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const caseNumberDisplay = document.getElementById('case-number');
    const sequenceText = document.getElementById('sequence-text');
    const answerInput = document.getElementById('answer-input');
    const solveBtn = document.getElementById('solve-btn');
    const hintBtn = document.getElementById('hint-btn');
    const hintText = document.getElementById('hint-text');
    const solvedList = document.getElementById('solved-list');

    // Cases Data
    const cases = [
        { sequence: [2, 4, 6, '?', 10, 12], answer: 8, hint: '2ずつ増えている（等差数列）' },
        { sequence: [3, 6, 12, 24, '?', 96], answer: 48, hint: '2倍になっている（等比数列）' },
        { sequence: [1, 4, 9, 16, '?', 36], answer: 25, hint: '平方数（1x1, 2x2, ...）' },
        { sequence: [50, 45, 40, '?', 30], answer: 35, hint: '5ずつ減っている' },
        { sequence: [1, 1, 2, 3, 5, '?', 13], answer: 8, hint: '前の2つの数を足している（フィボナッチ数列）' }
    ];

    let currentCaseIndex = 0;
    let solvedCases = [];

    function loadCase(index) {
        const currentCase = cases[index];
        caseNumberDisplay.textContent = index + 1;
        sequenceText.textContent = currentCase.sequence.join(', ');
        hintText.textContent = currentCase.hint;
        hintText.classList.add('hidden');
        answerInput.value = '';
        answerInput.focus();
    }

    function solve() {
        const userAnswer = parseInt(answerInput.value, 10);
        const currentCase = cases[currentCaseIndex];

        if (userAnswer === currentCase.answer) {
            alert("お見事！事件解決です！");
            
            // Add to solved list
            if (!solvedCases.includes(currentCaseIndex)) {
                solvedCases.push(currentCaseIndex);
                const li = document.createElement('li');
                li.textContent = `事件 No.${currentCaseIndex + 1} - ${currentCase.sequence.join(', ')}`;
                solvedList.appendChild(li);
            }

            // Move to next case
            currentCaseIndex = (currentCaseIndex + 1) % cases.length;
            loadCase(currentCaseIndex);

        } else {
            alert("うーん、違うようだ...。もう一度考えてみよう。");
        }
    }

    function showHint() {
        hintText.classList.remove('hidden');
    }

    // Event Listeners
    solveBtn.addEventListener('click', solve);
    answerInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') solve();
    });
    hintBtn.addEventListener('click', showHint);

    // Initialize
    loadCase(currentCaseIndex);
});
