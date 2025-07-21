document.addEventListener('DOMContentLoaded', () => {
    const stageData = [
        {
            image: "assets/table.jpg", // Dummy path
            markerPos: { top: '55%', left: '50%' },
            question: "The cat is sleeping (___) the table.",
            options: ["on", "in", "under"],
            answer: "under"
        },
        {
            image: "assets/room.jpg", // Dummy path
            markerPos: { top: '60%', left: '30%' },
            question: "The ball is (___) the box.",
            options: ["on", "in", "at"],
            answer: "in"
        },
        {
            image: "assets/station.jpg", // Dummy path
            markerPos: { top: '70%', left: '65%' },
            question: "Let's meet (___) the station.",
            options: ["on", "in", "at"],
            answer: "at"
        },
        {
            image: "assets/bridge.jpg", // Dummy path
            markerPos: { top: '50%', left: '50%' },
            question: "The bird is flying (___) the bridge.",
            options: ["over", "in", "under"],
            answer: "over"
        }
    ];

    let currentStageIndex = 0;

    const adventureImage = document.getElementById('adventure-image');
    const itemMarker = document.getElementById('item-marker');
    const situationText = document.getElementById('situation-text');
    const optionsBox = document.querySelector('.options-box');
    const feedbackText = document.getElementById('feedback-text');
    const nextStageBtn = document.getElementById('next-stage-btn');

    function loadStage() {
        const stage = stageData[currentStageIndex];
        
        // NOTE: The image will not load, as we haven't created it yet.
        // It will show the alt text.
        adventureImage.src = stage.image;
        adventureImage.alt = stage.question;

        itemMarker.style.top = stage.markerPos.top;
        itemMarker.style.left = stage.markerPos.left;
        itemMarker.style.display = 'block';

        situationText.innerHTML = stage.question.replace('(___)', '<span class="blank"></span>');
        
        optionsBox.innerHTML = '';
        stage.options.forEach(option => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = option;
            btn.addEventListener('click', () => checkAnswer(option));
            optionsBox.appendChild(btn);
        });

        feedbackText.textContent = '';
        nextStageBtn.classList.add('hidden');
    }

    function checkAnswer(selectedOption) {
        const stage = stageData[currentStageIndex];
        const isCorrect = selectedOption === stage.answer;

        Array.from(optionsBox.children).forEach(btn => btn.disabled = true);

        if (isCorrect) {
            feedbackText.textContent = '正解！宝箱への道が開かれた！';
            feedbackText.style.color = '#228B22';
            nextStageBtn.classList.remove('hidden');
        } else {
            feedbackText.textContent = '不正解！もう一度考えてみよう。';
            feedbackText.style.color = '#B22222';
            // Allow retry after a delay
            setTimeout(() => {
                Array.from(optionsBox.children).forEach(btn => btn.disabled = false);
                feedbackText.textContent = '';
            }, 1500);
        }
    }

    nextStageBtn.addEventListener('click', () => {
        currentStageIndex++;
        if (currentStageIndex < stageData.length) {
            loadStage();
        } else {
            showFinalScreen();
        }
    });

    function showFinalScreen() {
        situationText.textContent = '全ての冒険をクリア！君は前置詞マスターだ！';
        optionsBox.innerHTML = '';
        feedbackText.textContent = '';
        itemMarker.style.display = 'none';
        nextStageBtn.textContent = '最初のステージに戻る';
        nextStageBtn.classList.remove('hidden');
        currentStageIndex = -1; // to restart
    }

    loadStage();
});
