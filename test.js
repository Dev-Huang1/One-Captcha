class OneCaptcha {
    constructor(container, callback) {
        this.container = container;
        this.callback = callback;
        this.init();
    }

    init() {
        this.container.innerHTML = `
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
            <div id="captcha-container">
                <div id="verify-section">
                    <input type="checkbox" id="verify-checkbox">
                    <div id="loading-spinner"></div>
                    <img id="check-mark" src="https://captcha.xyehr.cn/assets/check-mark.svg" alt="Check Mark" style="display: none;">
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

        this.verifyCheckbox = this.container.querySelector('#verify-checkbox');
        this.sliderCaptcha = this.container.querySelector('#slider-captcha');
        this.puzzleImage = this.container.querySelector('#puzzle-image');
        this.puzzlePiece = this.container.querySelector('#puzzle-piece');
        this.sliderHandle = this.container.querySelector('#slider-handle');
        this.sliderTrack = this.container.querySelector('#slider-track');
        this.retryButton = this.container.querySelector('#retry-button');
        this.successMessage = this.container.querySelector('#success-message');
        this.submitButton = this.container.querySelector('#submit-button');

        this.images = ['image1.jpeg', 'image2.jpeg', 'image3.jpg', 'img018.png', 'img072.jpg', 'img102.jpeg', 'img181.jpeg', 'img193.jpeg', 'img249.jpg', 'img273.jpeg', 'img372.jpeg', 'img392.jpeg', 'img396.jpeg', 'img398.jpeg', 'img462.jpg', 'img482.jpeg', 'img492.jpeg', 'img592.jpg', 'img638.jpeg', 'img672.jpg', 'img675.jpg', 'img687.jpg', 'img691.jpg', 'img718.jpg', 'img722.jpeg', 'img789.jpeg', 'img792.jpg', 'img809.jpg', 'img825.jpeg', 'img892.jpeg', 'img895.jpg', 'img937.jpeg', 'img989.jpg', 'img995.jpeg'];

        this.bindEvents();
    }

    bindEvents() {
        this.verifyCheckbox.addEventListener('change', () => {
            if (this.verifyCheckbox.checked) {
                this.loadNewPuzzle();
                this.sliderCaptcha.style.display = 'block';
            }
        });

        this.sliderHandle.addEventListener('mousedown', (e) => {
            e.preventDefault();
            this.isDragging = true;
            this.startX = e.clientX;
        });

        document.addEventListener('mousemove', (e) => {
            if (this.isDragging) {
                const deltaX = e.clientX - this.startX;
                const maxDeltaX = this.sliderCaptcha.offsetWidth - this.sliderHandle.offsetWidth;

                if (deltaX >= 0 && deltaX <= maxDeltaX) {
                    this.sliderHandle.style.left = `${deltaX}px`;
                    this.sliderTrack.style.width = `${deltaX}px`;
                }
            }
        });

        document.addEventListener('mouseup', () => {
            if (this.isDragging) {
                this.isDragging = false;
                this.checkSolution();
            }
        });

        this.retryButton.addEventListener('click', () => {
            this.loadNewPuzzle();
            this.sliderHandle.style.left = '0';
            this.sliderTrack.style.width = '0';
        });
    }

    loadNewPuzzle() {
        const randomImage = this.images[Math.floor(Math.random() * this.images.length)];
        this.puzzleImage.src = `https://captcha.xyehr.cn/assets/${randomImage}`;
        this.puzzlePiece.style.backgroundImage = `url(${this.puzzleImage.src})`;
        this.puzzlePiece.style.left = '0';

        const puzzlePieceLeft = Math.random() * (this.puzzleImage.clientWidth - this.puzzlePiece.clientWidth);
        const puzzlePieceTop = Math.random() * (this.puzzleImage.clientHeight - this.puzzlePiece.clientHeight);

        this.puzzlePiece.style.left = `${puzzlePieceLeft}px`;
        this.puzzlePiece.style.top = `${puzzlePieceTop}px`;

        this.puzzleHole.style.left = `${puzzlePieceLeft}px`;
        this.puzzleHole.style.top = `${puzzlePieceTop}px`;
    }

    checkSolution() {
        const sliderLeft = parseFloat(this.sliderHandle.style.left);
        const puzzlePieceLeft = parseFloat(this.puzzlePiece.style.left);
        const tolerance = 10;

        if (Math.abs(sliderLeft - puzzlePieceLeft) <= tolerance) {
            this.successMessage.style.display = 'block';
            this.sliderCaptcha.style.display = 'none';
            this.submitButton.disabled = false;
            this.callback();
        } else {
            this.sliderHandle.style.left = '0';
            this.sliderTrack.style.width = '0';
        }
    }
}

document.querySelectorAll('.one-captcha').forEach(container => {
    const callback = window[container.dataset.callback];
    new OneCaptcha(container, callback);
});
