document.addEventListener('DOMContentLoaded', () => {
    const glowFill = document.getElementById('glowFill');
    
    // ตรวจสอบว่าหา element เจอหรือไม่
    if (!glowFill) {
        console.error('Error: Element with id "glowFill" was not found.');
        return; // หยุดการทำงานถ้าหาไม่เจอ
    }

    let progress = 0;

    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 5) + 1;
        if (progress > 100) {
            progress = 100;
        }

        glowFill.style.width = `${progress}%`;

        if (progress >= 100) {
            clearInterval(interval);
            // เมื่อโหลดเสร็จ ให้ไปที่หน้า main.html (หน้าเค้ก)
            window.location.href = 'main.html'; 
        }
    }, 80);
});