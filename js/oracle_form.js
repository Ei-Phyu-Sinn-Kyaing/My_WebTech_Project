document.addEventListener('DOMContentLoaded', function(){
    const urlParameters = new URLSearchParams(window.location.search);
    const selectedCategory = urlParameters.get('category');

    if(selectedCategory){
        const categoryDropdown = document.getElementById('userCategory');
        if(categoryDropdown){
            categoryDropdown.value = selectedCategory;
            console.log("Auto-selecteed category:", )
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


async function submitOracleForm(){
    const name = document.getElementById('userName').value;
    const zodiac = document.getElementById('userZodiac').value;
    const category = document.getElementById('userCategory').value;

    if (name.trim() === ""){
        alert("Your name cannot be nulled! Enter you name.");
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
    //localstorage storing
    localStorage.setItem('onboardingFormData', JSON.stringify(userData));

    const apiKey = "40be0e119a3341678d7140357262004"; 
    const city = "Yangon"; // give Location

    try {
        //wait the api for only 3 secs
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        const response = await fetch(`https://api.weatherapi.com/v1/astronomy.json?key=${apiKey}&q=${city}`, { signal: controller.signal });
        const data = await response.json();

        if (data.astronomy && data.astronomy.astro) {
            // if success, store the phase fetched from api
            localStorage.setItem('moonPhase', data.astronomy.astro.moon_phase);
            console.log("Moon phase fetched from API:", data.astronomy.astro.moon_phase);
        } else {
            throw new Error("Invalid API Data");
        }

    } catch (error) {
        // use below fallback plan if api error or vpn is not used
        const fallbackValue = getMoonPhaseFallback();
        localStorage.setItem('moonPhase', fallbackValue);
        console.warn("Using Fallback Logic:", fallbackValue);
    }
    

    window.location.href = 'the_deck.html';

}





// try{
//         const timestamp = Math.floor(Date.now() / 1000);

//         const response = await fetch(`https://api.farmsense.net/v1/moonphase/?d=${timestamp}`);
//         const data = await response.json();

//         const moonPhaseName = data[0].Phase;
//         localStorage.setItem('moonPhase', moonPhaseName);
//         console.log("MoonPhase is successfully fetched!")
//     }
//     catch(error){
//         console.error("Moon Phase Fetch Error", error);
//         localStorage.setItem('moonPhase', "Mystical Alignment");
//     }