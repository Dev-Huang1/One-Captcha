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
    
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    const captchaHTML = `
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
        const captchaDiv = document.querySelector('.one-captcha');
        if (captchaDiv) {
            captchaDiv.innerHTML = captchaHTML;
            initCaptcha(captchaDiv.dataset.callback);
        }
    });

    function initCaptcha(callbackFunction) {
        const verifyCheckbox = document.getElementById('verify-checkbox');
        const sliderCaptcha = document.getElementById('slider-captcha');
        const puzzleImage = document.getElementById('puzzle-image');
        const puzzlePiece = document.getElementById('puzzle-piece');
        const sliderHandle = document.getElementById('slider-handle');
        const sliderTrack = document.getElementById('slider-track');
        const retryButton = document.getElementById('retry-button');
        const successMessage = document.getElementById('success-message');
        const submitButton = document.getElementById('submit-button');

        const images = ['https://captcha.xyehr.cn/assets/images/pic1.jpg', 'https://captcha.xyehr.cn/assets/images/pic2.jpg', 'https://captcha.xyehr.cn/assets/images/pic3.jpg'];

        let startPos = 0;
        let piecePos = 0;
        let dragging = false;

        verifyCheckbox.addEventListener('change', () => {
            if (verifyCheckbox.checked) {
                sliderCaptcha.style.display = 'block';
                loadNewPuzzle();
            } else {
                sliderCaptcha.style.display = 'none';
            }
        });

        function loadNewPuzzle() {
            const randomIndex = Math.floor(Math.random() * images.length);
            puzzleImage.src = images[randomIndex];

            puzzleImage.onload = () => {
                const puzzleWidth = puzzleImage.offsetWidth;
                const puzzleHeight = puzzleImage.offsetHeight;
                const pieceWidth = puzzlePiece.offsetWidth;
                const pieceHeight = puzzlePiece.offsetHeight;

                const pieceX = Math.random() * (puzzleWidth - pieceWidth);
                const pieceY = Math.random() * (puzzleHeight - pieceHeight);
                const holeX = Math.random() * (puzzleWidth - pieceWidth);
                const holeY = Math.random() * (puzzleHeight - pieceHeight);

                puzzlePiece.style.backgroundImage = `url(${puzzleImage.src})`;
                puzzlePiece.style.backgroundPosition = `-${pieceX}px -${pieceY}px`;
                puzzlePiece.style.left = `${pieceX}px`;
                puzzlePiece.style.top = `${pieceY}px`;

                const puzzleHole = document.createElement('div');
                puzzleHole.id = 'puzzle-hole';
                puzzleHole.style.left = `${holeX}px`;
                puzzleHole.style.top = `${holeY}px`;
                puzzleHole.style.width = `${pieceWidth}px`;
                puzzleHole.style.height = `${pieceHeight}px`;
                document.getElementById('puzzle-container').appendChild(puzzleHole);

                piecePos = pieceX - holeX;
            };
        }

        sliderHandle.addEventListener('mousedown', (event) => {
            startPos = event.clientX;
            dragging = true;
            sliderHandle.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (event) => {
            if (dragging) {
                const offset = event.clientX - startPos;
                const sliderWidth = document.getElementById('slider').offsetWidth;
                const handleWidth = sliderHandle.offsetWidth;

                let newLeft = offset;
                if (newLeft < 0) newLeft = 0;
                if (newLeft > sliderWidth - handleWidth) newLeft = sliderWidth - handleWidth;

                sliderHandle.style.left = `${newLeft}px`;
                sliderTrack.style.width = `${newLeft + handleWidth / 2}px`;

                puzzlePiece.style.left = `${piecePos + newLeft}px`;
            }
        });

        document.addEventListener('mouseup', () => {
            if (dragging) {
                dragging = false;
                sliderHandle.style.cursor = 'grab';

                const offset = parseInt(sliderHandle.style.left);
                if (Math.abs(offset - piecePos) < 10) {
                    successMessage.style.display = 'block';
                    sliderCaptcha.style.display = 'none';
                    document.getElementById('loading-spinner').style.display = 'inline-block';
                    setTimeout(() => {
                        document.getElementById('loading-spinner').style.display = 'none';
                        document.getElementById('check-mark').style.display = 'inline-block';
                        submitButton.disabled = false;
                        if (typeof window[callbackFunction] === 'function') {
                            window[callbackFunction]();
                        }
                    }, 15000);
                } else {
                    alert('Verification failed, please try again.');
                }
            }
        });

        retryButton.addEventListener('click', () => {
            loadNewPuzzle();
            sliderHandle.style.left = '0';
            sliderTrack.style.width = '0';
        });
    }
})();
