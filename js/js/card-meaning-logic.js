document.addEventListener('DOMContentLoaded', () => {
    const selectedCardId = sessionStorage.getItem('selectedLibraryCard');

    if (selectedCardId === null) {
        window.location.href = 'tarot_library.html'; // auto goback library if ID isn't found
        return;
    }

    fetch('cards.json')
        .then(response => response.json())
        .then(cards => {
            // finding card with same ID
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