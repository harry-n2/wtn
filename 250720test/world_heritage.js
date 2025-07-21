document.addEventListener('DOMContentLoaded', () => {
    const mainPhoto = document.getElementById('main-photo');
    const heritageName = document.getElementById('heritage-name');
    const thumbnailsDiv = document.getElementById('thumbnails');

    const heritages = [
        { name: '姫路城 (日本)', color: '#fce4ec' },
        { name: 'ピラミッド (エジプト)', color: '#fffde7' },
        { name: '自由の女神 (アメリカ)', color: '#e0f7fa' },
        { name: 'マチュピチュ (ペルー)', color: '#e8f5e9' },
    ];

    function showHeritage(heritage, thumbEl) {
        mainPhoto.style.backgroundColor = heritage.color; // ダミー
        heritageName.textContent = heritage.name;
        
        document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
        thumbEl.classList.add('active');
    }

    function setup() {
        heritages.forEach(h => {
            const thumb = document.createElement('div');
            thumb.className = 'thumb';
            thumb.style.backgroundColor = h.color; // ダミー
            thumb.onclick = () => showHeritage(h, thumb);
            thumbnailsDiv.appendChild(thumb);
        });
        // 初期表示
        showHeritage(heritages[0], thumbnailsDiv.children[0]);
    }
    setup();
});
