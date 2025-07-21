document.addEventListener('DOMContentLoaded', () => {
    const resultArea = document.getElementById('result-area');
    const tellBtn = document.getElementById('tell-fortune-btn');

    const fortunes = [
        { subject: '数学', advice: '計算問題を重点的にやると吉。' },
        { subject: '国語', advice: '漢字の復習が効果的！' },
        { subject: '理科', advice: '実験の動画を見ると理解が深まるかも。' },
        { subject: '社会', advice: '年号の語呂合わせを作ってみよう。' },
        { subject: '英語', advice: '好きな洋楽を聴くとリスニング力アップ！' },
    ];

    tellBtn.addEventListener('click', () => {
        const result = fortunes[Math.floor(Math.random() * fortunes.length)];
        resultArea.innerHTML = `<h3>ラッキー科目: ${result.subject}</h3><p>${result.advice}</p>`;
    });
});
// Append CSS
const fortuneCss = `
#fortune-telling { text-align: center; }
#result-area { min-height: 100px; background: #fff; border: 2px dashed #673ab7; border-radius: 10px; padding: 20px; margin-bottom: 20px; }
`;
// This is a simplified representation.
const existingCss = document.querySelector('link[href="sogo_apps.css"]');
if (existingCss) {
    const style = document.createElement('style');
    style.textContent = fortuneCss;
    document.head.appendChild(style);
}
