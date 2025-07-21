document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const chipsAmountDisplay = document.getElementById('chips-amount');
    const deckAmountDisplay = document.getElementById('deck-amount');
    const baseCardDisplay = document.getElementById('base-card');
    const resultCardDisplay = document.getElementById('result-card');
    const messageText = document.getElementById('message-text');
    const betAmountInput = document.getElementById('bet-amount');
    const highBtn = document.getElementById('high-btn');
    const lowBtn = document.getElementById('low-btn');
    const probabilityDisplay = document.getElementById('probability-display');

    // Game State
    let playerChips = 100;
    let deck = [];
    let baseCard = null;
    let isGameOver = false;

    const SUITS = ['♠', '♥', '♦', '♣'];
    const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const VALUES = { 'A': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13 };

    function createDeck() {
        deck = [];
        for (const suit of SUITS) {
            for (const rank of RANKS) {
                deck.push({ suit, rank, value: VALUES[rank] });
            }
        }
    }

    function shuffleDeck() {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
    }

    function drawCard() {
        if (deck.length === 0) {
            messageText.textContent = '山札がなくなりました！新しいデッキで始めます。';
            startGame();
        }
        return deck.pop();
    }

    function renderCard(element, card) {
        element.classList.remove('card-placeholder');
        const isRed = card.suit === '♥' || card.suit === '♦';
        element.className = 'card';
        element.classList.add(isRed ? 'red' : 'black');
        element.textContent = card.rank;
        element.setAttribute('data-suit', card.suit);
        element.style.setProperty('--suit-before', `"${card.suit}"`);
        element.style.setProperty('--suit-after', `"${card.suit}"`);
    }

    function updateUI() {
        chipsAmountDisplay.textContent = playerChips;
        deckAmountDisplay.textContent = deck.length;
        betAmountInput.max = playerChips;
    }

    function calculateProbability() {
        if (!baseCard) {
            probabilityDisplay.innerHTML = '<p>ゲームを開始してください。</p>';
            return;
        }
        const higherCount = deck.filter(card => card.value > baseCard.value).length;
        const lowerCount = deck.filter(card => card.value < baseCard.value).length;
        const equalCount = deck.filter(card => card.value === baseCard.value).length;
        const total = deck.length;

        const highProb = total > 0 ? (higherCount / total * 100).toFixed(1) : 0;
        const lowProb = total > 0 ? (lowerCount / total * 100).toFixed(1) : 0;

        probabilityDisplay.innerHTML = `
            <p><strong>ハイが出る確率:</strong> ${highProb}% (${higherCount}/${total})</p>
            <p><strong>ローが出る確率:</strong> ${lowProb}% (${lowerCount}/${total})</p>
            <p><strong>同じ数字の確率:</strong> ${(total > 0 ? (equalCount / total * 100).toFixed(1) : 0)}% (${equalCount}/${total})</p>
        `;
    }

    function placeBet(choice) {
        if (isGameOver) return;
        const bet = parseInt(betAmountInput.value, 10);
        if (bet <= 0 || bet > playerChips) {
            messageText.textContent = '正しいチップを賭けてください。';
            return;
        }

        playerChips -= bet;
        const resultCard = drawCard();
        renderCard(resultCardDisplay, resultCard);

        let win = false;
        if (choice === 'high' && resultCard.value > baseCard.value) win = true;
        if (choice === 'low' && resultCard.value < baseCard.value) win = true;

        if (win) {
            messageText.textContent = `当たり！ ${bet * 2}チップ獲得！`;
            playerChips += bet * 2;
        } else if (resultCard.value === baseCard.value) {
            messageText.textContent = '引き分け！チ��プは返却されます。';
            playerChips += bet;
        } else {
            messageText.textContent = 'ハズレ...';
        }

        if (playerChips <= 0) {
            messageText.textContent = 'チップがなくなりました...ゲームオーバー';
            isGameOver = true;
            highBtn.disabled = true;
            lowBtn.disabled = true;
        }

        updateUI();
        
        // 次のゲームへ
        setTimeout(() => {
            if (!isGameOver) {
                baseCard = drawCard();
                renderCard(baseCardDisplay, baseCard);
                resultCardDisplay.className = 'card card-placeholder';
                resultCardDisplay.textContent = '?';
                messageText.textContent = '次の勝負！ハイかローを選んでください。';
                updateUI();
                calculateProbability();
            }
        }, 2000);
    }

    function startGame() {
        isGameOver = false;
        playerChips = 100;
        createDeck();
        shuffleDeck();
        baseCard = drawCard();
        
        renderCard(baseCardDisplay, baseCard);
        resultCardDisplay.className = 'card card-placeholder';
        resultCardDisplay.textContent = '?';
        highBtn.disabled = false;
        lowBtn.disabled = false;
        
        updateUI();
        calculateProbability();
    }

    highBtn.addEventListener('click', () => placeBet('high'));
    lowBtn.addEventListener('click', () => placeBet('low'));

    startGame();
});
