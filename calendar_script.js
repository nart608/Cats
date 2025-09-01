document.addEventListener('DOMContentLoaded', () => {
    const monthCards = document.querySelectorAll('.month-card');
    const overlay = document.getElementById('image-preview-overlay');
    const previewBox = document.getElementById('image-preview');
    const previewImg = document.getElementById('preview-img');

    function closePreview() {
        overlay.classList.remove('show');
        previewBox.classList.remove('show');
        document.body.classList.remove('no-scroll');
    }

    monthCards.forEach(card => {
        card.addEventListener('click', () => {
            const imgSrc = card.querySelector('img').src;
            previewImg.src = imgSrc;
            overlay.classList.add('show');
            previewBox.classList.add('show');
            document.body.classList.add('no-scroll');
        });
    });

    overlay.addEventListener('click', closePreview);
    previewImg.addEventListener('click', closePreview);
});