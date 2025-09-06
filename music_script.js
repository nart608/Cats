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
    const playPauseBtn = document.getElementById('playPauseBtn'); // <-- ปุ่มตัวใหม่ของคุณ
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
    const minSwipeDistance = 50;

    // --- ส่วนที่แก้ไข: เปลี่ยนการควบคุมปุ่ม Play/Pause ---
    // ผมได้ลบฟังก์ชัน togglePlayPause() เดิมออก แล้วแทนที่ด้วยโค้ดชุดใหม่นี้
    
    playPauseBtn.addEventListener('click', () => {
        // .toggle('playing') จะเพิ่ม/ลบ class 'playing' ออกจากปุ่ม
        // และจะคืนค่า true ถ้าเพิ่ม class, false ถ้าลบ class
        const isPlaying = playPauseBtn.classList.toggle('playing');

        if (isPlaying) {
            // ถ้าปุ่มมี class 'playing' (ไอคอนเป็น Pause)
            audioPlayer.play();
            vinylRecord.classList.add('playing'); // ทำให้แผ่นเสียงหมุน
        } else {
            // ถ้าปุ่มไม่มี class 'playing' (ไอคอนเป็น Play)
            audioPlayer.pause();
            vinylRecord.classList.remove('playing'); // ทำให้แผ่นเสียงหยุด
        }
    });
    // --- สิ้นสุดส่วนที่แก้ไข ---


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
        }, 300);
    }

    // ฟังก์ชันสำหรับเปลี่ยนรูปภาพใน Lightbox (ซ้าย/ขวา)
    function changeImage(direction) {
        currentImageIndex = (currentImageIndex + direction + momentImages.length) % momentImages.length;
        lightboxImage.src = momentImages[currentImageIndex];
    }

    // เมื่อคลิกที่รูปภาพ album-art จะเปิด Lightbox Gallery
    albumArt.addEventListener('click', (e) => {
        e.stopPropagation();
        showLightbox(0);
    });

    // Event listeners สำหรับการควบคุม Lightbox
    closeBtn.addEventListener('click', hideLightbox);
    lightboxOverlay.addEventListener('click', hideLightbox);

    // ------------------ Swipe Gestures ------------------
    lightboxImage.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        lightboxImage.classList.add('dragging');
    });

    lightboxImage.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
    });

    lightboxImage.addEventListener('touchend', () => {
        lightboxImage.classList.remove('dragging');

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

    lightboxImage.addEventListener('mouseleave', () => {
        if (!isMouseDown) return;
        isMouseDown = false;
        lightboxImage.classList.remove('dragging');

    });


    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;

        if (swipeDistance > minSwipeDistance) {
            changeImage(-1);
        } else if (swipeDistance < -minSwipeDistance) {
            changeImage(1);
        }
        
        touchStartX = 0;
        touchEndX = 0;
    }
    // ----------------------------------------------------
});