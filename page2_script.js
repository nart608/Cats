document.addEventListener('DOMContentLoaded', () => {
    const passwordDisplay = document.getElementById('passwordDisplay');
    const keys = document.querySelectorAll('.key');
    const errorMessage = document.getElementById('errorMessage');
    const correctPassword = "0308";
    let enteredPassword = "";
    const maxPasswordLength = 4;
    const animationContainer = document.getElementById('animationContainer'); // <-- เปลี่ยนชื่อ

    function updatePasswordDisplay() {
        if (enteredPassword.length === 0) {
            passwordDisplay.textContent = "----";
        } else {
            passwordDisplay.textContent = enteredPassword;
        }
    }

    keys.forEach(key => {
        key.addEventListener('click', () => {
            const keyValue = key.textContent;

            if (key.classList.contains('clear')) {
                enteredPassword = "";
            } else if (key.classList.contains('backspace')) {
                enteredPassword = enteredPassword.slice(0, -1);
            } else if (enteredPassword.length < maxPasswordLength) {
                enteredPassword += keyValue;
            }

            updatePasswordDisplay();

            if (enteredPassword.length === maxPasswordLength) {
                setTimeout(() => {
                    if (enteredPassword === correctPassword) {
                        window.location.href = "page3.html";
                    } else {
                        errorMessage.classList.add('show');
                        enteredPassword = "";
                        updatePasswordDisplay();
                        
                        setTimeout(() => {
                            errorMessage.classList.remove('show');
                        }, 2000);
                    }
                }, 300);
            }
        });
    });

    updatePasswordDisplay();

    // --- ส่วนที่แก้ไข: เปลี่ยนมาสร้างแสงนวลแทน ---
    function createGlowParticle() {
        if (!animationContainer) return;
        const particle = document.createElement('div');
        particle.classList.add('glow-particle');
        
        const size = Math.random() * 150 + 50; // ขนาด 50px ถึง 200px
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // สุ่มตำแหน่งทั่วหน้าจอ
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;

        // สุ่มระยะเวลาแอนิเมชัน
        particle.style.animationDuration = `${Math.random() * 3 + 4}s`; // 4 ถึง 7 วินาที
        
        animationContainer.appendChild(particle);

        particle.addEventListener('animationend', () => {
            particle.remove();
        });
    }

    // สร้างแสงนวลขึ้นมาทุกๆ 1.5 วินาที
    setInterval(createGlowParticle, 1500);
});