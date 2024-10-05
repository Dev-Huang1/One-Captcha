function OneCaptchaInit(){var e;document.getElementById("one-captcha").innerHTML=`
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
        width: 285px;
        background-color: #fff;
        border: 1px solid #ccc;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        overflow: hidden;
        padding: 15px;
        font-family: Arial, sans-serif;
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
                <a href="https://www.xyehr.cn/one-captcha-privacy-policy" id="privacy-link">Privacy</a><p>\xb7</p><a href="https://docs.xyehr.cn" id="docs-link">Docs</a>
            </div>
        </div>
    </div>

    <div id="slider-captcha">
    <div id="slider-captcha-header">
        <span id="slider-captcha-header-text" style="font-weight: bold; display: inline-block;">
            Please complete CAPTCHA
        </span>
        </br>
        <span id="slider-captcha-header-text2" style="font-size: 10px;">
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
            Powered by One Captcha
        </div>
        <div id="slider-captcha-actions">
            <a href="https://docs.xyehr.cn/"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23888888'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z'/%3E%3C/svg%3E" alt="About"></a>
            <a><img id="retry-button" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23888888'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z'/%3E%3C/svg%3E" alt="Refresh"></a>
        </div>
    </div>
</div>
    `;let t=document.getElementById("verify-checkbox"),i=document.getElementById("slider-captcha"),a=document.getElementById("puzzle-image"),n=document.getElementById("puzzle-piece"),r=document.getElementById("slider-handle"),s=document.getElementById("slider-track"),o=document.getElementById("retry-button");document.getElementById("success-message"),document.getElementById("error-message"),document.getElementById("slider-captcha-header-text"),document.getElementById("slider-captcha-header-text2");let l=["image1.jpeg","image2.jpeg","image3.jpg","img018.png","img072.jpg","img102.jpeg","img181.jpeg","img193.jpeg","img273.jpeg","img372.jpeg","img392.jpeg","img398.jpeg","img462.jpg","img482.jpeg","img492.jpeg","img592.jpg","img638.jpg","img639.jpeg","img639.jpg","img648.jpg","img657.jpeg","img857.jpeg","img928.jpeg"],c,d,p=!1,g,h,$=[],y,m,f={en:{captchaLabel:"I'm not a robot",verifyingText:"Verifying...",privacyLink:"Privacy",docsLink:"Docs",successMessage:"Success",errorMessage:"Verification failed. Please try again.",headerText:"Please complete CAPTCHA",smallHeaderText:"If an error occurs, click the Retry button"},zh:{captchaLabel:"我不是机器人",verifyingText:"验证中...",privacyLink:"隐私",docsLink:"文档",successMessage:"验证成功",errorMessage:"验证失败，请重试",headerText:"请完成 CAPTCHA",smallHeaderText:"如果出现错误，请点按重试按钮"},es:{captchaLabel:"No soy un robot",verifyingText:"Verificando...",privacyLink:"Privacidad",docsLink:"Docs",successMessage:"\xc9xito",errorMessage:"La verificaci\xf3n fall\xf3. Por favor, int\xe9ntelo de nuevo.",headerText:"Por favor complete el CAPTCHA",smallHeaderText:"Si se produce un error, haga clic en el bot\xf3n Reintentar"},fr:{captchaLabel:"Je suis humain",verifyingText:"V\xe9rification...",privacyLink:"La vie priv\xe9e",docsLink:"Docs",successMessage:"Succ\xe8s",errorMessage:"\xc9chec de la v\xe9rification. Veuillez r\xe9essayer.",headerText:"Veuillez compl\xe9ter le CAPTCHA",smallHeaderText:"Si une erreur se produit, cliquez sur le bouton R\xe9essayer"}},u=document.getElementById("one-captcha"),x=u.getAttribute("data-lang");function b(){if(x)return x;let e=navigator.language||navigator.userLanguage;return e.startsWith("zh")?"zh":e.startsWith("es")?"es":e.startsWith("fr")?"fr":e.includes("zh")?"zh":"en"}function v(){c=l[Math.floor(Math.random()*l.length)],a.src=`https://onecaptcha.us.kg/assets/v3/${c}`,a.onload=()=>{let e=a.width-50,t=a.height-50,r=Math.floor(Math.random()*(e-50)+50),s=Math.floor(Math.random()*t);if(!document.getElementById("puzzle-piece")){let o=document.createElement("div");o.id="puzzle-piece",document.getElementById("puzzle-container").appendChild(o),n=o}n.style.left="0px",n.style.top=`${s}px`,n.style.backgroundImage=`url(https://onecaptcha.us.kg/assets/v3/${c})`,n.style.backgroundPosition=`-${r}px -${s}px`,n.style.backgroundSize=`${a.width}px ${a.height}px`,n.style.display="block",n.style.zIndex="1000";let l=document.getElementById("puzzle-hole");l&&l.remove();let p=document.createElement("div");p.id="puzzle-hole",p.style.left=`${r}px`,p.style.top=`${s}px`,p.style.display="block",p.style.zIndex="999",document.getElementById("puzzle-container").appendChild(p),d=r,i.style.display="block",z(),setTimeout(()=>{n.style.display="block",p.style.display="block",i.style.opacity="1"},100)}}function _(e){e.preventDefault(),p=!0,g="mousedown"===e.type?e.clientX:e.touches[0].clientX,h=r.offsetLeft,y=Date.now(),$=[]}function k(e){if(!p)return;e.preventDefault();let t="mousemove"===e.type?e.clientX:e.touches[0].clientX,i=h+t-g;i=Math.max(0,Math.min(i,260)),requestAnimationFrame(()=>{r.style.left=`${i}px`,s.style.width=`${i}px`,n.style.left=`${i}px`}),$.push({x:i,time:Date.now()-y})}function w(){if(!p)return;p=!1;let e=r.offsetLeft;5>Math.abs(e-d)&&function e(){if($.length<5)return!1;let t=[];for(let i=1;i<$.length;i++){let a=$[i].x-$[i-1].x,n=$[i].time-$[i-1].time;if(n<=0)continue;let r=Math.abs(a/n);t.push(r)}if(t.length<2)return!1;let s=t.reduce((e,t)=>e+t,0)/t.length,o=t.reduce((e,t)=>e+Math.pow(t-s,2),0)/t.length;if(Math.sqrt(o)>.2)return!0;let l=null;for(let c=1;c<t.length;c++){let d=t[c]-t[c-1];if(null!==l&&Math.abs(d-l)>.2)return!0;l=d}return isUneven}()?(function e(){let t=document.getElementById("loading-spinner"),i=document.getElementById("check-mark");t.style.opacity="0",document.getElementById("captcha-label").style.display="none",document.getElementById("success-message").textContent=f[b()].successMessage,document.getElementById("success-message").style.display="inline-block",setTimeout(()=>{t.style.display="none",i.style.display="inline-block",setTimeout(()=>{i.style.opacity="1",i.style.transform="scale(1)"},50)},300)}(),C(),i.style.display="none",document.addEventListener("visibilitychange",I)):(document.getElementById("error-message").style.display="block",E())}function z(){r.style.left="0",s.style.width="0",n.style.left="0"}function E(){let e=document.getElementById("puzzle-hole");e&&e.remove(),v()}function I(){"hidden"===document.visibilityState?m=setTimeout(()=>{t.checked=!1,t.style.display="inline-block",t.style.opacity="1",t.style.transform="scale(1)",document.getElementById("captcha-label").style.display="inline-block",document.getElementById("check-mark").style.display="none",document.getElementById("success-message").style.display="none",i.style.display="none",z(),document.removeEventListener("visibilitychange",I)},15e3):clearTimeout(m)}async function B(e){let t=new TextEncoder,i=t.encode(e),a=await crypto.subtle.digest("SHA-512",i),n=Array.from(new Uint8Array(a)),r=n.map(e=>e.toString(16).padStart(2,"0")).join("");return r}async function C(){let e=function e(){let t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",i="";for(let a=0;a<150;a++)i+=t.charAt(Math.floor(Math.random()*t.length));return i}(),t=await B(e);var i=document.getElementById("one-captcha").getAttribute("data-callback");setTimeout(()=>{"function"==typeof window[i]?window[i](e):console.error("Callback function not found.")},500),function e(t,i,a){let n="";if(a){let r=new Date;r.setTime(r.getTime()+1e3*a),n="; expires="+r.toUTCString()}document.cookie=t+"="+(i||"")+n+"; path=/;"}("OneCaptchaToken",t,150)}t.addEventListener("change",async function(){this.checked&&(this.style.transition="transform 0.3s ease, opacity 0.3s ease",this.style.transform="scale(0)",this.style.opacity="0",setTimeout(()=>{this.style.display="none";let e=document.getElementById("loading-spinner");e.style.display="inline-block",setTimeout(()=>{e.style.opacity="1",i.style.opacity="0",i.style.display="block",v()})},300))}),o.addEventListener("click",function(){E()}),r.addEventListener("mousedown",_),r.addEventListener("touchstart",_),document.addEventListener("mousemove",k),document.addEventListener("touchmove",k),document.addEventListener("mouseup",w),document.addEventListener("touchend",w),e=b(),document.getElementById("captcha-label").textContent=f[e].captchaLabel,document.getElementById("privacy-link").textContent=f[e].privacyLink,document.getElementById("docs-link").textContent=f[e].docsLink,document.getElementById("error-message").textContent=f[e].errorMessage,document.getElementById("slider-captcha-header-text").textContent=f[e].headerText,document.getElementById("slider-captcha-header-text2").textContent=f[e].smallHeaderText}document.addEventListener("DOMContentLoaded",function(){OneCaptchaInit()});
