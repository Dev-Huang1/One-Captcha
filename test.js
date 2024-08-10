(function(global) {
    function ONECaptcha() {
        const captchaContainer = document.createElement('div');
        captchaContainer.id = 'captcha-container';
        captchaContainer.innerHTML = `
            
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
