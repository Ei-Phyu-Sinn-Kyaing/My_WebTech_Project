function showCosmicAlert(message) {
    const alertOverlay = document.getElementById('cosmic-alert');
    document.getElementById('alert-message').innerText = message;
    alertOverlay.classList.add('show');
}

function closeCosmicAlert() {
    document.getElementById('cosmic-alert').classList.remove('show');
}

function saveReading() {
    const userData = JSON.parse(sessionStorage.getItem('onboardingFormData'));
    const moonPhase = sessionStorage.getItem('moonPhase');
    const selectedCards = JSON.parse(sessionStorage.getItem('userReading'));
    const synthesisReading = document.getElementById('final-synthesis-text').innerText;

    if (!userData || !selectedCards) {
        return alert("No reading to save!");
    }
        
    // creating object
    const readingToSave = {
        id: Date.now(),       //using timestamp for unique ID
        userInfo: userData,
        moonPhase : moonPhase,
        cards: selectedCards,
        synthesizedResult: synthesisReading,
        date: new Date().toLocaleDateString() 
    };

    // creating savedReadings container
    let savedReadings = JSON.parse(localStorage.getItem('allSavedReadings')) || [];
    // pushing current object to the container
    savedReadings.push(readingToSave);
    //store savedReadings as allSavedReadings in localStorage
    localStorage.setItem('allSavedReadings', JSON.stringify(savedReadings));

    showCosmicAlert('Reading saved successfully!');
    updateSaveButton();
}

function updateSaveButton(){
    const saveBtn = document.querySelector('button[onclick*="saveReading()"]');
    if(saveBtn){
        saveBtn.innerText = "Saved!";
        saveBtn.style.opacity = "0.5";
        saveBtn.style.cursor = "not-allowed";
        // //close attribute for more safe
        saveBtn.disabled = true;
        saveBtn.removeAttribute("onclick");
    }
}



// creating table for saved reading page
function displaySavedReadings() {
    const tableBody = document.querySelector('.saved-readings-table tbody');
    if (!tableBody) {
        return;
    }

    const savedReadings = JSON.parse(localStorage.getItem('allSavedReadings')) || [];
    tableBody.innerHTML = "";    

    savedReadings.forEach((reading) => {
        const row = `
            <tr>
                <td>${reading.userInfo.name}</td>
                <td>${reading.userInfo.category}</td>
                <td>${reading.date}</td>
                <td>
                    <button class="action-btn view-btn" onclick="clickClick.play(); viewDetail(${reading.id})">View Detail</button>
                    <button class="action-btn delete-btn" onclick="clickClick.play(); deleteReading(${reading.id})"><img src="img/trash.png" alt=""></button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function viewDetail(id) {
    sessionStorage.setItem('currentViewDetailId', id);
    // location.href = 'saved_reading_detail.html';
    navigateWithDelay('saved_reading_detail.html', 0.5)
}

let confirmCallback = null;

function showConfirmAlert(message, options = { isConfirm: false, onConfirm: null }) {
    const alertOverlay = document.getElementById('cosmic-alert');
    const cancelBtn = document.getElementById('alert-cancel-btn');
    const confirmBtn = document.getElementById('alert-confirm-btn');
    
    document.getElementById('alert-message').innerText = message;
    
    if (options.isConfirm) {
        cancelBtn.classList.remove('hidden');
        confirmCallback = options.onConfirm;
        confirmBtn.onclick = function() {
            if (confirmCallback) {
            confirmCallback();
            }
            closeCosmicAlert();
        };
        } else {
            cancelBtn.classList.add('hidden');
            confirmCallback = null;
        }
        
        alertOverlay.classList.add('show');
}

function deleteReading(id) {
    showConfirmAlert("Are you sure you want to delete this reading?", {
        isConfirm: true,
        onConfirm: () => {
        let savedReadings = JSON.parse(localStorage.getItem('allSavedReadings')) || [];
        savedReadings = savedReadings.filter(r => r.id !== id);
        localStorage.setItem('allSavedReadings', JSON.stringify(savedReadings));
        displaySavedReadings();  //refresh table
        }
    });
}



// Displaying data in reading detail page
function displayReadingDetail() {
    const detailContainer = document.querySelector('.synthesis-section');
    if (!detailContainer) {
        return;
    }

    const viewId = sessionStorage.getItem('currentViewDetailId');
    const savedReadings = JSON.parse(localStorage.getItem('allSavedReadings')) || [];
    const reading = savedReadings.find(r => r.id == viewId);
    const positions = ["Past", "Present", "Future"];

    //user info card update
    if (reading) {
        document.querySelector('.user-card').innerHTML = `
            <p><span>Name :</span> ${reading.userInfo.name}</p>
            <p><span>Zodiac :</span> ${reading.userInfo.zodiac}</p>
            <p><span>Category :</span> ${reading.userInfo.category}</p>
        `;

        const moonImages ={
        "New Moon": "img/moon-new.png",
        "Waxing Crescent": "img/moon-waxing-crescent.png",
        "First Quarter": "img/moon-waxing-quarter.png",
        "Waxing Gibbous": "img/moon-waxing-gibbous.png",
        "Full Moon": "img/moon-full.png",
        "Waning Gibbous": "img/moon-waning-gibbous.png",
        "Last Quarter": "img/moon-waning-quarter.png",
        "Waning Crescent": "img/moon-waning-crescent.png",
    };

        const moonImgPath = moonImages[reading.moonPhase] || "img/moon-new.png";
        const moonText = reading.moonPhase || "Mystical Alignment";

        document.querySelector('.moon-card').innerHTML =`
            <h4>Moon Phase</h4>
            <div class="moon-img-wrapper">
                <img src="${moonImgPath}" id="moonImg" alt="Moon Phase">
            </div>
            <p id="moonPhaseText">${moonText}</p>`;

        // displaying selected 3 cards
        let cardsHTML = "";
        reading.cards.forEach((card, index) => {
            const position = positions[index];
            const orientation = card.isReversed ? "reversed" : "upright";
            const meaning = card.meanings[reading.userInfo.category.toLowerCase()][orientation];
            cardsHTML += `
                <div class="reading-row">
                    <div class="card-slot">
                        <img src="${card.image}" class="${card.isReversed ? 'reversed' : ''}">
                    </div>
                    <div class="reading-text">
                        <h3>${position}: ${card.name} (${orientation.toUpperCase()})</h3>
                        <p>${meaning}</p>
                    </div>
                </div>
            `;
        });
            
        // final synthesis
        cardsHTML += `
            <div class="final-message">
                <h1>Synthesized Reading</h1>
                <p>${reading.synthesizedResult}</p>
            </div>
        `;
        detailContainer.innerHTML = cardsHTML;
        }   
}

// running relevant function on Page load 
document.addEventListener('DOMContentLoaded', () => {

    //display functions
    displaySavedReadings();
    displayReadingDetail();
});
