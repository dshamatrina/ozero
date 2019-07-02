var dropdown = document.querySelector('.header_nav-dropdown');
var menu = document.querySelector('.header_nav-dropdown-menu');

dropdown.addEventListener('click', () => {
    dropdown.classList.toggle('header_nav-dropdown__shown');
    var flag = ((parseFloat(menu.style.height)) < 1 || menu.style.height == '');
    function animate(drop, duration) {
        var start = performance.now();
        requestAnimationFrame(function animate(time) {
            var timePassed = time - start;
            
            if (timePassed > duration) timePassed = duration;
            drop(timePassed);
            if (timePassed < duration) {
                requestAnimationFrame(animate);
            }
        });
    }
        animate(function(timePassed) {
            if (flag) {
                menu.style.height = timePassed / (300 / 180) + 'px';
            } else {
                menu.style.height = 0;
            };
            }, 300);

})

var products = document.querySelectorAll('.product.product__discount');
if (products.length !== 0) {
    products.forEach((product) => {
        var oldPrice = product.querySelector('.product_price > .p.p__large');
        oldPrice.classList.remove('p__large');
        oldPrice.classList.add('p__old', 'p__faded');
        var oldPriceValue = parseFloat(oldPrice.innerHTML);
        var discount = Number(parseFloat(product.getAttribute('data-discount').slice(2)));
        var newPrice = document.createElement('p');
        newPrice.classList.add('p', 'p__large');
        var newPriceValue = oldPriceValue - oldPriceValue * discount / 100;
        newPrice.innerHTML = Math.round(newPriceValue).toFixed(2) + ' грн';
        product.querySelector('.product_price').appendChild(newPrice);
    })
}

window.addEventListener('scroll', () => {
    var scrollTop = window.scrollY;
    var scrollUp = document.querySelector('._scrollUp').offsetTop;
    var scroll = document.querySelector('._scroll');
    if (scrollTop >= scrollUp) {
        scroll.classList.add('main_scroll__visible')
    } else {
        scroll.classList.remove('main_scroll__visible')
    }
})

$(document).ready(function(){
  $('._promoSlider').slick({
    dots: true,
    infinite: true,
    autoplay: true,
    arrows: true,
    adaptiveHeight: true,
    slide: 'div',
    prevArrow: '._prevArrowHeader',
    nextArrow: '._nextArrowHeader',
  });
  $('._reviewSlider').slick({
    dots: true,
    infinite: true,
    arrows: true,
    adaptiveHeight: true,
    slide: 'div',
    prevArrow: '._prevArrowHeader',
    nextArrow: '._nextArrowHeader',
  });
});