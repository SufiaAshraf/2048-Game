var board;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function(){
    setGame();
}

function setGame(){
    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]

    for(let r=0; r<rows; r++){
        for(let c=0; c<columns; c++){
            let tile = document.createElement('div');
            tile.id = r.toString()+"-"+c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
    setTwo();
    setTwo();
}
function hasEmptyTile(){
    for(let r=0; r<rows; r++){
        for(let c=0; c<columns; c++){
            if(board[r][c]==0){
                return true;
            }
        }
    }
    return false;
}


function resetBoard(){
    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]
}

function isValid(r, c){
    return (r>=0 && r<rows && c>=0 && c<columns);
}

function rowMovePossible(row){
    let dx = [1,-1,0,0];
    let dy = [0,0,1,-1];
    for(let c=0; c<columns; c++){
        for(let i=0; i<4; i++){
            let newr = row+dx[i];
            let newc = c+dy[i];
            if(isValid(newr, newc) && board[row][c]===board[newr][newc]){
                return true;
            }
        }
    }
    return false;
}

//Detect if there are no longer any moves
function movesPossible(){
    for(let r=0; r<rows; r++){
        if(rowMovePossible(r)){
            return true;
        }
    }
    return false;
}


function setTwo(){
    if(!hasEmptyTile()){
        if(!movesPossible()){
            // Example event listener for a button
            showGameOver(score);
            return;
        }
        return;
    }
    let found = false;
    while(!found){
        let r = Math.floor(Math.random()*rows);
        let c = Math.floor(Math.random()*columns);
        if(board[r][c] == 0){
            board[r][c] = 2;
            let tile = document.getElementById(r.toString()+"-"+c.toString());
            tile.innerText="2";
            tile.classList.add("x2");
            found=true;
        }
    }
    return;
}

function updateTile(tile, num){
    tile.innerText = "";
    tile.classList.value = ""; //Clear the class list
    tile.classList.add("tile");
    if(num>0){
        tile.innerText=num;
        if(num<=4096){
            tile.classList.add("x"+num.toString());
        }else{
            tile.classList.add("x8192");
        }
    }
}

document.addEventListener("keyup", (e)=>{
    if(e.code=="ArrowLeft"){
        slideLeft();
        setTwo();
    }else if(e.code=="ArrowRight"){
        slideRight();
        setTwo();
    }else if(e.code=="ArrowDown"){
        slideDown();
        setTwo();
    }else  if(e.code=="ArrowUp"){
        slideUp();
        setTwo();
    }
    document.getElementById("score").innerText=score;
});

function filterZero(row){
    return row.filter(num => num!=0);
}

function slide(row){
    //[2,2,2,0];
    row = filterZero(row);
    //[2,2,2]
    for(let i=0; i<row.length-1; i++){
        if(row[i]==row[i+1]){
            row[i]*=2;
            row[i+1]=0;
            score+=row[i];
        }
    }//[4,0,2];

    row = filterZero(row);
    while(row.length<columns){
        row.push(0);
    }
    return row;
}

function slideLeft(){
    for(let r=0; r<rows; r++){
        let row = board[r];
        row = slide(row);
        board[r] = row;
        for(let c=0; c<columns; c++){
            let tile = document.getElementById(r.toString()+"-"+c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
    }
}

function slideRight(){
    for(let r=0; r<rows; r++){
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;
        for(let c=0; c<columns; c++){
            let tile = document.getElementById(r.toString()+"-"+c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
    }
}


function slideUp(){
    for(let c=0; c<columns; c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        for(let r=0;r<rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString()+"-"+c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
    }
}

function slideDown(){
    for(let c=0; c<columns; c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        for(let r=0;r<rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString()+"-"+c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
    }
}

function showGameOver(score) {
    console.log("SHOW GAME OVER");
    var gameOver = document.createElement("div");
    gameOver.classList.add("game-over");
    gameOver.innerHTML = `<h2>Game Over</h2>
    <p>Your score: <span id="score">${score}</span></p>`
    var gameOverButton = document.createElement("button");
    gameOverButton.id = "game-over-button";
    gameOverButton.innerText = "Try Again!";
    gameOverButton.addEventListener("click", ()=>{
        score=0;
        location.reload();
    });
    gameOver.appendChild(gameOverButton);
    document.getElementById('reset').appendChild(gameOver);
    
    // document.getElementById("score").textContent = score;
    // document.getElementById("game-over").style.display = "block";
}


  