//library page logic
document.addEventListener('DOMContentLoaded', () => {
    const libraryGrid = document.getElementById('library-grid');
    const filterLinks = document.querySelectorAll('.dropdown-content a');
    const filterBtnText = document.querySelector('.dropdownbtn');
    
    // showLoading();

    let allCards = []; // global variable for data storing

    fetch('cards.json')
        .then(response => response.json())
        .then(cards => {
            allCards = cards;
            displayLibrary(allCards);  //firstly show all from fetching
            // setTimeout(() => {
            //     hideLoading();
            // }, 500);
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
            displayLibrary(filteredCards); 
        });
    });


    //creating cards on UI view
    function displayLibrary(cards) {
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
                sessionStorage.setItem('selectedLibraryCard', card.id);
                clickFlip.play();
                navigateWithDelay('card_meaning.html', 0.5)
            };

            cardSlot.innerHTML = `
                <img src="${card.image}" alt="${card.name}">
                <div class="card-name-overlay">${card.name}</div>
            `;

            libraryGrid.appendChild(cardSlot);
        });
    }
});

