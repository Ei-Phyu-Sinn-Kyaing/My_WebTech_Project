let bgAudio = new Audio();
bgAudio.loop = true;
bgAudio.volume = 0.3;

const muteIcon = `<svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M18 14L20.0005 12M22 10L20.0005 12M20.0005 12L18 10M20.0005 12L22 14" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M2 13.8571V10.1429C2 9.03829 2.89543 8.14286 4 8.14286H6.9C7.09569 8.14286 7.28708 8.08544 7.45046 7.97772L13.4495 4.02228C14.1144 3.5839 15 4.06075 15 4.85714V19.1429C15 19.9392 14.1144 20.4161 13.4495 19.9777L7.45046 16.0223C7.28708 15.9146 7.09569 15.8571 6.9 15.8571H4C2.89543 15.8571 2 14.9617 2 13.8571Z" stroke="#ffffff" stroke-width="1.5"></path></svg>`;
const unmuteIcon = `<svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M2 13.8571V10.1429C2 9.03829 2.89543 8.14286 4 8.14286H6.9C7.09569 8.14286 7.28708 8.08544 7.45046 7.97772L13.4495 4.02228C14.1144 3.5839 15 4.06075 15 4.85714V19.1429C15 19.9392 14.1144 20.4161 13.4495 19.9777L7.45046 16.0223C7.28708 15.9146 7.09569 15.8571 6.9 15.8571H4C2.89543 15.8571 2 14.9617 2 13.8571Z" stroke="#ffffff" stroke-width="1.5"></path><path d="M17.5 7.5C18.5 8.5 19 10 19 12C19 14 18.5 15.5 17.5 16.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20.5 4.5C22 6 22.5 9 22.5 12C22.5 15 22 18 20.5 19.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;

const pageAudioMap = {
    "index.html": "sounds/theme.mp3",
    "oracle.html": "sounds/oracle.mp3",
    "the_deck.html": "sounds/silent.mp3",
    "synthesis.html": "sounds/silent.mp3",
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

    //  UI Controls 
    setupAudioUI();

    // checking session and mute status
    const sessionActive = sessionStorage.getItem('sessionActive');
    
    if (currentPage === "index.html" && !sessionActive) {
        sessionStorage.setItem('isMuted', 'false');
        if (overlay) overlay.style.display = 'flex';
    } else {
        if (overlay) overlay.style.display = 'none';

        // checking mute status when website is being used
        const isMuted = sessionStorage.getItem('isMuted') === 'true';
        if (!isMuted) startMusic();
    }

    // Begin Journey Button Logic
    if (readyBtn) {
        readyBtn.addEventListener('click', () => {
            sessionStorage.setItem('sessionActive', 'true');
            sessionStorage.setItem('isMuted', 'false');

            overlay.classList.add('fade-out');
            setTimeout(() => { overlay.style.display = 'none'; 
                                updateMuteButtonUI(false);
            }, 800);
            startMusic();
        });
    }

    // sessioned storing current song time and song before load
    window.addEventListener('beforeunload', () => {
        if (!bgAudio.paused) {
            sessionStorage.setItem('audioLastTime', bgAudio.currentTime);
            sessionStorage.setItem('audioLastSrc', bgAudio.src);
        }
    });
});

// inserting volumn UI using js
function setupAudioUI() {
    const isMuted =sessionStorage.getItem('isMuted') === 'true';
    const icon = isMuted ? muteIcon : unmuteIcon;

    const uiHtml = `
        <div id="audio-ui-wrapper" style="position:fixed; bottom:20px; right:20px; z-index:10000; display:flex; flex-direction:column-reverse; align-items:center; gap:10px;">
            <button id="speaker-btn" style="background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.3); color:white; width:45px; height:45px; border-radius:50%; font-size:1.2rem; cursor:pointer; backdrop-filter:blur(5px); display:flex; justify-content:center; align-items:center; transition:0.3s;">
                ${icon}
            </button>
            <div id="volume-ctrl-container" style="height:0; overflow:hidden; transition:0.3s; background:rgba(10,14,39,0.8); border-radius:10px; padding:0 5px; backdrop-filter:blur(5px);">
                <input type="range" id="volume-slider" min="0" max="100" value="${bgAudio.volume * 100}" 
                    style="writing-mode: vertical-lr; direction: rtl; width:15px; height:100px; cursor:pointer; appearance: auto;">
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', uiHtml);

    const speakerBtn = document.getElementById('speaker-btn');
    const wrapper = document.getElementById('audio-ui-wrapper');
    const slider = document.getElementById('volume-slider');
    const volContainer = document.getElementById('volume-ctrl-container');

    wrapper.onmouseenter = () => { volContainer.style.height = "120px"; volContainer.style.padding = "10px 5px"; };
    wrapper.onmouseleave = () => { volContainer.style.height = "0"; volContainer.style.padding = "0 5px"; };

    speakerBtn.addEventListener('click', () => {
        const currentlyMuted = sessionStorage.getItem('isMuted') === 'true';
        const newState = !currentlyMuted;
        sessionStorage.setItem('isMuted', newState);
        
        if (newState) {
            bgAudio.pause();
            speakerBtn.innerHTML = muteIcon;
        } else {
            startMusic();
            speakerBtn.innerHTML = unmuteIcon;
        }
    });

    slider.addEventListener('input', (e) => {
        const val = e.target.value / 100;
        bgAudio.volume = val;
        if (val > 0) {
            sessionStorage.setItem('isMuted', 'false');
            speakerBtn.innerHTML= unmuteIcon;
            if (bgAudio.paused) bgAudio.play();
        }
    });
}

