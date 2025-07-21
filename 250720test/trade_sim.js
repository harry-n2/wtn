document.addEventListener('DOMContentLoaded', () => {
    const moneyText = document.getElementById('money');
    const cityText = document.getElementById('current-city');
    const priceTable = document.getElementById('price-table');
    const travelBtn = document.getElementById('travel-btn');

    const cities = ['A国', 'B国', 'C国'];
    const goods = ['絹', '香辛料', '茶'];
    let money = 1000;
    let inventory = { '絹': 0, '香辛料': 0, '茶': 0 };
    let currentCityIndex = 0;

    function updateMarket() {
        cityText.textContent = cities[currentCityIndex];
        moneyText.textContent = money;
        priceTable.innerHTML = '<tr><th>商品</th><th>価格</th><th>所持数</th><th>売買</th></tr>';
        
        goods.forEach(good => {
            const price = Math.floor(Math.random() * 50) + 50 + currentCityIndex * 20; // 都市���価格変動
            priceTable.innerHTML += `
                <tr>
                    <td>${good}</td><td>${price}G</td><td>${inventory[good]}</td>
                    <td>
                        <button class="gr-button buy-btn" onclick="buy('${good}', ${price})">買</button>
                        <button class="gr-button sell-btn" onclick="sell('${good}', ${price})">売</button>
                    </td>
                </tr>`;
        });
    }

    window.buy = (good, price) => {
        if (money >= price) {
            money -= price;
            inventory[good]++;
            updateMarket();
        } else { alert('お金が足りません！'); }
    };
    window.sell = (good, price) => {
        if (inventory[good] > 0) {
            money += price;
            inventory[good]--;
            updateMarket();
        } else { alert('商品がありません！'); }
    };

    travelBtn.addEventListener('click', () => {
        currentCityIndex = (currentCityIndex + 1) % cities.length;
        updateMarket();
    });

    updateMarket();
});
