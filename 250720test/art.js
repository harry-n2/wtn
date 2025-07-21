document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('myChart').getContext('2d');
    const functionInput = document.getElementById('function-input');
    const colorPicker = document.getElementById('color-picker');
    const lineWidthRange = document.getElementById('line-width');
    const drawBtn = document.getElementById('draw-btn');
    const clearBtn = document.getElementById('clear-btn');
    const functionList = document.getElementById('function-list');

    let chart;
    let datasets = []; // 描画する関数のデータを保持する配列
    let datasetIdCounter = 0;

    const config = {
        type: 'line',
        data: {
            labels: [], // x軸のラベル
            datasets: []  // 描画データ
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: { display: true, text: 'x' }
                },
                y: {
                    title: { display: true, text: 'y' }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    };

    function initializeChart() {
        if (chart) {
            chart.destroy();
        }
        // x軸の範囲を設定
        const labels = [];
        for (let i = -10; i <= 10; i += 0.5) {
            labels.push(i);
        }
        config.data.labels = labels;
        config.data.datasets = datasets;
        chart = new Chart(ctx, config);
    }

    function drawFunction() {
        const funcStr = functionInput.value;
        if (!funcStr) {
            alert('関数式を入力してください。');
            return;
        }

        const data = [];
        try {
            // 'x'を引数とする関数を動的に生成
            const func = new Function('x', `return ${funcStr};`);
            chart.data.labels.forEach(x => {
                data.push(func(x));
            });
        } catch (e) {
            alert('数式の形式が正しくありません。\n例: 0.1 * x**3 - x');
            console.error(e);
            return;
        }

        const newDataset = {
            id: datasetIdCounter++,
            label: funcStr,
            data: data,
            borderColor: colorPicker.value,
            borderWidth: lineWidthRange.value,
            fill: false,
            tension: 0.1
        };

        datasets.push(newDataset);
        chart.update();
        updateFunctionList();
        functionInput.value = '';
    }

    function updateFunctionList() {
        functionList.innerHTML = '';
        datasets.forEach(ds => {
            const li = document.createElement('li');
            li.classList.add('function-item');
            li.dataset.id = ds.id;

            li.innerHTML = `
                <div class="function-info">
                    <div class="color-preview" style="background-color: ${ds.borderColor};"></div>
                    <span>y = ${ds.label}</span>
                </div>
                <button class="delete-func-btn">&times;</button>
            `;
            
            li.querySelector('.delete-func-btn').addEventListener('click', () => {
                removeFunction(ds.id);
            });

            functionList.appendChild(li);
        });
    }
    
    function removeFunction(id) {
        datasets = datasets.filter(ds => ds.id !== id);
        chart.data.datasets = datasets;
        chart.update();
        updateFunctionList();
    }

    function clearAll() {
        datasets = [];
        chart.data.datasets = datasets;
        chart.update();
        updateFunctionList();
    }

    // イベントリスナー
    drawBtn.addEventListener('click', drawFunction);
    clearBtn.addEventListener('click', clearAll);
    functionInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            drawFunction();
        }
    });

    // 初期化
    initializeChart();
});