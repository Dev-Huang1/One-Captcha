(function() {
    const css = `

    `;

    const captchaHTML = `
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
