//for shuffling process
//global variables
let theDeck = [];
let counter = 0;
let tempArray = [];


function displayUserInfo(){
    const userInfo = sessionStorage.getItem('onboardingFormData');
    if (userInfo){
        const user = JSON.parse(userInfo);

        const nameElemt = document.getElementById('displayName');
        const zodiacElemt = document.getElementById('displayZodiac');
        const categoryElemt = document.getElementById('displayCategory');

        if(nameElemt)
            nameElemt.textContent = user.name;

        if(zodiacElemt)
            zodiacElemt.textContent = user.zodiac;

        if(categoryElemt)
            categoryElemt.textContent = user.category;

        console.log("UserInfo Badge updated successfully!!!");
    }
    else
    {
        console.log("No Oracle Form data found in LocalStorage!");
    }
}


//for shuffling process
const button = document.getElementById('shufflebutton');

//data fetch
fetch ('cards.json')
    .then (response => response.json())
    .then (
        data => {
        theDeck = shuffleTheDeck(data);  //auto shuffle on page laod
        console.log ("Automatically shuffled on load: ",theDeck.map(c => c.name));
        displayCards(theDeck);
    }
    )
    .catch(error => console.error('Error in loading Deck:',error));


//event handling for button shuffle manually
button.addEventListener('click', function()
{
    button.classList.toggle('rotate');
    setTimeout(() => button.classList.remove('rotate'), 1000); // rotation will stop later

    if (theDeck.length>0)
    {
        counter = 0;
        tempArray = [];
        console.log ("Selected cards reseted due to reshuffle!")
        theDeck = shuffleTheDeck(theDeck);  //overwrite by shuffling previous theDeck
        console.log ('Reshuffled by using button: ', theDeck.map(c => c.name));
        displayCards(theDeck);
    }
}
);


async function displayCards(cardDisplay){
    const container = document.getElementById ('cardContainer');
    container.innerHTML = " ";     //old data removed by every refresh

    const displayByLimit = cardDisplay.slice(0,17);
    displayByLimit.forEach((card, index) => {
        const cardDiv = document.createElement ('div');
        cardDiv.className = 'tarot-placeholder';
        // cardDiv.innerHTML = `<img src="img/tarot_img1.jpg" alt="Tarot Card" card-index="${index}">`;
        cardDiv.innerHTML = `
            <div class="card-inner">
                <img src="img/tarot_img1.jpg" class="card-back-face" alt="Back Side">
                <img src="${card.image}" class="card-front-face" alt="Front Side">
            </div>
        `;

        cardDiv.onclick = function() {
            selectCards (index, cardDiv);
        };

        shuffleSound.play();
        container.appendChild(cardDiv);

        //appear one card by card
        setTimeout(() => {
            cardDiv.classList.add('spread');
        }, index * 125);
    });
}


//display moon phase
function displayMoonPhase(){
    const moonPhase = sessionStorage.getItem('moonPhase') || "New Moon";
    const moonImgCall = document.getElementById('moonImg');
    const moonTextCall = document.getElementById('moonPhaseText');

    //mapping the img paths according to fetched moonPhase data
    const moonImages ={
        "New Moon": "img/moon-new.png",
        "Waxing Crescent": "img/moon-waxing-crescent.png",
        "First Quarter": "img/moon-waxing-quarter.png",
        "Waxing Gibbous": "img/moon-waxing-gibbous.png",
        "Full Moon": "img/moon-full.png",
        "Waning Gibbous": "img/moon-waning-gibbous.png",
        "Last Quarter": "img/moon-waning-quarter.png",
        "Waning Crescent": "img/moon-waning-crescent.png",
    };

    //changing the images
    if(moonImages[moonPhase]){
        moonImgCall.src = moonImages[moonPhase];
    }
    else{
        moonImgCall.src = "img/moon-new.png";
    }

    //displaying moonphase text
    moonTextCall.innerText = moonPhase;
}

function showCosmicAlert(message) {
    const alertOverlay = document.getElementById('cosmic-alert');
    document.getElementById('alert-message').innerText = message;
    alertOverlay.classList.add('show');
}

function closeCosmicAlert() {
    document.getElementById('cosmic-alert').classList.remove('show');
}

//card select function
function selectCards (index, element) {
    if (counter<3 && !element.classList.contains('selected')){
        counter++;     //counter logic to check select count

    onclick = selectSound.play();
    tempArray.push(theDeck[index]);    //pushing the selected card into the tempArray

    element.classList.add('selected'); //adding class to show the selected card
    // console.log (`Card ${counter} selectd:`, theDeck[index].name);
    
        if (counter === 3){
            console.log ("All 3 cards are selected!", tempArray);
            sessionStorage.setItem('userReading', JSON.stringify(tempArray));

            //flip animation call
            setTimeout(() => {
                revealCards();
            },1000);
        }

    }
    else if (element.classList.contains('selected')){
        console.log ("This card is already selected!");
        showCosmicAlert('This card is already selected!');
    }
    else if (counter>= 3){
        console.log("You can't select more than 3 cards!")
        showCosmicAlert('Your maximum limit reached!');
    }
}


//card reveal after selected
function revealCards(){
    const selectedCards = document.querySelectorAll('.tarot-placeholder.selected');

    selectedCards.forEach((card, i) => {

        //space define for selected card presentation
        let offset = (i === 0) ? -200 : (i === 1) ? 0 : 200;
        // CSS variable define
        card.style.setProperty('--offset', offset + 'px');

        const cardData = tempArray[i];

        //adding reversed class when the selected card is reversed
        if(cardData.isReversed){
            card.classList.add('reversed');
        }

        revealSound.play();

        setTimeout(()=>{
            card.classList.add('flipped');
        }, 
        i*1100);
    });
}

function revealCards(){
    const selectedCards = document.querySelectorAll('.tarot-placeholder.selected');

    //reveal bg sound during revealing
    revealSound.play();

    selectedCards.forEach((card, i) => {

        //space define for selected card presentation
        let offset = (i === 0) ? -200 : (i === 1) ? 0 : 200;
        // CSS variable define
        card.style.setProperty('--offset', offset + 'px');

        const cardData = tempArray[i];

        //adding reversed class when the selected card is reversed
        if(cardData.isReversed){
            card.classList.add('reversed');
        }

        setTimeout(()=>{

            // one flip one play
            clickFlip.currentTime = 0; 
            clickFlip.play();

            card.classList.add('flipped');
        }, 
        i*1100);
    });
}

function checkBeforeNavigate(){
    if(counter<3){
        showCosmicAlert('The stars need 3 cards to speak.');
    }
    else{
        navigateWithDelay('synthesis.html', 0.5);
    }
}



document.addEventListener('DOMContentLoaded', ()=>{
    displayUserInfo();
    displayMoonPhase();
});










