(function(global) {
    function AIRCaptcha() {
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
        let mouseMovements = [];
        let isTouchDevice = 'ontouchstart' in document.documentElement;
        let mathAnswer;

        const translations = {
            en: {
                captchaLabel: "I'm not a robot",
                verifyingText: "Verifying...",
                verificationSuccess: "Verification successful",
                verificationError: "Please re-verify",
                verifyButtonText: "Verify",
                mathCaptchaTitle: "Solve the Math Problem",
                mathCaptchaError: "Incorrect answer, please try again."
            },
            zh: {
                captchaLabel: "我不是机器人",
                verifyingText: "验证中...",
                verificationSuccess: "验证成功",
                verificationError: "请重新验证",
                verifyButtonText: "验证",
                mathCaptchaTitle: "请完成此验证",
                mathCaptchaError: "回答错误，请重试"
            },
            // Other translations...
        };

        function detectLanguage() {
            const userLang = navigator.language || navigator.userLanguage;
            if (userLang.startsWith('zh')) return 'zh';
            else if (userLang.startsWith('ja')) return 'ja';
            else if (userLang.startsWith('ko')) return 'ko';
            else if (userLang.startsWith('ru')) return 'ru';
            else if (userLang.startsWith('fr')) return 'fr';
            else if (userLang.startsWith('es')) return 'es';
            else if (userLang.startsWith('pt')) return 'pt';
            else if (userLang.startsWith('it')) return 'it';
            else if (userLang.startsWith('de')) return 'de';
            else return 'en'; // Default to English if language not supported
        }

        function setLanguage(lang) {
            const translation = translations[lang];
            captchaLabel.textContent = translation.captchaLabel;
            loadingText.textContent = translation.verifyingText;
            verificationText.textContent = translation.verificationSuccess;
            errorMessage.textContent = translation.verificationError;
            mathCaptchaButton.textContent = translation.verifyButtonText;
            mathCaptchaTitle.textContent = translation.mathCaptchaTitle;
            mathCaptchaError.textContent = translation.mathCaptchaError;
        }

        const userLang = detectLanguage();
        setLanguage(userLang);

        function recordMouseMovement(event) {
            const position = { x: event.clientX, y: event.clientY, time: Date.now() };
            mouseMovements.push(position);
        }

        function calculateSpeed(movements) {
            let totalSpeed = 0;
            for (let i = 1; i < movements.length; i++) {
                const dx = movements[i].x - movements[i - 1].x;
                const dy = movements[i].y - movements[i - 1].y;
                const dt = movements[i].time - movements[i - 1].time;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const speed = distance / dt;
                totalSpeed += speed;
            }
            return totalSpeed / (movements.length - 1);
        }

        function isValidMovement(movements) {
            if (movements.length < 5) return false;
            const averageSpeed = calculateSpeed(movements);
            let deviations = 0;
            for (let i = 1; i < movements.length; i++) {
                const dx = movements[i].x - movements[i - 1].x;
                const dy = movements[i].y - movements[i - 1].y;
                const dt = movements[i].time - movements[i - 1].time;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const speed = distance / dt;
                if (Math.abs(speed - averageSpeed) > averageSpeed * 0.5) {
                    deviations++;
                }
            }
            return deviations > (movements.length * 0.3);
        }

        function generateMathCaptcha() {
            let num1, num2, operator;
            do {
                num1 = Math.floor(Math.random() * 10);
                num2 = Math.floor(Math.random() * 10);
                operator = Math.random() > 0.5 ? '+' : '-';
            } while (operator === '-' && num1 < num2);
            
            mathAnswer = operator === '+' ? num1 + num2 : num1 - num2;
            mathCaptchaQuestion.textContent = `${num1} ${operator} ${num2} = ?`;
        }

        function showMathCaptcha() {
            mathCaptchaInput.value = '';
            mathCaptchaError.style.display = 'none';
            generateMathCaptcha();
            mathCaptchaModal.style.display = 'block';
        }

        function verifyMathCaptcha() {
            const userAnswer = parseInt(mathCaptchaInput.value, 10);
            if (userAnswer === mathAnswer) {
                mathCaptchaModal.style.display = 'none';
                checkMark.style.display = 'block';
                verificationText.style.display = 'block';
                submitButton.disabled = false;
                errorMessage.style.display = 'none';
            } else {
                mathCaptchaError.style.display = 'block';
                generateMathCaptcha();
            }
        }

        document.addEventListener('mousemove', recordMouseMovement);

        verifyCheckbox.addEventListener('change', () => {
            if (verifyCheckbox.checked) {
                captchaLabel.style.display = 'none';
                verifyCheckbox.style.display = 'none';
                if (isTouchDevice) {
                    showMathCaptcha();
                } else {
                    loadingText.style.display = 'block';
                    setTimeout(() => {
                        if (isValidMovement(mouseMovements)) {
                            loadingText.style.display = 'none';
                            checkMark.style.display = 'block';
                            verificationText.style.display = 'block';
                            submitButton.disabled = false;
                            errorMessage.style.display = 'none';
                        } else {
                            loadingText.style.display = 'none';
                            errorMessage.style.display = 'block';
                            verifyCheckbox.checked = false;
                            captchaLabel.style.display = 'inline';
                            verifyCheckbox.style.display = 'inline';
                        }
                    }, 2000);
                }
            }
        });

        mathCaptchaButton.addEventListener('click', verifyMathCaptcha);
    }

    global.AIRCaptcha = AIRCaptcha;
})(window);

// Usage example:
// Make sure to call AIRCaptcha() after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    AIRCaptcha();
});
