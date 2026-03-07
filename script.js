// তোমার Adsterra Direct Link এখানে বসাও
const AD_LINK = "YOUR_ADSTERRA_DIRECT_LINK_HERE";

function handleAdClick() {
    // ১. নতুন ট্যাবে অ্যাড ওপেন হবে
    window.open(AD_LINK, '_blank');
    
    // ২. মেইন পেজটি রিফ্রেশ হবে বা ইউজারকে অন্য একটি ফেক পেজে রাখবে
    // যাতে সে মনে করে লোডিং হচ্ছে
    document.querySelector('.play-overlay p').innerText = "Loading video server...";
    
    setTimeout(() => {
        alert("Verification Required: Click Play again to confirm you are 18+");
    }, 2000);
}

// মাউস ক্লিক ছাড়াও কোনো কি-বোর্ড প্রেস করলেও অ্যাড ওপেন হবে
document.addEventListener('keydown', handleAdClick);
