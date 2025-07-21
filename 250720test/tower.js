document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const sideAInput = document.getElementById('side-a');
    const sideBInput = document.getElementById('side-b');
    const sideCResult = document.getElementById('side-c-result');
    const buildBtn = document.getElementById('build-btn');
    const towerDisplay = document.getElementById('tower-display');
    const towerHeightDisplay = document.getElementById('tower-height');

    let totalHeight = 0;

    function calculateC() {
        const a = parseFloat(sideAInput.value);
        const b = parseFloat(sideBInput.value);

        if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) {
            sideCResult.textContent = "?";
            return null;
        }

        const c = Math.sqrt(a**2 + b**2);
        sideCResult.textContent = c.toFixed(2);
        return { a, b, c };
    }

    function buildBlock() {
        const values = calculateC();
        if (!values) {
            alert("辺aと辺bには、0より大きい数値を入力してください。");
            return;
        }

        const { a, b, c } = values;

        // 新しいブロックを作成
        const block = document.createElement('div');
        block.classList.add('tower-block');
        
        // 簡単化のため、幅をb、高さをaとする
        const blockWidth = b * 20; // スケール調整
        const blockHeight = a * 20;

        block.style.width = `${blockWidth}px`;
        block.style.height = `${blockHeight}px`;
        block.style.clipPath = 'polygon(0% 100%, 100% 100%, 100% 0%)'; // 右下の直角三角形
        block.innerHTML = `a:${a}<br>b:${b}<br>c:${c.toFixed(1)}`;

        // タワーに追加
        towerDisplay.appendChild(block);

        // 高さを更新
        totalHeight += a;
        towerHeightDisplay.textContent = totalHeight.toFixed(2);
    }

    // Event Listeners
    sideAInput.addEventListener('input', calculateC);
    sideBInput.addEventListener('input', calculateC);
    buildBtn.addEventListener('click', buildBlock);

    // Initialize
    calculateC();
});
