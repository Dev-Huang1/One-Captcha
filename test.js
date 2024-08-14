(function () {
    const style = document.createElement('style');
    style.textContent = `
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
            border-radius: 10px;
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
    document.head.appendChild(style);

    const container = document.createElement('div');
    container.innerHTML = `
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
    document.body.appendChild(container);

    const verifyCheckbox = document.getElementById('verify-checkbox');
    const sliderCaptcha = document.getElementById('slider-captcha');
    const puzzleImage = document.getElementById('puzzle-image');
    const puzzlePiece = document.getElementById('puzzle-piece');
    const sliderHandle = document.getElementById('slider-handle');
    const sliderTrack = document.getElementById('slider-track');
    const retryButton = document.getElementById('retry-button');
    const successMessage = document.getElementById('success-message');

    const images = ['image1.jpeg', 'image2.jpeg', 'image3.jpg', 'img018.png', 'img072.jpg', 'img102.jpeg', 'img181.jpeg', 'img193.jpeg', 'img249.jpg', 'img273.jpeg', 'img372.jpeg', 'img392.jpeg', 'img396.jpeg', 'img398.jpeg', 'img462.jpg', 'img482.jpeg', 'img492.jpeg', 'img592.jpg', 'img638.jpg', 'img672.jpg', 'img682.jpeg', 'img691.jpg', 'img734.jpeg', 'img736.jpeg', 'img793.jpg', 'img827.jpg', 'img847.jpeg', 'img860.jpg', 'img919.jpeg', 'img935.jpeg', 'img942.jpg', 'img963.jpeg', 'img965.jpeg', 'img982.jpg', 'img985.jpg', 'img986.jpeg'];

    let selectedImage = '';
    let piecePosition = { x: 0, y: 0 };
    let puzzleHole = { x: 0, y: 0 };
    let puzzleSolved = false;

    verifyCheckbox.addEventListener('change', () => {
        if (verifyCheckbox.checked) {
            sliderCaptcha.style.display = 'block';
            initializeCaptcha();
        }
    });

    sliderHandle.addEventListener('mousedown', startSliding);
    sliderHandle.addEventListener('touchstart', startSliding);

    function initializeCaptcha() {
        selectedImage = images[Math.floor(Math.random() * images.length)];
        puzzleImage.src = `assets/${selectedImage}`;
        puzzleImage.onload = () => {
            const puzzlePieceSize = 50;
            puzzleHole.x = Math.random() * (puzzleImage.clientWidth - puzzlePieceSize);
            puzzleHole.y = Math.random() * (puzzleImage.clientHeight - puzzlePieceSize);
            piecePosition.x = 0;
            piecePosition.y = puzzleHole.y;
            puzzlePiece.style.width = puzzlePieceSize + 'px';
            puzzlePiece.style.height = puzzlePieceSize + 'px';
            puzzlePiece.style.left = piecePosition.x + 'px';
            puzzlePiece.style.top = piecePosition.y + 'px';
            puzzlePiece.style.backgroundImage = `url(assets/${selectedImage})`;
            puzzlePiece.style.backgroundPosition = `-${puzzleHole.x}px -${puzzleHole.y}px`;

            if (!document.getElementById('puzzle-hole')) {
                const hole = document.createElement('div');
                hole.id = 'puzzle-hole';
                hole.style.width = puzzlePieceSize + 'px';
                hole.style.height = puzzlePieceSize + 'px';
                hole.style.left = puzzleHole.x + 'px';
                hole.style.top = puzzleHole.y + 'px';
                puzzleImage.parentElement.appendChild(hole);
            } else {
                const hole = document.getElementById('puzzle-hole');
                hole.style.left = puzzleHole.x + 'px';
                hole.style.top = puzzleHole.y + 'px';
            }

            puzzleSolved = false;
            successMessage.style.display = 'none';
            sliderTrack.style.width = '0';
            sliderHandle.style.left = '0';
        };
    }

    function startSliding(e) {
        e.preventDefault();
        if (puzzleSolved) return;

        const startX = e.clientX || e.touches[0].clientX;
        const sliderStartX = sliderHandle.getBoundingClientRect().left;

        document.addEventListener('mousemove', onSliding);
        document.addEventListener('mouseup', stopSliding);
        document.addEventListener('touchmove', onSliding);
        document.addEventListener('touchend', stopSliding);

        function onSliding(e) {
            const currentX = e.clientX || e.touches[0].clientX;
            let moveX = currentX - startX;
            const sliderWidth = sliderHandle.parentElement.clientWidth;
            const handleWidth = sliderHandle.clientWidth;

            moveX = Math.max(0, Math.min(sliderWidth - handleWidth, moveX));

            sliderHandle.style.left = moveX + 'px';
            sliderTrack.style.width = moveX + 'px';
            puzzlePiece.style.left = piecePosition.x + moveX + 'px';
        }

        function stopSliding() {
            document.removeEventListener('mousemove', onSliding);
            document.removeEventListener('mouseup', stopSliding);
            document.removeEventListener('touchmove', onSliding);
            document.removeEventListener('touchend', stopSliding);

            const moveX = parseFloat(sliderHandle.style.left);
            if (Math.abs(moveX - puzzleHole.x) < 5) {
                puzzleSolved = true;
                successMessage.style.display = 'block';
                sliderCaptcha.style.display = 'none';
                if (verifyCheckbox.checked) {
                    setTimeout(() => {
                        if (typeof window[document.querySelector('.one-captcha').getAttribute('data-callback')] === 'function') {
                            window[document.querySelector('.one-captcha').getAttribute('data-callback')]();
                        }
                    }, 500);
                }
            } else {
                sliderHandle.style.left = '0';
                sliderTrack.style.width = '0';
                puzzlePiece.style.left = piecePosition.x + 'px';
            }
        }
    }

    retryButton.addEventListener('click', () => {
        initializeCaptcha();
    });
})();
