document.addEventListener('DOMContentLoaded', () => {
    const timeline = document.getElementById('timeline');
    const posts = [
        { user: 'Aki', text: '今日は数学を3時間頑張った！目標まであと少し！ #受験生' },
        { user: 'Haru', text: '英単語100個覚えた！明日もこの調子でいきたいな。' },
        { user: 'Natsu', text: '模試の結果が返ってきた...。理科が弱点だ。復習しなきゃ！' },
        { user: 'Fuyu', text: 'みんな頑張っててすごい！私も負けないぞー！🔥' },
    ];

    function renderPosts() {
        timeline.innerHTML = '';
        posts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.className = 'post';
            postDiv.innerHTML = `<h3>${post.user}</h3><p>${post.text}</p>`;
            timeline.appendChild(postDiv);
        });
    }
    renderPosts();
});
// Append CSS
const snsCss = `
#timeline { display: flex; flex-direction: column; gap: 15px; }
.post { background: #fff; border: 1px solid #ccc; border-radius: 10px; padding: 15px; }
.post h3 { margin: 0 0 5px 0; font-size: 1.2em; color: var(--color-accent); }
.post p { margin: 0; }
`;
// This is a simplified representation.
const existingCss = document.querySelector('link[href="sogo_apps.css"]');
if (existingCss) {
    const style = document.createElement('style');
    style.textContent = snsCss;
    document.head.appendChild(style);
}
