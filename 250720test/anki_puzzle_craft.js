document.addEventListener('DOMContentLoaded', () => {
    const questionsCol = document.getElementById('questions-col');
    const answersCol = document.getElementById('answers-col');
    const pairs = { '源頼朝': '鎌倉幕府', '徳川家康': '江戸幕府', '足利尊氏': '室町幕府' };
    let selectedQ = null;

    function setup() {
        const questions = Object.keys(pairs).sort(() => Math.random() - 0.5);
        const answers = Object.values(pairs).sort(() => Math.random() - 0.5);

        questions.forEach(q => {
            const el = document.createElement('div');
            el.className = 'puzzle-piece question';
            el.textContent = q;
            el.onclick = () => selectQ(el, q);
            questionsCol.appendChild(el);
        });
        answers.forEach(a => {
            const el = document.createElement('div');
            el.className = 'puzzle-piece answer';
            el.textContent = a;
            el.onclick = () => checkA(el, a);
            answersCol.appendChild(el);
        });
    }

    function selectQ(el, q) {
        document.querySelectorAll('.question').forEach(e => e.classList.remove('selected'));
        el.classList.add('selected');
        selectedQ = { el, q };
    }

    function checkA(elA, a) {
        if (!selectedQ) return;
        if (pairs[selectedQ.q] === a) {
            selectedQ.el.classList.add('solved');
            elA.classList.add('solved');
            selectedQ = null;
            if(document.querySelectorAll('.solved').length === Object.keys(pairs).length * 2) {
                alert('全問正解！');
            }
        } else {
            alert('不正解！');
            selectedQ.el.classList.remove('selected');
            selectedQ = null;
        }
    }
    setup();
});
// Append CSS
const puzzleCss = `
#puzzle-board { display: flex; justify-content: space-around; }
#questions-col, #answers-col { display: flex; flex-direction: column; gap: 10px; }
.puzzle-piece { padding: 15px; border: 2px solid #333; cursor: pointer; }
.question { background: #e3f2fd; }
.answer { background: #fffde7; }
.puzzle-piece.selected { border-color: var(--color-accent); }
.puzzle-piece.solved { background: #ccc; pointer-events: none; }
`;
// This is a simplified representation.
const existingCss = document.querySelector('link[href="game_apps.css"]');
if (existingCss) {
    const style = document.createElement('style');
    style.textContent = puzzleCss;
    document.head.appendChild(style);
}
