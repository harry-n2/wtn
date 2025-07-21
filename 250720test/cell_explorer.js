document.addEventListener('DOMContentLoaded', () => {
    const organelles = document.querySelectorAll('.organelle');
    const explorer = document.getElementById('explorer');
    const infoText = document.getElementById('info-text');

    const info = {
        '核': '生命活動の中心。遺伝情報(DNA)がある。',
        'ミトコンドリア': 'エネルギーを作り出す工場。呼吸を行う。',
    };

    organelles.forEach(org => {
        org.addEventListener('click', () => {
            const title = org.title;
            infoText.textContent = `【${title}】${info[title]}`;
            
            const orgRect = org.getBoundingClientRect();
            const mapRect = org.parentElement.getBoundingClientRect();
            explorer.style.top = `${orgRect.top - mapRect.top + orgRect.height / 4}px`;
            explorer.style.left = `${orgRect.left - mapRect.left + orgRect.width / 4}px`;
        });
    });
});
