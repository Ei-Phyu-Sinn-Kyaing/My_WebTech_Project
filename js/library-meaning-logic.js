//library page logic
document.addEventListener('DOMContentLoaded', () => {
    const libraryGrid = document.getElementById('library-grid');
    const filterLinks = document.querySelectorAll('.dropdown-content a');
    const filterBtnText = document.querySelector('.dropdownbtn');
    
    showLoading();

    let allCards = []; // global variable for data storing

    fetch('cards.json')
        .then(response => response.json())
        .then(cards => {
            allCards = cards;
            renderLibrary(allCards);  //firstly show all from fetching
            setTimeout(() => {
                hideLoading();
            }, 500);
        })
        .catch(error => console.error('Error loading cards:', error));

    filterLinks.forEach(link =>{
        link.addEventListener('click', (e) => {
            e.preventDefault();   //to prevent page jumping

            const filterValue = link.getAttribute('data-value');

            // change the text on the button according to selected category, innerHTML for arrow
            filterBtnText.innerHTML = `${link.innerText} <i class="down-arrow"></i>`;

            // array for filter logic
            let filteredCards = [];

            if (filterValue === 'all') {
                filteredCards = allCards;
            } else if (filterValue === 'minor') {
                // show all minor arcana
                filteredCards = allCards.filter(card => card.arcana !== 'major');
            } else {
                // show specific minor arcana
                filteredCards = allCards.filter(card => card.arcana === filterValue);
            }
            renderLibrary(filteredCards); 
        });
    });


    //creating cards on UI view
    function renderLibrary(cards) {
        libraryGrid.innerHTML = ''; //blank first

        if (cards.length === 0) {
            libraryGrid.innerHTML = `<p style="text-align: center; width: 100%; color: rgba(255,255,255,0.5);">No cards found in this category.</p>`;
            return;
        }

        cards.forEach(card => {
            const cardSlot = document.createElement('div');
            cardSlot.className = 'card-slot';
            
            // to go card_meaning.html with selected ID
            cardSlot.onclick = () => {
                localStorage.setItem('selectedLibraryCard', card.id);
                window.location.href = 'card_meaning.html';
            };

            cardSlot.innerHTML = `
                <img src="${card.image}" alt="${card.name}">
                <div class="card-name-overlay">${card.name}</div>
            `;

            libraryGrid.appendChild(cardSlot);
        });
    }
});







//card-meaning logic
document.addEventListener('DOMContentLoaded', () => {
    const selectedCardId = localStorage.getItem('selectedLibraryCard');

    if (selectedCardId === null) {
        window.location.href = 'tarot_library.html'; // ID မရှိရင် library ကို ပြန်လွှတ်မယ်
        return;
    }

    fetch('cards.json')
        .then(response => response.json())
        .then(cards => {
            // ID ချင်း တူတဲ့ကတ်ကို ရှာမယ်
            const card = cards.find(c => c.id == selectedCardId);

            if (card) {
                displayCardDetails(card);
            }
        })
        .catch(error => console.error('Error fetching card data:', error));

    function displayCardDetails(card) {
        // Basic Info
        document.getElementById('cardName').textContent = card.name;
        document.getElementById('cardImage').src = card.image;
        document.getElementById('arcanaType').textContent = card.arcana.toUpperCase();

        // Keywords
        document.getElementById('uprightKeywords').textContent = card.upright_keywords.join(', ');
        document.getElementById('reversedKeywords').textContent = card.reversed_keywords.join(', ');

        // Descriptions
        document.getElementById('fullDescription').textContent = card.full_description;
        document.getElementById('uprightShort').textContent = card.upright_short_meaning;
        document.getElementById('reversedShort').textContent = card.reversed_short_meaning;

        // Nested Meanings (Love, Career, Financial, Wellbeing)
        document.getElementById('loveUpright').textContent = card.meanings.love.upright;
        document.getElementById('loveReversed').textContent = card.meanings.love.reversed;

        document.getElementById('careerUpright').textContent = card.meanings.career.upright;
        document.getElementById('careerReversed').textContent = card.meanings.career.reversed;

        document.getElementById('financialUpright').textContent = card.meanings.financial.upright;
        document.getElementById('financialReversed').textContent = card.meanings.financial.reversed;

        document.getElementById('wellbeingUpright').textContent = card.meanings.wellbeing.upright;
        document.getElementById('wellbeingReversed').textContent = card.meanings.wellbeing.reversed;
    }
});
