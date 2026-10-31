export function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const root = document.documentElement;

    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        root.classList.add('dark');
    }

    themeToggle.addEventListener('click', () => {
        root.classList.toggle('dark');
        localStorage.theme = root.classList.contains('dark') ? 'dark' : 'light';
    });
}