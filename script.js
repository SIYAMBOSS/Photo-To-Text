const chatWindow = document.getElementById('chat-window');
const loader = document.getElementById('loader');

// Auth System
window.onload = () => {
    const savedGmail = localStorage.getItem('siyam_user_gmail');
    if (!savedGmail) document.getElementById('auth-overlay').classList.remove('hidden');
    else document.getElementById('active-user').innerText = savedGmail;
};

function saveIdentity() {
    const gmail = document.getElementById('user-gmail').value.trim();
    if (gmail.includes('@')) {
        localStorage.setItem('siyam_user_gmail', gmail);
        document.getElementById('auth-overlay').classList.add('hidden');
        document.getElementById('active-user').innerText = gmail;
    }
}

// OCR & Translate Logic
async function processImage() {
    const fileInput = document.getElementById('file-input');
    if (fileInput.files.length === 0) return;

    const file = fileInput.files[0];
    const imageUrl = URL.createObjectURL(file);

    appendMessage('user', `<img src="${imageUrl}" class="rounded-2xl max-w-sm border border-white/10">`);
    loader.classList.remove('hidden');

    try {
        const { data: { text } } = await Tesseract.recognize(file, 'ben+eng');
        const original = text.trim();
        const isBN = /[\u0980-\u09FF]/.test(original);
        const translated = await translate(original, isBN ? 'bn' : 'en', isBN ? 'en' : 'bn');

        appendMessage('ai', `
            <div class="space-y-4">
                <div class="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p class="text-[9px] text-cyan-500 font-bold mb-1 uppercase">Original</p>
                    <p class="text-sm">${original}</p>
                </div>
                <div class="p-4 bg-cyan-600/10 rounded-2xl border border-cyan-500/20 text-white/90">
                    <p class="text-[9px] text-green-500 font-bold mb-1 uppercase">AI Translate</p>
                    <p class="text-sm italic">${translated}</p>
                </div>
                <button onclick="copyThis(this)" class="bg-white/5 px-4 py-2 rounded-full text-[9px] font-bold uppercase">Copy Result</button>
            </div>
        `);
    } catch (e) {
        appendMessage('ai', "Clear chhobi pathan!");
    } finally {
        loader.classList.add('hidden');
        fileInput.value = '';
    }
}

async function translate(text, sl, tl) {
    const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&q=${encodeURI(text)}`);
    const data = await res.json();
    return data[0].map(i => i[0]).join("");
}

function appendMessage(sender, content) {
    const div = document.createElement('div');
    div.className = sender === 'user' ? "flex flex-col items-end animate-in" : "flex flex-col items-start animate-in";
    div.innerHTML = `<div class="${sender === 'user' ? 'bg-cyan-600' : 'bg-[#111] border border-white/5'} p-4 rounded-3xl ${sender === 'user' ? 'rounded-tr-none' : 'rounded-tl-none'} max-w-[90%] text-sm shadow-xl">${content}</div>`;
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function copyThis(btn) {
    navigator.clipboard.writeText(btn.previousElementSibling.innerText);
    btn.innerText = "COPIED!";
    setTimeout(() => btn.innerText = "COPY RESULT", 2000);
}

// PWA Install Logic
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.getElementById('install-banner').classList.remove('hidden');
});

document.getElementById('install-btn').addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt = null;
        document.getElementById('install-banner').classList.add('hidden');
    }
});
