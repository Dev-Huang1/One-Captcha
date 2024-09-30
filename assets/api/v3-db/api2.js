// This is a test api

// Limiting abuse to prevent unlimited attempts is still under testing
const MAX_REQUESTS = 5; // Maximum number of requests allowed per hour
const RATE_LIMIT_DURATION = 180000;

async function checkIPRateLimit() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const ip = data.ip;

        let ipData = JSON.parse(localStorage.getItem(ip) || '{}');
        const currentTime = Date.now();

        if (!ipData.timestamp || (currentTime - ipData.timestamp) > RATE_LIMIT_DURATION) {
            ipData = { count: 1, timestamp: currentTime };
        } else {
            ipData.count++;
        }

        localStorage.setItem(ip, JSON.stringify(ipData));

        return ipData.count <= MAX_REQUESTS;
    } catch (error) {
        console.error('Error checking IP rate limit:', error);
        return true; // Allow the request if there's an error
    }
}

function showRateLimitWarning() {
    const loadingSpinner = document.getElementById('loading-spinner');
    const spinnerRect = loadingSpinner.getBoundingClientRect();
    
    const warningElement = document.createElement('div');
    warningElement.id = 'rate-limit-warning';
    warningElement.style.cssText = `
        position: absolute;
        top: ${spinnerRect.bottom + window.scrollY}px;
        left: ${spinnerRect.right + window.scrollX}px;
        background-color: #ffffff;
        color: #f44336;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        text-align: center;
        font-family: Arial, sans-serif;
        border: 1px solid #f44336;
        animation: fadeIn 0.5s, fadeOut 0.5s 2s;
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    warningElement.textContent = 'You are abusing our service. Please try again later.';
    document.body.appendChild(warningElement);

    setTimeout(() => {
        warningElement.remove();
    }, 3000);
}

function captcha() {
    document.getElementById('one-captcha').innerHTML = `
        <style>
        #captcha-container {
            width: 260px;
            height: 40px;
            border: 1px solid #ccc;
            padding: 20px;
            /* margin: 50px 0; */
            text-align: left;
            box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.08);
            border-radius: 3px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-family: Arial, sans-serif;
            background-color: rgb(249, 249, 249);
            color: #000000;
        }
        #verify-section {
            display: flex;
            align-items: center;
        }
        #verify-checkbox {
            margin-right: 14px;
            width: 20px;
            height: 20px;
            outline: 2px solid rgb(193, 193, 193);
            border-radius: 2px;
            display: inline-block;
            vertical-align: middle;
            transition: transform 0.3s ease, opacity 0.3s ease;
            -webkit-appearance: none;
            appearance: none;
            cursor: pointer;
            background: #fff;
            position: relative;
        }
        #verify-checkbox:checked {
            background-color: #fff;
        }
        #verify-checkbox:checked::before {
            transform: translate(-50%, -50%) scale(1.2);
        }
        #captcha-label {
            /* margin-right: 20px; */
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
            font-family: Arial, sans-serif;
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
        #puzzle-piece, #puzzle-hole {
            pointer-events: none;
            will-change: transform;
        }

        #success-message {
            display: none;
            color: #000000;
            text-align: center;
        }

        #error-message {
            display: none;
            color: red;
            text-align: center;
            margin-top: 16px;
        }
        
        #check-mark {
            display: none;
            width: 35px;
            height: 35px;
            margin-right: 10px;
            opacity: 0;
            transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
            transform: scale(0.8);
        }

        #loading-spinner {
            margin-right: 15px;
            display: none;
            border: 3px solid #f3f3f3;
            border-top: 3px solid #0066ff;
            border-radius: 50%;
            width: 17px;
            height: 17px;
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        @media (prefers-color-scheme: dark) {
            #captcha-container {
                border-color: #444;
                background-color: rgb(54, 54, 54);
                color: #ffffff;
            }

            #verify-checkbox {
                background: rgb(48, 48, 48);
                outline: 2px solid rgb(110, 110, 110);
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
                color: #fff;
            }
         }
    </style>
    <div id="captcha-container">
        <div id="verify-section">
            <input type="checkbox" id="verify-checkbox">
            <label for="verify-checkbox" class="custom-checkbox"></label>
            <div id="loading-spinner"></div>
            <!--<img id="check-mark" src="assets/check-mark.svg" alt="Check Mark" style="display: none;">-->
            <svg id="check-mark" style="display: none;" xmlns="http://www.w3.org/2000/svg" height="24px"
            viewBox="0 -960 960 960" width="24px" fill="#4CAF50">
            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
            </svg>
            <label for="verify-checkbox" id="captcha-label">I'm not a robot.</label>
            <span id="success-message" style="display: none;">Success</span>
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
        <p id="error-message" style="color: red; display: none;">Verification failed. Please try again.</p>
        <div id="slider">
            <div id="slider-track"></div>
            <div id="slider-handle">→</div>
        </div>
        <button id="retry-button">Retry</button>
    </div>
    `;
    
    const verifyCheckbox = document.getElementById('verify-checkbox');
    const sliderCaptcha = document.getElementById('slider-captcha');
    const puzzleImage = document.getElementById('puzzle-image');
    const puzzlePiece = document.getElementById('puzzle-piece');
    const sliderHandle = document.getElementById('slider-handle');
    const sliderTrack = document.getElementById('slider-track');
    const retryButton = document.getElementById('retry-button');
    const successMessage = document.getElementById('success-message');
    // const submitButton = document.getElementById('submit-button');
    const errorMessage = document.getElementById('error-message');
    const rateLimitWarning = document.getElementById('rate-limit-warning');

    const images = ['image1.jpeg', 'image2.jpeg', 'image3.jpg', 'img018.png', 'img072.jpg', 'img102.jpeg', 'img181.jpeg', 'img193.jpeg', 'img273.jpeg', 'img372.jpeg', 'img392.jpeg', 'img398.jpeg', 'img462.jpg', 'img482.jpeg', 'img492.jpeg', 'img592.jpg', 'img638.jpg', 'img639.jpeg', 'img639.jpg', 'img648.jpg', 'img657.jpeg', 'img857.jpeg', 'img928.jpeg'];
    let currentImage;
    let piecePosition;
    let isDragging = false;
    let startX;
    let startLeft;
    let movements = [];
    let startTime;
    let leaveTimer;

    const translations = {
        en: {
            captchaLabel: "I'm not a robot",
            verifyingText: "Verifying...",
            retryButton: "Retry",
            privacyLink: "Privacy",
            docsLink: "Docs",
            successMessage: "Success",
            errorMessage: "Verification failed. Please try again.",
            //rateLimitWarning: 'You are abusing our service. Please try again later.',
        },
        zh: {
            captchaLabel: "我不是机器人",
            verifyingText: "验证中...",
            retryButton: "重试",
            privacyLink: "隐私",
            docsLink: "文档",
            successMessage: "验证成功",
            errorMessage: "验证失败，请重试",
            //rateLimitWarning: '检测到您正在滥用我们的服务，请稍候再试。',
        },
        es: {
        captchaLabel: "No soy un robot",
        verifyingText: "Verificando...",
        retryButton: "Reintentar",
        privacyLink: "Privacidad",
        docsLink: "Documentos",
        successMessage: "Éxito",
        errorMessage: "La verificación falló. Por favor, inténtelo de nuevo.",
    },
    fr: { 
        captchaLabel: "Je suis humain",
        verifyingText: "Vérification...",
        retryButton: "Réessayer",
        privacyLink: "Confidentialité",
        docsLink: "Docs",
        successMessage: "Succès",
        errorMessage: "Échec de la vérification. Veuillez réessayer.",
    },
    };

    const captchaElement = document.getElementById('one-captcha');
    const dataLang = captchaElement.getAttribute('data-lang');

    function detectLanguage() {
        if (dataLang) {
            return dataLang;
        }
        const userLang = navigator.language || navigator.userLanguage;
        if (userLang.startsWith('zh')) return 'zh';
        else if (userLang.startsWith('es')) return 'es';
        else if (userLang.startsWith('fr')) return 'fr';
        else return userLang.includes('zh') ? 'zh' : 'en';
    }

    function applyTranslations(language) {
        document.getElementById('captcha-label').textContent = translations[language].captchaLabel;
        document.getElementById('retry-button').textContent = translations[language].retryButton;
        document.getElementById('privacy-link').textContent = translations[language].privacyLink;
        document.getElementById('docs-link').textContent = translations[language].docsLink;
        document.getElementById('error-message').textContent = translations[language].errorMessage;
    }

    verifyCheckbox.addEventListener('change', async function() {
    if (this.checked) {
        this.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
        this.style.transform = 'scale(0)';
        this.style.opacity = '0';
    
        setTimeout(() => {
            this.style.display = 'none';
            const spinner = document.getElementById('loading-spinner');
            spinner.style.display = 'inline-block';
            setTimeout(() => {
                spinner.style.opacity = '1';
                checkIPRateLimit().then(isAllowed => {
                    if (!isAllowed) {
                        this.checked = false;
                        showRateLimitWarning();
                        return;
                    }
                    sliderCaptcha.style.opacity = '0';
                    sliderCaptcha.style.display = 'block';
                    showSliderCaptcha();
                });
            }, 50);
        }, 300);
    }
});

    function showSliderCaptcha() {
    currentImage = images[Math.floor(Math.random() * images.length)];
    puzzleImage.src = `https://onecaptcha.us.kg/assets/v3/${currentImage}`;

    puzzleImage.onload = () => {
        const pieceSize = 50;
        const maxX = puzzleImage.width - pieceSize;
        const maxY = puzzleImage.height - pieceSize;
        const pieceX = Math.floor(Math.random() * (maxX - 50) + 50); 
        const pieceY = Math.floor(Math.random() * maxY);

        // 确保拼图块元素存在
        if (!document.getElementById('puzzle-piece')) {
            const newPuzzlePiece = document.createElement('div');
            newPuzzlePiece.id = 'puzzle-piece';
            document.getElementById('puzzle-container').appendChild(newPuzzlePiece);
            puzzlePiece = newPuzzlePiece;
        }

        puzzlePiece.style.left = '0px';
        puzzlePiece.style.top = `${pieceY}px`;
        puzzlePiece.style.backgroundImage = `url(/assets/v3/${currentImage})`;
        puzzlePiece.style.backgroundPosition = `-${pieceX}px -${pieceY}px`;
        puzzlePiece.style.backgroundSize = `${puzzleImage.width}px ${puzzleImage.height}px`;
        puzzlePiece.style.display = 'block';
        puzzlePiece.style.zIndex = '1000'; // 确保拼图块在最上层

        // 移除旧的拼图洞
        const oldPuzzleHole = document.getElementById('puzzle-hole');
        if (oldPuzzleHole) {
            oldPuzzleHole.remove();
        }

        const puzzleHole = document.createElement('div');
        puzzleHole.id = 'puzzle-hole';
        puzzleHole.style.left = `${pieceX}px`;
        puzzleHole.style.top = `${pieceY}px`;
        puzzleHole.style.display = 'block';
        puzzleHole.style.zIndex = '999'; // 确保拼图洞在拼图块下面
        document.getElementById('puzzle-container').appendChild(puzzleHole);

        piecePosition = pieceX;
        sliderCaptcha.style.display = 'block';
        resetSlider();

        // 确保所有元素都正确显示
        setTimeout(() => {
            puzzlePiece.style.display = 'block';
            puzzleHole.style.display = 'block';
            sliderCaptcha.style.opacity = '1';
        }, 100);
    };
}

    function startDragging(e) {
        e.preventDefault();
        isDragging = true;
        startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
        startLeft = sliderHandle.offsetLeft;
        startTime = Date.now();
        movements = [];
    }

    function drag(e) {
    if (!isDragging) return;
    e.preventDefault();

    const currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    let newLeft = startLeft + currentX - startX;
    newLeft = Math.max(0, Math.min(newLeft, 260));

    requestAnimationFrame(() => {
        sliderHandle.style.left = `${newLeft}px`;
        sliderTrack.style.width = `${newLeft}px`;
        puzzlePiece.style.left = `${newLeft}px`;
    });

    movements.push({
        x: newLeft,
        time: Date.now() - startTime
    });
}


    function stopDragging() {
        if (!isDragging) return;
        isDragging = false;
    
        const finalPosition = sliderHandle.offsetLeft;
        if (Math.abs(finalPosition - piecePosition) < 5) {
            if (isHumanLikeMovement()) {
                showSuccessMessage();
                Callback();
                sliderCaptcha.style.display = 'none';
                // submitButton.disabled = false;
                document.addEventListener('visibilitychange', handleVisibilityChange);
            } else {
                document.getElementById('error-message').style.display = 'block';
                changeImageAndPosition();
            }
        } else {
            document.getElementById('error-message').style.display = 'block';
            changeImageAndPosition();
        }
    }

    function showSuccessMessage() {
        const spinner = document.getElementById('loading-spinner');
        const checkMark = document.getElementById('check-mark');
        spinner.style.opacity = '0'; // Fade out the spinner
        document.getElementById('captcha-label').style.display = 'none';
        document.getElementById('success-message').textContent = translations[detectLanguage()].successMessage;
        document.getElementById('success-message').style.display = 'inline-block';
    
        setTimeout(() => {
            spinner.style.display = 'none'; // Hide the spinner
            checkMark.style.display = 'inline-block'; // Show the check mark
            setTimeout(() => {
                checkMark.style.opacity = '1'; // Fade in the check mark
                checkMark.style.transform = 'scale(1)'; // Scale up the check mark
            }, 50);  
        }, 300);
    }

    function resetSlider() {
        sliderHandle.style.left = '0';
        sliderTrack.style.width = '0';
        puzzlePiece.style.left = '0';
    }

    function isHumanLikeMovement() {
    if (movements.length < 5) return false;

    const speeds = [];
    let prevSpeed = null;
    
    // 计算每次移动的速度
    for (let i = 1; i < movements.length; i++) {
        const dx = movements[i].x - movements[i-1].x;
        const dt = movements[i].time - movements[i-1].time;
        if (dt <= 0) continue; // 忽略无效的时间间隔
        const speed = Math.abs(dx / dt);
        speeds.push(speed);
    }

    // 如果速度计算不到
    if (speeds.length < 2) return false;

    // 计算速度的平均值和标准差
    const meanSpeed = speeds.reduce((sum, s) => sum + s, 0) / speeds.length;
    const variance = speeds.reduce((sum, s) => sum + Math.pow(s - meanSpeed, 2), 0) / speeds.length;
    const stdDeviation = Math.sqrt(variance);

    // 定义标准差阈值
    const stdDeviationThreshold = 0.2; // 可调整

    // 如果标准差超过阈值，则认为运动不自然
    if (stdDeviation > stdDeviationThreshold) {
        return true;
    }

    // 计算速度的加速度
    let prevAcceleration = null;
    for (let i = 1; i < speeds.length; i++) {
        const acceleration = speeds[i] - speeds[i-1];
        if (prevAcceleration !== null) {
            if (Math.abs(acceleration - prevAcceleration) > 0.2) { // 可调整
                return true;
            }
        }
        prevAcceleration = acceleration;
    }

    return isUneven;
}
    function changeImageAndPosition() {
        const puzzleHole = document.getElementById('puzzle-hole');
        if (puzzleHole) {
            puzzleHole.remove();
        }
        showSliderCaptcha();
    }

    retryButton.addEventListener('click', function() {
        changeImageAndPosition();
    });

    sliderHandle.addEventListener('mousedown', startDragging);
    sliderHandle.addEventListener('touchstart', startDragging);

    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);

    document.addEventListener('mouseup', stopDragging);
    document.addEventListener('touchend', stopDragging);

    function handleVisibilityChange() {
        if (document.visibilityState === 'hidden') {
            leaveTimer = setTimeout(() => {
                resetCaptcha();
            }, 15000);
        } else {
            clearTimeout(leaveTimer);
        }
    }

    function resetCaptcha() {
        verifyCheckbox.checked = false;
        verifyCheckbox.style.display = 'inline-block';
        document.getElementById('captcha-label').style.display = 'inline-block';
        document.getElementById('check-mark').style.display = 'none';
        document.getElementById('success-message').style.display = 'none';
        submitButton.disabled = true;
        sliderCaptcha.style.display = 'none';
        resetSlider();
        changeImageAndPosition();
        document.removeEventListener('visibilitychange', handleVisibilityChange);
    }

    function generateToken() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 150; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
}

function setCookie(name, value, seconds) {
    let expires = "";
    if (seconds) {
        const date = new Date();
        date.setTime(date.getTime() + (seconds * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function Callback() {
    const token = generateToken();
    var captchaElement = document.getElementById('one-captcha');
    var callbackFunctionName = captchaElement.getAttribute('data-callback');

    setTimeout(() => {
        if (typeof window[callbackFunctionName] === 'function') {
            window[callbackFunctionName](token);
        } else {
            console.error("Callback function not found.");
        }
    }, 500);

    setCookie('OneCaptchaToken', token, 15);
}

    applyTranslations(detectLanguage());
};

document.addEventListener('DOMContentLoaded', function() {
    captcha();
});
