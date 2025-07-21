document.addEventListener('DOMContentLoaded', () => {
    const modeCards = document.querySelectorAll('.mode-card');

    modeCards.forEach(card => {
        card.addEventListener('click', () => {
            const mode = card.dataset.mode;
            
            // List of implemented modes
            const implementedModes = ['quiz', 'riddle', 'karaoke', 'grammar', 'verb', 'preposition', 'shiritori', 'pronunciation', 'goroawase', 'idiom_rhythm'];

            if (implementedModes.includes(mode)) {
                window.location.href = `${mode}.html`;
            } else if (mode) {
                // This part is now unlikely to be called, but kept as a fallback.
                alert(`「${card.querySelector('h2').textContent}」モードは現在準備中です。`);
            }
        });
    });
});
