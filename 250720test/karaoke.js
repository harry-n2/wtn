document.addEventListener('DOMContentLoaded', () => {
    const songData = [
        { english: "dog", japanese: "犬" },
        { english: "cat", japanese: "猫" },
        { english: "elephant", japanese: "象" },
        { english: "lion", japanese: "ライオン" },
        { english: "tiger", japanese: "トラ" },
        { english: "rabbit", japanese: "うさぎ" },
        { english: "monkey", japanese: "猿" },
        { english: "bird", japanese: "鳥" }
    ];

    const lyricsContainer = document.getElementById('lyrics-container');
    const playBtn = document.getElementById('play-btn');
    const stopBtn = document.getElementById('stop-btn');

    let karaokeInterval = null;
    let currentIndex = 0;

    function setupLyrics() {
        lyricsContainer.innerHTML = '';
        songData.forEach((word, index) => {
            const wordEl = document.createElement('div');
            wordEl.classList.add('lyric-word');
            wordEl.id = `word-${index}`;
            wordEl.innerHTML = `${word.english}<span class="japanese">${word.japanese}</span>`;
            lyricsContainer.appendChild(wordEl);
        });
    }

    function playKaraoke() {
        if (karaokeInterval) return; // Already playing

        playBtn.disabled = true;
        stopBtn.disabled = false;

        karaokeInterval = setInterval(() => {
            if (currentIndex > 0) {
                document.getElementById(`word-${currentIndex - 1}`).classList.remove('active');
            }
            
            if (currentIndex < songData.length) {
                const currentWordEl = document.getElementById(`word-${currentIndex}`);
                currentWordEl.classList.add('active');
                currentIndex++;
            } else {
                // End of song
                stopKaraoke();
            }
        }, 1500); // 1.5 seconds per word
    }

    function stopKaraoke() {
        clearInterval(karaokeInterval);
        karaokeInterval = null;
        currentIndex = 0;
        
        Array.from(lyricsContainer.children).forEach(child => {
            child.classList.remove('active');
        });

        playBtn.disabled = false;
        stopBtn.disabled = true;
    }

    playBtn.addEventListener('click', playKaraoke);
    stopBtn.addEventListener('click', stopKaraoke);

    // Initial setup
    setupLyrics();
    stopBtn.disabled = true;
});
