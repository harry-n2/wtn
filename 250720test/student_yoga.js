document.addEventListener('DOMContentLoaded', () => {
    const poseName = document.getElementById('pose-name');
    const poseDisplay = document.getElementById('pose-display');
    const poseDescription = document.getElementById('pose-description');
    const nextPoseBtn = document.getElementById('next-pose-btn');

    const poses = [
        { name: '山のポーズ', emoji: '🧘', desc: '背筋を伸ばし、深く呼吸しよう。集中力が高まります。' },
        { name: '木のポーズ', emoji: '🌳', desc: '片足で立ち、バランス感覚を養おう。体幹が鍛えられます。' },
        { name: '猫の伸びのポーズ', emoji: '🐈', desc: '四つん這いになり、背中を丸めたり反らせたり。肩こりに効きます。' },
        { name: 'チャイルドポーズ', emoji: '🙇', desc: '正座から体を前に倒し、リラックス。気持ちが落ち着きます。' }
    ];
    let currentIndex = 0;

    function showPose() {
        const currentPose = poses[currentIndex];
        poseName.textContent = currentPose.name;
        poseDisplay.textContent = currentPose.emoji;
        poseDescription.textContent = currentPose.desc;
    }

    nextPoseBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % poses.length;
        showPose();
    });

    showPose();
});
