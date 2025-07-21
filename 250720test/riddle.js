document.addEventListener('DOMContentLoaded', () => {
    const riddleData = [
        {
            riddle: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?",
            answer: "map"
        },
        {
            riddle: "What has to be broken before you can use it?",
            answer: "egg"
        },
        {
            riddle: "What is full of holes but still holds water?",
            answer: "sponge"
        },
        {
            riddle: "What question can you never answer yes to?",
            answer: "Are you asleep yet?"
        }
    ];

    let currentRiddleIndex = 0;

    const riddleNumberEl = document.querySelector('.riddle-number');
    const riddleTextEl = document.querySelector('.riddle-text');
    const answerInput = document.getElementById('answer-input');
    const submitBtn = document.getElementById('submit-answer-btn');
    const feedbackIconEl = document.querySelector('.feedback-icon');
    const feedbackTextEl = document.querySelector('.feedback-text');
    const nextRiddleBtn = document.getElementById('next-riddle-btn');

    function loadRiddle() {
        if (currentRiddleIndex < riddleData.length) {
            const currentRiddle = riddleData[currentRiddleIndex];
            riddleNumberEl.textContent = `クエスト ${currentRiddleIndex + 1}`;
            riddleTextEl.textContent = currentRiddle.riddle;
            answerInput.value = '';
            answerInput.disabled = false;
            submitBtn.disabled = false;
            resetFeedback();
            nextRiddleBtn.classList.add('hidden');
        } else {
            showFinalResults();
        }
    }

    function checkAnswer() {
        const userAnswer = answerInput.value.trim().toLowerCase();
        if (userAnswer === '') return;

        const currentRiddle = riddleData[currentRiddleIndex];
        const isCorrect = userAnswer === currentRiddle.answer;
        
        answerInput.disabled = true;
        submitBtn.disabled = true;

        if (isCorrect) {
            feedbackIconEl.textContent = '💡';
            feedbackTextEl.textContent = '正解！ひらめいたね！';
            feedbackTextEl.style.color = '#2ecc71';
        } else {
            feedbackIconEl.textContent = '🤔';
            feedbackTextEl.textContent = `おしい！正解は「${currentRiddle.answer}」でした。`;
            feedbackTextEl.style.color = '#e74c3c';
        }

        nextRiddleBtn.classList.remove('hidden');
    }

    function resetFeedback() {
        feedbackIconEl.textContent = '';
        feedbackTextEl.textContent = '';
    }

    function showFinalResults() {
        riddleTextEl.textContent = "全クエストクリア！君はなぞなぞマスターだ！";
        answerInput.classList.add('hidden');
        submitBtn.classList.add('hidden');
        resetFeedback();
        nextRiddleBtn.textContent = 'もう一度挑戦する';
        nextRiddleBtn.classList.remove('hidden');
        currentRiddleIndex = -1; // Reset for retry
    }

    submitBtn.addEventListener('click', checkAnswer);
    answerInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    });

    nextRiddleBtn.addEventListener('click', () => {
        currentRiddleIndex++;
        loadRiddle();
    });

    loadRiddle();
});
