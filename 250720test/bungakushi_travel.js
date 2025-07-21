document.addEventListener('DOMContentLoaded', () => {
    const timelineDiv = document.getElementById('timeline');
    const cardDeckDiv = document.getElementById('card-deck');

    const eras = {
        '平安': { works: ['枕草子', '源氏物語'] },
        '鎌倉': { works: ['方丈記', '平家物語'] },
        '江戸': { works: ['奥の細道', '東海道中膝栗毛'] },
    };
    const allWorks = Object.values(eras).flatMap(e => e.works);
    let draggedItem = null;

    function setup() {
        timelineDiv.innerHTML = '';
        for (const eraName in eras) {
            const eraBox = document.createElement('div');
            eraBox.className = 'era-box';
            eraBox.dataset.era = eraName;
            eraBox.innerHTML = `<h3>${eraName}時代</h3>`;
            eraBox.addEventListener('dragover', e => e.preventDefault());
            eraBox.addEventListener('drop', drop);
            timelineDiv.appendChild(eraBox);
        }

        cardDeckDiv.innerHTML = '';
        allWorks.sort(() => Math.random() - 0.5).forEach(workName => {
            const card = document.createElement('div');
            card.className = 'work-card';
            card.draggable = true;
            card.innerHTML = `<h4>${workName}</h4>`;
            card.addEventListener('dragstart', e => draggedItem = e.target);
            cardDeckDiv.appendChild(card);
        });
    }

    function drop(e) {
        e.preventDefault();
        const eraBox = e.target.closest('.era-box');
        const workName = draggedItem.querySelector('h4').textContent;
        
        let correctEra = '';
        for (const era in eras) {
            if (eras[era].works.includes(workName)) {
                correctEra = era;
                break;
            }
        }

        if (eraBox.dataset.era === correctEra) {
            eraBox.appendChild(draggedItem);
            draggedItem.draggable = false;
            draggedItem.style.cursor = 'default';
            draggedItem.style.backgroundColor = '#a5d6a7'; // green
            checkCompletion();
        } else {
            alert('時代が違います！');
        }
    }

    function checkCompletion() {
        if (cardDeckDiv.children.length === 0) {
            alert('全問正解！素晴らしい！');
        }
    }
    setup();
});
