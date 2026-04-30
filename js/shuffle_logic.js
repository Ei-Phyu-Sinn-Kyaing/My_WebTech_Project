/** * Algorithm: Fisher-Yates (Knuth) Shuffle
 * Purpose: To ensure a mathematically fair and random distribution of cards
 * Reference: https://bost.ocks.org/mike/shuffle/ 
 */

function shuffleTheDeck (deck) {     //this uses Fisher yates algorithm
    let n = deck.length;

    for (let i = n-1; i>0; i--)
    {
        let j = Math.floor (Math.random() * (i+1));
        [deck[i], deck[j]] = [deck[j], deck[i]];    //used destructuring assignment

        deck[i].isReversed = Math.random() > 0.5;  //reverse function
    }
    return deck;
}
