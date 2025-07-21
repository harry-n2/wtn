document.addEventListener('DOMContentLoaded', () => {
    const verbData = [
        { base: "go", past: "went", participle: "gone", japanese: "行く" },
        { base: "come", past: "came", participle: "come", japanese: "来る" },
        { base: "eat", past: "ate", participle: "eaten", japanese: "食べる" },
        { base: "see", past: "saw", participle: "seen", japanese: "見る" },
        { base: "take", past: "took", participle: "taken", japanese: "取る" },
        { base: "get", past: "got", participle: "gotten", japanese: "得る" },
        { base: "make", past: "made", participle: "made", japanese: "作る" },
        { base: "know", past: "knew", participle: "known", japanese: "知っている" },
    ];

    let currentVerbIndex = 0;

    const baseFormEl = document.querySelector('#base-form .verb-text');
    const pastFormEl = document.querySelector('#past-form .verb-text');
    const participleFormEl = document.querySelector('#participle-form .verb-text');
    const japaneseMeaningEl = document.getElementById('japanese-meaning');
    const nextVerbBtn = document.getElementById('next-verb-btn');
    const verbCards = document.querySelectorAll('.verb-card');

    function loadVerb() {
        // Animation: fade out
        verbCards.forEach(card => card.style.opacity = 0);
        japaneseMeaningEl.style.opacity = 0;

        setTimeout(() => {
            const verb = verbData[currentVerbIndex];
            baseFormEl.textContent = verb.base;
            pastFormEl.textContent = verb.past;
            participleFormEl.textContent = verb.participle;
            japaneseMeaningEl.textContent = verb.japanese;

            // Animation: fade in
            verbCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.transition = 'opacity 0.5s';
                    card.style.opacity = 1;
                }, index * 150);
            });
            japaneseMeaningEl.style.transition = 'opacity 0.5s';
            japaneseMeaningEl.style.opacity = 1;

        }, 300); // Wait for fade out to complete
    }

    nextVerbBtn.addEventListener('click', () => {
        currentVerbIndex = (currentVerbIndex + 1) % verbData.length;
        loadVerb();
    });

    loadVerb(); // Load the first verb
});
