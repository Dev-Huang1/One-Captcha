(function() {
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

    function detectLanguage() {
        const userLang = navigator.language || navigator.userLanguage;
        if (userLang.startsWith('zh')) return 'zh';
        else return userLang.includes('zh') ? 'zh' : 'en';
    }

    function applyTranslations(language) {
        document.getElementById('captcha-label').textContent = translations[language].captchaLabel;
        document.getElementById('retry-button').textContent = translations[language].retryButton;
        document.getElementById('privacy-link').textContent = translations[language].privacyLink;
        document.getElementById('docs-link').textContent = translations[language].docsLink;
        document.getElementById('submit-button').textContent = translations[language].submitButton;
    }

    function createCaptchaHTML() {
        const captchaContainer = document.createElement('div');
        captchaContainer.id = 'captcha-container';
        captchaContainer.innerHTML = `
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
        `;
        document.querySelector('.one-captcha').appendChild(captchaContainer);
    }

    function createSliderCaptchaHTML() {
        const sliderCaptchaContainer = document.createElement('div');
        sliderCaptchaContainer.id = 'slider-captcha';
        sliderCaptchaContainer.innerHTML = `
            <div id="puzzle-container">
                <img id="puzzle-image" src="" alt="Puzzle Image">
                <div id="puzzle-piece"></div>
                <div id="puzzle-hole"></div>
            </div>
            <div id="slider">
                <div id="slider-track"></div>
                <div id="slider-handle">></div>
            </div>
            <button id="retry-button">Retry</button>
        `;
        document.body.appendChild(sliderCaptchaContainer);
    }

    function applyStyles() {
        const styleSheet = document.createElement('style');
        styleSheet.type = 'text/css';
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);
    }

    function getRandomPuzzleImage() {
        const images = [
            '/assets/v3/image1.jpeg',
            '/assets/v3/image2.jpeg',
            '/assets/v3/image3.jpg',
            '/assets/v3/img018.png',
            '/assets/v3/img072.jpg',
            '/assets/v3/img102.jpeg',
            '/assets/v3/img181.jpeg',
            '/assets/v3/img193.jpeg',
            '/assets/v3/img249.jpg',
            '/assets/v3/img273.jpeg',
            '/assets/v3/img372.jpeg',
            '/assets/v3/img392.jpeg',
            '/assets/v3/img396.jpeg',
            '/assets/v3/img398.jpeg',
            '/assets/v3/img462.jpg',
            '/assets/v3/img482.jpeg',
            '/assets/v3/img492.jpeg',
            '/assets/v3/img592.jpg',
            '/assets/v3/img638.jpg',
            '/assets/v3/img639.jpeg',
            '/assets/v3/img639.jpg',
            '/assets/v3/img648.jpg',
            '/assets/v3/img657.jpeg',
            '/assets/v3/img857.jpeg',
            '/assets/v3/img928.jpeg'
        ];
        return images[Math.floor(Math.random() * images.length)];
    }

    function showSliderCaptcha() {
        const sliderCaptcha = document.getElementById('slider-captcha');
        const puzzleImage = document.getElementById('puzzle-image');
        const puzzlePiece = document.getElementById('puzzle-piece');
        const puzzleHole = document.getElementById('puzzle-hole');

        const puzzleImageUrl = getRandomPuzzleImage();
        puzzleImage.src = puzzleImageUrl;
        puzzlePiece.style.backgroundImage = `url(${puzzleImageUrl})`;

        puzzlePiece.style.top = `${Math.random() * (200 - 50)}px`;
        puzzlePiece.style.left = '0px';
        puzzleHole.style.top = puzzlePiece.style.top;
        puzzleHole.style.left = `${Math.random() * (300 - 50)}px`;

        sliderCaptcha.style.display = 'block';
    }

    function hideSliderCaptcha() {
        const sliderCaptcha = document.getElementById('slider-captcha');
        sliderCaptcha.style.display = 'none';
    }

    function verifySliderCaptcha(callback) {
        const puzzlePiece = document.getElementById('puzzle-piece');
        const puzzleHole = document.getElementById('puzzle-hole');
        const pieceLeft = parseFloat(puzzlePiece.style.left);
        const holeLeft = parseFloat(puzzleHole.style.left);
        if (Math.abs(pieceLeft - holeLeft) < 5) {
            document.getElementById('check-mark').style.display = 'inline';
            document.getElementById('loading-spinner').style.display = 'none';
            document.getElementById('success-message').style.display = 'inline';
            callback();
            setTimeout(hideSliderCaptcha, 1000);
        } else {
            alert('Verification failed. Please try again.');
            document.getElementById('loading-spinner').style.display = 'none';
            document.getElementById('verify-checkbox').checked = false;
        }
    }

    function initializeCaptcha() {
        applyStyles();
        createCaptchaHTML();
        createSliderCaptchaHTML();
        applyTranslations(detectLanguage());

        const verifyCheckbox = document.getElementById('verify-checkbox');
        const sliderHandle = document.getElementById('slider-handle');
        const sliderTrack = document.getElementById('slider-track');
        let isDragging = false;
        let startX;
        let offsetX;

        verifyCheckbox.addEventListener('change', () => {
            if (verifyCheckbox.checked) {
                document.getElementById('loading-spinner').style.display = 'inline-block';
                showSliderCaptcha();
            }
        });

        sliderHandle.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            offsetX = 0;
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                offsetX = e.clientX - startX;
                if (offsetX < 0) offsetX = 0;
                if (offsetX > 260) offsetX = 260;
                sliderHandle.style.left = `${offsetX}px`;
                sliderTrack.style.width = `${offsetX}px`;
                document.getElementById('slider-captcha').style.background = 'gray';
            }
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                verifySliderCaptcha(() => {
                    const callbackName = document.querySelector('.one-captcha').getAttribute('data-callback');
                    if (callbackName && typeof window[callbackName] === 'function') {
                        window[callbackName]();
                    }
                });
            }
        });

        document.getElementById('retry-button').addEventListener('click', showSliderCaptcha);
    }

    document.addEventListener('DOMContentLoaded', initializeCaptcha);
})();
