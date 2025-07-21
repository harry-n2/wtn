document.addEventListener('DOMContentLoaded', () => {
    const title = document.getElementById('event-title');
    const image = document.getElementById('event-image');
    const text = document.getElementById('event-text');
    const nextBtn = document.getElementById('next-btn');

    const events = [
        { title: '朝: 米を研ぐ', img: '🍚', text: 'かまどでご飯を炊く準備。' },
        { title: '昼: 寺子屋で学ぶ', img: '✍️', text: '読み書きそろばんを習う。' },
        { title: '夕: 銭湯に行く', img: '♨️', text: '一日の汗を流す。' },
        { title: '夜: 行灯の明かりで過ごす', img: '🏮', text: '静かな夜が更けていく。' },
    ];
    let eventIndex = 0;

    function showEvent() {
        const event = events[eventIndex];
        title.textContent = event.title;
        image.textContent = event.img;
        text.textContent = event.text;
    }

    nextBtn.addEventListener('click', () => {
        eventIndex = (eventIndex + 1) % events.length;
        showEvent();
    });

    showEvent();
});
