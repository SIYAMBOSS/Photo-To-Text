const chatWindow = document.getElementById('chat-window');
const loader = document.getElementById('loader');

// User Auth Check
window.onload = () => {
    const savedGmail = localStorage.getItem('siyam_user_gmail');
    if (!savedGmail) {
        document.getElementById('auth-overlay').classList.remove('hidden');
    } else {
        document.getElementById('active-user').innerText = savedGmail;
    }
};

function saveIdentity() {
    const gmail = document.getElementById('user-gmail').value.trim();
    if (gmail.includes('@')) {
        localStorage.setItem('siyam_user_gmail', gmail);
        document.getElementById('auth-overlay').classList.add('hidden');
        document.getElementById('active-user').innerText = gmail;
    }
}

// Main Processing Logic
async function processImage() {
    const fileInput = document.getElementById('file-input');
    if (fileInput.files.length === 0) return;

    const file = fileInput.files[0];
    const imageUrl = URL.createObjectURL(file);

    appendMessage('user', `<img src="${imageUrl}" class="rounded-2xl max-w-sm border border-white/10 shadow-lg">`);
    loader.classList.remove('hidden');

    try {
        // OCR Engine Optimization
        const worker = await Tesseract.createWorker();
        await worker.loadLanguage('ben+eng');
        await worker.initialize('ben+eng');
        const { data: { text } } = await worker.recognize(file);
        await worker.terminate();

        const originalText = text.trim();
        if (!originalText) throw new Error("No Text Found");

        const isBangla = /[\u0980-\u09FF]/.test(originalText);
        const translatedText = await translate(originalText, isBangla ? 'bn' : 'en', isBangla ? 'en' : 'bn');

        // Cleaner Output: No Code Blocks, Just Text
        const responseHTML = `
            <div class="flex flex-col gap-6 w-full py-2">
                <div>
                    <p class="text-[9px] text-cyan-500 font-bold uppercase tracking-widest mb-2">Original Text</p>
                    <p class="text-[15px] leading-relaxed text-white/90">${originalText}</p>
                    <button onclick="copyContent(this)" class="mt-3 text-[10px] bg-white/5 px-4 py-2 rounded-full border border-white/10 uppercase font-bold tracking-tighter hover:bg-cyan-600 transition-all">Copy Original</button>
                </div>
                
                <div class="h-[1px] bg-white/5 w-full"></div>

                <div>
                    <p class="text-[9px] text-green-500 font-bold uppercase tracking-widest mb-2">AI Translation</p>
                    <p class="text-[15px] leading-relaxed text-white/90 italic font-light">${translatedText}</p>
                    <button onclick="copyContent(this)" class="mt-3 text-[10px] bg-white/5 px-4 py-2 rounded-full border border-white/10 uppercase font-bold tracking-tighter hover:bg-green-600 transition-all">Copy Translation</button>
                </div>
            </div>
        `;
        appendMessage('ai', responseHTML);

    } catch (e) {
        appendMessage('ai', "Could not read text. Please provide a clear, flat image.");
    } finally {
        loader.classList.add('hidden');
        fileInput.value = '';
    }
}

// Translation Engine (Free API)
async function translate(text, sl, tl) {
    const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&q=${encodeURI(text)}`);
    const data = await res.json();
    return data[0].map(item => item[0]).join("");
}

// UI Helper
function appendMessage(sender, content) {
    const div = document.createElement('div');
    div.className = sender === 'user' ? "flex flex-col items-end animate-in ml-auto" : "flex flex-col items-start animate-in mr-auto";
    div.innerHTML = `<div class="${sender === 'user' ? 'bg-cyan-600' : 'bg-[#111] border border-white/5'} p-4 rounded-3xl ${sender === 'user' ? 'rounded-tr-none' : 'rounded-tl-none'} max-w-[90%] text-sm shadow-xl">${content}</div>`;
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Copy Logic
function copyContent(btn) {
    const text = btn.previousElementSibling.innerText;
    navigator.clipboard.writeText(text);
    const originalBtn = btn.innerText;
    btn.innerText = "COPIED ✅";
    setTimeout(() => btn.innerText = originalBtn, 2000);
}

// PWA Install Logic
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.getElementById('install-banner').classList.remove('hidden');
});

document.getElementById('install-btn').addEventListener('click', () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt = null;
        document.getElementById('install-banner').classList.add('hidden');
    }
});
