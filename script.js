const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

// All possible combinations for winning
const winningPostions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // function to initialize the game

  function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];

    //empty the boxes on UI
    boxes.forEach((box , index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
    
        //initialise box with with css properties again
        
        box.classList = `box box-${index+1}`;
    
    });


    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current player - ${currentPlayer}`;

  }

  initGame();

  function handleClick(index){

    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //swap the turn
        swapTurn();

        //check if there is any winner
        checkGameOver();
    }
  }

  //function to switch player
  function swapTurn(){
    if(currentPlayer == "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }

    //ui update
    gameInfo.innerText = `Current Player- ${currentPlayer}`;
  }

//function to check if the game is over

function checkGameOver(){

    let answer = "";

    //all 3 boxes should be non-empty and should have exactly same value
    winningPostions.forEach((position) => {
        if(( gameGrid[position[0]] !== "" || 
        gameGrid[position[1]] !== "" || 
        gameGrid[position[1]] !== "") && 
        ( gameGrid[position[0]] === gameGrid[position[1]]) &&  
        ( gameGrid[position[1]] === gameGrid[position[2]]) ){

            //check if winner is X
            if(gameGrid[position[0]] === "X"){
                answer = "X";
            }
            else{
                answer = "O";
            }

            //disable pointer event
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })


            //now we know which one is winner so now colour the background of winner

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });


    //we have a winner
    if(answer !== ""){
        gameInfo.innerText = `Winner Player- ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //let's check if the game is tie
    let fillcount = 0;
    gameGrid.forEach((box) =>{
        if(box !== ""){
            fillcount++;
        }
    });

    //board is filled, game is tie
    if(fillcount === 9){
        gameInfo.innerText = "Game Tied!";
        newGameBtn.classList.add("active");
    }


}


  boxes.forEach((box, index) => {
    box.addEventListener("click" , () => {
        handleClick(index);
    }) 
  });

//new game button
newGameBtn.addEventListener("click", initGame);