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

    const resetBoard = () => {
        for(let i = 0; i < 7; i++){
            for(let j = 0; j < 6; j++){
                board[i][j] = 0
            }
        }
    }

    const reset = () => {
        resetBoard();
        document.getElementById('player').innerHTML = "Player 1's turn";
        player = 1;
        for(let i = 1; i < 7; i++){
            document.getElementById('a' + i).style.backgroundColor = 'inherit';
        }
        for(let i = 1; i < 7; i++){
            document.getElementById('b' + i).style.backgroundColor = 'inherit';
        }
        for(let i = 1; i < 7; i++){
            document.getElementById('c' + i).style.backgroundColor = 'inherit';
        }
        for(let i = 1; i < 7; i++){
            document.getElementById('d' + i).style.backgroundColor = 'inherit';
        }
        for(let i = 1; i < 7; i++){
            document.getElementById('e' + i).style.backgroundColor = 'inherit';
        }
        for(let i = 1; i < 7; i++){
            document.getElementById('f' + i).style.backgroundColor = 'inherit';
        }
        for(let i = 1; i < 7; i++){
            document.getElementById('g' + i).style.backgroundColor = 'inherit';
        }
    }

    const changePlayer = () => {
        if(player == 1){
            player = 2;
            document.getElementById('player').innerHTML = "Player 2's turn";
        }
        else{
            player = 1;
            document.getElementById('player').innerHTML = "Player 1's turn";
        }
    }

    let board = initBoard();
    console.log(board);
    let player = 1;
    let score = [];
    score[1] = 0;
    score[2] = 0;

    const turnRed = (a, b) => {
        document.getElementById(a+b).style.backgroundColor = 'red';
    }

    const turnBlue = (a, b) => {
        document.getElementById(a+b).style.backgroundColor = 'blue';
    }

    const addDisk = (a, c) => {
        for(let i = 5; i >= 0 ; i--){
            if(board[a][i] == 0){
                if(player == 1){
                    turnRed(c, i+1);
                }
                else{
                    turnBlue(c, i+1);
                }
                board[a][i] = player;
                checkWinner();
                console.log(board);
                break;
            }
        }
    }

    const checkWinner = () => {
        if(
            // vertical solutions
            board[0][0] == player &&  board[1][0] == player &&  board[2][0] == player &&  board[3][0] == player ||
            board[1][0] == player &&  board[2][0] == player &&  board[3][0] == player &&  board[4][0] == player ||
            board[2][0] == player &&  board[3][0] == player &&  board[4][0] == player &&  board[5][0] == player ||
            board[3][0] == player &&  board[4][0] == player &&  board[5][0] == player &&  board[6][0] == player ||
            board[0][1] == player &&  board[1][1] == player &&  board[2][1] == player &&  board[3][1] == player ||
            board[1][1] == player &&  board[2][1] == player &&  board[3][1] == player &&  board[4][1] == player ||
            board[2][1] == player &&  board[3][1] == player &&  board[4][1] == player &&  board[5][1] == player ||
            board[3][1] == player &&  board[4][1] == player &&  board[5][1] == player &&  board[6][1] == player ||
            board[0][2] == player &&  board[1][2] == player &&  board[2][2] == player &&  board[3][2] == player ||
            board[1][2] == player &&  board[2][2] == player &&  board[3][2] == player &&  board[4][2] == player ||
            board[2][2] == player &&  board[3][2] == player &&  board[4][2] == player &&  board[5][2] == player ||
            board[3][2] == player &&  board[4][2] == player &&  board[5][2] == player &&  board[6][2] == player ||
            board[0][3] == player &&  board[1][3] == player &&  board[2][3] == player &&  board[3][3] == player ||
            board[1][3] == player &&  board[2][3] == player &&  board[3][3] == player &&  board[4][3] == player ||
            board[2][3] == player &&  board[3][3] == player &&  board[4][3] == player &&  board[5][3] == player ||
            board[3][3] == player &&  board[4][3] == player &&  board[5][3] == player &&  board[6][3] == player ||
            board[0][4] == player &&  board[1][4] == player &&  board[2][4] == player &&  board[3][4] == player ||
            board[1][4] == player &&  board[2][4] == player &&  board[3][4] == player &&  board[4][4] == player ||
            board[2][4] == player &&  board[3][4] == player &&  board[4][4] == player &&  board[5][4] == player ||
            board[3][4] == player &&  board[4][4] == player &&  board[5][4] == player &&  board[6][4] == player ||
            board[0][5] == player &&  board[1][5] == player &&  board[2][5] == player &&  board[3][5] == player ||
            board[1][5] == player &&  board[2][5] == player &&  board[3][5] == player &&  board[4][5] == player ||
            board[2][5] == player &&  board[3][5] == player &&  board[4][5] == player &&  board[5][5] == player ||
            board[3][5] == player &&  board[4][5] == player &&  board[5][5] == player &&  board[6][5] == player ||
            // horizontal solutions
            board[0][0] == player &&  board[0][1] == player &&  board[0][2] == player &&  board[0][3] == player ||
            board[0][1] == player &&  board[0][2] == player &&  board[0][3] == player &&  board[0][4] == player ||
            board[0][2] == player &&  board[0][3] == player &&  board[0][4] == player &&  board[0][5] == player ||
            board[1][0] == player &&  board[1][1] == player &&  board[1][2] == player &&  board[1][3] == player ||
            board[1][1] == player &&  board[1][2] == player &&  board[1][3] == player &&  board[1][4] == player ||
            board[1][2] == player &&  board[1][3] == player &&  board[1][4] == player &&  board[1][5] == player ||
            board[2][0] == player &&  board[2][1] == player &&  board[2][2] == player &&  board[2][3] == player ||
            board[2][1] == player &&  board[2][2] == player &&  board[2][3] == player &&  board[2][4] == player ||
            board[2][2] == player &&  board[2][3] == player &&  board[2][4] == player &&  board[2][5] == player ||
            board[3][0] == player &&  board[3][1] == player &&  board[3][2] == player &&  board[3][3] == player ||
            board[3][1] == player &&  board[3][2] == player &&  board[3][3] == player &&  board[3][4] == player ||
            board[3][2] == player &&  board[3][3] == player &&  board[3][4] == player &&  board[3][5] == player ||
            board[4][0] == player &&  board[4][1] == player &&  board[4][2] == player &&  board[4][3] == player ||
            board[4][1] == player &&  board[4][2] == player &&  board[4][3] == player &&  board[4][4] == player ||
            board[4][2] == player &&  board[4][3] == player &&  board[4][4] == player &&  board[4][5] == player ||
            board[5][0] == player &&  board[5][1] == player &&  board[5][2] == player &&  board[5][3] == player ||
            board[5][1] == player &&  board[5][2] == player &&  board[5][3] == player &&  board[5][4] == player ||
            board[5][2] == player &&  board[5][3] == player &&  board[5][3] == player &&  board[5][5] == player ||
            board[6][0] == player &&  board[6][1] == player &&  board[6][2] == player &&  board[6][3] == player ||
            board[6][1] == player &&  board[6][2] == player &&  board[6][3] == player &&  board[6][4] == player ||
            board[6][2] == player &&  board[6][3] == player &&  board[6][4] == player &&  board[6][5] == player ||
            // diagonal \ solutions
            board[0][0] == player &&  board[1][1] == player &&  board[2][2] == player &&  board[3][3] == player ||
            board[1][1] == player &&  board[2][2] == player &&  board[3][3] == player &&  board[4][4] == player ||
            board[2][2] == player &&  board[3][3] == player &&  board[4][4] == player &&  board[5][5] == player ||
            board[1][0] == player &&  board[2][1] == player &&  board[3][2] == player &&  board[4][3] == player ||
            board[2][1] == player &&  board[3][2] == player &&  board[4][3] == player &&  board[5][4] == player ||
            board[3][2] == player &&  board[4][3] == player &&  board[5][4] == player &&  board[6][5] == player ||
            board[2][0] == player &&  board[3][1] == player &&  board[4][2] == player &&  board[5][3] == player ||
            board[3][1] == player &&  board[4][2] == player &&  board[5][3] == player &&  board[6][4] == player ||
            board[3][0] == player &&  board[4][1] == player &&  board[5][2] == player &&  board[6][3] == player ||
            board[0][1] == player &&  board[1][2] == player &&  board[2][3] == player &&  board[3][4] == player ||
            board[1][2] == player &&  board[2][3] == player &&  board[3][4] == player &&  board[4][5] == player ||
            board[0][2] == player &&  board[1][3] == player &&  board[2][4] == player &&  board[3][5] == player ||
            // diagonal / solutions
            board[6][0] == player &&  board[5][1] == player &&  board[4][2] == player &&  board[3][3] == player ||
            board[5][1] == player &&  board[4][2] == player &&  board[3][3] == player &&  board[2][4] == player ||
            board[4][2] == player &&  board[3][3] == player &&  board[2][4] == player &&  board[1][5] == player ||
            board[5][0] == player &&  board[4][1] == player &&  board[3][2] == player &&  board[2][3] == player ||
            board[4][1] == player &&  board[3][2] == player &&  board[2][3] == player &&  board[1][4] == player ||
            board[3][2] == player &&  board[2][3] == player &&  board[1][4] == player &&  board[0][5] == player ||
            board[4][0] == player &&  board[3][1] == player &&  board[2][2] == player &&  board[1][3] == player ||
            board[3][1] == player &&  board[2][2] == player &&  board[1][3] == player &&  board[0][4] == player ||
            board[3][0] == player &&  board[2][1] == player &&  board[1][2] == player &&  board[0][3] == player ||
            board[6][1] == player &&  board[5][2] == player &&  board[4][3] == player &&  board[3][4] == player ||
            board[5][2] == player &&  board[4][3] == player &&  board[3][4] == player &&  board[2][5] == player ||
            board[6][2] == player &&  board[5][3] == player &&  board[4][4] == player &&  board[3][5] == player 
            
        ){
            alert("Player "+player+" has won!");
            score[player] += 1;
            document.getElementById('p'+player).innerHTML = score[player];
            reset();
        }
    }

    document.getElementById('add-a').addEventListener('click', () => {
        let a = 0;
        let col = 'a'
        if(board[a][0] != 0){
            alert("This column's a bit full, maybe try another one?");
        }
        else{
            addDisk(a, col);
            changePlayer();
        }

    })

    document.getElementById('add-b').addEventListener('click', () => {
        let a = 1;
        let col = 'b';
        if(board[a][0] != 0){
            alert("This column's a bit full, maybe try another one?");
        }
        else{
            addDisk(a, col);
            changePlayer();
        }
    })

    document.getElementById('add-c').addEventListener('click', () => {
        let a = 2;
        let col = 'c';
        if(board[a][0] != 0){
            alert("This column's a bit full, maybe try another one?");
        }
        else{
            addDisk(a, col);
            changePlayer();
        }
    })

    document.getElementById('add-d').addEventListener('click', () => {
        let a = 3;
        let col = 'd';
        if(board[a][0] != 0){
            alert("This column's a bit full, maybe try another one?");
        }
        else{
            addDisk(a, col);
            changePlayer();
        }
    })

    document.getElementById('add-e').addEventListener('click', () => {
        let a = 4;
        let col = 'e';
        if(board[a][0] != 0){
            alert("This column's a bit full, maybe try another one?");
        }
        else{
            addDisk(a, col);
            changePlayer();
        }
    })

    document.getElementById('add-f').addEventListener('click', () => {
        let a = 5;
        let col = 'f';
        if(board[a][0] != 0){
            alert("This column's a bit full, maybe try another one?");
        }
        else{
            addDisk(a, col);
            changePlayer();
        }
    })

    document.getElementById('add-g').addEventListener('click', () => {
        let a = 6;
        let col = 'g';
        if(board[a][0] != 0){
            alert("This column's a bit full, maybe try another one?");
        }
        else{
            addDisk(a, col);
            changePlayer();
        }
    })

    document.getElementById('reset').addEventListener('click', () => {
        reset();
        score[1] = 0;
        score[2] = 0;
        document.getElementById('p1').innerHTML = 0;
        document.getElementById('p2').innerHTML = 0;
    })
})();