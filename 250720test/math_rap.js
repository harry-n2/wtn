document.addEventListener('DOMContentLoaded', () => {
    const rapData = {
        quadratic: {
            title: "解の公式",
            lyrics: `Yo, xイコール！ 準備はいいか？
2a分のマイナスbだぜ Check it out!
プラスマイナス ルートの中身
bの二乗から4acを引くんだ！

これが解の公式だぜ Everybody say!
二次方程式なんて怖くないぜ Go your way!
因数分解できなくても Don't worry!
このフロウで答えにたどり着け Com'on!`
        },
        pythagorean: {
            title: "三平方の定理",
            lyrics: `直角三角形の話だぜ Listen up!
短い辺 a, b 長い辺は c
aの二乗たすbの二乗
それがイコールcの二乗だぜ Yeah!

ピタゴラスが見つけたこの定理
直角見つけりゃ即座に勝利！
斜辺の長さ求めるなんて
このビートに乗れば超簡単！`
        },
        root: {
            title: "平方根",
            lyrics: `Hey, ルートって知ってるかい？
二乗したらその数になるヤツだぜ
√9は3, √16は4
同じ数2回かけて元に戻る Story!

プラスとマイナス 2つあるけど
問題よく読め どっちか分かるぜ
ルートの計算 恐れるな
基礎を固めて Step up, Go!`
        }
    };

    const trackTitle = document.getElementById('track-title');
    const lyricsDiv = document.getElementById('lyrics');
    const trackButtons = document.querySelectorAll('.track-btn');
    const customLyricsArea = document.getElementById('custom-lyrics');
    const saveBtn = document.getElementById('save-btn');

    trackButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 他のボタンのアクティブ状態を解除
            trackButtons.forEach(btn => btn.classList.remove('active'));
            // クリックしたボタンをアクティブに
            button.classList.add('active');

            const formula = button.dataset.formula;
            const selectedRap = rapData[formula];
            
            if (selectedRap) {
                trackTitle.textContent = selectedRap.title;
                lyricsDiv.textContent = selectedRap.lyrics;
            }
        });
    });

    saveBtn.addEventListener('click', () => {
        const myLyrics = customLyricsArea.value;
        if (myLyrics.trim() === "") {
            alert("リリックが空だぜ！何か書いてくれ！");
            return;
        }
        // ここではアラートで表示するだけだが、将来的にはローカルストレージ等に保存できる
        alert("君のオリジナルリリックを保存したぜ！\n\n" + myLyrics);
        console.log("保存されたリリック:", myLyrics);
    });

    // 初期表示として最初のトラックを選択状態にする
    if (trackButtons.length > 0) {
        trackButtons[0].click();
    }
});