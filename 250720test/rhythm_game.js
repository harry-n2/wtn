document.addEventListener('DOMContentLoaded', () => {
    const note = document.querySelector('.note');
    const hitBtn = document.getElementById('hit-btn');
    const judgeLine = document.getElementById('judge-line');
    const keywords = ['聖徳太子', '鎌倉時代', '光合成', '質量保存の法則'];

    function startGame() {
        note.textContent = keywords[Math.floor(Math.random() * keywords.length)];
        note.style.animation = 'none';
        void note.offsetWidth; // reflow
        note.style.animation = 'fall 3s linear';
    }

    hitBtn.addEventListener('click', () => {
        const noteRect = note.getBoundingClientRect();
        const judgeRect = judgeLine.getBoundingClientRect();
        if (noteRect.bottom > judgeRect.top && noteRect.top < judgeRect.bottom) {
            alert('Perfect!');
            startGame();
        }
    });

    note.addEventListener('animationend', () => {
        alert('Miss...');
        startGame();
    });

    startGame();
});
// Append CSS
const rhythmCss = `
#game-lane { height: 400px; background: #333; position: relative; overflow: hidden; }
#note-lane { height: 100%; width: 100px; margin: 0 auto; position: relative; }
.note { position: absolute; top: -50px; width: 100px; padding: 10px; background: var(--color-accent); color: #fff; text-align: center; border-radius: 5px; }
@keyframes fall { 0% { transform: translateY(0); } 100% { transform: translateY(450px); } }
#judge-line { position: absolute; bottom: 50px; left: 0; width: 100%; height: 5px; background: var(--color-marker-yellow); }
#hit-btn { margin-top: 10px; width: 100px; }
`;
// This is a simplified representation.
const existingCss = document.querySelector('link[href="sogo_apps.css"]');
if (existingCss) {
    const style = document.createElement('style');
    style.textContent = rhythmCss;
    document.head.appendChild(style);
}
