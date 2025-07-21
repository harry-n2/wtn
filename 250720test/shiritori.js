document.addEventListener('DOMContentLoaded', () => {
    const cpuWordList = {
        a: ["apple", "ant", "arm", "art"],
        b: ["book", "box", "bus", "bed"],
        c: ["cat", "cup", "car", "cake"],
        d: ["dog", "desk", "door", "duck"],
        e: ["egg", "ear", "eye", "end"],
        f: ["fan", "fox", "fish", "flag"],
        g: ["grape", "game", "girl", "gold"],
        h: ["hat", "hand", "house", "hen"],
        k: ["key", "king", "kite", "knee"],
        l: ["lion", "leg", "lamp", "leaf"],
        m: ["map", "moon", "milk", "mouse"],
        n: ["note", "nose", "net", "nine"],
        o: ["orange", "one", "oil", "octopus"],
        p: ["pen", "pig", "park", "pan"],
        r: ["rabbit", "red", "ring", "rain"],
        s: ["sun", "star", "ship", "sock"],
        t: ["tiger", "table", "tree", "train"],
        y: ["yacht", "yarn", "yellow", "yo-yo"]
    };

    let usedWords = [];
    let currentLetter = 'a';
    let isPlayerTurn = true;

    const promptLetterEl = document.getElementById('prompt-letter');
    const wordInput = document.getElementById('word-input');
    const submitBtn = document.getElementById('submit-word-btn');
    const errorMessageEl = document.getElementById('error-message');
    const turnIndicatorEl = document.getElementById('turn-indicator');
    const playerBubbles = document.querySelector('#player-you .word-bubble-container');
    const cpuBubbles = document.querySelector('#player-cpu .word-bubble-container');
    const resetBtn = document.getElementById('reset-game-btn');

    function startGame() {
        usedWords = [];
        currentLetter = 'a';
        isPlayerTurn = true;
        playerBubbles.innerHTML = '';
        cpuBubbles.innerHTML = '';
        updateTurnIndicator();
        wordInput.value = '';
        wordInput.focus();
    }

    function updateTurnIndicator() {
        promptLetterEl.textContent = currentLetter.toUpperCase();
        wordInput.placeholder = `で始まる単語を入力`;
        if (isPlayerTurn) {
            turnIndicatorEl.textContent = 'あなたの番です';
            wordInput.disabled = false;
            submitBtn.disabled = false;
        } else {
            turnIndicatorEl.textContent = 'CPUが考えています...';
            wordInput.disabled = true;
            submitBtn.disabled = true;
            setTimeout(cpuTurn, 1500);
        }
    }

    function addWordBubble(word, player) {
        const bubble = document.createElement('div');
        bubble.className = 'word-bubble';
        bubble.textContent = word;
        if (player === 'you') {
            playerBubbles.appendChild(bubble);
        } else {
            cpuBubbles.appendChild(bubble);
        }
        // Scroll to bottom
        const arena = document.querySelector('.battle-arena');
        arena.scrollTop = arena.scrollHeight;
    }

    function handlePlayerInput() {
        const word = wordInput.value.trim().toLowerCase();
        errorMessageEl.textContent = '';

        if (!word.startsWith(currentLetter)) {
            errorMessageEl.textContent = `「${currentLetter.toUpperCase()}」で始まる単語を入力してください。`;
            return;
        }
        if (usedWords.includes(word)) {
            errorMessageEl.textContent = 'その単語は既に使用されています。';
            return;
        }

        processWord(word, 'you');
    }
    
    function processWord(word, player) {
        usedWords.push(word);
        addWordBubble(word, player);
        
        const lastLetter = word.slice(-1);
        currentLetter = lastLetter;
        
        isPlayerTurn = !isPlayerTurn;
        wordInput.value = '';
        updateTurnIndicator();
    }

    function cpuTurn() {
        const possibleWords = cpuWordList[currentLetter];
        if (!possibleWords) {
            endGame('cpu'); // CPU doesn't know words starting with this letter
            return;
        }

        const availableWords = possibleWords.filter(word => !usedWords.includes(word));

        if (availableWords.length === 0) {
            endGame('cpu'); // CPU has no more words
        } else {
            const word = availableWords[Math.floor(Math.random() * availableWords.length)];
            processWord(word, 'cpu');
        }
    }
    
    function endGame(loser) {
        wordInput.disabled = true;
        submitBtn.disabled = true;
        if (loser === 'cpu') {
            turnIndicatorEl.textContent = 'あなたの勝ちです！';
            errorMessageEl.textContent = `「${currentLetter.toUpperCase()}」で始まる単語がCPUには無かったようです。`;
        } else {
            turnIndicatorEl.textContent = 'CPUの勝ちです...';
        }
    }

    submitBtn.addEventListener('click', handlePlayerInput);
    wordInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') handlePlayerInput();
    });
    resetBtn.addEventListener('click', startGame);

    startGame();
});
