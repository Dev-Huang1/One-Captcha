(function() {
function OneCaptchaInit() {
    document.getElementById('one-captcha').innerHTML = `
        <style>
        #captcha-container {
            all: unset;
            width: 260px;
            height: 40px;
            border: 1px solid #ccc;
            padding: 20px;
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
            max-width: 125px;
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
        width: 285px;
        background-color: #fff;
        border: 1px solid #ccc;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        overflow: hidden;
        padding: 15px;
        font-family: Arial, sans-serif;
        transition: opacity 0.4s ease;
    }
    #slider-captcha-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
        padding-top: 10px;
        border-top: 1px solid #e0e0e0;
    }

    #slider-captcha-header {
    height: 65px;
    background-color: #0066ff;
    color: #fff;
    padding: 15px;
    border-radius: 4px;
    margin-bottom: 17px;
}

    #slider-captcha-header-subtext {
        font-size: 13px;
    }

    #slider-captcha-actions a {
        text-decoration: none;
        display: inline-block;
    }

    #powered-by {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #888;
    }

    #powered-by img {
        width: 16px;
        height: 16px;
        margin-right: 5px;
    }

    #slider-captcha-actions {
        display: flex;
        align-items: center;
    }

    #slider-captcha-actions img {
        width: 16px;
        height: 16px;
        margin-left: 10px;
        cursor: pointer;
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
            border-radius: 4px;
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
            background-color: rgba(0, 0, 0, 0.6);
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.8) inset;
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

        #slider-captcha-footer {
            border-top-color: #444;
        }

        #powered-by {
            color: #aaa;
        }
        
            #slider {
                background-color: #444;
            }
        
            #slider-handle {
                background-color: #0066ff;
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

            #loading-spinner {
                border: 3px solid #4B4B4B;
                border-top: 3px solid #0066ff;
            }
         }
    </style>
    <div id="captcha-container">
        <noscript>Please enable JavaScript to use our features</noscript>
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
            <a href="https://github.com/Dev-Huang1/One-Captcha"><img src="https://onecaptcha.us.kg/assets/logo/logo.svg" alt="One Captcha Logo"></a>
            One Captcha
            <div class="privacy-terms-links">
                <a href="https://docs.xyehr.cn/docs/one-captcha/more/privacy" id="privacy-link">Privacy</a><p>·</p><a href="https://docs.xyehr.cn/docs/one-captcha" id="docs-link">Docs</a>
            </div>
        </div>
    </div>

    <div id="slider-captcha">
    <div id="slider-captcha-header">
        <span id="slider-captcha-header-text" style="font-weight: bold; display: inline-block;">
            Please complete CAPTCHA
        </span>
        </br>
        <span id="slider-captcha-header-subtext" style="font-size: 10px;">
            If an error occurs, click the Retry button
        </span>
    </div>
    <div id="puzzle-container">
        <img id="puzzle-image" src="" alt="img">
        <div id="puzzle-piece"></div>
    </div>
    <p id="error-message" style="color: red; display: none;">Verification failed. Please try again.</p>
    <div id="slider">
        <div id="slider-track"></div>
        <div id="slider-handle">→</div>
    </div>
    <div id="slider-captcha-footer">
        <div id="powered-by">
            <img src="https://onecaptcha.us.kg/assets/logo/logo.svg" alt="One Captcha Logo">
            One Captcha
        </div>
        <div id="slider-captcha-actions">
            <a href="https://onecaptcha.us.kg/"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23888888'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z'/%3E%3C/svg%3E" alt="About"></a>
            <a><img id="retry-button" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23888888'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z'/%3E%3C/svg%3E" alt="Refresh"></a>
        </div>
    </div>
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
    const errorMessage = document.getElementById('error-message');
    const headerText = document.getElementById('slider-captcha-header-text');
    const smallHeaderText = document.getElementById('slider-captcha-header-subtext');

    const images = ['image1.jpeg', 'image2.jpeg', 'image3.jpg', 'img018.png', 'img072.jpg', 'img102.jpeg', 'img181.jpeg', 'img193.jpeg', 'img273.jpeg', 'img372.jpeg', 'img392.jpeg', 'img398.jpeg', 'img462.jpg', 'img482.jpeg', 'img492.jpeg', 'img592.jpg', 'img638.jpg', 'img639.jpeg', 'img639.jpg', 'img648.jpg', 'img657.jpeg', 'img857.jpeg', 'img928.jpeg'];
    let currentImage;
    let piecePosition;
    let isDragging = false;
    let startX;
    let startLeft;
    let movements = [];
    let startTime;
    let leaveTimer;

    fetch('./translation.json')
    .then(response => response.json())


    /*const translations = {
        en: {
            captchaLabel: "I'm not a robot",
            verifyingText: "Verifying...",
            privacyLink: "Privacy",
            docsLink: "Docs",
            successMessage: "Success",
            errorMessage: "Verification failed. Please try again.",
            headerText: "Please complete CAPTCHA",
            smallHeaderText: "If an error occurs, click the Retry button",
        },
        zh: {
            captchaLabel: "我不是机器人",
            verifyingText: "验证中...",
            privacyLink: "隐私",
            docsLink: "文档",
            successMessage: "验证成功",
            errorMessage: "验证失败，请重试",
            headerText: "请完成 CAPTCHA",
            smallHeaderText: "如果出现错误，请点按重试按钮",
        },
        "zh-hant": {
            captchaLabel: "我不是機器人",
            verifyingText: "驗證中...",
            privacyLink: "隱私",
            docsLink: "文件",
            successMessage: "驗證成功",
            errorMessage: "驗證失敗，請重試",
            headerText: "請完成 CAPTCHA",
            smallHeaderText: "如果出現錯誤，請點按重試按鈕",
        },
        es: {
        captchaLabel: "No soy un robot",
        verifyingText: "Verificando...",
        privacyLink: "Privacidad",
        docsLink: "Docs",
        successMessage: "Éxito",
        errorMessage: "La verificación falló. Por favor, inténtelo de nuevo.",
        headerText: "Por favor complete el CAPTCHA",
        smallHeaderText: "Si se produce un error, haga clic en el botón Reintentar"
    },
    fr: { 
        captchaLabel: "Je suis humain",
        verifyingText: "Vérification...",
        privacyLink: "La vie privée",
        docsLink: "Docs",
        successMessage: "Succès",
        errorMessage: "Échec de la vérification. Veuillez réessayer.",
        headerText: "Veuillez compléter le CAPTCHA",
        smallHeaderText: "Si une erreur se produit, cliquez sur le bouton Réessayer"
    },
        de: {
            captchaLabel: "ich bin ein Mensch",
            verifyingText: "Überprüfen...",
            privacyLink: "Privat",
            docsLink: "Doku",
            successMessage: "Erfolg",
            errorMessage: "Überprüfung fehlgeschlagen. Bitte erneut versuchen.",
            headerText: "Bitte füllen Sie das CAPTCHA aus",
            smallHeaderText: "Wenn ein Fehler auftritt, klicken Sie auf die Schaltfläche „Wiederholen“",
        },
        ja: {
            captchaLabel: "私は人間です",
            verifyingText: "検証中…",
            privacyLink: "プライバシー",
            docsLink: "書類",
            successMessage: "検証成功",
            errorMessage: "検証失敗。再度お試しください。",
            headerText: "CAPTCHA を完了してください。",
            smallHeaderText: "エラーが発生した場合は、「再試行」ボタンをクリックしてください",
        },
        kr: {
            captchaLabel: "나는 인간이다",
            verifyingText: "확인 중...",
            privacyLink: "은둔",
            docsLink: "문서",
            successMessage: "확인 성공",
            errorMessage: "확인에 실패했습니다. 다시 시도해 주세요.",
            headerText: "보안 문자를 작성해 주세요",
            smallHeaderText: "오류가 발생하면 재시도 버튼을 클릭하세요",
        },
    };*/

    const captchaElement = document.getElementById('one-captcha');
    const dataLang = captchaElement.getAttribute('data-lang');

    function detectLanguage() {
        if (dataLang) {
            return dataLang;
        }
        const userLang = navigator.language || navigator.userLanguage;
        if (userLang.startsWith('zh')) return 'zh';
        else if (userLang.startsWith('zh-hk')) return 'zh-hant';
        else if (userLang.startsWith('zh-mo')) return 'zh-hant';
        else if (userLang.startsWith('zh-tw')) return 'zh-hant';
        else if (userLang.startsWith('es')) return 'es';
        else if (userLang.startsWith('fr')) return 'fr';
        else if (userLang.startsWith('de')) return 'de';
        else if (userLang.startsWith('ja')) return 'ja';
        else if (userLang.startsWith('kr')) return 'kr';
        else return userLang.includes('zh') ? 'zh' : 'en';
    }

    function applyTranslations(language) {
        document.getElementById('captcha-label').textContent = translations[language].captchaLabel;
        //document.getElementById('retry-button').textContent = translations[language].retryButton;
        document.getElementById('privacy-link').textContent = translations[language].privacyLink;
        document.getElementById('docs-link').textContent = translations[language].docsLink;
        document.getElementById('error-message').textContent = translations[language].errorMessage;
        document.getElementById('slider-captcha-header-text').textContent = translations[language].headerText;
        document.getElementById('slider-captcha-header-text2').textContent = translations[language].smallHeaderText;
    }

    verifyCheckbox.addEventListener('change', () => {
    if (verifyCheckbox.checked) {
        verifyCheckbox.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
        verifyCheckbox.style.transform = 'scale(0)';
        verifyCheckbox.style.opacity = '0';

        setTimeout(() => {
            verifyCheckbox.style.display = 'none';
            const spinner = document.getElementById('loading-spinner');
            spinner.style.display = 'inline-block';
            spinner.style.opacity = '1';

            showSliderCaptcha();
        }, 300);
    }
});

        document.addEventListener('click', function(event) {
    if (!sliderCaptcha.contains(event.target) && event.target !== verifyCheckbox) {
        sliderCaptcha.style.transition = 'opacity 0.4s ease';
        sliderCaptcha.style.opacity = '0';

        setTimeout(() => {
            sliderCaptcha.style.display = 'none';
            verifyCheckbox.style.display = 'inline-block';
            verifyCheckbox.style.opacity = '1';
            verifyCheckbox.style.transform = 'scale(1)';
        }, 400);
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

        puzzlePiece.style.left = '0px';
        puzzlePiece.style.top = `${pieceY}px`;
        puzzlePiece.style.backgroundImage = `url(https://onecaptcha.us.kg/assets/v3/${currentImage})`;
        puzzlePiece.style.backgroundPosition = `-${pieceX}px -${pieceY}px`;
        puzzlePiece.style.backgroundSize = `${puzzleImage.width}px ${puzzleImage.height}px`;
        puzzlePiece.style.display = 'block';
        puzzlePiece.style.zIndex = '1000';

        const oldPuzzleHole = document.getElementById('puzzle-hole');
        if (oldPuzzleHole) oldPuzzleHole.remove();

        const puzzleHole = document.createElement('div');
        puzzleHole.id = 'puzzle-hole';
        puzzleHole.style.left = `${pieceX}px`;
        puzzleHole.style.top = `${pieceY}px`;
        puzzleHole.style.display = 'block';
        document.getElementById('puzzle-container').appendChild(puzzleHole);

        piecePosition = pieceX;
        resetSlider();

        sliderCaptcha.style.transition = 'opacity 0.4s ease';
        sliderCaptcha.style.opacity = '1';
    };

    sliderCaptcha.style.opacity = '0';
    sliderCaptcha.style.display = 'block';
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
                OneCaptchaCallback();
                // sliderCaptcha.style.display = 'none';
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

    spinner.style.opacity = '0';
    document.getElementById('captcha-label').style.display = 'none';
    document.getElementById('success-message').textContent = translations[detectLanguage()].successMessage;
    document.getElementById('success-message').style.display = 'inline-block';

    setTimeout(() => {
        spinner.style.display = 'none';
        checkMark.style.display = 'inline-block';
        setTimeout(() => {
            checkMark.style.opacity = '1';
            checkMark.style.transform = 'scale(1)';
        }, 50);
    }, 300);

        sliderCaptcha.style.transition = 'opacity 0.4s ease';
        sliderCaptcha.style.opacity = '0'

        setTimeout(() => {
            sliderCaptcha.style.display = 'none';
        }, 400);

    verifyCheckbox.style.display = 'none';
    document.addEventListener('visibilitychange', handleVisibilityChange);
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

    const stdDeviationThreshold = 0.2;
        
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
    verifyCheckbox.style.opacity = '1';
    verifyCheckbox.style.transform = 'scale(1)';
    document.getElementById('captcha-label').style.display = 'inline-block';
    document.getElementById('check-mark').style.display = 'none';
    document.getElementById('success-message').style.display = 'none';
    sliderCaptcha.style.opacity = '0';
    sliderCaptcha.style.display = 'none';
    resetSlider();
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

async function hashToken(token) {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(token);
    const hashBuffer = await crypto.subtle.digest('SHA-512', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

function setCookie(name, value, milliseconds) {
    let expires = "";
    if (milliseconds) {
        const date = new Date();
        date.setTime(date.getTime() + milliseconds);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/;";
}


async function OneCaptchaCallback() {
    const token = generateToken();
    const hashedToken = await hashToken(token);
    var captchaElement = document.getElementById('one-captcha');
    var callbackFunctionName = captchaElement.getAttribute('data-callback');
    var dataTime = captchaElement.getAttribute('data-time');

    setTimeout(() => {
        if (typeof window[callbackFunctionName] === 'function') {
            window[callbackFunctionName](token);
        } else {
            console.error("Callback function not found.");
        }
    }, 500);

    setCookie('OneCaptchaToken', hashedToken, dataTime);
}

    applyTranslations(detectLanguage());
};

document.addEventListener('DOMContentLoaded', function() {
    // setTimeout(() => {
        OneCaptchaInit();
    // }, 887);
});
})();
