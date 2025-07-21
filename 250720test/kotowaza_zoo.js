document.addEventListener('DOMContentLoaded', () => {
    const proverbText = document.getElementById('proverb-text');
    const animalsDiv = document.getElementById('animals');

    const proverbs = [
        { text: '〇の威を借る狐', animal: '虎' },
        { text: '〇も歩けば棒に当たる', animal: '犬' },
        { text: '〇に小判', animal: '猫' },
        { text: '〇の耳に念仏', animal: '馬' },
    ];
    const animals = ['虎', '犬', '猫', '馬', '猿', '鳥'];
    const animalEmoji = { '虎': '🐅', '犬': '🐕', '猫': '🐈', '馬': '🐎', '猿': '🐒', '鳥': '🐦' };
    let currentQ;

    function newQuestion() {
        currentQ = proverbs[Math.floor(Math.random() * proverbs.length)];
        proverbText.textContent = currentQ.text;
        
        animalsDiv.innerHTML = '';
        animals.sort(() => Math.random() - 0.5).forEach(animal => {
            const btn = document.createElement('button');
            btn.className = 'animal-btn';
            btn.textContent = animalEmoji[animal];
            btn.onclick = () => checkAnswer(animal);
            animalsDiv.appendChild(btn);
        });
    }

    function checkAnswer(animal) {
        if (animal === currentQ.animal) {
            alert('大正解！');
            newQuestion();
        } else {
            alert('残念、違う動物だよ。');
        }
    }
    newQuestion();
});
