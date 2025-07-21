document.addEventListener('DOMContentLoaded', () => {
    const quizData = [
        {
            question: "次の日本語を英語にしなさい：「りんご」",
            options: ["Apple", "Orange", "Banana", "Grape"],
            answer: "Apple"
        },
        {
            question: "次の英単語の意味は？：「Library」",
            options: ["図書館", "博物館", "美術館", "映画館"],
            answer: "図書館"
        },
        {
            question: "空欄に当てはまる単語は？： I ___ a student.",
            options: ["is", "are", "am", "be"],
            answer: "am"
        },
        {
            question: "次の日本語を英語にしなさい：「未来」",
            options: ["Past", "Present", "Future", "Now"],
            answer: "Future"
        }
    ];

    let currentQuestionIndex = 0;

    const questionNumberEl = document.querySelector('.question-number');
    const questionTextEl = document.querySelector('.question-text');
    const optionsContainer = document.querySelector('.options-container');
    const feedbackIconEl = document.querySelector('.feedback-icon');
    const feedbackTextEl = document.querySelector('.feedback-text');
    const nextQuestionBtn = document.getElementById('next-question-btn');

    function loadQuestion() {
        if (currentQuestionIndex < quizData.length) {
            const currentQuestion = quizData[currentQuestionIndex];
            questionNumberEl.textContent = `第${currentQuestionIndex + 1}問`;
            questionTextEl.textContent = currentQuestion.question;

            optionsContainer.innerHTML = '';
            currentQuestion.options.forEach(optionText => {
                const button = document.createElement('button');
                button.className = 'option';
                button.textContent = optionText;
                button.addEventListener('click', () => checkAnswer(optionText));
                optionsContainer.appendChild(button);
            });

            resetFeedback();
            nextQuestionBtn.classList.add('hidden');
        } else {
            showFinalResults();
        }
    }

    function checkAnswer(selectedOption) {
        const currentQuestion = quizData[currentQuestionIndex];
        const isCorrect = selectedOption === currentQuestion.answer;

        Array.from(optionsContainer.children).forEach(button => {
            button.disabled = true;
            if (button.textContent === currentQuestion.answer) {
                button.classList.add('correct');
            } else if (button.textContent === selectedOption) {
                button.classList.add('incorrect');
            }
        });

        if (isCorrect) {
            feedbackIconEl.textContent = '⭕';
            feedbackTextEl.textContent = '正解！';
            feedbackTextEl.style.color = '#2ecc71';
        } else {
            feedbackIconEl.textContent = '❌';
            feedbackTextEl.textContent = `不正解... 正解は「${currentQuestion.answer}」`;
            feedbackTextEl.style.color = '#e74c3c';
        }

        nextQuestionBtn.classList.remove('hidden');
    }

    function resetFeedback() {
        feedbackIconEl.textContent = '';
        feedbackTextEl.textContent = '';
    }

    function showFinalResults() {
        questionTextEl.textContent = "クイズ終了！お疲れ様でした！";
        optionsContainer.innerHTML = '';
        resetFeedback();
        nextQuestionBtn.textContent = 'もう一度挑戦する';
        nextQuestionBtn.classList.remove('hidden');
        currentQuestionIndex = -1; // Reset for retry
    }

    nextQuestionBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        loadQuestion();
    });

    loadQuestion();
});
