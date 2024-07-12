(function(global) {
    function AIRCaptcha() {
        const captchaContainer = document.createElement('div');
        captchaContainer.id = 'captcha-container';
        captchaContainer.innerHTML = `
             <style>
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
        #slider-captcha {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 300px;
            background-color: #fff;
            border: 1px solid #ccc;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 12px;
            overflow: hidden;
            padding: 20px;
        }
        #puzzle-container {
            width: 100%;
            height: 200px;
            position: relative;
            overflow: hidden;
            margin-bottom: 20px;
        }
        #puzzle-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 10px
        }
        #puzzle-piece {
            position: absolute;
            width: 50px;
            height: 50px;
            background-size: 300px 200px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        }
        #slider {
            width: 100%;
            height: 40px;
            background-color: #f0f0f0;
            position: relative;
            cursor: pointer;
            border-radius: 20px;
        }
        #slider-handle {
            width: 40px;
            height: 40px;
            background-color: #0066ff;
            position: absolute;
            left: 0;
            top: 0;
            cursor: grab;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
        }
        #slider-track {
            width: 0;
            height: 100%;
            background-color: #e0e0e0;
            border-radius: 20px;
        }
        #retry-button {
            margin-top: 10px;
            padding: 8px 16px;
            background-color: #0066ff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        #retry-button:hover {
            background-color: #0055cc;
        }
        #puzzle-piece {
            position: absolute;
            width: 50px;
            height: 50px;
            background-size: 300px 200px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            border-radius: 10px;
        }
        #puzzle-hole {
            position: absolute;
            width: 50px;
            height: 50px;
            background-color: rgba(0, 0, 0, 0.2);
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3) inset;
            border-radius: 10px;
        }
        #success-message {
            display: none;
            color: green;
        }
        
        #check-mark {
            display: none;
            width: 30px;
            height: 30px;
            margin-right: 10px;
        }
        @media (prefers-color-scheme: dark) {
    #captcha-container {
        border-color: #444;
        background-color: #2c2c2c;
        color: #ffffff;
    }

    #slider-captcha {
        background-color: #2c2c2c;
        border-color: #444;
    }

    #slider {
        background-color: #444;
    }

    #slider-handle {
        background-color: #0066ff;
    }

    #retry-button {
        background-color: #0066ff;
        color: white;
    }

    .privacy-terms-links a {
        color: #888;
    }

    .privacy-terms-links a:hover {
        color: #bbb;
    }

    #success-message {
        color: #38127;
    }
        }
    </style>
</head>
<body>
    <div id="captcha-container">
        <div id="verify-section">
            <input type="checkbox" id="verify-checkbox">
            <img id="check-mark" src="assets/check-mark.svg" alt="Check Mark" style="display: none;">
            <label for="verify-checkbox" id="captcha-label">I'm not a robot.</label>
            <span id="success-message" style="display: none; font-weight: bold;">Success</span>
        </div>
        <div id="brand">
            <a href="https://github.com/Dev-Huang1/Air-Captcha"><img src="https://captcha.xyehr.cn/assets/logo/logo.svg" alt="AIR Captcha Logo"></a>
            Air Captcha
            <div class="privacy-terms-links">
                <a href="https://www.xyehr.cn/air-captcha-privacy-policy" id="privacy-link">Privacy</a><p>·</p><a href="https://help.xyehr.cn/jekyll/2024-07-05-air-captcha.html" id="docs-link">Docs</a>
            </div>
        </div>
    </div>

    <div id="slider-captcha">
        <div id="puzzle-container">
            <img id="puzzle-image" src="" alt="img">
            <div id="puzzle-piece"></div>
        </div>
        <div id="slider">
            <div id="slider-track"></div>
            <div id="slider-handle">→</div>
        </div>
        <button id="retry-button">Retry</button>
    </div>
        `;

        document.getElementById('air-captcha').appendChild(captchaContainer);

        const verifyCheckbox = document.getElementById('verify-checkbox');
        const captchaLabel = document.getElementById('captcha-label');
        const checkMark = document.getElementById('check-mark');
        const verificationText = document.getElementById('verification-text');
        const errorMessage = document.getElementById('error-message');
        const loadingText = document.getElementById('loading-text');
        const ripple = document.getElementById('ripple');
        let clickData = [];
        let clickCount = 0;
        const requiredClicks = 8;
        let lastClickTime = 0;
        let resetTimeout;

        const translations = {
            en: {
                captchaLabel: "I'm not a robot",
                verifyingText: "Verifying...",
                verificationSuccess: "Success",
                errorMessage: "Please re-verify",
                privacyLink: "Privacy",
                docsLink: "Docs"
            },
            zh: {
                captchaLabel: "我不是机器人",
                verifyingText: "验证中...",
                verificationSuccess: "验证成功",
                errorMessage: "请重新验证",
                privacyLink: "隐私",
                docsLink: "文档"
            },
        };

        function detectLanguage() {
            const userLang = navigator.language || navigator.userLanguage;
            return userLang.startsWith('zh') ? 'zh' : 'en';
        }

        function applyTranslations(language) {
            document.getElementById('captcha-label').textContent = translations[language].captchaLabel;
            document.getElementById('loading-text').textContent = translations[language].verifyingText;
            document.getElementById('verification-text').textContent = translations[language].verificationSuccess;
            document.getElementById('error-message').textContent = translations[language].errorMessage;
            document.getElementById('privacy-link').textContent = translations[language].privacyLink;
            document.getElementById('docs-link').textContent = translations[language].docsLink;
        }

        const language = detectLanguage();
        applyTranslations(language);

        function recordClick(event) {
            const currentTime = Date.now();
            if (lastClickTime !== 0 && currentTime - lastClickTime > 5000) {
                showError(translations[language].errorMessage);
                return;
            }

            clickData.push({
                x: event.clientX,
                y: event.clientY,
                time: currentTime
            });
            lastClickTime = currentTime;
            clickCount++;

            if (clickCount >= requiredClicks) {
                verifyClicks();
            }
        }

        function verifyClicks() {
            if (isValidClickData(clickData)) {
                completeVerification();
            } else {
                showError(translations[language].errorMessage);
            }
        }

        function isValidClickData(data) {
            return data.length >= requiredClicks;
        }

        function completeVerification() {
            verifyCheckbox.style.display = 'none';
            captchaLabel.style.display = 'none';
            checkMark.style.display = 'block';
            verificationText.style.display = 'inline';
            loadingText.style.display = 'none';
            errorMessage.style.display = 'none';
            ripple.style.display = 'none';
            clearTimeout(resetTimeout);

            const submitButton = document.getElementById('submit-button');
            if (submitButton) {
                console.log('Enabling submit button');
                submitButton.disabled = false;
                console.log('Submit button enabled:', submitButton.disabled);
            } else {
                console.log('Submit button not found');
            }
        }

        function showError(message) {
            captchaLabel.style.display = 'none';
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
            ripple.style.display = 'none';
            clickData = [];
            clickCount = 0;
            lastClickTime = 0;
        }

        function resetCaptcha() {
            verifyCheckbox.checked = false;
            verifyCheckbox.style.display = 'block';
            captchaLabel.style.display = 'block';
            checkMark.style.display = 'none';
            verificationText.style.display = 'none';
            loadingText.style.display = 'none';
            errorMessage.style.display = 'none';
            ripple.style.display = 'none';
            clickData = [];
            clickCount = 0;
            lastClickTime = 0;

            const submitButton = document.getElementById('submit-button');
            if (submitButton) {
                console.log('Disabling submit button');
                submitButton.disabled = true;
            } else {
                console.log('Submit button not found');
            }
        }

        function startResetTimer() {
            if (resetTimeout) {
                clearTimeout(resetTimeout);
            }
            resetTimeout = setTimeout(() => {
                resetCaptcha();
            }, 30000);
        }

        verifyCheckbox.addEventListener('click', function(event) {
            event.preventDefault();
            recordClick(event);
        });

        window.addEventListener('blur', function() {
            resetTimeout = setTimeout(() => {
                resetCaptcha();
            }, 30000);
        });

        window.addEventListener('focus', function() {
            if (resetTimeout) {
                clearTimeout(resetTimeout);
            }
        });
    }

    global.addEventListener('DOMContentLoaded', () => {
        AIRCaptcha();
    });
})(window);
