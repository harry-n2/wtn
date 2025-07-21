document.addEventListener('DOMContentLoaded', () => {
    const KanjiVG = window.KanjiVG;
    const character = document.getElementById('character');
    const playBtn = document.getElementById('play-btn');
    const resetBtn = document.getElementById('reset-btn');
    const kanjiBtns = document.querySelectorAll('.kanji-btn');
    
    let kvg;
    let currentKanji = '永';

    function loadKanji(kanji) {
        if (kvg) {
            kvg.cancelAnimation();
        }
        document.getElementById('kanji-svg').innerHTML = '';
        kvg = new KanjiVG('kanji-svg', 4, true, () => {
            playBtn.disabled = false;
        });
        kvg.load(kanji);
        currentKanji = kanji;

        kanjiBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.kanji === kanji);
        });
    }

    function playAnimation() {
        playBtn.disabled = true;
        character.textContent = '😮';
        kvg.playAnimation(null, () => {
            playBtn.disabled = false;
            character.textContent = '😄';
        });
    }

    function resetAnimation() {
        kvg.cancelAnimation();
        kvg.reset();
        playBtn.disabled = false;
        character.textContent = '😊';
    }

    kanjiBtns.forEach(button => {
        button.addEventListener('click', () => {
            loadKanji(button.dataset.kanji);
        });
    });

    playBtn.addEventListener('click', playAnimation);
    resetBtn.addEventListener('click', resetAnimation);

    // 初期化
    loadKanji(currentKanji);
});
