// const music = document.getElementById("bg-music");
// const muteBtn = document.getElementById("mute-btn");
// const volumeSlider = document.getElementById("volume-slider");

// // 🎵 Define music per page
// const pageMusic = {
//     "index.html": "sounds/theme.mp3",
//     "tarot.html": "sounds/tarot.mp3",
//     "about.html": "sounds/intro.mp3"
// };

// // Detect current page
// let currentPage = window.location.pathname.split("/").pop();
// if (currentPage === "") currentPage = "index.html";

// // Set music source
// if (pageMusic[currentPage]) {
//     music.src = pageMusic[currentPage];
// }

// // Load saved settings
// let savedVolume = localStorage.getItem("musicVolume");
// let savedMuted = localStorage.getItem("musicMuted");

// if (savedVolume !== null) {
//     music.volume = savedVolume;
//     volumeSlider.value = savedVolume;
// } else {
//     music.volume = 0.2;
//     volumeSlider.value = 0.2;
// }

// if (savedMuted === "true") {
//     music.muted = true;
//     muteBtn.textContent = "🔇";
// }

// // Start music on first interaction
// function startMusic() {
//     if (!music.muted) {
//         music.play().then(() => fadeIn());
//     }
//     document.removeEventListener("click", startMusic);
// }
// document.addEventListener("click", startMusic);

// // Fade in
// function fadeIn() {
//     let vol = 0;
//     music.volume = 0;
//     let fade = setInterval(() => {
//         if (vol < volumeSlider.value) {
//             vol += 0.01;
//             music.volume = vol;
//         } else {
//             clearInterval(fade);
//         }
//     }, 100);
// }

// // Fade out before leaving page
// window.addEventListener("beforeunload", () => {
//     music.volume = 0;
// });

// // Mute toggle
// muteBtn.addEventListener("click", () => {
//     music.muted = !music.muted;

//     if (music.muted) {
//         muteBtn.textContent = "🔇";
//         localStorage.setItem("musicMuted", "true");
//     } else {
//         muteBtn.textContent = "🔊";
//         localStorage.setItem("musicMuted", "false");
//         music.play();
//     }
// });

// // Volume control
// volumeSlider.addEventListener("input", () => {
//     music.volume = volumeSlider.value;
//     localStorage.setItem("musicVolume", volumeSlider.value);
// });
