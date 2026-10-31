export function initProfileCard() {
    const root = document.getElementById('profile-card');
    if (!root) return;

    // Konfigurasi Fisika
    const settings = {
        enableTilt: true,
        tiltStrength: 12,
        parallax: 8,
        intro: true
    };

    const size = { width: root.offsetWidth, height: root.offsetHeight };
    const x = { p: 0, v: 0, target: 0 };
    const y = { p: 0, v: 0, target: 0 };
    const light = { p: 0, target: 0 };
    
    let raf = 0;
    let last = performance.now();
    let slowUntil = 0;
    let touchId = null;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const write = () => {
        const { enableTilt, tiltStrength, parallax } = settings;
        const angle = enableTilt && !reduced ? tiltStrength : 0;
        const tilt = Math.min(1, Math.hypot(x.p, y.p));
        const style = root.style;

        style.setProperty('--pc-light-x', `${((x.p + 1) * 0.5 * size.width).toFixed(1)}px`);
        style.setProperty('--pc-light-y', `${((y.p + 1) * 0.5 * size.height).toFixed(1)}px`);
        style.setProperty('--pc-pointer-x', `${((x.p + 1) * 50).toFixed(2)}%`);
        style.setProperty('--pc-pointer-y', `${((y.p + 1) * 50).toFixed(2)}%`);
        style.setProperty('--pc-band-x', `${(50 + x.p * 15).toFixed(2)}%`);
        style.setProperty('--pc-band-y', `${(50 + y.p * 15).toFixed(2)}%`);
        style.setProperty('--pc-rotate-x', `${(y.p * angle).toFixed(3)}deg`);
        style.setProperty('--pc-rotate-y', `${(-x.p * angle).toFixed(3)}deg`);
        style.setProperty('--pc-shift-x', `${(x.p * (reduced ? 0 : parallax)).toFixed(2)}px`);
        style.setProperty('--pc-shift-y', `${(y.p * (reduced ? 0 : parallax)).toFixed(2)}px`);
        style.setProperty('--pc-reach', tilt.toFixed(4));
        style.setProperty('--pc-tilt', (tilt * light.p).toFixed(4));
        style.setProperty('--pc-active', light.p.toFixed(4));
    };

    const frame = (now) => {
        const dt = Math.min(0.05, (now - last) / 1000 || 0);
        last = now;
        const slow = now < slowUntil;
        const stiffness = slow ? 24 : 120;
        const damping = slow ? 9 : 16;
        const steps = Math.max(1, Math.ceil(dt / (1 / 120)));
        const h = dt / steps;
        
        for (let i = 0; i < steps; i++) {
            for (const axis of [x, y]) {
                axis.v += (stiffness * (axis.target - axis.p) - damping * axis.v) * h;
                axis.p += axis.v * h;
            }
        }
        
        const tau = light.target > light.p ? 0.18 : slow ? 0.9 : 0.45;
        light.p += (light.target - light.p) * (1 - Math.exp(-dt / tau));
        
        write();
        
        const moving = Math.abs(x.target - x.p) > 0.0005 || Math.abs(y.target - y.p) > 0.0005 || 
                       Math.abs(x.v) > 0.0005 || Math.abs(y.v) > 0.0005 || Math.abs(light.target - light.p) > 0.002;
        
        if (moving) {
            raf = requestAnimationFrame(frame);
        } else {
            x.p = x.target; y.p = y.target; light.p = light.target;
            write();
            raf = 0;
        }
    };

    const wake = () => {
        if (raf) return;
        last = performance.now();
        raf = requestAnimationFrame(frame);
    };

    const clamp = (val, min, max) => Math.min(max, Math.max(min, val));

    const aim = (nx, ny, on = true) => {
        x.target = clamp(nx, -1, 1);
        y.target = clamp(ny, -1, 1);
        light.target = on ? 1 : 0;
        slowUntil = 0;
        wake();
    };

    const aimAt = (event) => {
        const rect = root.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        aim(((event.clientX - rect.left) / rect.width) * 2 - 1, ((event.clientY - rect.top) / rect.height) * 2 - 1);
    };

    const release = () => aim(0, 0, false);

    // Event Listeners
    root.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') aimAt(e); });
    root.addEventListener('pointermove', (e) => { if (e.pointerType === 'mouse' || e.pointerId === touchId) aimAt(e); });
    root.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') release(); });
    root.addEventListener('pointerdown', (e) => { if (e.pointerType === 'mouse') return; touchId = e.pointerId; aimAt(e); });
    
    const onUp = (e) => { if (e.pointerId !== touchId) return; touchId = null; release(); };
    root.addEventListener('pointerup', onUp);
    root.addEventListener('pointercancel', onUp);

    // Handle Resize
    window.addEventListener('resize', () => {
        size.width = root.offsetWidth;
        size.height = root.offsetHeight;
        write();
    });

    // Intro Animation
    if (settings.intro && !reduced) {
        x.p = 0.62; y.p = -0.55; light.p = 1;
        slowUntil = performance.now() + 1400;
        write();
        wake();
    } else {
        write();
    }
}