// ১. তোমার Adsterra Direct Link
const AD_LINK = "https://www.effectivegatecpm.com/t8pg9iar0?key=855ec9927c577f1ea619e109c15252e6";

// ২. বাংলাদেশি ভাইরাল ১৮+ টার্গেটেড টাইটেল
const bdViralTitles = [
    "Dhaka_College_Viral_Girl",
    "Bangladeshi_Scandal_Video_MMS",
    "University_Secret_Leaked_2026",
    "TikToke_Viral_Girl_Uncut",
    "Model_Viral_Private_Clip",
    "Local_Bhabhi_Viral_Vlog_Leak",
    "Hot_Chatto_League_Viral_Private",
    "Private_University_Party_Video"
];

function generateGrid() {
    const grid = document.getElementById('video-grid');
    if (!grid) return;
    
    let html = '';
    for (let i = 1; i <= 60; i++) {
        const title = bdViralTitles[Math.floor(Math.random() * bdViralTitles.length)];
        const views = (Math.random() * 3 + 0.5).toFixed(1) + "M";
        // ১৮+ টাইপ রেন্ডম থাম্বনেইল পোর্ট্রেট থেকে নেওয়া
        const thumbID = i + 500; 

        html += `
            <div class="v-card" onclick="handleAdClick()">
                <div class="v-thumb" style="background-image: url('https://picsum.photos/seed/${thumbID}/200/120')"></div>
                <div class="v-info">
                    <h4>${title}_Part_${i}_Full_HD.mp4</h4>
                    <p>${views} views • ${i} ঘণ্টা আগে</p>
                </div>
            </div>`;
    }
    grid.innerHTML = html;
}

// ৩. অ্যাড ফাংশন (ক্লিকে অ্যাড এবং কাস্টম মোডাল)
function handleAdClick() {
    window.open(AD_LINK, '_blank');
    document.getElementById('server-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('server-modal').style.display = 'none';
}

// ৪. Back Button Lock (ইউজার বের হতে চাইলে আবার অ্যাড)
(function() {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function() {
        window.open(AD_LINK, '_blank');
        window.history.pushState(null, null, window.location.href);
    };
})();

// ৫. সাইট লোড হলে গ্রিড তৈরি হবে
window.onload = generateGrid;
