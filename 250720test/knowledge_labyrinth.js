document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('dungeon-grid');
    const message = document.getElementById('message');
    const map = [
        [1,1,1,1,1],
        [1,0,0,2,1],
        [1,1,1,0,1],
        [1,2,0,0,1],
        [1,1,1,1,1]
    ];
    let playerPos = {x: 1, y: 1};

    function render() {
        grid.innerHTML = '';
        for(let y=0; y<map.length; y++) {
            for(let x=0; x<map[y].length; x++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                if(map[y][x] === 1) cell.classList.add('wall');
                if(map[y][x] === 2) cell.classList.add('door');
                if(x === playerPos.x && y === playerPos.y) cell.classList.add('player');
                grid.appendChild(cell);
            }
        }
    }

    window.addEventListener('keydown', e => {
        let {x, y} = playerPos;
        if(e.key === 'ArrowUp') y--;
        if(e.key === 'ArrowDown') y++;
        if(e.key === 'ArrowLeft') x--;
        if(e.key === 'ArrowRight') x++;
        
        if(map[y][x] !== 1) {
            playerPos = {x, y};
            if(map[y][x] === 2) {
                const ans = prompt('問題：日本の首都は？');
                if(ans === '東京') {
                    message.textContent = '正解！扉が開いた！';
                    map[y][x] = 0;
                } else {
                    message.textContent = '不正解！扉は固く閉ざされた...';
                    playerPos = {x: e.key==='ArrowLeft'?x+1:e.key==='ArrowRight'?x-1:x, y: e.key==='ArrowUp'?y+1:e.key==='ArrowDown'?y-1:y};
                }
            }
        }
        render();
    });

    render();
});