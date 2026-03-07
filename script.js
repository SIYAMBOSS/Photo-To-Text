// ১. তোমার Adsterra Direct Link
const AD_LINK = "https://www.effectivegatecpm.com/t8pg9iar0?key=855ec9927c577f1ea619e109c15252e6";

// ২. বাংলাদেশি শর্ট টাইটেল লিস্ট
const bdShortTitles = [
    "Hot_Viral_BD",
    "Desi_Bhabhi",
    "Secret_Leaked",
    "Viral_MMS_HD",
    "Bhabi_Vlog",
    "Dhaka_Night",
    "Local_Video",
    "Trending_BD"
];

function generateGrid() {
    const grid = document.getElementById('video-grid');
    if (!grid) return;
    
    let html = '';
    for (let i = 1; i <= 60; i++) {
        const title = bdShortTitles[Math.floor(Math.random() * bdShortTitles.length)];
        const views = (Math.random() * 2 + 1).toFixed(1) + "M";
        // পোর্ট্রেট ইমেজ দিয়ে ক্লিক বাড়ানো
        const thumbID = i + 1500; 

        html += `
            <div class="v-card" onclick="handleAdClick()">
                <div class="v-thumb" style="background-image: url('https://picsum.photos/seed/${thumbID}/300/200')"></div>
                <div class="v-info">
                    <h4>${title}_Part_${i}.mp4</h4>
                    <p>${views} views • Just Now</p>
                </div>
            </div>`;
    }
    grid.innerHTML = html;
}

// ৩. অ্যাড ক্লিক হ্যান্ডলার
function handleAdClick() {
    window.open(AD_LINK, '_blank');
    document.getElementById('server-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('server-modal').style.display = 'none';
}

// ৪. ব্যাক বাটন ট্র্যাপ
(function() {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function() {
        window.open(AD_LINK, '_blank');
        window.history.pushState(null, null, window.location.href);
    };
})();

window.onload = generateGrid;
