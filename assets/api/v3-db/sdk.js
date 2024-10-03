function captcha() {
    fetch('https://onecaptcha.us.kg/assets/api/v3-db/template.html')
  .then(response => response.text())
  .then(html => {
    document.getElementById('one-captcha').innerHTML = html; 
  }
    
    const verifyCheckbox = document.getElementById('verify-checkbox');
    const sliderCaptcha = document.getElementById('slider-captcha');
    const puzzleImage = document.getElementById('puzzle-image');
    const puzzlePiece = document.getElementById('puzzle-piece');
    const sliderHandle = document.getElementById('slider-handle');
    const sliderTrack = document.getElementById('slider-track');
    const retryButton = document.getElementById('retry-button');
    const successMessage = document.getElementById('success-message');
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
            //retryButton: "Retry",
            privacyLink: "Privacy",
            docsLink: "Docs",
            successMessage: "Success",
            errorMessage: "Verification failed. Please try again.",
            //rateLimitWarning: 'You are abusing our service. Please try again later.',
        },
        zh: {
            captchaLabel: "我不是机器人",
            verifyingText: "验证中...",
            //retryButton: "重试",
            privacyLink: "隐私",
            docsLink: "文档",
            successMessage: "验证成功",
            errorMessage: "验证失败，请重试",
            //rateLimitWarning: '检测到您正在滥用我们的服务，请稍候再试。',
        },
        es: {
        captchaLabel: "No soy un robot",
        verifyingText: "Verificando...",
        //retryButton: "Reintentar",
        privacyLink: "Privacidad",
        docsLink: "Docs",
        successMessage: "Éxito",
        errorMessage: "La verificación falló. Por favor, inténtelo de nuevo.",
    },
    fr: { 
        captchaLabel: "Je suis humain",
        verifyingText: "Vérification...",
        //retryButton: "Réessayer",
        privacyLink: "La vie privée",
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
        //document.getElementById('retry-button').textContent = translations[language].retryButton;
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
                /* checkIPRateLimit().then(isAllowed => {
                    if (!isAllowed) {
                        this.checked = false;
                        showRateLimitWarning();
                        return;
                    } */
                    sliderCaptcha.style.opacity = '0';
                    sliderCaptcha.style.display = 'block';
                    showSliderCaptcha();
                });
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
        puzzlePiece.style.backgroundImage = `url(https://onecaptcha.us.kg/assets/v3/${currentImage})`;
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
            spinner.style.display = 'none';
            checkMark.style.display = 'inline-block';
            setTimeout(() => {
                checkMark.style.opacity = '1';
                checkMark.style.transform = 'scale(1)';
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
        sliderCaptcha.style.display = 'none';
        resetSlider();
        // changeImageAndPosition();
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

function setCookie(name, value, seconds) {
    let expires = "";
    if (seconds) {
        const date = new Date();
        date.setTime(date.getTime() + (seconds * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/;";
}

async function Callback() {
    const token = generateToken();
    const hashedToken = await hashToken(token); // 先对token进行哈希
    var captchaElement = document.getElementById('one-captcha');
    var callbackFunctionName = captchaElement.getAttribute('data-callback');

    setTimeout(() => {
        if (typeof window[callbackFunctionName] === 'function') {
            window[callbackFunctionName](token); // 直接传递原始token
        } else {
            console.error("Callback function not found.");
        }
    }, 500);

    setCookie('OneCaptchaToken', hashedToken, 150); // 存储哈希值到cookie
}

    
    applyTranslations(detectLanguage());
};

document.addEventListener('DOMContentLoaded', function() {
    captcha();
});
