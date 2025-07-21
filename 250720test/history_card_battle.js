document.addEventListener('DOMContentLoaded', () => {
    const handDiv = document.getElementById('hand');
    const playerSlot = document.querySelector('#player-area .card-slot');
    const enemySlot = document.querySelector('#enemy-area .card-slot');

    const cards = [
        { name: '織田信長', power: 95, era: '戦国' },
        { name: '徳川家康', power: 92, era: '江戸' },
        { name: '坂本龍馬', power: 88, era: '幕末' },
        { name: 'クレオパトラ', power: 85, era: '古代' },
        { name: 'ナポレオン', power: 98, era: '近代' },
    ];
    let hand = [];

    function setup() {
        hand = [...cards].sort(() => Math.random() - 0.5).slice(0, 3);
        renderHand();
    }

    function renderHand() {
        handDiv.innerHTML = '';
        hand.forEach(card => {
            const cardEl = document.createElement('div');
            cardEl.className = 'card';
            cardEl.innerHTML = `<h3>${card.name}</h3><p>${card.era}</p><p class="power">${card.power}</p>`;
            cardEl.onclick = () => playCard(card, cardEl);
            handDiv.appendChild(cardEl);
        });
    }

    function playCard(playerCard, cardEl) {
        const enemyCard = cards[Math.floor(Math.random() * cards.length)];
        
        playerSlot.innerHTML = cardEl.innerHTML;
        enemySlot.innerHTML = `<div class="card"><h3>${enemyCard.name}</h3><p>${enemyCard.era}</p><p class="power">${enemyCard.power}</p></div>`;
        
        if (playerCard.power > enemyCard.power) {
            alert(`${playerCard.name}の勝利！`);
        } else {
            alert(`${enemyCard.name}の勝利...`);
        }
        
        cardEl.remove();
        if (handDiv.children.length === 0) {
            alert('手札がなくなった！ゲーム終了。');
        }
    }

    setup();
});
