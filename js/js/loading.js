const loadingStyle = document.createElement('style');
loadingStyle.innerHTML = `
    .loading-class {
        position: fixed;
        top: 40%; left:50%;
        transform: translate(-50%, -50%);
        width: 100px;
        height: 100px;
        background: rgba(46, 46, 77, 0.91);
        border: 1px solid white;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        backdrop-filter: blur(1px);
        animation: fadeIn 0.5s ease;
    }

    .spinner {
        width: 50px;
        height: 50px;
        border: 4px solid rgba(255, 255, 255, 0.1);
        border-top: 10px solid #5d89db; 
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
    @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

    .loading-class p {
        color: #e0e0e0;
        letter-spacing: 2px;
        font-size: 1.1rem;
}
`;
document.head.appendChild(loadingStyle);


// background: rgba(10, 10, 15, 0.91);
//<p>Aligning with the stars...</p>


//function for creating loading div
function createLoading() {
    if (!document.getElementById('loadingScreen')) {
        const loadingDiv = document.createElement('div');
        loadingDiv.id = 'loadingScreen';
        loadingDiv.className = 'loading-class';
        loadingDiv.innerHTML = `
            <div class="spinner"></div>
        `;
        document.body.appendChild(loadingDiv);
    }
}

// Global Functions for show and hide
function showLoading() {
    createLoading();
    document.getElementById('loadingScreen').style.display = 'flex';
}

// exact sec delay before going to next page
function navigateWithDelay(url, delayInSeconds = 2) {
    showLoading(); //firstly loading run
    
    setTimeout(() => {
        window.location.href = url;
    }, delayInSeconds * 1000);
}

window.addEventListener('pageshow', function (event) {
    // if page is opened by cache (like browser default back button), 
    // remove loading
    if (event.persisted) {
        hideLoading();
    }
});

function hideLoading() {
    const loader = document.getElementById('loadingScreen');
    if (loader) {
        loader.style.display = 'none';
    }
}