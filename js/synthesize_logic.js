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


function typeWriter(element, text, speed = 25) {
    const typingSound = new Audio('sounds/typing.mp3');
    typingSound.volume = 0.5;
    
    return new Promise((resolve) => {
        let i = 0;
        element.innerHTML = "";
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                resolve(); // signal to jump the next sentence after typing finished
            }
            typingSound.play();
        }
        type();
    });
}

async function generateSynthesizedReading() {
    //data extracting from localStorage, unpacking and formatting
    const userData = JSON.parse(sessionStorage.getItem('onboardingFormData'));
    const selectedCards = JSON.parse(sessionStorage.getItem('userReading'));

    const currentMoon = sessionStorage.getItem('moonPhase') || "Mystical Alignment";
    const moonDescription = moonMeanings[currentMoon] || moonMeanings["Mystical Alignment"];
    
    if (!userData || !selectedCards){
        console.error("Missing Data in localStorage!");
    return;
    }
    
    const {name, zodiac, category} = userData;
    const trait = zodiacTraits[zodiac] || "your unique celestial path";
    const userCategory = category.toLowerCase();    //formatting

    const resultsContainer = document.getElementById('card-results-container');
    const finalNarrativeElement = document.getElementById('final-synthesis-text');
    
    resultsContainer.innerHTML = ''; 
    finalNarrativeElement.innerHTML = '';

    let narrativeParts = [];

    // Multilayer mapping with Nested Acess and connection logic, 
    //  Typing card by card using await (data manipulation)
    for (let i = 0; i < selectedCards.length; i++) {
        const card = selectedCards[i];
        const position = positions[i];
        const orientation = card.isReversed ? "reversed" : "upright";
        const specificMeaning = card.meanings[userCategory][orientation];

        // creating row and put it into UI
        const row = document.createElement('div');
        row.className = 'reading-row';
        row.innerHTML = `
            <div class="card-slot">
                <img src="${card.image}" class="${card.isReversed ? 'reversed' : ''}">
            </div>
            <div class="reading-text">
                <h3 id="title-${i}"></h3>
                <p id="text-${i}"></p>
            </div>
        `;
        resultsContainer.appendChild(row);

        // typing code
        await typeWriter(document.getElementById(`title-${i}`), `${position}: ${card.name} (${orientation.toUpperCase()})`, 25);
        await typeWriter(document.getElementById(`text-${i}`), specificMeaning, 30);
        
        narrativeParts.push(`the influence of '${card.name}' in your ${position.toLowerCase()}`);
    }

    //  generating Narrative Synthesis by using Template Literals
    const finalNarrative = `Hello, ${name}. As a '${zodiac}', guided by ${trait}, 
                            your '${category}' journey is unfolding in a significant way. 
                            Currently, the world is under the '${currentMoon}', 
                            which signifies ${moonDescription}. 
                            Your reading suggests a transition from ${narrativeParts[0]}, 
                            moving through ${narrativeParts[1]}, 
                            and finally manifesting into ${narrativeParts[2]}. 
                            Trust these signs as they align with your cosmic blueprint.`;

    await typeWriter(finalNarrativeElement, finalNarrative, 13);
}

    document.addEventListener('DOMContentLoaded',generateSynthesizedReading());