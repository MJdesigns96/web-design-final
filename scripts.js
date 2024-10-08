window.onload = pageReady;

function pageReady() {
    //get variables
    let arr = [];
    let cardCount = 6;
    let card1;
    let card2;
    let temp; //a temporary store for the first flipped card
    let score = 0;
    const scoreTally = document.getElementById("score");
    scoreTally.innerHTML = score;
    const startGame = document.getElementById("startGame");
    const winMessage = document.getElementById("winner");
    const playAgain = document.getElementById("playAgain");
    let start = false;

    //create an array of cards based on ID and make a corresponding object for each card with info
    let objContain = {};
    for (let i = 0; i < cardCount; i++) {
        let phrase = `card${i+1}`;
        arr[i] = document.getElementById(phrase);
        
        const obj = {
            card: i,
            isTurned: false,
            matchNum: 0,
            isMatched: false,
            img: ""
        };
        objContain[i] = obj;
    };

    //set matchNum numbers randomly - Code found on stack overflow and edited
    let carry = [0,0,1,1,2,2];
    let shuffled = carry
    .map(value => ({ value, sort: Math.random() }))
    .sort((a,b) => a.sort - b.sort)
    .map(({ value }) => value);

    //add imgs to the card backs depending on the assigned number
    for (let k = 0; k < shuffled.length; k++) {
        objContain[k].matchNum = shuffled[k];
        if (shuffled[k] === 0) {
            objContain[k].img = "./images/bulbasaur.png";
        } else if (shuffled[k] === 1) {
            objContain[k].img = "./images/charmander.jpg";
        } else {
            objContain[k].img = "./images/squirtle.png";
        }
    };

    
    //flip function
    function flip(entry) {
        if (entry.isTurned === false) {
            //flip the first card with css transform
            arr[entry.card].querySelector(".card-inner").style.transform = "rotateY(180deg)";
            entry.isTurned = true;
            
            //set the first card info and set carry
            if (card1 === undefined) {
                card1 = entry.matchNum;
                temp = entry;
            } else {
                //set second card info and check to see if it is a match
                card2 = entry.matchNum;
                let result = checkMatch();
                //after a 1s delay flip the cards over if they are not a match
                setTimeout(function(){
                    if (!result) {
                    arr[entry.card].querySelector(".card-inner").style.transform = "none";
                    arr[temp.card].querySelector(".card-inner").style.transform = "none";
                    entry.isTurned = false;
                    temp.isTurned = false;
                    } else {
                        arr[entry.card].querySelector(".card-inner").style.pointerEvents="none";
                        arr[temp.card].querySelector(".card-inner").style.pointerEvents="none";
                    }
                }, 1000);
            };
        }; 
    };

    //function to check if they got a match or not
    function checkMatch() {
        if (card1 === card2) {
            score++;
            scoreTally.innerHTML = score;
            card1 = undefined;
            card2 = undefined;
            return true;
        } else {
            card1 = undefined;
            card2 = undefined;
            return false;
        };
    };
    
    //event handlers
    for (let j = 0; j < cardCount; j++) {
        //set images for the cards
        let img = document.createElement("img");
        img.src = objContain[j].img;
        arr[j].querySelector(".card-back").appendChild(img);

        //add click event handler onto each card
        arr[j].addEventListener("click", () => {
            //only flip if the game has started
            if (start) {
                flip(objContain[j]);
            };
            //if all the matches have been found translate the win message
            if (score === 3) {
                winMessage.style.left = "100%";
                winMessage.style.top = "100%";
                winMessage.style.transform = "translate(-125%, -125%)";
                winMessage.style.transition = "transform 1.5s ease-in-out";
            };
        });
    };

    //have a window that appears to start the game. Once clicked move it out of the screen
    startGame.addEventListener("click", e => {
        let temp = document.getElementById("opening");
        temp.style.transform = "translateX(-2000px)";
        temp.style.transition = "transform 1.5s ease-in-out";
        start = true;
    });

    //give user option to play again
    playAgain.addEventListener("click", e => {
        window.location.reload();
    });
}