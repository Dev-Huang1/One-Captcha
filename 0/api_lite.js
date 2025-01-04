document.addEventListener("DOMContentLoaded",function(){!function e(){document.getElementById("one-captcha").innerHTML=`
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
                <a href="https://docs.xyehr.cn/docs/one-captcha/more/privacy" id="privacy-link">Privacy</a><p>\xb7</p><a href="https://docs.xyehr.cn/docs/one-captcha" id="docs-link">Docs</a>
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
    `;let t=document.getElementById("verify-checkbox"),i=document.getElementById("slider-captcha"),a=document.getElementById("puzzle-image"),r=document.getElementById("puzzle-piece"),s=document.getElementById("slider-handle"),n=document.getElementById("slider-track"),o=document.getElementById("retry-button");document.getElementById("success-message"),document.getElementById("error-message"),document.getElementById("slider-captcha-header-text"),document.getElementById("slider-captcha-header-subtext");let l=["image1.jpeg","image2.jpeg","image3.jpg","img018.png","img072.jpg","img102.jpeg","img181.jpeg","img193.jpeg","img273.jpeg","img372.jpeg","img392.jpeg","img398.jpeg","img462.jpg","img482.jpeg","img492.jpeg","img592.jpg","img638.jpg","img639.jpeg","img639.jpg","img648.jpg","img657.jpeg","img857.jpeg","img928.jpeg"],c,d,p=!1,g,h,y=[],$,f,u={en:{captchaLabel:"I'm not a robot",verifyingText:"Verifying...",privacyLink:"Privacy",docsLink:"Docs",successMessage:"Success",errorMessage:"Verification failed. Please try again.",headerText:"Please complete CAPTCHA",smallHeaderText:"If an error occurs, click the Retry button"},zh:{captchaLabel:"我不是机器人",verifyingText:"验证中...",privacyLink:"隐私",docsLink:"文档",successMessage:"验证成功",errorMessage:"验证失败，请重试",headerText:"请完成 CAPTCHA",smallHeaderText:"如果出现错误，请点按重试按钮"},"zh-hant":{captchaLabel:"我不是機器人",verifyingText:"驗證中...",privacyLink:"隱私",docsLink:"文件",successMessage:"驗證成功",errorMessage:"驗證失敗，請重試",headerText:"請完成 CAPTCHA",smallHeaderText:"如果出現錯誤，請點按重試按鈕"},es:{captchaLabel:"No soy un robot",verifyingText:"Verificando...",privacyLink:"Privacidad",docsLink:"Docs",successMessage:"\xc9xito",errorMessage:"La verificaci\xf3n fall\xf3. Por favor, int\xe9ntelo de nuevo.",headerText:"Por favor complete el CAPTCHA",smallHeaderText:"Si se produce un error, haga clic en el bot\xf3n Reintentar"},fr:{captchaLabel:"Je suis humain",verifyingText:"V\xe9rification...",privacyLink:"La vie priv\xe9e",docsLink:"Docs",successMessage:"Succ\xe8s",errorMessage:"\xc9chec de la v\xe9rification. Veuillez r\xe9essayer.",headerText:"Veuillez compl\xe9ter le CAPTCHA",smallHeaderText:"Si une erreur se produit, cliquez sur le bouton R\xe9essayer"},de:{captchaLabel:"ich bin ein Mensch",verifyingText:"\xdcberpr\xfcfen...",privacyLink:"Privat",docsLink:"Doku",successMessage:"Erfolg",errorMessage:"\xdcberpr\xfcfung fehlgeschlagen. Bitte erneut versuchen.",headerText:"Bitte f\xfcllen Sie das CAPTCHA aus",smallHeaderText:"Wenn ein Fehler auftritt, klicken Sie auf die Schaltfl\xe4che „Wiederholen“"},ja:{captchaLabel:"私は人間です",verifyingText:"検証中…",privacyLink:"プライバシー",docsLink:"書類",successMessage:"検証成功",errorMessage:"検証失敗。再度お試しください。",headerText:"CAPTCHA を完了してください。",smallHeaderText:"エラーが発生した場合は、「再試行」ボタンをクリックしてください"},kr:{captchaLabel:"나는 인간이다",verifyingText:"확인 중...",privacyLink:"은둔",docsLink:"문서",successMessage:"확인 성공",errorMessage:"확인에 실패했습니다. 다시 시도해 주세요.",headerText:"보안 문자를 작성해 주세요",smallHeaderText:"오류가 발생하면 재시도 버튼을 클릭하세요"},ru:{captchaLabel:"Я не робот",verifyingText:"Проверка...",privacyLink:"Конф",docsLink:"Документ",successMessage:"Проверка OK",errorMessage:"Проверка не прошла, повторите",headerText:"Пожалуйста, заполните CAPTCHA",smallHeaderText:"В случае возникновения ошибки нажмите кнопку \xabПовторить\xbb."}},m=document.getElementById("one-captcha"),x=m.getAttribute("data-lang");function b(){if(x)return x;let e=navigator.language||navigator.userLanguage;if(e.startsWith("zh"))return"zh";if(e.startsWith("zh-hk"))return"zh-hant";if(e.startsWith("zh-mo"))return"zh-hant";if(e.startsWith("zh-tw"))return"zh-hant";if(e.startsWith("es"))return"es";else if(e.startsWith("fr"))return"fr";else if(e.startsWith("de"))return"de";else if(e.startsWith("ja"))return"ja";else if(e.startsWith("kr"))return"kr";else if(e.startsWith("ru"))return"ru";else return e.includes("zh")?"zh":"en"}function v(){c=l[Math.floor(Math.random()*l.length)],a.src=`https://onecaptcha.us.kg/assets/v3/${c}`,a.onload=()=>{let e=a.width-50,t=a.height-50,s=Math.floor(Math.random()*(e-50)+50),n=Math.floor(Math.random()*t);r.style.left="0px",r.style.top=`${n}px`,r.style.backgroundImage=`url(https://onecaptcha.us.kg/assets/v3/${c})`,r.style.backgroundPosition=`-${s}px -${n}px`,r.style.backgroundSize=`${a.width}px ${a.height}px`,r.style.display="block",r.style.zIndex="1000";let o=document.getElementById("puzzle-hole");o&&o.remove();let l=document.createElement("div");l.id="puzzle-hole",l.style.left=`${s}px`,l.style.top=`${n}px`,l.style.display="block",document.getElementById("puzzle-container").appendChild(l),d=s,E(),i.style.transition="opacity 0.4s ease",i.style.opacity="1"},i.style.opacity="0",i.style.display="block"}function k(e){e.preventDefault(),p=!0,g="mousedown"===e.type?e.clientX:e.touches[0].clientX,h=s.offsetLeft,$=Date.now(),y=[]}function _(e){if(!p)return;e.preventDefault();let t="mousemove"===e.type?e.clientX:e.touches[0].clientX,i=h+t-g;i=Math.max(0,Math.min(i,260)),requestAnimationFrame(()=>{s.style.left=`${i}px`,n.style.width=`${i}px`,r.style.left=`${i}px`}),y.push({x:i,time:Date.now()-$})}function w(){if(!p)return;p=!1;let e=s.offsetLeft;5>Math.abs(e-d)&&function e(){if(y.length<5)return!1;let t=[];for(let i=1;i<y.length;i++){let a=y[i].x-y[i-1].x,r=y[i].time-y[i-1].time;if(r<=0)continue;let s=Math.abs(a/r);t.push(s)}if(t.length<2)return!1;let n=t.reduce((e,t)=>e+t,0)/t.length,o=t.reduce((e,t)=>e+Math.pow(t-n,2),0)/t.length;if(Math.sqrt(o)>.2)return!0;let l=null;for(let c=1;c<t.length;c++){let d=t[c]-t[c-1];if(null!==l&&Math.abs(d-l)>.2)return!0;l=d}return isUneven}()?(function e(){let a=document.getElementById("loading-spinner"),r=document.getElementById("check-mark");a.style.opacity="0",document.getElementById("captcha-label").style.display="none",document.getElementById("success-message").textContent=u[b()].successMessage,document.getElementById("success-message").style.display="inline-block",setTimeout(()=>{a.style.display="none",r.style.display="inline-block",setTimeout(()=>{r.style.opacity="1",r.style.transform="scale(1)"},50)},300),i.style.transition="opacity 0.4s ease",i.style.opacity="0",setTimeout(()=>{i.style.display="none"},400),t.style.display="none",document.addEventListener("visibilitychange",L)}(),A(),document.addEventListener("visibilitychange",L)):(document.getElementById("error-message").style.display="block",z())}function E(){s.style.left="0",n.style.width="0",r.style.left="0"}function z(){let e=document.getElementById("puzzle-hole");e&&e.remove(),v()}function L(){"hidden"===document.visibilityState?f=setTimeout(()=>{t.checked=!1,t.style.display="inline-block",t.style.opacity="1",t.style.transform="scale(1)",document.getElementById("captcha-label").style.display="inline-block",document.getElementById("check-mark").style.display="none",document.getElementById("success-message").style.display="none",i.style.opacity="0",i.style.display="none",E(),document.removeEventListener("visibilitychange",L)},15e3):clearTimeout(f)}if(t.addEventListener("change",()=>{t.checked&&(t.style.transition="transform 0.3s ease, opacity 0.3s ease",t.style.transform="scale(0)",t.style.opacity="0",setTimeout(()=>{t.style.display="none";let e=document.getElementById("loading-spinner");e.style.display="inline-block",e.style.opacity="1",v()},300))}),document.addEventListener("click",function(e){i.contains(e.target)||e.target===t||(i.style.transition="opacity 0.4s ease",i.style.opacity="0",setTimeout(()=>{i.style.display="none",t.style.display="inline-block",t.style.opacity="1",t.style.transform="scale(1)"},400))}),o.addEventListener("click",function(){z()}),s.addEventListener("mousedown",k),s.addEventListener("touchstart",k),document.addEventListener("mousemove",_),document.addEventListener("touchmove",_),document.addEventListener("mouseup",w),document.addEventListener("touchend",w),function e(){let t=navigator.userAgent.toLowerCase(),i=/msie|trident|edge\/(1|12)/.test(t);return!("fetch"in window&&"Promise"in window&&"assign"in Object&&"includes"in Array.prototype)||i}()){var C,m=document.getElementById("one-captcha"),B=m.getAttribute("data-unsupport-callback");"function"==typeof window[B]&&window[B]()}let T=null;async function I(e){let t=new TextEncoder,i=t.encode(e),a=await crypto.subtle.digest("SHA-512",i),r=Array.from(new Uint8Array(a)),s=r.map(e=>e.toString(16).padStart(2,"0")).join("");return s}async function A(){let e=function e(){let t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",i="";for(let a=0;a<150;a++)i+=t.charAt(Math.floor(Math.random()*t.length));return i}(),t=await I(e);var i=document.getElementById("one-captcha"),a=i.getAttribute("data-callback"),r=i.getAttribute("data-time");setTimeout(()=>{"function"==typeof window[a]?window[a](e):console.error("Callback function not found.")},500),function e(t,i,a){let r="";if(a){let s=new Date;s.setTime(s.getTime()+a),r="; expires="+s.toUTCString()}document.cookie=t+"="+(i||"")+r+"; path=/;"}("OneCaptchaToken",t,r)}setInterval(function e(){fetch("https://onecaptcha.us.kg/0/api.js",{method:"HEAD"}).then(()=>{var e;!0!==T&&(e=document.getElementById("one-captcha").getAttribute("error-recovery-callback"),"function"==typeof window[e]?window[e]():console.error("Error Recovery Callback function not found."),T=!0)}).catch(()=>{var e;!1!==T&&(e=document.getElementById("one-captcha").getAttribute("error-callback"),"function"==typeof window[e]?window[e]():console.error("Error Callback function not found."),T=!1)})},200),C=b(),document.getElementById("captcha-label").textContent=u[C].captchaLabel,document.getElementById("privacy-link").textContent=u[C].privacyLink,document.getElementById("docs-link").textContent=u[C].docsLink,document.getElementById("error-message").textContent=u[C].errorMessage,document.getElementById("slider-captcha-header-text").textContent=u[C].headerText,document.getElementById("slider-captcha-header-subtext").textContent=u[C].smallHeaderText}()});
