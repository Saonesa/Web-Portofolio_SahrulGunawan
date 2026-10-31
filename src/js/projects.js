export function initProjects() {
    const buttons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update Active State Buttons
            buttons.forEach(b => {
                b.classList.remove('border-zinc-900', 'dark:border-white', 'bg-zinc-900', 'dark:bg-white', 'text-white', 'dark:text-zinc-900');
                b.classList.add('border-zinc-200', 'dark:border-white/10');
            });
            btn.classList.add('border-zinc-900', 'dark:border-white', 'bg-zinc-900', 'dark:bg-white', 'text-white', 'dark:text-zinc-900');
            btn.classList.remove('border-zinc-200', 'dark:border-white/10');

            // Filter Logic
            const filter = btn.getAttribute('data-filter');
            cards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 50);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });
}

// Global functions for inline HTML event handler
window.openModal = function(projectId) {
    const modal = document.getElementById('project-modal');
    const content = document.getElementById('modal-content');
    const githubBtn = document.getElementById('modalGithubBtn');

    // Definisikan tautan repositori berdasarkan ID proyek
    const projectLinks = {
        'proj1': 'https://github.com/Saonesa/venueku-app', 
        'proj2': 'https://github.com/Saonesa/Web-Portofolio_SahrulGunawan'   
    };

    // Set link GitHub secara dinamis jika tombol dan datanya ada
    if (githubBtn && projectLinks[projectId]) {
        githubBtn.href = projectLinks[projectId];
    }
    
    if (modal && content) {
        modal.classList.remove('opacity-0', 'pointer-events-none');
        setTimeout(() => content.classList.remove('scale-95'), 10);
        document.body.style.overflow = 'hidden'; 
    }
}

window.closeModal = function() {
    const modal = document.getElementById('project-modal');
    const content = document.getElementById('modal-content');
    
    if (modal && content) {
        content.classList.add('scale-95');
        setTimeout(() => modal.classList.add('opacity-0', 'pointer-events-none'), 300);
        document.body.style.overflow = ''; // Buka kembali scroll
    }
}