const zodiacTraits = {
    "Scorpio": "your intense intuition and transformative energy",
    "Aries": "your bold leadership and courageous spirit",
    "Taurus": "your grounded nature and persistent strength",
    "Gemini": "your versatile mind and curious soul",
    "Cancer": "your deep emotional wisdom and nurturing heart",
    "Leo": "your radiant confidence and creative passion",
    "Virgo": "your analytical clarity and dedicated spirit",
    "Libra": "your seeking of balance and harmonious grace",
    "Sagittarius": "your adventurous spirit and philosophical depth",
    "Capricorn": "your disciplined ambition and steady resilience",
    "Aquarius": "your visionary ideas and independent spirit",
    "Pisces": "your compassionate dreams and mystical insight"
};   //mapping object creating

const positions = ["Past", "Present", "Future"];  //mapping object creating

const moonMeanings = {
    "New Moon": "a time for new beginnings and setting fresh intentions",
    "Waxing Crescent": "a period of growth and manifesting your desires",
    "First Quarter": "a time to take action and overcome challenges",
    "Waxing Gibbous": "a phase of refinement and patient adjustment",
    "Full Moon": "the peak of energy, bringing clarity and realization",
    "Waning Gibbous": "a time for gratitude and sharing your wisdom",
    "Last Quarter": "a period of release and letting go of what no longer serves you",
    "Waning Crescent": "a time for rest, reflection, and deep healing",
    "Mystical Alignment": "a special moment of celestial mystery and guidance" // for Default error case 
};


function generateSynthesizedReading() {
    //data extracting from localStorage, unpacking and formatting
    const userData = JSON.parse(localStorage.getItem('onboardingFormData'));
    const selectedCards = JSON.parse(localStorage.getItem('userReading'));

    const currentMoon = localStorage.getItem('moonPhase') || "Mystical Alignment";
    const moonDescription = moonMeanings[currentMoon] || moonMeanings["Mystical Alignment"];
    
    if (!userData || !selectedCards){
        console.error("Missing Data in localStorage!");
    return;
    }
    
    const {name, zodiac, category} = userData;
    const trait = zodiacTraits[zodiac] || "your unique celestial path";
    const userCategory = category.toLowerCase();    //formatting

    //variables for UI view
    let cardRowsHTML = "";
    let narrativeParts = [];

    
    //nested objects and Multi-layered mapping logic
    selectedCards.forEach((card, index) =>{
        const position = positions[index];
        const orientation = card.isReversed ? "reversed" : "upright";

        const specificMeaning = card.meanings[userCategory][orientation]  //nested objects extracting

        //HTML for individual card section
        cardRowsHTML += `
        <div class="reading-row">
            <div class="card-slot">
                <img src="${card.image}" class="${card.isReversed ? 'reversed' : ''}">
            </div>
            <div class="reading-text">
                <h3>${position}: ${card.name} (${orientation.toUpperCase()})</h3>
                <p>${specificMeaning}</p>
            </div>
        </div>
        `;

        //collecting parts for narrtive 
        narrativeParts.push(`the influence of ${card.name} in your ${position.toLowerCase()}`);
    });

    //Creating narrative by using Template Literals
    const finalNarrative = `
    Hello, ${name}. As a **${zodiac}**, guided by ${trait}, 
    your ${category} journey is unfolding in a significant way. 

    Currently, the world is under the *${currentMoon}*, which signifies ${moonDescription}. 
    Combined with this lunar energy, your reading suggests a transition from ${narrativeParts[0]}, 
    moving through ${narrativeParts[1]}, 
    and finally manifesting into ${narrativeParts[2]}. 
    
    Trust these signs as they align with your cosmic blueprint.`;

    //transmitting data to th UI
    document.getElementById('card-results-container').innerHTML = cardRowsHTML;
    document.getElementById('final-synthesis-text').innerHTML = finalNarrative;

}

    // logic is activated once the page is loaded
    document.addEventListener('DOMContentLoaded', generateSynthesizedReading);
   