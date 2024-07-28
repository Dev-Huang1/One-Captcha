(function() {
    // CSS styles
    const styles = `
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
            width: 25px;
            position: absolute;
            right: 0;
            top: -26px;
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

        #loading-spinner {
            display: none;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #0066ff;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
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
    `;

    // HTML template
    const htmlTemplate = `
    <div id="captcha-container">
        <div id="verify-section">
            <input type="checkbox" id="verify-checkbox">
            <div id="loading-spinner"></div>
            <img id="check-mark" src="assets/check-mark.svg" alt="Check Mark" style="display: none;">
            <label for="verify-checkbox" id="captcha-label">I'm not a robot.</label>
            <span id="success-message" style="display: none; font-weight: bold;">Success</span>
        </div>
        <div id="brand">
            <a href="https://github.com/Dev-Huang1/One-Captcha"><img src="https://captcha.xyehr.cn/assets/logo/logo.svg" alt="One Captcha Logo"></a>
            One Captcha
            <div class="privacy-terms-links">
                <a href="https://www.xyehr.cn/one-captcha-privacy-policy" id="privacy-link">Privacy</a><p>·</p><a href="https://help.xyehr.cn/jekyll/2024-07-05-one-captcha.html" id="docs-link">Docs</a>
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

    // Images array
    const images = ['image1.jpeg', 'image2.jpeg', 'image3.jpg', 'img018.png', 'img072.jpg', 'img102.jpeg', 'img181.jpeg', 'img193.jpeg', 'img249.jpg', 'img273.jpeg', 'img372.jpeg', 'img392.jpeg', 'img396.jpeg', 'img398.jpeg', 'img462.jpg', 'img482.jpeg', 'img492.jpeg', 'img592.jpg', 'img638.jpg', 'img639.jpeg', 'img639.jpg', 'img648.jpg', 'img657.jpeg', 'img857.jpeg', 'img928.jpeg'];

    // Translations
    const translations = {
        en: {
            captchaLabel: "I'm not a robot",
            verifyingText: "Verifying...",
            verificationSuccess: "Verification successful",
            verificationError: "Please re-verify",
            retryButton: "Retry",
            privacyLink: "Privacy",
            docsLink: "Docs",
            successMessage: "Success",
            submitButton: "Submit"
        },
        zh: {
            captchaLabel: "我不是机器人",
            verifyingText: "验证中...",
            verificationSuccess: "验证成功",
            verificationError: "请重新验证",
            retryButton: "重试",
            privacyLink: "隐私",
            docsLink: "文档",
            successMessage: "验证成功",
            submitButton: "提交"
        }
    };

    // Main OneCaptcha class
    class OneCaptcha {
        constructor(element) {
            this.element = element;
            this.callback = element.getAttribute('data-callback');
            this.language = this.detectLanguage();
            this.init();
        }

        init() {
            this.injectStyles();
            this.createElements();
            this.setupEventListeners();
        }

        injectStyles() {
            if (!document.getElementById('one-captcha-styles')) {
                const styleElement = document.createElement('style');
                styleElement.id = 'one-captcha-styles';
                styleElement.textContent = styles;
                document.head.appendChild(styleElement);
            }
        }

        createElements() {
            this.element.innerHTML = htmlTemplate;
            this.captchaContainer = this.element.querySelector('#captcha-container');
            this.verifyCheckbox = this.element.querySelector('#verify-checkbox');
            this.loadingSpinner = this.element.querySelector('#loading-spinner');
            this.checkMark = this.element.querySelector('#check-mark');
            this.captchaLabel = this.element.querySelector('#captcha-label');
            this.successMessage = this.element.querySelector('#success-message');
            this.sliderCaptcha = this.element.querySelector('#slider-captcha');
            this.puzzleImage = this.element.querySelector('#puzzle-image');
            this.puzzlePiece = this.element.querySelector('#puzzle-piece');
            this.sliderHandle = this.element.querySelector('#slider-handle');
            this.sliderTrack = this.element.querySelector('#slider-track');
            this.retryButton = this.element.querySelector('#retry-button');
            this.submitButton = this.element.querySelector('#submit-button');

            this.applyTranslations();
        }

        setupEventListeners() {
            this.verifyCheckbox.addEventListener('change', this.onVerifyCheckboxChange.bind(this));
            this.retryButton.addEventListener('click', this.changeImageAndPosition.bind(this));
            this.sliderHandle.addEventListener('mousedown', this.startDragging.bind(this));
            this.sliderHandle.addEventListener('touchstart', this.startDragging.bind(this));
            document.addEventListener('mousemove', this.drag.bind(this));
            document.addEventListener('touchmove', this.drag.bind(this));
            document.addEventListener('mouseup', this.stopDragging.bind(this));
            document.addEventListener('touchend', this.stopDragging.bind(this));
        }

        detectLanguage() {
            const userLang = navigator.language || navigator.userLanguage;
            return userLang.startsWith('zh') ? 'zh' : 'en';
        }

        applyTranslations() {
            this.captchaLabel.textContent = translations[this.language].captchaLabel;
            this.retryButton.textContent = translations[this.language].retryButton;
            this.element.querySelector('#privacy-link').textContent = translations[this.language].privacyLink;
            this.element.querySelector('#docs-link').textContent = translations[this.language].docsLink;
            this.submitButton.textContent = translations[this.language].submitButton;
        }

        onVerifyCheckboxChange() {
            if (this.verifyCheckbox.checked) {
                this.verifyCheckbox.style.display = 'none';
                this.loadingSpinner.style.display = 'inline-block';
                this.showSliderCaptcha();
            }
        }

        showSliderCaptcha() {
            this.currentImage = images[Math.floor(Math.random() * images.length)];
            this.puzzleImage.src = `assets/v3/${this.currentImage}`;

            this.puzzleImage.onload = () => {
                const pieceSize = 50;
                const maxX = 300 - pieceSize;
                const maxY = 200 - pieceSize;
                const pieceX = Math.floor(Math.random() * (maxX - 50) + 50);
                const pieceY = Math.floor(Math.random() * maxY);

                this.puzzlePiece.style.left = '0px';
                this.puzzlePiece.style.top = `${pieceY}px`;
                this.puzzlePiece.style.backgroundImage = `url(assets/v3/${this.currentImage})`;
                this.puzzlePiece.style.backgroundPosition = `-${pieceX}px -${pieceY}px`;

                const puzzleHole = document.createElement('div');
                puzzleHole.id = 'puzzle-hole';
                puzzleHole.style.left = `${pieceX}px`;
                puzzleHole.style.top = `${pieceY}px`;
                this.element.querySelector('#puzzle-container').appendChild(puzzleHole);

                this.piecePosition = pieceX;
                this.sliderCaptcha.style.display = 'block';
                this.resetSlider();
            };
        }

        startDragging(e) {
            e.preventDefault();
            this.isDragging = true;
            this.startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
            this.startLeft = this.sliderHandle.offsetLeft;
            this.startTime = Date.now();
            this.movements = [];
        }

        drag(e) {
            if (!this.isDragging) return;
            e.preventDefault();

            const currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
            let newLeft = this.startLeft + currentX - this.startX;
            newLeft = Math.max(0, Math.min(newLeft, 260));

            this.sliderHandle.style.left = `${newLeft}px`;
            this.sliderTrack.style.width = `${newLeft}px`;
            this.puzzlePiece.style.left = `${newLeft}px`;

            this.movements.push({
                x: newLeft,
                time: Date.now() - this.startTime
            });
        }

        stopDragging() {
            if (!this.isDragging) return;
            this.isDragging = false;

            const finalPosition = this.sliderHandle.offsetLeft;
            if (Math.abs(finalPosition - this.piecePosition) < 5) {
                if (this.isHumanLikeMovement()) {
                    this.showSuccessMessage();
                    this.sliderCaptcha.style.display = 'none';
                    this.submitButton.disabled = false;
                    document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
                    if (this.callback && typeof window[this.callback] === 'function') {
                        window[this.callback]();
                    }
                } else {
                    alert('Verification failed. Please try again.');
                    this.changeImageAndPosition();
                }
            } else {
                alert('Verification failed. Please try again.');
                this.changeImageAndPosition();
            }
        }

        showSuccessMessage() {
            this.loadingSpinner.style.display = 'none';
            this.checkMark.style.display = 'inline-block';
            this.captchaLabel.style.display = 'none';
            this.successMessage.textContent = translations[this.language].successMessage;
            this.successMessage.style.display = 'inline-block';
        }

        resetSlider() {
            this.sliderHandle.style.left = '0';
            this.sliderTrack.style.width = '0';
            this.puzzlePiece.style.left = '0';
        }

        isHumanLikeMovement() {
            if (this.movements.length < 5) return false;

            let isUneven = false;
            let prevSpeed = null;

            for (let i = 1; i < this.movements.length; i++) {
                const dx = this.movements[i].x - this.movements[i-1].x;
                const dt = this.movements[i].time - this.movements[i-1].time;
                const speed = Math.abs(dx / dt);

                if (prevSpeed !== null) {
                    if (Math.abs(speed - prevSpeed) > 0.1) {
                        isUneven = true;
                        break;
                    }
                }

                prevSpeed = speed;
            }

            return isUneven;
        }

        changeImageAndPosition() {
            const puzzleHole = this.element.querySelector('#puzzle-hole');
            if (puzzleHole) {
                puzzleHole.remove();
            }
            this.showSliderCaptcha();
        }

        handleVisibilityChange() {
            if (document.visibilityState === 'hidden') {
                this.leaveTimer = setTimeout(() => {
                    this.resetCaptcha();
                }, 15000);
            } else {
                clearTimeout(this.leaveTimer);
            }
        }

        resetCaptcha() {
            this.verifyCheckbox.checked = false;
            this.verifyCheckbox.style.display = 'inline-block';
            this.captchaLabel.style.display = 'inline-block';
            this.checkMark.style.display = 'none';
            this.successMessage.style.display = 'none';
            this.submitButton.disabled = true;
            this.sliderCaptcha.style.display = 'none';
            this.resetSlider();
            this.changeImageAndPosition();
            document.removeEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
        }
    }

    // Initialize OneCaptcha for all elements with class 'one-captcha'
    function initOneCaptcha() {
        const elements = document.getElementsByClassName('one-captcha');
        for (let element of elements) {
            new OneCaptcha(element);
        }
    }

    // Run initOneCaptcha when the DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initOneCaptcha);
    } else {
        initOneCaptcha();
    }
})();
