export function initHeaderObserver() {
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Sticky Header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('bg-zinc-50/80', 'dark:bg-zinc-950/80', 'backdrop-blur-md', 'border-zinc-200', 'dark:border-white/10');
            header.classList.remove('border-transparent');
        } else {
            header.classList.remove('bg-zinc-50/80', 'dark:bg-zinc-950/80', 'backdrop-blur-md', 'border-zinc-200', 'dark:border-white/10');
            header.classList.add('border-transparent');
        }
    }, { passive: true });

    // Active Link Scroll Spy
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('text-zinc-900', 'dark:text-white', 'font-bold');
                    link.classList.add('text-zinc-500');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.remove('text-zinc-500');
                        link.classList.add('text-zinc-900', 'dark:text-white', 'font-bold');
                    }
                });
            }
        });
    }, { rootMargin: '-40% 0px -60% 0px' });

    sections.forEach(section => sectionObserver.observe(section));
}

export function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach(el => {
        el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700', 'ease-out-expo');
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('opacity-0', 'translate-y-8');
                entry.target.classList.add('opacity-100', 'translate-y-0');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // Timeline Dot Glow
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const dot = entry.target.querySelector('.timeline-dot');
            if (entry.isIntersecting) {
                dot.classList.add('bg-zinc-800', 'dark:bg-white');
                dot.classList.remove('bg-zinc-300', 'dark:bg-zinc-700');
            } else {
                dot.classList.remove('bg-zinc-800', 'dark:bg-white');
                dot.classList.add('bg-zinc-300', 'dark:bg-zinc-700');
            }
        });
    }, { rootMargin: '-50% 0px -50% 0px' });

    timelineItems.forEach(item => timelineObserver.observe(item));
}