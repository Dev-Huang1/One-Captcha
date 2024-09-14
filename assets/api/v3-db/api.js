// One Captcha JavaScript File

(function() {
    const htmlContent = `
        <div id="captcha-container">
            <div id="verify-section">
                <div id="loading-spinner"></div>
                <img src="assets/check-mark.svg" id="check-mark" style="display: none;">
                I'm not a robot. <span id="success-message" style="display: none;">Success</span>
            </div>
            <div id="brand">
                <a href="https://github.com/Dev-Huang1/One-Captcha">
                    <img src="https://captcha.xyehr.cn/assets/logo/logo.svg" alt="One Captcha Logo">
                </a>
                One Captcha
                <div class="privacy-terms-links">
                    <a href="https://www.xyehr.cn/one-captcha-privacy-policy" id="privacy-link">Privacy</a>
                    ·
                    <a href="https://help.xyehr.cn/jekyll/2024-07-05-one-captcha.html" id="docs-link">Docs</a>
                </div>
            </div>
            <div id="slider-captcha">
                <div id="puzzle-container">
                    <img src="" id="puzzle-image">
                    <div id="puzzle-piece"></div>
                </div>
                <div>Verification failed. Please try again.</div>
                <div id="slider">
                    <div id="slider-track"></div>
                    <div id="slider-handle">→</div>
                </div>
                <button id="retry-button">Retry</button>
            </div>
            <button id="submit-button">Submit</button>
        </div>
    `;

    const styles = `
        #captcha-container {
            font-family: Arial, sans-serif;
            max-width: 300px;
            margin: 20px auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        #verify-section {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
        }
        #loading-spinner {
            width: 20px;
            height: 20px;
            border: 2px solid #f3f3f3;
            border-top: 2px solid #3498db;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-right: 10px;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        #check-mark {
            width: 20px;
            height: 20px;
            margin-right: 10px;
        }
        #brand {
            text-align: center;
            margin-top: 20px;
        }
        #brand img {
            width: 100px;
        }
        .privacy-terms-links {
            font-size: 12px;
            margin-top: 10px;
        }
        #slider-captcha {
            margin-top: 20px;
        }
        #puzzle-container {
            width: 100%;
            height: 150px;
            position: relative;
            overflow: hidden;
            margin-bottom: 10px;
        }
        #puzzle-image {
            width: 100%;
            height: 100%;
        }
        #puzzle-piece {
            width: 50px;
            height: 50px;
            position: absolute;
            background-color: rgba(255, 255, 255, 0.7);
            border: 2px solid #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        }
        #slider {
            width: 100%;
            height: 40px;
            background-color: #f3f3f3;
            position: relative;
            border-radius: 20px;
        }
        #slider-track {
            height: 100%;
            width: 0;
            background-color: #4CAF50;
            border-radius: 20px;
        }
        #slider-handle {
            width: 50px;
            height: 40px;
            background-color: #2196F3;
            position: absolute;
            top: 0;
            left: 0;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            border-radius: 20px;
        }
    `;

    function initOneCaptcha() {
        const targetElement = document.getElementById('one-captcha');
        if (!targetElement) {
            console.error('Element with id "one-captcha" not found');
            return;
        }

        // Add styles
        const styleElement = document.createElement('style');
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);

        // Add HTML content
        targetElement.innerHTML = htmlContent;

        // Get callback function
        const callbackName = targetElement.getAttribute('data-callback');
        const callback = window[callbackName];

        if (typeof callback !== 'function') {
            console.error('Callback function not found or not a function');
            return;
        }

        // Implement captcha logic here
        // This is where you would add the actual verification logic
        // For now, we'll just simulate a successful verification on submit

        const submitButton = document.getElementById('submit-button');
        submitButton.addEventListener('click', () => {
            // Simulate verification process
            setTimeout(() => {
                document.getElementById('loading-spinner').style.display = 'none';
                document.getElementById('check-mark').style.display = 'inline';
                document.getElementById('success-message').style.display = 'inline';
                callback(true); // Call the callback function with success
            }, 1000);
        });
    }

    // Run the initialization when the DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initOneCaptcha);
    } else {
        initOneCaptcha();
    }
})();
