export function initTypewriter() {
    const textElement = document.getElementById('typewriter');
    if (!textElement) return;

    // Kata yang akan diketik bergantian
    const words = ['Software Engineer', 'Backend Developer', 'Tech Enthusiast'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            textElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        // Kecepatan ketik (ms)
        let typeSpeed = isDeleting ? 40 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            // Jeda saat teks selesai diketik
            typeSpeed = 2000; 
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            // Pindah ke kata berikutnya
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; 
        }

        setTimeout(type, typeSpeed);
    }

    type();
}