document.addEventListener('DOMContentLoaded', () => {
    const gemDisplay = document.getElementById('gem-display');
    const digBtn = document.getElementById('dig-btn');
    const collectionDiv = document.getElementById('collection');

    const gems = [
        { name: '石英', emoji: '⬜️' },
        { name: 'ダイヤモンド', emoji: '💎' },
        { name: 'ルビー', emoji: '🟥' },
        { name: 'エメラルド', emoji: '🟩' },
    ];
    let collection = [];

    function dig() {
        const found = gems[Math.floor(Math.random() * gems.length)];
        gemDisplay.textContent = found.emoji;
        
        const answer = prompt(`この鉱物の名前は？ (ヒント: ${found.name})`);
        if (answer === found.name) {
            alert('正解！コレクションに追加！');
            if (!collection.includes(found.emoji)) {
                collection.push(found.emoji);
                updateCollection();
            }
        } else {
            alert(`残念！正解は「${found.name}」でした。`);
        }
    }

    function updateCollection() {
        collectionDiv.innerHTML = '';
        collection.forEach(gem => {
            const el = document.createElement('div');
            el.className = 'gem';
            el.textContent = gem;
            collectionDiv.appendChild(el);
        });
    }

    digBtn.addEventListener('click', dig);
});
