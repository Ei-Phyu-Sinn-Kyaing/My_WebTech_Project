function displayUserInfo(){
    const userInfo = localStorage.getItem('onboardingFormData');
    if (userInfo){
        const user = JSON.parse(userInfo);

        const nameElemt = document.getElementById('displayName');
        const zodiacElemt = document.getElementById('displayZodiac');
        const categoryElemt = document.getElementById('displayCategory');

        if(nameElemt)
            nameElemt.textContent = user.name;

        if(zodiacElemt)
            zodiacElemt.textContent = user.zodiac;

        if(categoryElemt)
            categoryElemt.textContent = user.category;

        console.log("UserInfo Badge updated successfully!!!");
    }
    else
    {
        console.log("No Oracle Form data found in LocalStorage!");
    }
}
document.addEventListener('DOMContentLoaded',displayUserInfo);


function displayCards(cardDisplay){
    const container = document.getElementById ('cardContainer');
    container.innerHTML = " ";     //old data removed by every refresh

    const displayByLimit = cardDisplay.slice(0,10);

    displayByLimit.forEach((card, index) => {
        const cardDiv = document.createElement ('div');
        cardDiv.className = 'tarot-placeholder';

        // cardDiv.style.transform = `rotate(${(index-3)*5}deg)`;
        // cardDiv.style.transitionDelay = `${index * 0.1}s`;

        cardDiv.innerHTML = `<img src="img/tarot_img1.jpg" alt="Tarot Card" card-index="${index}">`;

        cardDiv.onclick = function() {
            selectCards (index, cardDiv);
        };

        container.appendChild(cardDiv);
    }
    );
}