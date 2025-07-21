document.addEventListener('DOMContentLoaded', () => {
    const cityView = document.getElementById('city-view');
    const pointsText = document.getElementById('points');
    const studyBtn = document.getElementById('study-button');
    let points = 0;
    let buildings = 0;

    studyBtn.addEventListener('click', () => {
        points += 10;
        pointsText.textContent = `${points} P`;
        if (points >= 50 * (buildings + 1)) {
            const building = document.createElement('div');
            building.className = 'building';
            building.textContent = '🏠';
            cityView.appendChild(building);
            buildings++;
            alert('新しい建物が建った！');
        }
    });
});
// Append CSS
const cityCss = `
#city-view { display: flex; gap: 5px; min-height: 150px; background: #c8e6c9; }
.building { font-size: 2em; }
`;
// This is a simplified representation.
const existingCss = document.querySelector('link[href="game_apps.css"]');
if (existingCss) {
    const style = document.createElement('style');
    style.textContent = cityCss;
    document.head.appendChild(style);
}
