document.addEventListener('DOMContentLoaded', () => {
    const piecesContainer = document.getElementById('pieces');
    const dropZone = document.querySelector('.drop-zone');
    const timeDisplay = document.getElementById('time-display');
    const resetButton = document.getElementById('reset-btn');

    let timer;
    let startTime;
    let puzzleSolved = false;

    function createPieces() {
        piecesContainer.innerHTML = ''; // ピースをリセット
        const piece1 = document.createElement('div');
        piece1.classList.add('puzzle-piece');
        piece1.dataset.pieceId = '1';
        piece1.draggable = true;
        // 直角三角形のピース1
        piece1.style.clipPath = 'polygon(0 0, 100% 100%, 0 100%)';
        
        const piece2 = document.createElement('div');
        piece2.classList.add('puzzle-piece');
        piece2.dataset.pieceId = '2';
        piece2.draggable = true;
        // 直角三角形のピース2
        piece2.style.clipPath = 'polygon(100% 0, 100% 100%, 0 0)';
        
        piecesContainer.appendChild(piece1);
        piecesContainer.appendChild(piece2);
    }

    function startTimer() {
        if (puzzleSolved) return;
        startTime = Date.now();
        timer = setInterval(() => {
            const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
            timeDisplay.textContent = elapsedTime;
        }, 100);
    }

    function stopTimer() {
        clearInterval(timer);
    }

    function resetGame() {
        puzzleSolved = false;
        stopTimer();
        timeDisplay.textContent = '0.00';
        dropZone.innerHTML = '';
        createPieces();
        addDragListeners();
    }

    function checkCompletion() {
        if (dropZone.children.length === 2) {
            puzzleSolved = true;
            stopTimer();
            setTimeout(() => {
                alert(`クリア！タイム: ${timeDisplay.textContent}秒`);
            }, 100);
        }
    }

    function addDragListeners() {
        const pieces = document.querySelectorAll('.puzzle-piece');
        pieces.forEach(piece => {
            piece.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.dataset.pieceId);
                e.target.classList.add('dragging');
                if (!timer && !puzzleSolved) {
                    startTimer();
                }
            });

            piece.addEventListener('dragend', (e) => {
                e.target.classList.remove('dragging');
            });
        });
    }

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault(); // ドロップを許可
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        const pieceId = e.dataTransfer.getData('text/plain');
        const draggedElement = document.querySelector(`[data-piece-id='${pieceId}']`);
        
        if (draggedElement && dropZone.children.length < 2) {
            // ピースをドロップゾーンに移動
            dropZone.appendChild(draggedElement);
            draggedElement.style.position = 'absolute';
            
            // ピースを配置する（簡易的な配置）
            if (pieceId === '1') {
                draggedElement.style.left = 'calc(50% - 75px)';
                draggedElement.style.top = '50%';
                draggedElement.style.transform = 'translateY(-50%)';
            } else if (pieceId === '2') {
                draggedElement.style.left = '50%';
                draggedElement.style.top = '50%';
                draggedElement.style.transform = 'translateY(-50%)';
            }
            
            checkCompletion();
        }
    });

    resetButton.addEventListener('click', resetGame);

    // 初期化
    resetGame();
});
