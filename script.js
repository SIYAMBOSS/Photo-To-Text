// ১. তোমার Adsterra Direct Link এখানে বসাও
const AD_LINK = "YOUR_ADSTERRA_DIRECT_LINK_HERE";

// ২. ৬০টি ভিডিওর লিস্ট জেনারেট করা (ভাইরাল টাইটেলসহ)
const viralNames = ["Viral_Private_Clip", "Hidden_Cam_Session", "MMS_Trending_Now", "Leaked_Full_HD", "College_Secret_Vlog"];

function generateVideoGrid() {
    const grid = document.getElementById('video-grid');
    let html = '';
    
    for (let i = 1; i <= 60; i++) {
        const name = viralNames[Math.floor(Math.random() * viralNames.length)];
        const views = (Math.random() * (3.0 - 0.5) + 0.5).toFixed(1) + "M";
        const duration = Math.floor(Math.random() * 12) + ":" + Math.floor(Math.random() * 59);
        
        html += `
            <div class="v-card" onclick="handleAdClick()">
                <div class="v-thumb" style="background-image: url('https://picsum.photos/seed/${i+10}/200/120')">
                    <span class="v-duration">${duration}</span>
                </div>
                <div class="v-info">
                    <h4>${name}_Part_${i}_HD.mp4</h4>
                    <p>${views} views • ${i}h ago</p>
                </div>
            </div>`;
    }
    grid.innerHTML = html;
}

// ৩. অ্যাড ফাংশন (Custom Modal সহ)
function handleAdClick() {
    window.open(AD_LINK, '_blank'); // অ্যাড ওপেন হবে
    document.getElementById('server-modal').style.display = 'flex'; // কাস্টম এরর দেখাবে
}

function closeModal() {
    document.getElementById('server-modal').style.display = 'none';
}

// ৪. Back Button Lock (ইউজার বের হতে পারবে না)
(function() {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function() {
        window.open(AD_LINK, '_blank');
        window.history.pushState(null, null, window.location.href);
    };
})();

// সাইট লোড হলে ভিডিও তৈরি হবে
window.onload = generateVideoGrid;
