document.addEventListener('DOMContentLoaded', () => {
    const situationText = document.getElementById('situation-text');
    const choicesDiv = document.getElementById('choices');

    const situations = [
        { situation: '先生に「食べる」の尊敬語を使う時', choices: ['召し上がる', 'いただく', '食べる'], answer: '召し上がる' },
        { situation: '先輩に「行く」の謙譲語を使う時', choices: ['参る', 'いらっしゃる', '行く'], answer: '参る' },
        { situation: 'お客様に「言う」の尊敬語を使う時', choices: ['おっしゃる', '申す', '言う'], answer: 'おっしゃる' },
    ];
    let currentQ;

    function newQuestion() {
        currentQ = situations[Math.floor(Math.random() * situations.length)];
        situationText.textContent = currentQ.situation;
        choicesDiv.innerHTML = '';
        currentQ.choices.sort(() => Math.random() - 0.5).forEach(choice => {
            const btn = document.createElement('button');
            btn.className = 'gr-button choice-btn';
            btn.textContent = choice;
            btn.onclick = () => checkAnswer(choice);
            choicesDiv.appendChild(btn);
        });
    }

    function checkAnswer(choice) {
        if (choice === currentQ.answer) {
            alert('正解！素晴らしいマナーです！');
        } else {
            alert('不正解。もう一度確認しましょう。');
        }
        newQuestion();
    }
    newQuestion();
});
