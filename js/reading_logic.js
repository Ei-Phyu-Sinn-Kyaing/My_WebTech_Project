//global variables
let theDeck = [];
let counter = 0;
let tempArray = [];

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


function selectCards (index, element) {
    if (counter<3 && !element.classList.contains('selected')){
        counter++;     //counter logic to check select count

    tempArray.push(theDeck[index]);    //pushing the selected card into the tempArray

    element.classList.add('selected'); //adding class to show the selected card
    console.log (`Card ${counter} selectd:`, theDeck[index].name);
    
        if (counter === 3){
            console.log ("All 3 cards are selected!", tempArray);
            alert ("3 Cards are selected! You can go synthesize page now.")
            localStorage.setItem('userReading', JSON.stringify(tempArray));

            const synthesizeBtn = document.querySelector('.primary-btn');
            synthesizeBtn.computedStyleMap.boxShadow = "0 0 40 px rgba(0, 255, 150, 0.6)";
        }

    }
    else if (element.classList.contains('selected')){
        console.log ("This card is already selected!");
    }
    else if (counter>= 3){
        console.log("You can't select more than 3 cards!")
        alert("Your maximum limit reached!")
    }
}


//event handling for button shuffle manually
button.addEventListener('click', function()
{
    button.classList.toggle('rotate');

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











