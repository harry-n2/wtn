document.addEventListener('DOMContentLoaded', () => {
    const sentenceData = [
        { text: "This is a pen.", kana: "ディス イズ ア ペン" },
        { text: "I have a dream.", kana: "アイ ハヴ ア ドリーム" },
        { text: "How are you?", kana: "ハウ アー ユー" },
        { text: "Nice to meet you.", kana: "ナイス トゥ ミート ユー" },
        { text: "What time is it now?", kana: "ワット タイム イズ イット ナウ" }
    ];

    let currentSentenceIndex = 0;
    let isRecording = false;

    const sentenceTextEl = document.getElementById('sentence-text');
    const sentenceKanaEl = document.getElementById('sentence-kana');
    const playModelBtn = document.getElementById('play-model-btn');
    const recordBtn = document.getElementById('record-btn');
    const recordStatusEl = document.getElementById('record-status');
    const resultTextEl = document.getElementById('result-text');
    const nextSentenceBtn = document.getElementById('next-sentence-btn');

    function loadSentence() {
        const sentence = sentenceData[currentSentenceIndex];
        sentenceTextEl.textContent = sentence.text;
        sentenceKanaEl.textContent = sentence.kana;
        resultTextEl.textContent = 'ここに評価が表示されます';
        resultTextEl.style.color = '#3a7bd5';
        recordStatusEl.textContent = 'タップして録音開始';
    }

    playModelBtn.addEventListener('click', () => {
        console.log("Simulating playing model audio for:", sentenceData[currentSentenceIndex].text);
        resultTextEl.textContent = 'お手本を再生中...';
        setTimeout(() => {
            resultTextEl.textContent = 'さあ、あなたの番！';
        }, 1500);
    });

    recordBtn.addEventListener('click', () => {
        if (isRecording) return;

        isRecording = true;
        recordBtn.classList.add('recording');
        recordStatusEl.textContent = '録音中... (3秒)';
        
        let countdown = 3;
        const interval = setInterval(() => {
            countdown--;
            recordStatusEl.textContent = `録音中... (${countdown}秒)`;
            if (countdown <= 0) {
                clearInterval(interval);
                stopRecording();
            }
        }, 1000);
    });

    function stopRecording() {
        isRecording = false;
        recordBtn.classList.remove('recording');
        recordStatusEl.textContent = '録音完了！';
        
        // Simulate analysis and show dummy result
        resultTextEl.textContent = '解析中...';
        setTimeout(() => {
            const scores = ["すばらしい！", "そっくり！", "良い感じ！", "あともう少し！"];
            const randomScore = scores[Math.floor(Math.random() * scores.length)];
            resultTextEl.textContent = `評価：${randomScore}`;
        }, 2000);
    }

    nextSentenceBtn.addEventListener('click', () => {
        currentSentenceIndex = (currentSentenceIndex + 1) % sentenceData.length;
        loadSentence();
    });

    loadSentence();
});
