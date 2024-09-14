document.addEventListener('DOMContentLoaded', function() {
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
        #verify-checkbox:checked {
            background-color: #fff;
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
    `;

    const captchaHTML = `
    <div id="captcha-container">
        <div id="verify-section">
            <input type="checkbox" id="verify-checkbox">
            <label for="verify-checkbox" class="custom-checkbox"></label>
            <div id="loading-spinner"></div>
            <img id="check-mark" src="assets/check-mark.svg" alt="Check Mark" style="display: none;">
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

    const style = document.createElement('style');
  style.innerHTML = css;
  document.head.appendChild(style);

    document.getElementById('one-captcha').innerHTML = captchaHTML

})();
}
