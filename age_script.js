document.addEventListener('DOMContentLoaded', () => {
    // ---*** ใส่วันเกิดของแฟนตรงนี้ (ปี, เดือน-1, วัน) ***---
    const birthDate = new Date(2006, 08, 03); // ตัวอย่าง: 31 มกราคม 2006 (เดือนมกราคมคือ 0)

    const yearsEl = document.getElementById('years');
    const monthsEl = document.getElementById('months');
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function calculateAge() {
        const now = new Date();
        
        let years = now.getFullYear() - birthDate.getFullYear();
        let months = now.getMonth() - birthDate.getMonth();
        let days = now.getDate() - birthDate.getDate();
        let hours = now.getHours() - birthDate.getHours();
        let minutes = now.getMinutes() - birthDate.getMinutes();
        let seconds = now.getSeconds() - birthDate.getSeconds();

        if (seconds < 0) { seconds += 60; minutes--; }
        if (minutes < 0) { minutes += 60; hours--; }
        if (hours < 0) { hours += 24; days--; }
        if (days < 0) {
            months--;
            // คำนวณวันในเดือนก่อนหน้า
            days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        }
        if (months < 0) { months += 12; years--; }

        yearsEl.textContent = years;
        monthsEl.textContent = months;
        daysEl.textContent = days;
        hoursEl.textContent = hours;
        minutesEl.textContent = minutes;
        secondsEl.textContent = seconds;
    }

    // เริ่มนับเวลา
    setInterval(calculateAge, 1000);
    calculateAge(); // เรียกครั้งแรกเพื่อให้แสดงผลทันที
});