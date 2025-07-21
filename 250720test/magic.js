document.addEventListener('DOMContentLoaded', () => {
    const messageText = document.getElementById('message-text');
    const nextBtn = document.getElementById('next-btn');
    const revealBtn = document.getElementById('reveal-btn');
    const explanationSection = document.getElementById('explanation');
    const resetBtn = document.getElementById('reset-btn');

    let step = 0;
    const steps = [
        "まず、好きな数字を1つ、心に思い浮かべてください... (計算機を使ってもOK！)",
        "思い浮かべましたか？では、その数字を <strong>2倍</strong> してください。",
        "次に、その答えに <strong>10</strong> を足してください。",
        "ほうほう...。では、その数を <strong>2</strong> で割ってください。",
        "最後に、その数から <strong>「最初に思い浮かべた数字」</strong> を引いてください。",
        "よろしいですか...？<br>あなたがたどり着いた答えは...<br><br><strong>「5」</strong>でしょう！",
        "いかがでしたか？<br>下のボタンから、このマジックのタネ明かしをご覧になれます。"
    ];

    function updateStep() {
        if (step < steps.length) {
            messageText.innerHTML = steps[step];
            nextBtn.textContent = "次へ";
            if (step === steps.length - 1) {
                nextBtn.classList.add('hidden');
                revealBtn.classList.remove('hidden');
            }
            step++;
        }
    }

    function showExplanation() {
        explanationSection.classList.remove('hidden');
        revealBtn.classList.add('hidden');
    }

    function resetShow() {
        step = 0;
        messageText.innerHTML = "さあ、ショーの始まりです！<br>下のボタンを押して、指示に従ってください。";
        nextBtn.textContent = "始めましょう";
        nextBtn.classList.remove('hidden');
        revealBtn.classList.add('hidden');
        explanationSection.classList.add('hidden');
    }

    nextBtn.addEventListener('click', updateStep);
    revealBtn.addEventListener('click', showExplanation);
    resetBtn.addEventListener('click', resetShow);
});
