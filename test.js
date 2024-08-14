(function(global) {
    function ONECaptcha() {
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
                #checkbox-container {
                    position: relative;
                    width: 28px;
                    height: 28px;
                    margin-right: 10px;
                }
                #verify-checkbox {
                    width: 28px;
                    height: 28px;
                    margin: 0;
                    cursor: pointer;
                    position: relative;
                    z-index: 1;
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
                    width: 30px;
                    position: absolute;
                    right: 0;
                    top: -30px;
                }
                #check-mark {
                    width: 30px;
                    height: 30px;
                    display: none;
                }
                #verification-text {
                    margin-left: 10px;
                    color: green;
                    font-weight: bold;
                    font-size: 16px;
                    display: none;
                    text-align: left;
                }
                #loading-text {
                    display: none;
                    margin-right: 20px;
                    font-size: 16px;
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
                #ripple {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 0;
                    height: 0;
                    border-radius: 50%;
                    background-color: rgba(66, 133, 244, 0.4);
                    animation: ripple 1.5s linear infinite;
                    z-index: 2;
                    pointer-events: none;
                }
                @keyframes ripple {
                    0% {
                        width: 0;
                        height: 0;
                        opacity: 0.5;
                    }
                    100% {
                        width: 28px;
                        height: 28px;
                        opacity: 0;
                    }
                }
                #error-message {
                    color: red;
                    display: none;
                    margin-left: 10px;
                }
            </style>
            <div id="verify-section">
                <div id="checkbox-container">
                    <input type="checkbox" id="verify-checkbox">
                    <img id="check-mark" src="https://captcha.xyehr.cn/assets/check-mark.svg">
                    <div id="ripple"></div>
                </div>
                <label for="verify-checkbox" id="captcha-label">I'm not a robot</label>
                <span id="loading-text">Verifying...</span>
                <p id="verification-text">Success</p>
                <p id="error-message">Please re-verify</p>
            </div>
            <div id="brand">
                <a href="https://github.com/Dev-Huang1/One-Captcha"><img src="https://captcha.xyehr.cn/assets/logo/logo.svg" alt="ONE Captcha Logo"></a>
                One Captcha
                <div class="privacy-terms-links">
                    <a href="https://www.xyehr.cn/one-captcha-privacy-policy" id="privacy-link">Privacy</a><p>·</p><a href="https://help.xyehr.cn/jekyll/2024-07-05-one-captcha.html" id="docs-link">Docs</a>
                </div>
            </div>
        `;

        document.getElementById('one-captcha').appendChild(captchaContainer);

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
        ONECaptcha();
    });
})(window);
