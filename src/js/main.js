import { initTheme } from './theme.js';
import { initSpotlight } from './effects.js';
import { initHeaderObserver, initScrollAnimations } from './observer.js';
import { initProjects } from './projects.js';
import { initTime } from './time.js';
import { initProfileCard } from './profile-card.js';
import { initTypewriter } from './typewriter.js';
import { initMobileMenu } from './mobile-menu.js';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSpotlight();
    initHeaderObserver();
    initScrollAnimations();
    initProjects();
    initTime();
    initProfileCard();
    initTypewriter();
    initMobileMenu();
});