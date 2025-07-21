document.addEventListener('DOMContentLoaded', () => {
    const mangaGrid = document.getElementById('manga-grid');
    const captionInput = document.getElementById('caption-input');
    const addBtn = document.getElementById('add-caption-btn');
    let selectedPanel = null;

    for (let i = 0; i < 4; i++) {
        const panel = document.createElement('div');
        panel.className = 'manga-panel';
        panel.addEventListener('click', () => {
            document.querySelectorAll('.manga-panel').forEach(p => p.classList.remove('selected'));
            panel.classList.add('selected');
            selectedPanel = panel;
        });
        mangaGrid.appendChild(panel);
    }

    addBtn.addEventListener('click', () => {
        if (selectedPanel && captionInput.value) {
            selectedPanel.innerHTML += `<p>${captionInput.value}</p>`;
            captionInput.value = '';
        } else {
            alert('コマを選んで、セリフを入力してください。');
        }
    });
});