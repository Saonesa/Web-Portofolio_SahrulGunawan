export function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-menu-btn');
    const overlay = document.getElementById('mobile-sidebar-overlay');
    const menu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.mobile-nav-link');

    if (!menuBtn || !menu) return;

    function openMenu() {
        overlay.classList.remove('opacity-0', 'pointer-events-none');
        menu.classList.remove('translate-x-full');
        document.body.style.overflow = 'hidden'; // Kunci scroll halaman
    }

    function closeMenu() {
        overlay.classList.add('opacity-0', 'pointer-events-none');
        menu.classList.add('translate-x-full');
        document.body.style.overflow = ''; // Buka kembali scroll
    }

    // Event Listeners
    menuBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu); // Tutup saat area gelap diklik

    // Tutup menu otomatis setelah link dipilih
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}