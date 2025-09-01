document.addEventListener('DOMContentLoaded', () => {
    // Array รูปภาพที่คุณต้องการแสดงใน Lightbox
    const momentImages = [
        '1.jpg', // อย่าลืมเปลี่ยนชื่อไฟล์รูปภาพ
        '2.jpg',
        '3.jpg',
        '4.jpg',
        '5.jpg',
        '6.jpg'
    ];
    
    // Elements ของเครื่องเล่นเพลง
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const vinylRecord = document.querySelector('.vinyl-record');
    const progressBarContainer = document.querySelector('.progress-bar-container');
    const progressBar = document.querySelector('.progress-bar');
    const currentTimeEl = document.querySelector('.current-time');
    const durationEl = document.querySelector('.duration');
    const albumArt = document.querySelector('.album-art');

    // Elements ของ Lightbox Gallery
    const lightboxOverlay = document.getElementById('lightbox-overlay');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const closeBtn = document.querySelector('.close-btn');
    let currentImageIndex = 0;

    // ตัวแปรสำหรับตรวจจับการปัด (Swipe)
    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50; // ระยะปัดขั้นต่ำที่ถือว่าเป็นการ swipe

    // ฟังก์ชันสำหรับควบคุมการเล่นเพลง
    function togglePlayPause() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseBtn.textContent = '❚❚';
            vinylRecord.classList.add('playing');
        } else {
            audioPlayer.pause();
            playPauseBtn.textContent = '►';
            vinylRecord.classList.remove('playing');
        }
    }
    playPauseBtn.addEventListener('click', togglePlayPause);

    audioPlayer.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(audioPlayer.duration);
    });

    audioPlayer.addEventListener('timeupdate', () => {
        const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
        currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
    });

    progressBarContainer.addEventListener('click', (e) => {
        const width = progressBarContainer.clientWidth;
        const clickX = e.offsetX;
        const duration = audioPlayer.duration;
        if (duration) {
            audioPlayer.currentTime = (clickX / width) * duration;
        }
    });

    function formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // ฟังก์ชันสำหรับแสดงและซ่อน Lightbox Gallery
    function showLightbox(index) {
        currentImageIndex = index;
        lightboxImage.src = momentImages[currentImageIndex];
        
        lightboxOverlay.classList.remove('hidden');
        lightbox.classList.remove('hidden');

        requestAnimationFrame(() => {
            lightboxOverlay.classList.add('visible');
            lightbox.classList.add('visible');
        });
    }

    function hideLightbox() {
        lightboxOverlay.classList.remove('visible');
        lightbox.classList.remove('visible');

        setTimeout(() => {
            lightboxOverlay.classList.add('hidden');
            lightbox.classList.add('hidden');
        }, 300); // 300ms คือระยะเวลา transition ใน CSS
    }

    // ฟังก์ชันสำหรับเปลี่ยนรูปภาพใน Lightbox (ซ้าย/ขวา)
    function changeImage(direction) { // direction: 1 for next, -1 for prev
        currentImageIndex = (currentImageIndex + direction + momentImages.length) % momentImages.length;
        lightboxImage.src = momentImages[currentImageIndex];
    }

    // เมื่อคลิกที่รูปภาพ album-art จะเปิด Lightbox Gallery
    albumArt.addEventListener('click', (e) => {
        e.stopPropagation();
        showLightbox(0); // แสดงรูปแรกใน momentImages
    });

    // Event listeners สำหรับการควบคุม Lightbox
    closeBtn.addEventListener('click', hideLightbox);
    lightboxOverlay.addEventListener('click', hideLightbox); // คลิกที่ overlay เพื่อปิด

    // ------------------ Swipe Gestures ------------------
    lightboxImage.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        lightboxImage.classList.add('dragging'); // เพิ่มคลาสเพื่อเปลี่ยน cursor
    });

    lightboxImage.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
    });

    lightboxImage.addEventListener('touchend', () => {
        lightboxImage.classList.remove('dragging'); // ลบคลาสเมื่อเลิกปัด
        handleSwipe();
    });

    // สำหรับ Desktop (ลากด้วยเมาส์)
    let isMouseDown = false;
    lightboxImage.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        touchStartX = e.clientX;
        lightboxImage.classList.add('dragging');
    });

    lightboxImage.addEventListener('mousemove', (e) => {
        if (!isMouseDown) return;
        touchEndX = e.clientX;
    });

    lightboxImage.addEventListener('mouseup', () => {
        if (!isMouseDown) return;
        isMouseDown = false;
        lightboxImage.classList.remove('dragging');
        handleSwipe();
    });

    lightboxImage.addEventListener('mouseleave', () => { // กรณีเมาส์ออกนอกรูปขณะลาก
        if (!isMouseDown) return;
        isMouseDown = false;
        lightboxImage.classList.remove('dragging');
        // ไม่ต้อง handleSwipe() เพราะอาจจะไม่ได้ตั้งใจเลื่อนรูป
    });


    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;

        if (swipeDistance > minSwipeDistance) {
            // Swipe Right (เลื่อนไปรูปก่อนหน้า)
            changeImage(-1);
        } else if (swipeDistance < -minSwipeDistance) {
            // Swipe Left (เลื่อนไปรูปถัดไป)
            changeImage(1);
        }
        // รีเซ็ตค่า
        touchStartX = 0;
        touchEndX = 0;
    }
    // ----------------------------------------------------
});