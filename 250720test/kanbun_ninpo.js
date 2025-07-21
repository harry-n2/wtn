document.addEventListener('DOMContentLoaded', () => {
    const kanbunTextDiv = document.getElementById('kanbun-text');
    const readingOrderDiv = document.getElementById('reading-order');
    const resetBtn = document.getElementById('reset-btn');

    const problems = [
        { text: '不食', reading: '食はず', order: [1, 0] }, // レ点
        { text: '登山', reading: '山に登る', order: [1, 0] }, // レ点
    ];
    let currentQ;
    let userOrder = [];

    function newQuestion() {
        currentQ = problems[Math.floor(Math.random() * problems.length)];
        kanbunTextDiv.innerHTML = '';
        currentQ.text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.className = 'kanji-char';
            span.textContent = char;
            span.dataset.index = index;
            span.onclick = () => selectChar(span, char);
            kanbunTextDiv.appendChild(span);
        });
        reset();
    }

    function selectChar(element, char) {
        if (element.classList.contains('clicked')) return;
        element.classList.add('clicked');
        userOrder.push(char);
        readingOrderDiv.textContent = userOrder.join(' ');
        if (userOrder.length === currentQ.text.length) {
            checkAnswer();
        }
    }

    function checkAnswer() {
        if (userOrder.join('') === currentQ.reading) {
            alert('正解！見事な解読でござる！');
        } else {
            alert(`不正解！正しくは「${currentQ.reading}」`);
        }
        setTimeout(newQuestion, 1000);
    }
    
    function reset() {
        userOrder = [];
        readingOrderDiv.textContent = '';
        document.querySelectorAll('.kanji-char').forEach(el => el.classList.remove('clicked'));
    }

    resetBtn.addEventListener('click', reset);
    newQuestion();
});
