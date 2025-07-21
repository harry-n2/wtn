document.addEventListener('DOMContentLoaded', () => {
    const titleInput = document.getElementById('title-input');
    const lyricsInput = document.getElementById('lyrics-input');
    const saveBtn = document.getElementById('save-btn');
    const songList = document.getElementById('song-list');

    let mySongs = [];

    function renderSongs() {
        songList.innerHTML = '';
        mySongs.forEach((song, index) => {
            const li = document.createElement('li');
            li.className = 'song-item';
            li.innerHTML = `<h3>${song.title}</h3><p>${song.lyrics}</p>`;
            songList.appendChild(li);
        });
    }

    function saveSong() {
        const title = titleInput.value.trim();
        const lyrics = lyricsInput.value.trim();
        if (!title || !lyrics) {
            alert('曲名と歌詞を入力してください！');
            return;
        }
        mySongs.push({ title, lyrics });
        renderSongs();
        titleInput.value = '';
        lyricsInput.value = '';
    }

    saveBtn.addEventListener('click', saveSong);
    
    // 初期表示
    mySongs.push({ title: 'サンプルソング', lyrics: 'これはサンプルの歌詞です。\n自由に編集・追加してください。' });
    renderSongs();
});
