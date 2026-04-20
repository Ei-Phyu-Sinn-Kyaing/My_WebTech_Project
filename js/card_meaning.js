// ၁။ URL ထဲက Card ID ကို ဖမ်းယူခြင်း (e.g., ?id=1)
const urlParams = new URLSearchParams(window.location.search);
const cardId = urlParams.get('id');

// ၂။ JSON Data ကို Fetch လုပ်ခြင်း
fetch('../cards.json')
    .then(response => response.json())
    .then(data => {
        // ID နဲ့ ကိုက်ညီတဲ့ ကတ်ကို ရှာမယ်
        const card = data.find(c => c.id == cardId);

        if (card) {
            // ၃။ HTML element များထဲသို့ Data သွင်းခြင်း
            document.getElementById('cardName').innerText = card.name;
            document.getElementById('cardImage').src = card.image;
            document.getElementById('cardImage').alt = card.name;
            
            // Array ဖြစ်နေတဲ့ Keywords တွေကို စာသားအဖြစ် ပြောင်းပြီးပြမယ်
            document.getElementById('uprightKeywords').innerText = card.upright_keywords.join(', ');
            document.getElementById('reversedKeywords').innerText = card.reversed_keywords.join(', ');
            
            document.getElementById('fullDescription').innerText = card.full_description;
        } else {
            document.body.innerHTML = "<h1>Card not found!</h1>";
        }
    })
    .catch(error => console.error('Error loading JSON:', error));