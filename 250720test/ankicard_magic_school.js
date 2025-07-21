document.addEventListener('DOMContentLoaded',() => {
    const card = document.getElementById('card-display');
    const front = card.querySelector('.card-front');
    const back = card.querySelector('.card-back');
    const nextBtn = document.getElementById('next-card');
    const cards = [{q:'源頼朝',a:'1192年'},{q:'H₂O',a:'水'},{q:'Apple',a:'りんご'}];
    let current;
    function newCard(){
        card.classList.remove('flipped');
        current = cards[Math.floor(Math.random()*cards.length)];
        front.textContent = current.q;
        back.textContent = current.a;
    }
    card.addEventListener('click', () => card.classList.toggle('flipped'));
    nextBtn.addEventListener('click', newCard);
    newCard();
});