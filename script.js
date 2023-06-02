// Slider
$(document).ready(function(){
    $('.main__slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        autoplay: true,
        autoplaySpeed: 4000,
    });
});

//modal
const modalClose = document.querySelector('.modal__close');
const modalOpen = document.querySelector('.header__mail__link2');
const modal = document.querySelector('.modal');
//modal 2
const modalAside = document.querySelector('.main__aside');
const burgerOpen = document.querySelector('.burger__open');
const burgerClose = document.querySelector('.burger__close');

modalOpen.addEventListener('click',(e) => {
    e.preventDefault()
    modal.classList.add('active')
})

modalClose.addEventListener('click',() => {
    modal.classList.remove('active')
})

burgerOpen.addEventListener('click',(e) => {
    modalAside.classList.add('active')
})

burgerClose.addEventListener('click',() => {
    modalAside.classList.remove('active')
})

