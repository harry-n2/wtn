document.addEventListener('DOMContentLoaded', () => {
    const chatLog = document.getElementById('chat-log');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    const responses = {
        'こんにちは': 'こんにちは！何か質問はありますか？',
        '徳川家康': '江戸幕府を開いた人物ですね。1603年です。',
        '光合成': '植物が光エネルギーを使って、水と二酸化炭素から栄養を作る働きのことですよ。',
        'ありがとう': 'どういたしまして！',
    };

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-message ${sender}`;
        msgDiv.textContent = text;
        chatLog.appendChild(msgDiv);
        chatLog.scrollTop = chatLog.scrollHeight;
    }

    function sendMessage() {
        const query = userInput.value.trim();
        if (!query) return;
        addMessage(query, 'user');
        userInput.value = '';

        setTimeout(() => {
            let response = 'すみません、よく分かりません。';
            for (const key in responses) {
                if (query.includes(key)) {
                    response = responses[key];
                    break;
                }
            }
            addMessage(response, 'ai');
        }, 500);
    }

    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keydown', e => e.key === 'Enter' && sendMessage());
    addMessage('AI先生です。勉強で分からない事があったら聞いてくださいね。', 'ai');
});
// Append CSS
const aiCss = `
#chat-window { display: flex; flex-direction: column; height: 400px; }
#chat-log { flex-grow: 1; background: #fff; border: 1px solid #ccc; padding: 10px; overflow-y: auto; }
.chat-message { margin-bottom: 10px; padding: 8px 12px; border-radius: 15px; max-width: 80%; }
.chat-message.user { background: #c5e1a5; align-self: flex-end; }
.chat-message.ai { background: #e1bee7; align-self: flex-start; }
#chat-input-area { display: flex; margin-top: 10px; }
`;
// This is a simplified representation.
const existingCss = document.querySelector('link[href="sogo_apps.css"]');
if (existingCss) {
    const style = document.createElement('style');
    style.textContent = aiCss;
    document.head.appendChild(style);
}
