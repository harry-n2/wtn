document.addEventListener('DOMContentLoaded', () => {
    const seasonBtns = document.querySelectorAll('.season-btn');
    const photoArea = document.getElementById('photo-area');
    const kigoList = document.getElementById('kigo-list');

    const kigoData = {
        spring: { photo: '🌸', kigo: ['桜', 'うぐいす', '霞', '蝶'] },
        summer: { photo: '🍉', kigo: ['風鈴', 'ひまわり', '天の川', '蝉'] },
        autumn: { photo: '🍁', kigo: ['月', '紅葉', '鈴虫', '稲穂'] },
        winter: { photo: '❄️', kigo: ['雪', 'こたつ', '水仙', 'ふぐ'] },
    };

    function showSeason(season) {
        const data = kigoData[season];
        // photoArea.style.backgroundImage = `url(...)`; // 本来は画像URL
        photoArea.textContent = data.photo;
        photoArea.style.fontSize = '10em';
        photoArea.style.textAlign = 'center';
        photoArea.style.lineHeight = '250px';

        kigoList.innerHTML = '';
        data.kigo.forEach(k => {
            const li = document.createElement('li');
            li.textContent = k;
            kigoList.appendChild(li);
        });
    }

    seasonBtns.forEach(btn => {
        btn.addEventListener('click', () => showSeason(btn.dataset.season));
    });

    // 初期表示
    showSeason('spring');
});