// function to update button icon
function updateMuteButtonUI(isMuted) {
    const speakerBtn = document.getElementById('speaker-btn');
    if (speakerBtn) {
        speakerBtn.innerHTML = isMuted ? muteIcon : unmuteIcon;
    }
}

function startMusic() {
    const isMuted = sessionStorage.getItem('isMuted') === 'true';
    if (!isMuted) {
        // const currentPage = window.location.pathname.split("/").pop() || "index.html";
        const newSrc = pageAudioMap[currentPage] || "sounds/theme.mp3";
        // const absoluteNewSrc = window.location.origin + "/" + newSrc;

        const lastSrc = sessionStorage.getItem('audioLastSrc');
        const lastTime = sessionStorage.getItem('audioLastTime');
        
        // if (bgAudio.src === absoluteNewSrc) {
        //     if (bgAudio.paused) bgAudio.play();
        //     return;
        // }

        if (bgAudio.src.src.endsWith(newSrc)) {
            if (bgAudio.paused) bgAudio.play();
            return;
        }

        bgAudio.src = newSrc;

        if (lastSrc === absoluteNewSrc && lastTime) {
            bgAudio.currentTime = parseFloat(lastTime);
        }

        bgAudio.play().catch(err => console.log("User interaction needed"));
    }
}


//object creating for button clicks

const indexClick = new Audio('sounds/indexbutton.mp3');
indexClick.volume = 0.5; 

const oracleClick = new Audio('sounds/oraclebutton.mp3');
oracleClick.volume = 0.5; 

const clickClick = new Audio('sounds/click.mp3');
clickClick.volume = 0.5; 

const shuffleSound = new Audio('sounds/shuffle.mp3');
shuffleSound.volume = 0.5;

const selectSound = new Audio('sounds/cardselect.mp3');
selectSound.volume = 0.5;

const revealSound = new Audio('sounds/wow.mp3');
revealSound.volume = 0.5;

// const typingSound = new Audio('sounds/typing.mp3');
// typingSound.volume = 0.5;

const clickFlip = new Audio('sounds/cardflip.mp3');
clickFlip.volume = 0.5; 

