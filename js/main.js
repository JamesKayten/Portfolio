function loadContent(category, subcategory, clickedElement) {
    document.querySelectorAll('.subcategory').forEach(el => el.classList.remove('active'));
    clickedElement.classList.add('active');

    const contentArea = document.getElementById('contentArea');
    contentArea.classList.remove('loaded');
    contentArea.innerHTML = `<p class="loading">Loading ${category} → ${subcategory.replace('-', ' ')}...</p>`;

    setTimeout(() => {
        const content = getContentFor(category, subcategory);
        contentArea.innerHTML = content;
        contentArea.classList.add('loaded');

        if (category === 'photography') {
            initLightbox();
        }
    }, 800);
}

function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    currentImages = [];

    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        const captionEl = item.querySelector('.caption');
        const captionText = captionEl ? captionEl.textContent.trim() : '';

        currentImages.push({ src: img.src, caption: captionText });

        item.addEventListener('click', () => {
            openLightbox(img.src, captionText, index);
        });
    });

    // Preload first 6 images for instant appearance
    preloadImages(currentImages.slice(0, 6));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target.querySelector('img');
                if (img.complete) {
                    img.classList.add('loaded');
                } else {
                    img.onload = () => img.classList.add('loaded');
                }
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '200px' });

    galleryItems.forEach(item => observer.observe(item));
}

function preloadImages(imageArray) {
    imageArray.forEach(imgData => {
        const preloadImg = new Image();
        preloadImg.src = imgData.src;
    });
}

function getContentFor(category, subcategory) {
    const titles = {
        photography: { people: "People", places: "Places", product: "Product" },
        design: { objects: "Objects", inside: "Inside", outside: "Outside" },
        journal: { "good-life": "Good Life", design: "Design", fiction: "Fiction" }
    };

    const title = titles[category]?.[subcategory] || "Untitled";

    if (category === 'photography') {
        const sampleImages = {
            people: [
                { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800", caption: "Portrait in natural light" },
                { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800", caption: "Candid street moment" },
                { src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800", caption: "Studio headshot" },
                { src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800", caption: "Environmental portrait" },
                { src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800", caption: "Group gathering" }
            ],
            places: [
                { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800", caption: "Maldives sunset" },
                { src: "https://images.unsplash.com/photo-1519671482749-fd09be7cc979?w=800", caption: "Urban skyline" },
                { src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800", caption: "Mountain lake" },
                { src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800", caption: "Desert dunes" },
                { src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800", caption: "Forest path" }
            ],
            product: [
                { src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800", caption: "Minimal watch" },
                { src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800", caption: "Ceramic coffee set" },
                { src: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800", caption: "Leather notebook" },
                { src: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800", caption: "Headphones on desk" },
                { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", caption: "Modern chair" }
            ]
        };

        const images = sampleImages[subcategory] || [];
        let galleryHTML = '<div class="gallery">';

        images.forEach(img => {
            galleryHTML += `
                <div class="gallery-item">
                    <img src="${img.src}" alt="${img.caption}" loading="lazy">
                    <div class="caption">${img.caption}</div>
                </div>
            `;
        });
        galleryHTML += '</div>';

        return `
            <h1>${title}</h1>
            <p>A curated selection of ${title.toLowerCase()} photography.</p>
            ${galleryHTML}
        `;
    }

    return `
        <h1>${title}</h1>
        <p>This section is under construction. Coming soon: ${category} → ${title} content.</p>
    `;
}