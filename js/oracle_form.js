// Configuration values for API fetch
const API_CONFIG = {
    KEY: "40be0e119a3341678d7140357262004",
    CITY: "Yangon",
    BASE_URL: "https://api.weatherapi.com/v1/astronomy.json"
};

document.addEventListener('DOMContentLoaded', function(){
    const urlParameters = new URLSearchParams(window.location.search);
    const selectedCategory = urlParameters.get('category');

    if(selectedCategory){
        const categoryDropdown = document.getElementById('userCategory');
        if(categoryDropdown){
            categoryDropdown.value = selectedCategory;
            console.log("Auto-selected category:");
        }
    }
});


function getMoonPhaseFallback() {
    const lp = 2551443;          // Lunar cycle in seconds
    const now = new Date();
    const new_moon = new Date(1970, 0, 7, 20, 35, 0); 
    const phase = ((now.getTime()-new_moon.getTime())/1000)%lp;
    const res = Math.floor(phase/(24 * 3600));

    if (res === 0 || res === 29) return "New Moon";
    if (res > 0 && res < 7) return "Waxing Crescent";
    if (res === 7) return "First Quarter";
    if (res > 7 && res < 14) return "Waxing Gibbous";
    if (res === 14) return "Full Moon";
    if (res > 14 && res < 21) return "Waning Gibbous";
    if (res === 21) return "Last Quarter";
    return "Waning Crescent";
}

function showCosmicAlert(message) {
    const alertOverlay = document.getElementById('cosmic-alert');
    document.getElementById('alert-message').innerText = message;
    alertOverlay.classList.add('show');
}

function closeCosmicAlert() {
    document.getElementById('cosmic-alert').classList.remove('show');
}

async function submitOracleForm(){
    const name = document.getElementById('userName').value;
    const zodiac = document.getElementById('userZodiac').value;
    const category = document.getElementById('userCategory').value;

    if (name.trim() === ""){
        showCosmicAlert("Please share your name with the stars before proceeding.");
        return;
    }

    // loading display
    // document.getElementById('loadingScreen').style.display = 'flex';
    showLoading();

    //js object build
    const userData ={
        name: name,
        zodiac: zodiac,
        category: category
    };
    //sessionstorage storing
    sessionStorage.setItem('onboardingFormData', JSON.stringify(userData));

    try {
        //wait the api for only 3 secs
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        // creating URL using Template literals
        const apiUrl = `${API_CONFIG.BASE_URL}?key=${API_CONFIG.KEY}&q=${API_CONFIG.CITY}`;

        const response = await fetch(apiUrl, {signal: controller.signal});
        const data = await response.json();

        if (data.astronomy && data.astronomy.astro) {
            // if success, store the phase fetched from api
            sessionStorage.setItem('moonPhase', data.astronomy.astro.moon_phase);
            console.log("Moon phase fetched from API:", data.astronomy.astro.moon_phase);
        } else {
            throw new Error("Invalid API Data");
        }

    } catch (error) {
        // use below fallback plan if api error or vpn is not used
        const fallbackValue = getMoonPhaseFallback();
        sessionStorage.setItem('moonPhase', fallbackValue);
        console.warn("Using Fallback Logic:", fallbackValue);
    }
    

    window.location.href = 'the_deck.html';

}
