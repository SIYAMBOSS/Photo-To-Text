// ১. তোমার Adsterra Direct Link
const AD_LINK = "https://www.effectivegatecpm.com/t8pg9iar0?key=855ec9927c577f1ea619e109c15252e6";

// ২. বাংলাদেশি ভাইরাল শর্ট টাইটেল
const bdTitles = ["Viral_BD", "Secret_Clip", "Bhabi_Vlog", "Leaked_HD", "Desi_MMS"];

function generateGrid() {
    const grid = document.getElementById('video-grid');
    if (!grid) return;
    
    let html = '';
    for (let i = 1; i <= 60; i++) {
        const title = bdTitles[Math.floor(Math.random() * bdTitles.length)];
        const views = (Math.random() * 2 + 0.5).toFixed(1) + "M";
        const thumbID = i + 7000; 

        html += `
            <div class="v-card" onclick="handleAdClick()">
                <div class="v-thumb" style="background-image: url('https://picsum.photos/seed/${thumbID}/300/200')"></div>
                <div class="v-info">
                    <h4>${title}_${i}.mp4</h4>
                    <p>${views} views • ১ ঘণ্টা আগে</p>
                </div>
            </div>`;
    }
    grid.innerHTML = html;
}

// ৩. অ্যাড ফাংশন
function handleAdClick() {
    window.open(AD_LINK, '_blank');
    const modal = document.getElementById('server-modal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

// ৪. ব্যাক বাটন ট্র্যাপ (ইউজার ব্যাক চাপলে আবার অ্যাড ওপেন হবে)
(function() {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function() {
        window.open(AD_LINK, '_blank');
        window.history.pushState(null, null, window.location.href);
    };
})();

window.onload = generateGrid;
