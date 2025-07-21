document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const playerShape = document.getElementById('player-shape');
    const enemyShape = document.getElementById('enemy-shape');
    const playerHp = document.getElementById('player-hp');
    const enemyHp = document.getElementById('enemy-hp');
    const rotateSlider = document.getElementById('rotate-slider');
    const scaleSlider = document.getElementById('scale-slider');
    const attackBtn = document.getElementById('attack-btn');
    const logArea = document.getElementById('log-area');

    // Game State
    let p_hp = 100;
    let e_hp = 100;
    let p_transform = { rotate: 0, scale: 1 };
    let e_transform = { rotate: 0, scale: 1 };

    function updatePlayerShape() {
        p_transform.rotate = rotateSlider.value;
        p_transform.scale = scaleSlider.value;
        playerShape.style.transform = `rotate(${p_transform.rotate}deg) scale(${p_transform.scale})`;
    }

    function randomizeEnemyShape() {
        e_transform.rotate = Math.floor(Math.random() * 360);
        e_transform.scale = (Math.random() * 1.5 + 0.5).toFixed(1);
        enemyShape.style.transform = `rotate(${e_transform.rotate}deg) scale(${e_transform.scale})`;
        addLog("敵が体勢を変えた！");
    }

    function addLog(message) {
        logArea.innerHTML = `<p>${message}</p>` + logArea.innerHTML;
    }

    function attack() {
        const rotDiff = Math.abs(p_transform.rotate - e_transform.rotate);
        const scaleDiff = Math.abs(p_transform.scale - e_transform.scale);

        // 許容誤差
        const rotTolerance = 10; // ±10度
        const scaleTolerance = 0.2; // ±0.2

        if (rotDiff <= rotTolerance && scaleDiff <= scaleTolerance) {
            // Player attack
            const damage = Math.floor(Math.random() * 20) + 15;
            e_hp -= damage;
            addLog(`会心の一撃！敵に ${damage} のダメージ！`);
            document.getElementById('enemy-side').classList.add('damage-anim');
        } else {
            // Enemy attack
            const damage = Math.floor(Math.random() * 15) + 5;
            p_hp -= damage;
            addLog(`攻撃失敗！反撃を受け ${damage} のダメージ！`);
            document.getElementById('player-side').classList.add('damage-anim');
        }

        updateHP();
        checkGameOver();
        
        if (e_hp > 0) {
            randomizeEnemyShape();
        }

        // アニメーションクラスを削除
        setTimeout(() => {
            document.getElementById('enemy-side').classList.remove('damage-anim');
            document.getElementById('player-side').classList.remove('damage-anim');
        }, 500);
    }

    function updateHP() {
        playerHp.style.width = `${p_hp}%`;
        enemyHp.style.width = `${e_hp}%`;
    }

    function checkGameOver() {
        if (p_hp <= 0) {
            p_hp = 0;
            addLog("プレイヤーのHPが0に...敗北。");
            attackBtn.disabled = true;
        }
        if (e_hp <= 0) {
            e_hp = 0;
            addLog("敵を倒した！勝利！");
            attackBtn.disabled = true;
        }
        updateHP();
    }

    // Event Listeners
    rotateSlider.addEventListener('input', updatePlayerShape);
    scaleSlider.addEventListener('input', updatePlayerShape);
    attackBtn.addEventListener('click', attack);

    // Initialize
    addLog("バトル開始！敵の図形と同じ形に変身させて攻撃だ！");
    updatePlayerShape();
    randomizeEnemyShape();
    updateHP();
});
