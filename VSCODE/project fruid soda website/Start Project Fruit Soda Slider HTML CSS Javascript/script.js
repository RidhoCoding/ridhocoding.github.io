const imgSlider = document.querySelector('.img-slider');
const imgFruits = document.querySelectorAll('.img-item.fruit');
const infoBox = document.querySelector('.info-box');
const infoSlider = document.querySelector('.info-slider');
const bgs = document.querySelectorAll('.bg');

const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

let indexSlider = 0;
let index = 0;
let direction = -1;
let isAnimating = false;
const total = imgFruits.length;

function updateActive() {
    const realIndex = ((index % total) + total) % total;

    document.querySelector('.fruit.active').classList.remove('active');
    imgFruits[realIndex].classList.add('active');

    document.querySelector('.bg.active').classList.remove('active');
    bgs[realIndex].classList.add('active');
}

// NEXT
nextBtn.addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;

    indexSlider++;
    index++;
    updateActive();

    imgSlider.style.transform = `rotate(${indexSlider * -90}deg)`;

    if (direction === 1) {
        infoSlider.prepend(infoSlider.lastElementChild);
    }

    direction = -1;
    infoBox.style.justifyContent = 'flex-start';
    infoSlider.style.transform = 'translateY(-25%)';
});

// PREV
prevBtn.addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;

    indexSlider--;
    index--;
    updateActive();

    imgSlider.style.transform = `rotate(${indexSlider * -90}deg)`;

    if (direction === -1) {
        infoSlider.appendChild(infoSlider.firstElementChild);
    }

    direction = 1;
    infoBox.style.justifyContent = 'flex-end';
    infoSlider.style.transform = 'translateY(25%)';
});

// TRANSITION END
infoSlider.addEventListener('transitionend', () => {
    if (direction === -1) {
        infoSlider.appendChild(infoSlider.firstElementChild);
    } else {
        infoSlider.prepend(infoSlider.lastElementChild);
    }

    infoSlider.style.transition = 'none';
    infoSlider.style.transform = 'translateY(0)';

    setTimeout(() => {
        infoSlider.style.transition =
            '.5s cubic-bezier(0.645, 0.045, 0.355, 1)';
        isAnimating = false;
    });
});
