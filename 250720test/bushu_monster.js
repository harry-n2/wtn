document.addEventListener('DOMContentLoaded', () => {
    const bushuListDiv = document.getElementById('bushu-list');
    const slot1 = document.getElementById('slot1');
    const slot2 = document.getElementById('slot2');
    const fusionBtn = document.getElementById('fusion-btn');
    const monsterDisplay = document.getElementById('monster-display');
    const kanjiExample = document.getElementById('kanji-example');

    const bushuData = [
        { bushu: '人', monster: '🧍', kanji: '休' }, { bushu: '木', monster: '🌳', kanji: '林' },
        { bushu: '水', monster: '💧', kanji: '海' }, { bushu: '火', monster: '🔥', kanji: '炎' },
        { bushu: '魚', monster: '🐟', kanji: '鮮' }, { bushu: '鳥', monster: '🐦', kanji: '鳴' },
    ];
    let selected1 = null, selected2 = null;

    function setup() {
        bushuData.forEach(b => {
            const el = document.createElement('div');
            el.className = 'bushu';
            el.textContent = b.bushu;
            el.onclick = () => selectBushu(b);
            bushuListDiv.appendChild(el);
        });
    }

    function selectBushu(b) {
        if (!selected1) {
            selected1 = b;
            slot1.textContent = b.bushu;
        } else if (!selected2) {
            selected2 = b;
            slot2.textContent = b.bushu;
        }
    }

    function fusion() {
        if (!selected1 || !selected2) {
            alert('部首を2つ選んでください！');
            return;
        }
        monsterDisplay.textContent = selected1.monster + selected2.monster;
        kanjiExample.textContent = `例: ${selected1.bushu} + 〇 = ${selected1.kanji}, ${selected2.bushu} + 〇 = ${selected2.kanji}`;
        
        // reset
        selected1 = null; selected2 = null;
        slot1.textContent = '？';
        slot2.textContent = '？';
    }

    fusionBtn.addEventListener('click', fusion);
    setup();
});
