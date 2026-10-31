export function initSpotlight() {
    const spotlight = document.getElementById('spotlight');
    
    // Mencegah error jika elemen spotlight tidak ditemukan
    if (!spotlight) return; 

    window.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            spotlight.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(255,255,255,0.03), transparent 40%)`;
        });
    });
}