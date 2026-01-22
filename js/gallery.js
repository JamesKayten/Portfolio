let currentImages = [];
let currentIndex = 0;

function openLightbox(imgSrc, caption, index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');

    lightboxImg.src = imgSrc;
    lightboxCaption.textContent = caption || '';
    lightboxImg.classList.remove('loaded');

    currentIndex = index;
    lightbox.classList.add('active');

    lightboxImg.onload = () => lightboxImg.classList.add('loaded');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}

function changeImage(direction) {
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = currentImages.length - 1;
    if (currentIndex >= currentImages.length) currentIndex = 0;

    const img = currentImages[currentIndex];
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');

    lightboxImg.classList.remove('loaded');
    lightboxImg.src = img.src;
    lightboxCaption.textContent = img.caption || '';

    lightboxImg.onload = () => lightboxImg.classList.add('loaded');
}