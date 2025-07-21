document.addEventListener('DOMContentLoaded', () => {
    const wordData = [
        {
            eng: "study",
            jpn: "勉強する",
            goro: "酢豚で勉強する",
            monster: { name: "スライム", img: "💧" }
        },
        {
            eng: "language",
            jpn: "言語",
            goro: "らんぐいっじ(乱杭打ち)する野蛮な言語",
            monster: { name: "ゴブリン", img: "👺" }
        },
        {
            eng: "village",
            jpn: "村",
            goro: "ビリジアン色の村",
            monster: { name: "オーク", img: "👹" }
        },
        {
            eng: "important",
            jpn: "重要な",
            goro: "陰謀担う、重要な役",
            monster: { name: "ドラゴン", img: "🐲" }
        }
    ];

    let currentWordIndex = 0;
    let exp = 0;

    const monsterNameEl = document.getElementById('monster-name');
    const monsterImageEl = document.getElementById('monster-image');
    const expEl = document.getElementById('exp');
    const goroawaseTextEl = document.getElementById('goroawase-text');
    const englishWordEl = document.getElementById('english-word');
    const japaneseMeaningEl = document.getElementById('japanese-meaning');
    const nextWordBtn = document.getElementById('next-word-btn');

    function loadWord() {
        const word = wordData[currentWordIndex];
        
        monsterNameEl.textContent = word.monster.name;
        monsterImageEl.textContent = word.monster.img;
        goroawaseTextEl.textContent = `【ゴロ】：${word.goro}`;
        englishWordEl.textContent = word.eng;
        japaneseMeaningEl.textContent = word.jpn;
        
        expEl.textContent = exp;
    }

    nextWordBtn.addEventListener('click', () => {
        // Add EXP
        exp += 10;
        
        // Go to next word
        currentWordIndex = (currentWordIndex + 1) % wordData.length;
        
        // Update screen
        loadWord();
    });

    loadWord(); // Load the first word
});
