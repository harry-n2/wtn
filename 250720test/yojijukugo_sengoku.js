document.addEventListener('DOMContentLoaded', () => {
    const questionText = document.getElementById('question-text');
    const answerInput = document.getElementById('answer-input');
    const answerBtn = document.getElementById('answer-btn');
    const mapDiv = document.getElementById('map');
    const unificationRate = document.getElementById('unification-rate');
    
    const idioms = [
        { text: '一期一会', blank: 1, answer: '期' },
        { text: '温故知新', blank: 2, answer: '知' },
        { text: '画竜点睛', blank: 3, answer: '睛' },
        { text: '四面楚歌', blank: 2, answer: '楚' },
    ];
    let currentQ;
    let solvedCount = 0;

    function newQuestion() {
        currentQ = idioms[Math.floor(Math.random() * idioms.length)];
        let displayText = currentQ.text.split('');
        displayText[currentQ.blank] = '□';
        questionText.textContent = displayText.join('');
        answerInput.value = '';
        answerInput.focus();
    }

    function checkAnswer() {
        if (answerInput.value === currentQ.answer) {
            alert('正解！領地が拡大した！');
            solvedCount++;
            const rate = Math.min(100, (solvedCount / idioms.length) * 100);
            mapDiv.style.width = `${rate}%`;
            unificationRate.textContent = Math.floor(rate);
            newQuestion();
        } else {
            alert('不正解！');
        }
    }

    answerBtn.addEventListener('click', checkAnswer);
    answerInput.addEventListener('keydown', e => e.key === 'Enter' && checkAnswer());
    newQuestion();
});
