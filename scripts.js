window.onload = pageReady;

function pageReady() {
    //get variables
    let arr = [];
    let cardCount = 6;

    //arr and objects
    let objContain = {};
    for (let i = 0; i < cardCount; i++) {
        let phrase = `card${i+1}`;
        arr[i] = document.getElementById(phrase);
        
        const temp = {
            card: i,
            isTurned: false,
            matchNum: 0
        };
        objContain[i] = temp;
    };

    //set matchNum numbers
    let sets = cardCount/2;
    let carry = [0,0,1,1,2,2];
    let shuffled = carry
    .map(value => ({ value, sort: Math.random() }))
    .sort((a,b) => a.sort - b.sort)
    .map(({ value }) => value)
    
    for (let k = 0; k < shuffled.length; k++) {
        objContain[k].matchNum = shuffled[k];
    };

    //flip function
    function flip(entry) {
        if (entry.isTurned === false) {
            arr[entry.card].querySelector(".card-inner").style.transform = "rotateY(180deg)";
            entry.isTurned = true;
        } else {
            arr[entry.card].querySelector(".card-inner").style.transform = "none";
            entry.isTurned = false;
        }
    }

    //function to check if they got a match or not

    //event handlers
    for (let j = 0; j < cardCount; j++) {
        arr[j].querySelector(".card-back").innerHTML = `${objContain[j].matchNum}`;
        arr[j].addEventListener("click", () => {
            flip(objContain[j]);
        });
    }
}