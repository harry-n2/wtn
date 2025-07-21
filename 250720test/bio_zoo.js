document.addEventListener('DOMContentLoaded', () => {
    const areasDiv = document.getElementById('areas');
    const animalsDiv = document.getElementById('animals');

    const classification = {
        '哺乳類': ['🐘', '🦒', '🦓'],
        '鳥類': ['🦜', '🦢', '🐧'],
        '爬虫類': ['🐢', '🐍', '🐊'],
    };
    const allAnimals = Object.values(classification).flat();
    let draggedItem = null;

    function setup() {
        for (const areaName in classification) {
            const area = document.createElement('div');
            area.className = 'area';
            area.dataset.area = areaName;
            area.innerHTML = `<h3>${areaName}</h3>`;
            area.addEventListener('dragover', e => e.preventDefault());
            area.addEventListener('drop', drop);
            areasDiv.appendChild(area);
        }

        allAnimals.sort(() => Math.random() - 0.5).forEach(animalEmoji => {
            const animal = document.createElement('div');
            animal.className = 'animal';
            animal.textContent = animalEmoji;
            animal.draggable = true;
            animal.addEventListener('dragstart', e => draggedItem = e.target);
            animalsDiv.appendChild(animal);
        });
    }

    function drop(e) {
        e.preventDefault();
        const areaDiv = e.target.closest('.area');
        const animalEmoji = draggedItem.textContent;
        
        let correctArea = '';
        for (const area in classification) {
            if (classification[area].includes(animalEmoji)) {
                correctArea = area;
                break;
            }
        }

        if (areaDiv.dataset.area === correctArea) {
            areaDiv.appendChild(draggedItem);
            draggedItem.draggable = false;
            draggedItem.style.cursor = 'default';
            if (animalsDiv.children.length === 0) {
                alert('全部分類できた！君は名園長だ！');
            }
        } else {
            alert('エリアが違うよ！');
        }
    }
    setup();
});
