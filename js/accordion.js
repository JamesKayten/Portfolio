function toggleAccordion(element) {
    const content = element.nextElementSibling;
    const parent = element.parentElement;

    document.querySelectorAll('.accordion-content').forEach(item => {
        if (item !== content) {
            item.classList.remove('open');
            item.previousElementSibling.querySelector('.arrow').style.transform = 'rotate(0deg)';
            item.parentElement.classList.remove('open');
        }
    });

    content.classList.toggle('open');
    parent.classList.toggle('open');

    const arrow = element.querySelector('.arrow');
    arrow.style.transform = content.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
}