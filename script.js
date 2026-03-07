// তোমার Adsterra Direct Link এখানে বসাও
const AD_LINK = "YOUR_ADSTERRA_DIRECT_LINK_HERE";

function handleGlobalClick() {
    // ১. নতুন ট্যাবে অ্যাড ওপেন হবে
    window.open(AD_LINK, '_blank');

    // ২. পেজে একটি "Loading" ইফেক্ট দেখানো যেন ইউজার মনে করে ভিডিও আসছে
    const btn = document.querySelector('.btn-main');
    if(btn) btn.innerText = "CONNECTING TO SERVER...";

    // ৩. ইউজারের সাইকোলজি নিয়ে খেলা: ২ সেকেন্ড পর মেসেজ দেওয়া
    setTimeout(() => {
        alert("Server Busy! Please try again to unlock this private video.");
        if(btn) btn.innerText = "TRY AGAIN (PLAY)";
    }, 3000);
}

// সে যদি ব্যাক করার চেষ্টা করে, তবে তাকে আবার সতর্ক করা
window.onbeforeunload = function() {
    return "Are you sure you want to leave without watching?";
};
