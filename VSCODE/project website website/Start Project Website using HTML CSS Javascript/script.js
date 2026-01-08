const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const slides = document.querySelectorAll('.slide');

let current = 0;
const total = slides.length;

slides[current].classList.add('active');

nextBtn.addEventListener('click', () => {
    slides[current].classList.remove('active');

    current++;
    if (current >= total) {
        current = 0;
    }

    slides[current].classList.add('active');
});

prevBtn.addEventListener('click', () => {
    slides[current].classList.remove('active');

    current--;
    if (current < 0) {
        current = total - 1;
    }

    slides[current].classList.add('active');
});
