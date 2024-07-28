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

    // Create and append style element
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);

    // HTML template
    const template = `
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

    // Image list
    const images = ['image1.jpeg', 'image2.jpeg', 'image3.jpg', 'img018.png', 'img072.jpg', 'img102.jpeg', 'img181.jpeg', 'img193.jpeg', 'img249.jpg', 'img273.jpeg', 'img372.jpeg', 'img392.jpeg', 'img396.jpeg', 'img398.jpeg', 'img462.jpg', 'img482.jpeg', 'img492.jpeg', 'img592.jpg', 'img638.jpg', 'img639.jpeg', 'img639.jpg', 'img648.jpg', 'img657.jpeg', 'img857.jpeg', 'img928.jpeg'];

    // Variables
    let currentImage;
    let piecePosition;
    let isDragging = false;
    let startX;
    let startLeft;
    let movements = [];
    let startTime;
    let leaveTimer;

    // Functions
    function detectLanguage() {
        const userLang = navigator.language || navigator.userLanguage;
        return userLang.startsWith('zh') ? 'zh' : 'en';
    }

    function applyTranslations(container, language) {
        container.querySelector('#captcha-label').textContent = translations[language].captchaLabel;
        container.querySelector('#retry-button').textContent = translations[language].retryButton;
        container.querySelector('#privacy-link').textContent = translations[language].privacyLink;
        container.querySelector('#docs-link').textContent = translations[language].docsLink;
        container.querySelector('#success-message').textContent = translations[language].successMessage;
    }

    function showSliderCaptcha(container) {
        const puzzleImage = container.querySelector('#puzzle-image');
        const puzzlePiece = container.querySelector('#puzzle-piece');
        const sliderCaptcha = container.querySelector('#slider-captcha');

        currentImage = images[Math.floor(Math.random() * images.length)];
        puzzleImage.src = `assets/v3/${currentImage}`;

        puzzleImage.onload = () => {
            const pieceSize = 50;
            const maxX = 300 - pieceSize;
            const maxY = 200 - pieceSize;
            const pieceX = Math.floor(Math.random() * (maxX - 50) + 50); 
            const pieceY = Math.floor(Math.random() * maxY);

            puzzlePiece.style.left = '0px';
            puzzlePiece.style.top = `${pieceY}px`;
            puzzlePiece.style.backgroundImage = `url(assets/v3/${currentImage})`;
            puzzlePiece.style.backgroundPosition = `-${pieceX}px -${pieceY}px`;

            const puzzleHole = document.createElement('div');
            puzzleHole.id = 'puzzle-hole';
            puzzleHole.style.left = `${pieceX}px`;
            puzzleHole.style.top = `${pieceY}px`;
            container.querySelector('#puzzle-container').appendChild(puzzleHole);

            piecePosition = pieceX;
            sliderCaptcha.style.display = 'block';
            resetSlider(container);
        };
    }

    function startDragging(e, container) {
        e.preventDefault();
        isDragging = true;
        startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
        startLeft = container.querySelector('#slider-handle').offsetLeft;
        startTime = Date.now();
        movements = [];
    }

    function drag(e, container) {
        if (!isDragging) return;
        e.preventDefault();

        const sliderHandle = container.querySelector('#slider-handle');
        const sliderTrack = container.querySelector('#slider-track');
        const puzzlePiece = container.querySelector('#puzzle-piece');

        const currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
        let newLeft = startLeft + currentX - startX;
        newLeft = Math.max(0, Math.min(newLeft, 260));

        sliderHandle.style.left = `${newLeft}px`;
        sliderTrack.style.width = `${newLeft}px`;
        puzzlePiece.style.left = `${newLeft}px`;

        movements.push({
            x: newLeft,
            time: Date.now() - startTime
        });
    }

    function stopDragging(container) {
        if (!isDragging) return;
        isDragging = false;

        const sliderHandle = container.querySelector('#slider-handle');
        const finalPosition = sliderHandle.offsetLeft;
        if (Math.abs(finalPosition - piecePosition) < 5) {
            if (isHumanLikeMovement()) {
                showSuccessMessage(container);
                container.querySelector('#slider-captcha').style.display = 'none';
                const callback = container.dataset.callback;
                if (callback && typeof window[callback] === 'function') {
                    window[callback]();
                }
                document.addEventListener('visibilitychange', () => handleVisibilityChange(container));
            } else {
                alert('Verification failed. Please try again.');
                changeImageAndPosition(container);
            }
        } else {
            alert('Verification failed. Please try again.');
            changeImageAndPosition(container);
        }
    }

    function showSuccessMessage(container) {
        container.querySelector('#loading-spinner').style.display = 'none';
        container.querySelector('#check-mark').style.display = 'inline-block';
        container.querySelector('#captcha-label').style.display = 'none';
        const successMessage = container.querySelector('#success-message');
        successMessage.textContent = translations[detectLanguage()].successMessage;
        successMessage.style.display = 'inline-block';
    }

    function resetSlider(container) {
        const sliderHandle = container.querySelector('#slider-handle');
        const sliderTrack = container.querySelector('#slider-track');
        const puzzlePiece = container.querySelector('#puzzle-piece');

        sliderHandle.style.left = '0';
        sliderTrack.style.width = '0';
        puzzlePiece.style.left = '0';
    }

    function isHumanLikeMovement() {
        if (movements.length < 5) return false;

        let isUneven = false;
        let prevSpeed = null;

        for (let i = 1; i < movements.length; i++) {
            const dx = movements[i].x - movements[i-1].x;
            const dt = movements[i].time - movements[i-1].time;
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

    function changeImageAndPosition(container) {
        const puzzleHole = container.querySelector('#puzzle-hole');
        if (puzzleHole) {
            puzzleHole.remove();
        }
        showSliderCaptcha(container);
    }

    function handleVisibilityChange(container) {
        if (document.visibilityState === 'hidden') {
            leaveTimer = setTimeout(() => {
                resetCaptcha(container);
            }, 15000);
        } else {
            clearTimeout(leaveTimer);
        }
    }

    function resetCaptcha(container) {
        const verifyCheckbox = container.querySelector('#verify-checkbox');
        verifyCheckbox.checked = false;
        verifyCheckbox.style.display = 'inline-block';
        container.querySelector('#captcha-label').style.display = 'inline-block';
        container.querySelector('#check-mark').style.display = 'none';
        container.querySelector('#success-message').style.display = 'none';
        container.querySelector('#slider-captcha').style.display = 'none';
        resetSlider(container);
        changeImageAndPosition(container);
        document.removeEventListener('visibilitychange', () => handleVisibilityChange(container));
    }

    // Main initialization function
    function initOneCaptcha(container) {
        // Insert HTML template
        container.innerHTML = template;

        // Apply translations
        const userLang = detectLanguage();
        applyTranslations(container, userLang);

        // Event listeners
        const verifyCheckbox = container.querySelector('#verify-checkbox');
        const retryButton = container.querySelector('#retry-button');
        const sliderHandle = container.querySelector('#slider-handle');

        verifyCheckbox.addEventListener('change', function() {
            if (this.checked) {
                this.style.display = 'none';
                container.querySelector('#loading-spinner').style.display = 'inline-block';
                showSliderCaptcha(container);
            }
        });

        retryButton.addEventListener('click', function() {
            changeImageAndPosition(container);
        });

        sliderHandle.addEventListener('mousedown', (e) => startDragging(e, container));
        sliderHandle.addEventListener('touchstart', (e) => startDragging(e, container));

        document.addEventListener('mousemove', (e) => drag(e, container));
        document.addEventListener('touchmove', (e) => drag(e, container));

        document.addEventListener('mouseup', () => stopDragging(container));
        document.addEventListener('touchend', () => stopDragging(container));
    }

    // Initialize all One Captcha instances
    document.addEventListener('DOMContentLoaded', () => {
        const captchaContainers = document.querySelectorAll('.one-captcha');
        captchaContainers.forEach(initOneCaptcha);
    });
})();
