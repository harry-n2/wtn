document.addEventListener('DOMContentLoaded', () => {
    const idiomData = [
        { idiom: "a piece of cake", meaning: "楽勝、朝飯前" },
        { idiom: "break a leg", meaning: "頑張って！" },
        { idiom: "on the ball", meaning: "有能で、機敏で" },
        { idiom: "once in a blue moon", meaning: "ごくまれに" },
        { idiom: "spill the beans", meaning: "秘密を漏らす" }
    ];

    let currentIdiomIndex = 0;
    let isPlaying = false;

    const idiomDisplay = document.getElementById('idiom-display');
    const idiomMeaningEl = document.getElementById('idiom-meaning');
    const playBtn = document.getElementById('play-btn');
    const nextBtn = document.getElementById('next-btn');
    const beatMarker = document.getElementById('beat-marker');

    function loadIdiom() {
        isPlaying = false;
        playBtn.disabled = false;
        const idiom = idiomData[currentIdiomIndex];
        idiomDisplay.innerHTML = '';
        idiom.idiom.split(' ').forEach(word => {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'idiom-word';
            wordSpan.textContent = word;
            idiomDisplay.appendChild(wordSpan);
        });
        idiomMeaningEl.textContent = `意味：${idiom.meaning}`;
    }

    function playRhythm() {
        if (isPlaying) return;
        isPlaying = true;
        playBtn.disabled = true;

        const words = idiomDisplay.children;
        const duration = 400; // ms per word

        // Beat marker animation
        beatMarker.style.transition = 'none';
        beatMarker.style.left = '-100px';
        setTimeout(() => {
            beatMarker.style.transition = `left ${words.length * duration}ms linear`;
            beatMarker.style.left = 'calc(100% + 100px)';
        }, 100);


        for (let i = 0; i < words.length; i++) {
            setTimeout(() => {
                if (i > 0) words[i-1].classList.remove('active');
                words[i].classList.add('active');

                if (i === words.length - 1) {
                    // Last word
                    setTimeout(() => {
                        words[i].classList.remove('active');
                        isPlaying = false;
                        playBtn.disabled = false;
                    }, duration);
                }
            }, i * duration);
        }
    }

    nextBtn.addEventListener('click', () => {
        if (isPlaying) return;
        currentIdiomIndex = (currentIdiomIndex + 1) % idiomData.length;
        loadIdiom();
    });

    playBtn.addEventListener('click', playRhythm);

    loadIdiom();
});
