(function(global) {
    function ONECaptcha() {
        const captchaContainer = document.createElement('div');
        captchaContainer.id = 'captcha-container';
        captchaContainer.innerHTML = `

        `;

        document.getElementById('one-captcha').appendChild(captchaContainer);

    global.addEventListener('DOMContentLoaded', () => {
        ONECaptcha();
    });
})(window);
