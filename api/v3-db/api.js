(function() {
    // CSS for CAPTCHA
    const css = `
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

    // JavaScript for CAPTCHA functionality
    const script = `
        (function() {
            const css = \`${css}\`;

            function injectCSS() {
                const style = document.createElement('style');
                style.type = 'text/css';
                style.appendChild(document.createTextNode(css));
                document.head.appendChild(style);
            }

            injectCSS();

            function initializeCaptcha() {
                const containers = document.querySelectorAll('.one-captcha');

                containers.forEach(container => {
                    const callback = container.getAttribute('data-callback');

                    const verifyCheckbox = document.createElement('input');
                    verifyCheckbox.type = 'checkbox';
                    verifyCheckbox.id = 'verify-checkbox';
                    container.appendChild(verifyCheckbox);

                    const verifyLabel = document.createElement('label');
                    verifyLabel.htmlFor = 'verify-checkbox';
                    verifyLabel.id = 'captcha-label';
                    verifyLabel.textContent = "I'm not a robot.";
                    container.appendChild(verifyLabel);

                    const successMessage = document.createElement('span');
                    successMessage.id = 'success-message';
                    successMessage.style.display = 'none';
                    successMessage.textContent = 'Success';
                    container.appendChild(successMessage);

                    const brand = document.createElement('div');
                    brand.id = 'brand';
                    brand.innerHTML = '<a href="https://github.com/Dev-Huang1/One-Captcha"><img src="https://captcha.xyehr.cn/assets/logo/logo.svg" alt="One Captcha Logo"></a>One Captcha<div class="privacy-terms-links"><a href="https://www.xyehr.cn/one-captcha-privacy-policy" id="privacy-link">Privacy</a><p>·</p><a href="https://help.xyehr.cn/jekyll/2024-07-05-one-captcha.html" id="docs-link">Docs</a></div>';
                    container.appendChild(brand);

                    const sliderCaptcha = document.createElement('div');
                    sliderCaptcha.id = 'slider-captcha';
                    sliderCaptcha.innerHTML = '<div id="puzzle-container"><img id="puzzle-image" src="" alt="img"><div id="puzzle-piece"></div></div><div id="slider"><div id="slider-track"></div><div id="slider-handle">→</div></div><button id="retry-button">Retry</button>';
                    container.appendChild(sliderCaptcha);

                    const submitButton = document.createElement('button');
                    submitButton.id = 'submit-button';
                    submitButton.disabled = true;
                    submitButton.textContent = 'Submit';
                    container.appendChild(submitButton);

                    const images = [
                        'https://captcha.xyehr.cn/assets/v3/image1.jpeg',
                        'https://captcha.xyehr.cn/assets/v3/image2.jpeg',
                        'https://captcha.xyehr.cn/assets/v3/image3.jpg',
                        'https://captcha.xyehr.cn/assets/v3/img018.png',
                        'https://captcha.xyehr.cn/assets/v3/img072.jpg',
                        'https://captcha.xyehr.cn/assets/v3/img102.jpeg',
                        'https://captcha.xyehr.cn/assets/v3/img181.jpeg',
                        'https://captcha.xyehr.cn/assets/v3/img193.jpeg',
                        'https://captcha.xyehr.cn/assets/v3/img249.jpg',
                        'https://captcha.xyehr.cn/assets/v3/img273.jpeg',
                        'https://captcha.xyehr.cn/assets/v3/img372.jpeg',
                        'https://captcha.xyehr.cn/assets/v3/img392.jpeg',
                        'https://captcha.xyehr.cn/assets/v3/img396.jpeg',
                        'https://captcha.xyehr.cn/assets/v3/img398.jpeg',
                        'https://captcha.xyehr.cn/assets/v3/img462.jpg',
                        'https://captcha.xyehr.cn/assets/v3/img482.jpeg',
                        'https://captcha.xyehr.cn/assets/v3/img492.jpeg',
                        'https://captcha.xyehr.cn/assets/v3/img592.jpg',
                        'https://captcha.xyehr.cn/assets/v3/img638.jpg',
                        'https://captcha.xyehr.cn/assets/v3/img639.jpeg',
                        'https://captcha.xyehr.cn/assets/v3/img639.jpg',
                        'https://captcha.xyehr.cn/assets/v3/img648.jpg',
                        'https://captcha.xyehr.cn/assets/v3/img657.jpeg',
                        'https://captcha.xyehr.cn/assets/v3/img857.jpeg',
                        'https://captcha.xyehr.cn/assets/v3/img928.jpeg'
                    ];
                    const imageUrl = images[Math.floor(Math.random() * images.length)];
                    const puzzleImage = document.getElementById('puzzle-image');
                    puzzleImage.src = 'https://cdn.jsdelivr.net/gh/Dev-Huang1/Human-Machine-Verification/assets/images/' + imageUrl;

                    function createPuzzlePiece() {
                        const piece = document.getElementById('puzzle-piece');
                        piece.style.backgroundImage = 'url(' + puzzleImage.src + ')';
                        piece.style.backgroundPosition = '-' + (Math.random() * (puzzleImage.width - piece.offsetWidth)) + 'px -' + (Math.random() * (puzzleImage.height - piece.offsetHeight)) + 'px';
                        piece.style.top = Math.random() * (puzzleImage.height - piece.offsetHeight) + 'px';
                        piece.style.left = Math.random() * (puzzleImage.width - piece.offsetWidth) + 'px';
                    }
                    
                    createPuzzlePiece();

                    let isVerified = false;
                    let sliderStartX = 0;
                    let sliderMoved = 0;

                    const sliderHandle = document.getElementById('slider-handle');
                    const sliderTrack = document.getElementById('slider-track');
                    const retryButton = document.getElementById('retry-button');
                    
                    sliderHandle.addEventListener('mousedown', e => {
                        sliderStartX = e.clientX;
                        document.addEventListener('mousemove', onMouseMove);
                        document.addEventListener('mouseup', onMouseUp);
                    });

                    function onMouseMove(e) {
                        if (isVerified) return;
                        const moveX = e.clientX - sliderStartX;
                        sliderMoved = Math.min(Math.max(moveX, 0), slider.offsetWidth - sliderHandle.offsetWidth);
                        sliderHandle.style.left = sliderMoved + 'px';
                        sliderTrack.style.width = sliderMoved + 'px';
                        if (sliderMoved > slider.offsetWidth * 0.95) {
                            isVerified = true;
                            sliderTrack.style.backgroundColor = '#0066ff';
                            document.getElementById('success-message').style.display = 'inline';
                            if (callback) {
                                window[callback]();
                            }
                        }
                    }

                    function onMouseUp() {
                        document.removeEventListener('mousemove', onMouseMove);
                        document.removeEventListener('mouseup', onMouseUp);
                    }

                    retryButton.addEventListener('click', () => {
                        isVerified = false;
                        sliderMoved = 0;
                        sliderHandle.style.left = '0px';
                        sliderTrack.style.width = '0px';
                        document.getElementById('success-message').style.display = 'none';
                        createPuzzlePiece();
                    });
                });
            }

            document.addEventListener('DOMContentLoaded', initializeCaptcha);
        })();
    `;

    // Create and append the script element
    const scriptElement = document.createElement('script');
    scriptElement.type = 'text/javascript';
    scriptElement.textContent = script;
    document.body.appendChild(scriptElement);
})();
