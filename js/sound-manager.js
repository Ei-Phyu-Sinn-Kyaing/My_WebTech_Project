let bgAudio = new Audio();
bgAudio.loop = true;
bgAudio.volume = 0.3;

const pageAudioMap = {
    "index.html": "sounds/theme.mp3",
    "oracle.html": "sounds/theme.mp3",
    "the_deck.html": "sounds/theme.mp3",
    "synthesis.html": "sounds/theme.mp3",
    "saved_readings.html": "sounds/theme.mp3",
    "saved_reading_detail.html": "sounds/theme.mp3",
    "tarot_library.html": "sounds/theme.mp3",
    "card_meaning.html": "sounds/theme.mp3",
    "about.html": "sounds/theme.mp3",
};

document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('music-overlay');
    const readyBtn = document.getElementById('ready-btn');
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    // ၁။ Music status ကို စစ်မယ်
    const audioStatus = localStorage.getItem('audioEnabled');

    if (currentPage === "index.html" && !audioStatus) {
        // ပထမဆုံးအကြိမ်ဆိုရင် overlay ပြမယ်
        overlay.classList.remove('hidden');
    } else {
        // တခြား page တွေမှာဆိုရင် overlay ဖျောက်ထားမယ်
        if(overlay) overlay.classList.add('hidden');
        if(audioStatus === 'true') startMusic();
    }

    // ၂။ Ready Button နှိပ်တဲ့အခါ
    if (readyBtn) {
        readyBtn.addEventListener('click', () => {
            localStorage.setItem('audioEnabled', 'true');

            //animation fadeout class
            overlay.classList.add('fade-out');

            //absolute remove after animation
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 800);

            startMusic();
        });
    }
});

function startMusic() {
    const isEnabled = localStorage.getItem('audioEnabled');
    if (isEnabled === 'true') {
        const currentPage = window.location.pathname.split("/").pop() || "index.html";
        const newSrc = pageAudioMap[currentPage] || "audio/ambient_home.mp3";
        
        if (bgAudio.src !== window.location.origin + "/" + newSrc) {
            bgAudio.src = newSrc;
        }
        
        bgAudio.play().catch(err => console.log("Waiting for user interaction..."));
    }
}