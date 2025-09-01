document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('startButton');
    
    // Fade out transition when clicking the button
    startButton.addEventListener('click', function(event) {
        event.preventDefault(); 
        document.body.classList.add('fade-out');
        
        setTimeout(function() {
            window.location.href = 'page2.html';
        }, 500); 
    });

    // --- เพิ่มโค้ดสำหรับกลีบกุหลาบ ---
    const petalContainer = document.querySelector('.petal-container');

    function createPetal() {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        
        // สุ่มตำแหน่งเริ่มต้น
        const startX = Math.random() * window.innerWidth;
        // สุ่มการแกว่ง
        const sway = (Math.random() - 0.5) * 200; // แกว่งไปทางซ้ายหรือขวา 100px
        
        petal.style.setProperty('--x', `${startX}px`);
        petal.style.setProperty('--sway', `${sway}px`);
        
        // สุ่ม animation duration และ delay
        petal.style.animationDuration = `${Math.random() * 5 + 5}s`; // 5-10 วินาที
        petal.style.animationDelay = `${Math.random() * 5}s`; // 0-5 วินาที
        
        petalContainer.appendChild(petal);

        // ลบกลีบกุหลาบเมื่อหลุดจากหน้าจอเพื่อประสิทธิภาพ
        petal.addEventListener('animationend', () => {
            petal.remove();
        });
    }

    // สร้างกลีบกุหลาบเรื่อยๆ
    setInterval(createPetal, 300); // สร้างกลีบกุหลาบทุก 300 มิลลิวินาที
});