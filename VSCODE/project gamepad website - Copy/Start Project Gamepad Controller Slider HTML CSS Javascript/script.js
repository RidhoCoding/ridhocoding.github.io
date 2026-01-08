const imgSlider = document.querySelector('.img-slider');
const items = document.querySelectorAll('.item');
const imgItems = document.querySelectorAll('.img-item');
const infoItems = document.querySelectorAll('.info-item');
const buyBtns = document.querySelectorAll('.btn');
const checkout = document.getElementById('checkout');
const closeCheckout = document.getElementById('closeCheckout');

const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

let colors = ['#3674be', '#d26181', '#ceb13d', '#c6414c', '#171f2b', '#50aa61'];

let indexSlider = 0;
let index = 0;

buyBtns.forEach((btn, i) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        checkout.style.display = 'flex';
        document.getElementById('productName').innerText =
            infoItems[i].querySelector('h2').innerText;
        document.getElementById('productPrice').innerText = '$59.99';
    });
});

closeCheckout.onclick = () => checkout.style.display = 'none';

const slider = () => {
    imgSlider.style.transform = `rotate(${indexSlider * 60}deg)`;

    items.forEach(item => {
        item.style.transform = `rotate(${indexSlider * -60}deg)`;
    });
    
    document.querySelector('.img-item.active').classList.remove('active');
    imgItems[index].classList.add('active');

    document.querySelector('.info-item.active').classList.remove('active');
    infoItems[index].classList.add('active');

    document.body.style.backgroundColor = colors[index];
}

nextBtn.addEventListener('click', () => {
    indexSlider++;

    index++;
    if (index > imgItems.length -1) {
        index = 0;
    }

    slider();
});

prevBtn.addEventListener('click', () => {
    indexSlider--;

    index--;
    if (index < 0) {
        index = imgItems.length - 1;
    }

    slider();
});

const colorGroups = document.querySelectorAll('.colors');

colorGroups.forEach(group => {
    const colorSpans = group.querySelectorAll('span');

    colorSpans.forEach((span, spanIndex) => {
        span.addEventListener('click', (e) => {

            // hapus ripple lama (kalau ada)
            const oldRipple = span.querySelector('.ripple-effect');
            if (oldRipple) oldRipple.remove();

            // posisi klik
            const rect = span.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // buat ripple baru
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.style.width = ripple.style.height = '20px';

            span.appendChild(ripple);

            // update index slider
            index = spanIndex;
            indexSlider = spanIndex;
            slider();

            // reset active color
            document.querySelectorAll('.colors span.active').forEach(s => {
                s.classList.remove('active');
            });

            span.classList.add('active');

            // hapus ripple setelah animasi
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});
