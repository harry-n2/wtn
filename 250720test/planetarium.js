document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('sky-canvas');
    const ctx = canvas.getContext('2d');
    const buttonsDiv = document.getElementById('buttons');
    canvas.width = canvas.offsetWidth;
    canvas.height = 300;

    const constellations = {
        'オリオン座': [[50, 50], [80, 80], [110, 110], [140, 80], [170, 50], [80, 80], [140, 80]],
        'カシオペヤ座': [[200, 150], [230, 120], [250, 150], [280, 120], [300, 150]],
        '北斗七星': [[50, 200], [80, 220], [110, 210], [140, 200], [170, 230], [200, 240], [230, 220]],
    };

    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        for (let i = 0; i < 100; i++) {
            ctx.beginPath();
            ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function drawConstellation(name) {
        drawStars();
        const points = constellations[name];
        if (!points) return;
        
        ctx.strokeStyle = 'rgba(255, 255, 0, 0.7)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(points[0][0], points[0][1]);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i][0], points[i][1]);
        }
        ctx.stroke();
    }

    function setupButtons() {
        for (const name in constellations) {
            const btn = document.createElement('button');
            btn.className = 'gr-button';
            btn.textContent = name;
            btn.onclick = () => drawConstellation(name);
            buttonsDiv.appendChild(btn);
        }
    }

    drawStars();
    setupButtons();
});
