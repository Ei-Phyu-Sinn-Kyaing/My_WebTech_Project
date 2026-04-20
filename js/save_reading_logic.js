function saveReading() {
    const userData = JSON.parse(localStorage.getItem('onboardingFormData'));
    const selectedCards = JSON.parse(localStorage.getItem('userReading'));
    const synthesisReading = document.getElementById('final-synthesis-text').innerText;

    if (!userData || !selectedCards) {
        return alert("No reading to save!");
    }
        
    // creating object
    const readingToSave = {
        id: Date.now(),       //using timestamp for unique ID
        userInfo: userData,
        cards: selectedCards,
        synthesizedResult: synthesisReading,
        date: new Date().toLocaleDateString() 
    };

    // creating savedReadings container
    let savedReadings = JSON.parse(localStorage.getItem('allSavedReadings')) || [];
    
    // pushing current object to the container
    savedReadings.push(readingToSave);

    localStorage.setItem('allSavedReadings', JSON.stringify(savedReadings));
    alert("Reading saved successfully!");
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
                    <button class="action-btn view-btn" onclick="viewDetail(${reading.id})">View Detail</button>
                    <button class="action-btn delete-btn" onclick="deleteReading(${reading.id})">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function viewDetail(id) {
    localStorage.setItem('currentViewDetailId', id);
    location.href = 'saved_reading_detail.html';
}

function deleteReading(id) {
    if (confirm("Are you sure you want to delete this reading?")) {
        let savedReadings = JSON.parse(localStorage.getItem('allSavedReadings')) || [];
        savedReadings = savedReadings.filter(r => r.id !== id);
        localStorage.setItem('allSavedReadings', JSON.stringify(savedReadings));
        displaySavedReadings();  //refresh table
    }
}



// Displaying data in reading detail page
function displayReadingDetail() {
    const detailContainer = document.querySelector('.synthesis-section');
    if (!detailContainer) {
        return;
    }

    const viewId = localStorage.getItem('currentViewDetailId');
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
    displaySavedReadings();
    displayReadingDetail();
});