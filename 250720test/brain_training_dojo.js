document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('card-grid');
    const scoreText = document.getElementById('score');
    const items = ['A','A','B','B','C','C','D','D'];
    let score = 0;
    let flipped = [];

    function setup() {
        grid.innerHTML = '';
        score = 0;
        scoreText.textContent = score;
        items.sort(() => Math.random() - 0.5).forEach(item => {
            const card = document.createElement('div');
            card.className = 'memory-card';
            card.dataset.item = item;
            card.textContent = '?';
            card.addEventListener('click', () => flip(card));
            grid.appendChild(card);
        });
    }

    function flip(card) {
        if (flipped.length >= 2 || card.classList.contains('flipped')) return;
        card.classList.add('flipped');
        card.textContent = card.dataset.item;
        flipped.push(card);

        if (flipped.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }

    function checkMatch() {
        const [c1, c2] = flipped;
        if (c1.dataset.item === c2.dataset.item) {
            score++;
            scoreText.textContent = score;
            c1.style.background = '#a5d6a7';
            c2.style.background = '#a5d6a7';
        } else {
            c1.classList.remove('flipped');
            c2.classList.remove('flipped');
            c1.textContent = '?';
            c2.textContent = '?';
        }
        flipped = [];
        if (score === items.length / 2) {
            alert('完全勝利！');
            setup();
        }
    }
    setup();
});
// Append CSS
const dojoCss = `
#card-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
.memory-card { height: 80px; background: #e1bee7; border: 2px solid #9c27b0; display: flex; justify-content: center; align-items: center; font-size: 2em; cursor: pointer; }
.memory-card.flipped { background: #fff; }
`;
// This is a simplified representation.
const existingCss = document.querySelector('link[href="sogo_apps.css"]');
if (existingCss) {
    const style = document.createElement('style');
    style.textContent = dojoCss;
    document.head.appendChild(style);
}
