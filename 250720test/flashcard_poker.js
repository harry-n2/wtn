document.addEventListener('DOMContentLoaded', () => {
    const handDiv = document.getElementById('player-hand');
    const questionText = document.getElementById('question-text');
    const answerInput = document.getElementById('answer-input');
    const answerBtn = document.getElementById('answer-btn');

    const deck = [
        { s: '数学', q: '12 * 12', a: '144' }, { s: '数学', q: '√169', a: '13' },
        { s: '理科', q: '水の化学式', a: 'H2O' }, { s: '理科', q: '人の染色体数', a: '46' },
        { s: '社会', q: '鎌倉幕府成立年', a: '1192' }, { s: '社会', q: 'アメリカの首都', a: 'ワシントンD.C.' },
        { s: '国語', q: '走るの尊敬語', a: 'お走りになる' }, { s: '国語', q: '「山」の対義語', a: '川' },
        { s: '英語', q: 'Apple', a: 'りんご' }, { s: '英語', q: 'Book', a: '本' },
    ];
    let hand = [];
    let selectedCard = null;

    function deal() {
        hand = deck.sort(() => Math.random() - 0.5).slice(0, 5);
        renderHand();
    }

    function renderHand() {
        handDiv.innerHTML = '';
        hand.forEach((card, index) => {
            const cardEl = document.createElement('div');
            cardEl.className = 'card';
            cardEl.dataset.index = index;
            cardEl.innerHTML = `<div class="subject">${card.s}</div><div class="question">???</div>`;
            cardEl.onclick = () => selectCard(card, cardEl);
            handDiv.appendChild(cardEl);
        });
    }

    function selectCard(card, cardEl) {
        document.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
        cardEl.classList.add('selected');
        selectedCard = { card, element: cardEl };
        questionText.textContent = `【問題】${card.q}`;
        answerInput.value = '';
        answerInput.focus();
    }

    answerBtn.addEventListener('click', () => {
        if (!selectedCard) {
            alert('交換したいカードを選んでください。');
            return;
        }
        if (answerInput.value.toLowerCase() === selectedCard.card.a.toLowerCase()) {
            alert('正解！カー��を交換します。');
            const newCard = deck.find(c => !hand.includes(c));
            const index = hand.indexOf(selectedCard.card);
            hand[index] = newCard;
            renderHand(); // 再描画
        } else {
            alert('不正解！交換できません。');
        }
        questionText.textContent = '';
        answerInput.value = '';
        selectedCard = null;
    });

    deal();
});
