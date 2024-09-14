(function() {
    const css = `
        #captcha-container {
            width: 260px;
            height: 40px;
            border: 1px solid #ccc;
            padding: 20px;
            margin: 50px 0;
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
        #verify-checkbox:checked::before {
            transform: translate(-50%, -50%) scale(1.2);
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
    `;

    const template = `
        <div id="captcha-container">
            <div id="verify-section">
                <input type="checkbox" id="verify-checkbox">
                <label for="verify-checkbox" class="custom-checkbox"></label>
                <img id="check-mark" src="assets/check-mark.svg" alt="Check Mark" style="display: none;">
                <label for="verify-checkbox" id="captcha-label">I'm not a robot.</label>
                <span id="success-message" style="display: none;">Success</span>
            </div>
            <div id="brand">
                <a href="https://github.com/Dev-Huang1/One-Captcha"><img src="https://captcha.xyehr.cn/assets/logo/logo.svg" alt="One Captcha Logo"></a>
                One Captcha
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
        </div>
        <button id="submit-button" disabled>Submit</button>
    `;

    // Inject the template and styles into the page
    function injectStyles() {
        const style = document.createElement('style');
        style.innerHTML = css;
        document.head.appendChild(style);
    }

    function injectTemplate() {
        const captchaDiv = document.getElementById('one-captcha');
        if (captchaDiv) {
            captchaDiv.innerHTML = template;
            initializeCaptcha(captchaDiv.dataset.callback);
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        injectStyles();
        injectTemplate();
    });

    function initializeCaptcha(callback) {
        const verifyCheckbox = document.getElementById('verify-checkbox');
        const sliderCaptcha = document.getElementById('slider-captcha');
        const sliderHandle = document.getElementById('slider-handle');
        const sliderTrack = document.getElementById('slider-track');
        const submitButton = document.getElementById('submit-button');
        let isDragging = false;
        let startX;
        let startLeft;

        verifyCheckbox.addEventListener('change', function() {
            if (this.checked) {
                showSliderCaptcha();
            }
        });

        sliderHandle.addEventListener('mousedown', startDragging);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDragging);

        function startDragging(e) {
            isDragging = true;
            startX = e.clientX;
            startLeft = sliderHandle.offsetLeft;
        }

        function drag(e) {
            if (!isDragging) return;
            const currentX = e.clientX;
            let newLeft = startLeft + currentX - startX;
            newLeft = Math.max(0, Math.min(newLeft, 260));
            sliderHandle.style.left = `${newLeft}px`;
            sliderTrack.style.width = `${newLeft}px`;
        }

        function stopDragging() {
            if (!isDragging) return;
            isDragging = false;
            if (typeof window[callback] === 'function') {
                window[callback]();
            }
        }

        function showSliderCaptcha() {
            sliderCaptcha.style.display = 'block';
        }
    }
})();
