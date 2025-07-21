document.addEventListener('DOMContentLoaded', () => {
    const formulaInput = document.getElementById('formula-input');
    const goroawaseInput = document.getElementById('goroawase-input');
    const produceBtn = document.getElementById('produce-btn');
    const goroawaseList = document.getElementById('goroawase-list');
    const productionCount = document.getElementById('production-count');

    let myGoroawase = [];

    const defaultGoroawase = [
        { id: Date.now() + 1, formula: '平方根√2', goroawase: '一夜一夜に人見ごろ' },
        { id: Date.now() + 2, formula: '平方根√3', goroawase: '人並みにおごれや' },
        { id: Date.now() + 3, formula: '平方根√5', goroawase: '富士山麓オウム鳴く' }
    ];

    function saveGoroawase() {
        localStorage.setItem('myGoroawase', JSON.stringify(myGoroawase));
    }

    function loadGoroawase() {
        const saved = localStorage.getItem('myGoroawase');
        if (saved) {
            myGoroawase = JSON.parse(saved);
        } else {
            myGoroawase = [...defaultGoroawase]; // 保存されたものがなければデフォルトをセット
        }
    }

    function renderGoroawase() {
        goroawaseList.innerHTML = '';
        if (myGoroawase.length === 0) {
            goroawaseList.innerHTML = '<p>まだ製品がありません。生産ラインで新しい語呂合わせを作ろう！</p>';
        } else {
            myGoroawase.forEach(item => {
                const li = document.createElement('li');
                li.classList.add('goroawase-item');
                li.dataset.id = item.id;

                const h3 = document.createElement('h3');
                h3.textContent = item.formula;

                const p = document.createElement('p');
                p.textContent = item.goroawase;
                
                const deleteBtn = document.createElement('button');
                deleteBtn.classList.add('delete-btn');
                deleteBtn.innerHTML = '&times;'; // ×ボタン
                deleteBtn.addEventListener('click', deleteItem);

                li.appendChild(h3);
                li.appendChild(p);
                li.appendChild(deleteBtn);
                goroawaseList.appendChild(li);
            });
        }
        productionCount.textContent = myGoroawase.length;
    }
    
    function deleteItem(e) {
        const li = e.target.closest('.goroawase-item');
        const id = Number(li.dataset.id);
        myGoroawase = myGoroawase.filter(item => item.id !== id);
        saveGoroawase();
        renderGoroawase();
    }

    produceBtn.addEventListener('click', () => {
        const formula = formulaInput.value.trim();
        const goroawase = goroawaseInput.value.trim();

        if (!formula || !goroawase) {
            alert('「公式」と「語呂合わせ」の両方を入力してください！');
            return;
        }

        const newItem = {
            id: Date.now(),
            formula: formula,
            goroawase: goroawase
        };

        myGoroawase.unshift(newItem); // 新しいものを先頭に追加
        saveGoroawase();
        renderGoroawase();

        // 入力欄をクリア
        formulaInput.value = '';
        goroawaseInput.value = '';
        formulaInput.focus();
    });

    // ���期化
    loadGoroawase();
    renderGoroawase();
});
