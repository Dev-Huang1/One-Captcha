(function(global) {
    // CSS Styles
    const styles = `
        #captcha-container {
            width: 260px;
            height: 40px;
            border: 1px solid #ccc;
            padding: 20px;
            margin: 50px 0;
            text-align: left;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-family: Arial, sans-serif;
            background-color: #ffffff;
            color: #000000;
        }
        @media (prefers-color-scheme: dark) {
            #captcha-container {
                background-color: #333333;
                color: #ffffff;
                border-color: #555555;
                box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
            }
            #verify-checkbox {
                border-color: #555555;
            }
        }
        #verify-section {
            display: flex;
            align-items: center;
        }
        #verify-checkbox {
            margin-right: 10px;
        }
        #captcha-label {
            margin-right: 20px;
        }
        #brand {
            font-weight: bold;
            font-size: 14px;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            position: relative;
            margin-top: 23.5px;
        }
        #brand img {
            width: 35px;
            position: absolute;
            right: 0;
            top: -30px;
        }
        #success-icon, #failure-icon {
            width: 35px;
            height: 35px;
            margin-left: 5px;
        }
        #verification-text {
            margin-left: 10px;
            color: green;
            font-weight: bold;
            font-size: 16px;
        }
        #loading-text {
            display: none;
            margin-right: 20px;
            font-size: 16px;
        }
        #math-captcha-modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 300px;
            padding: 20px;
            background-color: #ffffff;
            border: 1px solid #ccc;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            text-align: center;
        }
        @media (prefers-color-scheme: dark) {
            #math-captcha-modal {
                background-color: #333333;
                color: #ffffff;
                border-color: #555555;
                box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
            }
        }
        #math-captcha-modal h3 {
            margin-bottom: 10px;
        }
        #math-captcha-input {
            margin-bottom: 10px;
            padding: 8px;
            width: 100%;
            box-sizing: border-box;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 14px;
            color: #000000;
            background-color: #ffffff;
            text-align: center;
        }
        @media (prefers-color-scheme: dark) {
            #math-captcha-input {
                background-color: #444444;
                color: #ffffff;
                border-color: #555555;
            }
        }
        #math-captcha-button {
            margin-top: 10px;
            padding: 8px 16px;
            background-color: #0066ff;
            color: #ffffff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
        }
        #math-captcha-button:hover {
            background-color: #0066ff;
        }
        #math-captcha-error {
            color: red;
            display: none;
            margin-top: 10px;
        }
        #math-captcha-question {
            font-family: Arial, sans-serif;
        }
        .privacy-terms-links {
            display: flex;
            align-items: center;
        }
        .privacy-terms-links a {
            text-decoration: none;
            align-items: flex-end;
            font-size: 11px;
            color: #aaaaaa;
            margin: 0 0px;
        }
        .privacy-terms-links a:hover {
            color: #a9a9a9;
        }
        .privacy-terms-links p {
            margin: 0 3px;
        }
        #verify-checkbox:checked + #captcha-label {
            display: none;
        }
    `;

    // JavaScript logic
    function AIRCaptcha() {
        // Dynamically create CSS
        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);

        // Create HTML structure
        const captchaContainer = document.createElement('div');
        captchaContainer.id = 'captcha-container';
        captchaContainer.innerHTML = `
            <div id="verify-section">
                <input type="checkbox" id="verify-checkbox">
                <label for="verify-checkbox" id="captcha-label">I'm not a robot</label>
                <span id="loading-text">Verifying...</span>
                <img id="check-mark" src="https://captcha.xyehr.cn/assets/check-mark.svg" style="display: none; width: 30px; height: 30px;">
                <p id="verification-text" style="display: none;">Verification successful</p>
                <p id="error-message" style="color: red; display: none;">Please re-verify</p>
            </div>
            <div id="brand">
                <a href="https://github.com/Dev-Huang1/Air-Captcha"><img src="https://captcha.xyehr.cn/assets/logo.svg" alt="AIR Captcha Logo"></a>
                Air Captcha
                <div class="privacy-terms-links">
                    <a href="https://www.xyehr.cn/air-captcha-privacy-policy" id="privacy-link">Privacy</a><p>·</p><a href="https://help.xyehr.cn/jekyll/2024-07-05-air-captcha.html" id="docs-link">Docs</a>
                </div>
            </div>
            <div id="math-captcha-modal">
                <h3 id="math-captcha-title">Solve the Math Problem</h3>
                <div id="math-captcha-question"></div>
                <input type="number" id="math-captcha-input" min="0" max="99">
                <button id="math-captcha-button">Verify</button>
                <p id="math-captcha-error">Incorrect answer, please try again.</p>
            </div>
        `;

        document.getElementById('air-captcha').appendChild(captchaContainer);

        const verifyCheckbox = document.getElementById('verify-checkbox');
        const captchaLabel = document.getElementById('captcha-label');
        const checkMark = document.getElementById('check-mark');
        const verificationText = document.getElementById('verification-text');
        const errorMessage = document.getElementById('error-message');
        const submitButton = document.getElementById('submit-button');
        const loadingText = document.getElementById('loading-text');
        const mathCaptchaModal = document.getElementById('math-captcha-modal');
        const mathCaptchaQuestion = document.getElementById('math-captcha-question');
        const mathCaptchaInput = document.getElementById('math-captcha-input');
        const mathCaptchaButton = document.getElementById('math-captcha-button');
        const mathCaptchaError = document.getElementById('math-captcha-error');
        const mathCaptchaTitle = document.getElementById('math-captcha-title');
        const privacyLink = document.getElementById('privacy-link');
        const docsLink = document.getElementById('docs-link');
        let mouseMovements = [];
        let isTouchDevice = 'ontouchstart' in document.documentElement;
        let mathAnswer;
        let isTabActive = true;

        const translations = {
            en: {
                captchaLabel: "I'm not a robot",
                verifyingText: "Verifying...",
                verificationSuccess: "Verification successful",
                verificationError: "Please re-verify",
                verifyButtonText: "Verify",
                mathCaptchaTitle: "Solve the Math Problem",
                mathCaptchaError: "Incorrect answer, please try again.",
                privacyLink: "Privacy",
                docsLink: "Docs"
            },
            zh: {
                captchaLabel: "我不是机器人",
                verifyingText: "验证中...",
                verificationSuccess: "验证成功",
                verificationError: "请重新验证",
                verifyButtonText: "验证",
                mathCaptchaTitle: "请完成此验证",
                mathCaptchaError: "回答错误，请重试",
                privacyLink: "隐私",
                docsLink: "文档"
            },
        };

        function detectLanguage() {
            const userLang = navigator.language || navigator.userLanguage;
            if (userLang.startsWith('zh')) return 'zh';
            else return userLang.includes('zh') ? 'zh' : 'en';
        }

        function applyTranslations(language) {
            captchaLabel.textContent = translations[language].captchaLabel;
            loadingText.textContent = translations[language].verifyingText;
            verificationText.textContent = translations[language].verificationSuccess;
            errorMessage.textContent = translations[language].verificationError;
            mathCaptchaButton.textContent = translations[language].verifyButtonText;
            mathCaptchaTitle.textContent = translations[language].mathCaptchaTitle;
            mathCaptchaError.textContent = translations[language].mathCaptchaError;
            privacyLink.textContent = translations[language].privacyLink;
            docsLink.textContent = translations[language].docsLink;
        }

        // Function to generate a simple math problem
        function generateMathCaptcha() {
            const num1 = Math.floor(Math.random() * 10) + 1;
            const num2 = Math.floor(Math.random() * 10) + 1;
            mathAnswer = num1 + num2;
            mathCaptchaQuestion.textContent = `${num1} + ${num2} = ?`;
        }

        // Show the math captcha modal
        function showMathCaptcha() {
            generateMathCaptcha();
            mathCaptchaModal.style.display = 'block';
        }

        // Hide the math captcha modal
        function hideMathCaptcha() {
            mathCaptchaModal.style.display = 'none';
        }

        // Handle math captcha verification
        mathCaptchaButton.addEventListener('click', () => {
            if (parseInt(mathCaptchaInput.value, 10) === mathAnswer) {
                hideMathCaptcha();
                completeVerification();
            } else {
                mathCaptchaError.style.display = 'block';
                generateMathCaptcha();
            }
        });

        // Complete the verification process
function completeVerification() {
    verifyCheckbox.style.display = 'none';  // Hide the checkbox
    captchaLabel.style.display = 'none';    // Hide the label text
    checkMark.style.display = 'inline';
    verificationText.style.display = 'inline';
    loadingText.style.display = 'none';
    errorMessage.style.display = 'none';
    // Enable the submit button if it exists
    if (submitButton) {
        submitButton.disabled = false;
    }
}
        
        // Event listener for the verify checkbox
        verifyCheckbox.addEventListener('change', () => {
            if (verifyCheckbox.checked) {
                showMathCaptcha();
                verifyCheckbox.checked = false;
            }
        });

        // Add mouse movement listener if not a touch device
        if (!isTouchDevice) {
            document.addEventListener('mousemove', (event) => {
                mouseMovements.push({ x: event.clientX, y: event.clientY });
                if (mouseMovements.length > 100) {
                    mouseMovements.shift();
                }
            });
        }

        // Track tab visibility changes
        document.addEventListener('visibilitychange', () => {
            isTabActive = !document.hidden;
        });

        // Apply translations based on detected language
        applyTranslations(detectLanguage());
    }

    // Initialize the CAPTCHA when the script loads
    global.addEventListener('DOMContentLoaded', () => {
        const captchaElement = document.getElementById('air-captcha');
        if (captchaElement) {
            AIRCaptcha();
        }
    });
})(window);
