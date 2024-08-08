window.onload = pageReady;

function pageReady() {
    //get variables
    const card1 = document.getElementById("card1");
    const card2 = document.getElementById("card2");
    const card3 = document.getElementById("card3");
    const card4 = document.getElementById("card4");
    let turned = false;

    //flip function
    function flip(entry) {
        if (!turned) {
            entry.querySelector(".card-inner").style.transform = "rotateY(180deg)";
            turned = true;
        } else {
            entry.querySelector(".card-inner").style.transform = "none";
            turned = false;
        }
    }

    //event handlers
    card1.addEventListener("click", () => {
        flip(card1);
    });
    card2.addEventListener("click", () => {
        flip(card2);
    });
    card3.addEventListener("click", () => {
        flip(card3);
    });
    card4.addEventListener("click", () => {
        flip(card4);
    });
}