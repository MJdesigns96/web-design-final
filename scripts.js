window.onload = pageReady;

function pageReady() {
    //get variables
    const card = document.getElementById("card");
    const cardInner = document.getElementById("card-inner");
    let turned = false;

    function flip() {
        if (!turned) {
            cardInner.style.transform = "rotateY(180deg)";
            turned = true;
        } else {
            cardInner.style.transform = "none";
            turned = false;
        }
        
    }

    card.addEventListener("click", flip);
}