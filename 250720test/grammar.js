document.addEventListener('DOMContentLoaded', () => {
    const storyData = [
        {
            title: "第1章：be動詞の王国",
            text: `むかしむかし、あるところに「be動詞の王国」がありました。
            この国の王様は <span class="grammar-point">am</span>, <span class="grammar-point">is</span>, <span class="grammar-point">are</span> の3人兄弟でした。
            
            一人称の「I」が来たときは、長男の <span class="grammar-point">am</span> がおもてなし。
            「I <span class="grammar-point">am</span> a hero.」（私は勇者です）
            
            三人称単数の「he」や「she」が来ると、次男の <span class="grammar-point">is</span> が登場。
            「He <span class="grammar-point">is</span> a wizard.」（彼は魔法使いです）
            
            そして、複数の人や物が来ると、三男の <span class="grammar-point">are</span> が活躍しました。
            「They <span class="grammar-point">are</span> friends.」（彼らは友達です）`
        },
        {
            title: "第2章：一般動詞の冒険",
            text: `be動詞の王国の外では、「一般動詞」たちが冒険の旅をしていました。
            <span class="grammar-point">play</span>（遊ぶ）、<span class="grammar-point">eat</span>（食べる）、<span class="grammar-point">study</span>（勉強する）など、たくさんの動詞がいます。
            
            彼らは主語のすぐ後ろについて、具体的な動きを表します。
            「I <span class="grammar-point">play</span> tennis.」（私はテニスをします）
            
            しかし、主語が三人称単数（he, she, itなど）のときは、動詞の語尾に「s」がつくというルールがありました。
            「She <span class="grammar-point">plays</span> the piano.」（彼女はピアノを弾きます）
            これは「三単現のs」と呼ばれる魔法の印なのです。`
        },
        {
            title: "第3章：過去形への旅",
            text: `ある日、動詞たちは「過去」への旅に出ることにしました。
            ほとんどの一般動詞は、語尾に <span class="grammar-point">-ed</span> をつけるだけで過去形に変身できます。
            「I <span class="grammar-point">played</span> soccer yesterday.」（昨日、私はサッカーをしました）
            
            be動詞の兄弟も変身します。
            <span class="grammar-point">am</span> と <span class="grammar-point">is</span> は <span class="grammar-point">was</span> に。
            <span class="grammar-point">are</span> は <span class="grammar-point">were</span> になりました��
            「He <span class="grammar-point">was</span> a student.」（彼は学生でした）`
        }
    ];

    let currentPageIndex = 0;

    const storyTitleEl = document.getElementById('story-title');
    const storyTextEl = document.getElementById('story-text');
    const prevPageBtn = document.getElementById('prev-page-btn');
    const nextPageBtn = document.getElementById('next-page-btn');
    const pageIndicatorEl = document.getElementById('page-indicator');

    function loadPage() {
        const pageData = storyData[currentPageIndex];
        storyTitleEl.textContent = pageData.title;
        storyTextEl.innerHTML = pageData.text;
        pageIndicatorEl.textContent = `${currentPageIndex + 1} / ${storyData.length}`;

        prevPageBtn.disabled = currentPageIndex === 0;
        nextPageBtn.disabled = currentPageIndex === storyData.length - 1;
    }

    prevPageBtn.addEventListener('click', () => {
        if (currentPageIndex > 0) {
            currentPageIndex--;
            loadPage();
        }
    });

    nextPageBtn.addEventListener('click', () => {
        if (currentPageIndex < storyData.length - 1) {
            currentPageIndex++;
            loadPage();
        }
    });

    loadPage();
});
