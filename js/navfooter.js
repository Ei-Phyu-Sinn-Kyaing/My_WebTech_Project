async function loadHTML(id, filename)
{
    try{
        const response = await fetch(filename);
        if (!response.ok) throw new Error (`${filename}not found`);   //to prevent if file is not found
    
        const data  = await response.text();
        document.getElementById(id).innerHTML = data;
    }
    catch(error){
        console.error('Error',error);  //to describe the thrown error
    }
    
}

loadHTML("navbar", "navbar.html");
loadHTML("footer", "footer.html");


// Speaker Icon toggle function (audio_logic.js ထဲမှာပဲ ဆက်ရေးလို့ရတယ်)
function setupVolumeControl() {
    // HTML ထဲကို speaker button လှမ်းထည့်မယ် (မရှိသေးရင်)
    if (!document.getElementById('speaker-btn')) {
        const btnHtml = `<button id="speaker-btn" style="position:fixed; bottom:20px; right:20px; z-index:1000; background:none; border:none; font-size:2rem; cursor:pointer;">🔊</button>`;
        document.body.insertAdjacentHTML('beforeend', btnHtml);
    }

    const speakerBtn = document.getElementById('speaker-btn');
    speakerBtn.addEventListener('click', () => {
        if (bgAudio.muted) {
            bgAudio.muted = false;
            speakerBtn.innerText = "🔊";
        } else {
            bgAudio.muted = true;
            speakerBtn.innerText = "🔈";
        }
    });
}
document.addEventListener('DOMContentLoaded', setupVolumeControl);