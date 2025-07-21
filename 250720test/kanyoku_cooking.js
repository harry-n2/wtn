document.addEventListener('DOMContentLoaded', () => {
    const cookingPot = document.getElementById('cooking-pot');
    const ingredientsDiv = document.getElementById('ingredients');
    const meaningText = document.getElementById('meaning-text');

    const idioms = [
        { parts: ['猫', 'の', '手', 'も', '借りたい'], meaning: '非常に忙しいこと' },
        { parts: ['油', 'を', '売る'], meaning: '無駄話をして時間を潰すこと' },
        { parts: ['目', 'が', 'ない'], meaning: '非常に好きだということ' },
    ];
    let currentQ;
    let cooked = [];

    function newRecipe() {
        currentQ = idioms[Math.floor(Math.random() * idioms.length)];
        cooked = [];
        cookingPot.innerHTML = '';
        meaningText.textContent = `意味：${currentQ.meaning}`;
        
        ingredientsDiv.innerHTML = '';
        currentQ.parts.sort(() => Math.random() - 0.5).forEach(part => {
            const el = document.createElement('div');
            el.className = 'ingredient';
            el.textContent = part;
            el.onclick = () => addIngredient(el, part);
            ingredientsDiv.appendChild(el);
        });
    }

    function addIngredient(element, part) {
        if (element.classList.contains('used')) return;
        element.classList.add('used');
        cooked.push(part);
        
        const cookedEl = document.createElement('div');
        cookedEl.className = 'ingredient';
        cookedEl.textContent = part;
        cookingPot.appendChild(cookedEl);

        if (cooked.length === currentQ.parts.length) {
            checkResult();
        }
    }

    function checkResult() {
        if (cooked.join('') === currentQ.parts.join('')) {
            alert('美味しい慣用句ができた！正解！');
        } else {
            alert('うーん、味が変だ...。不正解！');
        }
        newRecipe();
    }
    newRecipe();
});
