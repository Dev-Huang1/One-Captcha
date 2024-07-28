(function() {
    const style = `
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
    `;

    const template = `
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

        <button id="submit-button" disabled>Submit</button>
    `;

    document.addEventListener('DOMContentLoaded', () => {
        const captchaElements = document.getElementsByClassName('one-captcha');
        if (captchaElements.length > 0) {
            const captchaElement = captchaElements[0];
            const callback = captchaElement.getAttribute('data-callback');
            if (callback && typeof window[callback] === 'function') {
                initializeCaptcha(window[callback]);
            } else {
                console.error('Callback function is not defined or not a function');
            }
        }
    });

    function initializeCaptcha(callback) {
        const container = document.createElement('div');
        container.innerHTML = template;
        document.body.appendChild(container);

        const styleElement = document.createElement('style');
        styleElement.innerHTML = style;
        document.head.appendChild(styleElement);

        const verifyCheckbox = document.getElementById('verify-checkbox');
        const sliderCaptcha = document.getElementById('slider-captcha');
        const puzzleImage = document.getElementById('puzzle-image');
        const puzzlePiece = document.getElementById('puzzle-piece');
        const sliderHandle = document.getElementById('slider-handle');
        const sliderTrack = document.getElementById('slider-track');
        const retryButton = document.getElementById('retry-button');
        const submitButton = document.getElementById('submit-button');
        const successMessage = document.getElementById('success-message');
        const loadingSpinner = document.getElementById('loading-spinner');
        const checkMark = document.getElementById('check-mark');

        let startX, offsetX, isSliding = false;
        const pieceSize = 50;
        const puzzleWidth = 300;
        const puzzleHeight = 200;
        let puzzlePosition = { x: 0, y: 0 };
        let slideStartTime, slideEndTime;

        verifyCheckbox.addEventListener('change', () => {
            if (verifyCheckbox.checked) {
                loadingSpinner.style.display = 'block';
                setTimeout(() => {
                    loadingSpinner.style.display = 'none';
                    sliderCaptcha.style.display = 'block';
                    loadCaptchaImage();
                }, 1000);
            } else {
                sliderCaptcha.style.display = 'none';
            }
        });

        sliderHandle.addEventListener('mousedown', (e) => {
            isSliding = true;
            startX = e.clientX;
            slideStartTime = new Date();
        });

        document.addEventListener('mousemove', (e) => {
            if (isSliding) {
                offsetX = e.clientX - startX;
                if (offsetX < 0) offsetX = 0;
                if (offsetX > puzzleWidth - pieceSize) offsetX = puzzleWidth - pieceSize;
                sliderHandle.style.left = offsetX + 'px';
                sliderTrack.style.width = offsetX + pieceSize / 2 + 'px';
                puzzlePiece.style.left = puzzlePosition.x + offsetX + 'px';
            }
        });

        document.addEventListener('mouseup', () => {
            if (isSliding) {
                isSliding = false;
                slideEndTime = new Date();
                const slideDuration = (slideEndTime - slideStartTime) / 1000;
                if (Math.abs(offsetX - puzzlePosition.x) < 10) {
                    successMessage.style.display = 'block';
                    checkMark.style.display = 'block';
                    loadingSpinner.style.display = 'none';
                    verifyCheckbox.disabled = true;
                    sliderCaptcha.style.display = 'none';
                    submitButton.disabled = false;
                    callback();
                } else {
                    alert('Verification failed. Please try again.');
                    resetCaptcha();
                }
            }
        });

        retryButton.addEventListener('click', () => {
            resetCaptcha();
        });

        function loadCaptchaImage() {
            puzzleImage.src = 'https://source.unsplash.com/random/300x200';
            puzzleImage.onload = () => {
                const ctx = document.createElement('canvas').getContext('2d');
                ctx.drawImage(puzzleImage, 0, 0, puzzleWidth, puzzleHeight);
                const pieceX = Math.floor(Math.random() * (puzzleWidth - pieceSize));
                const pieceY = Math.floor(Math.random() * (puzzleHeight - pieceSize));
                puzzlePosition = { x: pieceX, y: pieceY };
                puzzlePiece.style.backgroundImage = `url(${puzzleImage.src})`;
                puzzlePiece.style.backgroundPosition = `-${pieceX}px -${pieceY}px`;
                puzzlePiece.style.left = `${pieceX}px`;
                puzzlePiece.style.top = `${pieceY}px`;
            };
        }

        function resetCaptcha() {
            sliderHandle.style.left = '0px';
            sliderTrack.style.width = '0px';
            puzzlePiece.style.left = `${puzzlePosition.x}px`;
            loadCaptchaImage();
        }

        resetCaptcha();
    }
})();
