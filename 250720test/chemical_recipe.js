document.addEventListener('DOMContentLoaded', () => {
    const recipeName = document.getElementById('recipe-name');
    const resultDisplay = document.getElementById('result-display');
    const ingredientsDiv = document.getElementById('ingredients');
    const cookBtn = document.getElementById('cook-btn');

    const recipes = [
        { name: '水', formula: 'H₂O', ingredients: ['H', 'H', 'O'] },
        { name: '二酸化炭素', formula: 'CO₂', ingredients: ['C', 'O', 'O'] },
        { name: '塩化ナトリウム', formula: 'NaCl', ingredients: ['Na', 'Cl'] },
    ];
    const allIngredients = ['H', 'O', 'C', 'Na', 'Cl', 'Fe'];
    let currentRecipe;
    let selected = [];

    function newRecipe() {
        currentRecipe = recipes[Math.floor(Math.random() * recipes.length)];
        recipeName.textContent = currentRecipe.name;
        resultDisplay.textContent = `完成品: ${currentRecipe.formula}`;
        selected = [];
        
        ingredientsDiv.innerHTML = '';
        allIngredients.sort(() => Math.random() - 0.5).forEach(ing => {
            const btn = document.createElement('button');
            btn.className = 'gr-button ingredient-btn';
            btn.textContent = ing;
            btn.onclick = () => selectIngredient(btn, ing);
            ingredientsDiv.appendChild(btn);
        });
    }

    function selectIngredient(btn, ing) {
        btn.classList.toggle('selected');
        if (selected.includes(ing)) {
            selected.splice(selected.indexOf(ing), 1);
        } else {
            selected.push(ing);
        }
    }

    cookBtn.addEventListener('click', () => {
        if (selected.sort().join(',') === currentRecipe.ingredients.sort().join(',')) {
            alert('美味しい料理ができた！正解！');
            newRecipe();
        } else {
            alert('失敗作だ...。材料を確認しよう！');
        }
    });

    newRecipe();
});
