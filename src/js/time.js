export function initTime() {
    const timeDisplay = document.getElementById('time-display');
    
    function updateTime() {
        // Force Timezone ID
        const formatter = new Intl.DateTimeFormat('id-ID', {
            timeZone: 'Asia/Jakarta',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
        timeDisplay.textContent = formatter.format(new Date()) + ' WIB';
    }
    
    updateTime();
    setInterval(updateTime, 60000); // Update setiap 1 menit
}