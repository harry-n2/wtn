document.addEventListener('DOMContentLoaded', () => {
    const blackboard = document.getElementById('blackboard');
    const messageBox = document.getElementById('message-box');
    let keyFound = false;

    blackboard.addEventListener('click', () => {
        if (keyFound) {
            messageBox.textContent = 'もう何もないようだ。';
            return;
        }
        const ans = prompt('黒板の暗号：リンゴは英語で？');
        if (ans.toLowerCase() === 'apple') {
            messageBox.textContent = '正解！鍵を見つけた！ドアをクリックして脱出しよう！';
            keyFound = true;
            const door = document.createElement('div');
            door.className = 'object';
            door.id = 'door';
            door.textContent = '🚪';
            door.onclick = () => alert('脱出成功！');
            document.getElementById('objects').appendChild(door);
        } else {
            messageBox.textContent = '不正解...。';
        }
    });
});
// Append CSS
const escapeCss = `
#escape-room { background: #efebe9; }
#message-box { min-height: 40px; background: #fff; padding: 10px; border-radius: 5px; margin-bottom: 15px; }
#objects { display: flex; gap: 10px; }
.object { font-size: 4em; cursor: pointer; }
`;
// This is a simplified representation.
const existingCss = document.querySelector('link[href="game_apps.css"]');
if (existingCss) {
    const style = document.createElement('style');
    style.textContent = escapeCss;
    document.head.appendChild(style);
}
