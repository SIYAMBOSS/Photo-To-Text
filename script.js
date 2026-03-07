// ১. তোমার Adsterra Direct Link
const AD_LINK = "https://www.effectivegatecpm.com/t8pg9iar0?key=855ec9927c577f1ea619e109c15252e6";

// ২. ৬০টি ভিডিও জেনারেট করা
const titles = ["Viral_Private_Clip", "Hidden_Cam_Session", "MMS_Trending_Now", "Leaked_Full_HD", "Secret_Vlog"];

function buildGrid() {
    const grid = document.getElementById('video-grid');
    let html = '';
    for (let i = 1; i <= 60; i++) {
        const t = titles[Math.floor(Math.random() * titles.length)];
        const views = (Math.random() * 3 + 0.1).toFixed(1) + "M";
        html += `
            <div class="v-card" onclick="handleAdClick()">
                <div class="v-thumb" style="background-image: url('https://picsum.photos/seed/${i+50}/200/120')"></div>
                <div class="v-info">
                    <h4>${t}_Part_${i}_Full_HD.mp4</h4>
                    <p>${views} views • ${i}h ago</p>
                </div>
            </div>`;
    }
    grid.innerHTML = html;
}

// ৩. অ্যাড ফাংশন
function handleAdClick() {
    window.open(AD_LINK, '_blank');
    document.getElementById('server-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('server-modal').style.display = 'none';
}

// ৪. Back Button Lock
(function() {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function() {
        window.open(AD_LINK, '_blank');
        window.history.pushState(null, null, window.location.href);
    };
})();

window.onload = buildGrid;
