(() => {
    const initBoard = () => {
        const col = 7;
        const row = 6;
        let board = Array.from(Array(col), () => new Array(row));
        for(let i = 0; i < 7; i++){
            for(let j = 0; j < 6; j++){
                board[i][j] = 0
            }
        }
        return board;
    }

    let board = initBoard();

    const turnRed = (a, b) => {
        document.getElementById(a+b).style.backgroundColor = 'red';
    }

    const turnBlue = (a, b) => {
        document.getElementById(a+b).style.backgroundColor = 'blue';
    }

    const addDisk = (a, c) => {
        for(let i = 5; i >= 0 ; i--){
            if(board[a][i] == 0){
                turnRed(c, i+1);
                board[a][i] = 1;
                break;
            }
        }
    }

    document.getElementById('add-a').addEventListener('click', () => {
        let a = 0;
        let col = 'a'
        addDisk(a, col);
    })

    document.getElementById('add-b').addEventListener('click', () => {
        let a = 0;
        let col = 'b';
        addDisk(a, col);
    })

    document.getElementById('add-c').addEventListener('click', () => {
        let a = 0;
        let col = 'c';
        addDisk(a, col);
    })

    document.getElementById('add-d').addEventListener('click', () => {
        let a = 0;
        let col = 'd';
        addDisk(a, col);
    })

    document.getElementById('add-e').addEventListener('click', () => {
        let a = 0;
        let col = 'e';
        addDisk(a, col);
    })

    document.getElementById('add-f').addEventListener('click', () => {
        let a = 0;
        let col = 'f';
        addDisk(a, col);
    })

    document.getElementById('add-g').addEventListener('click', () => {
        let a = 0;
        let col = 'g';
        addDisk(a, col);
    })
})();