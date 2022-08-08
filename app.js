// button variables
const scroll_left = document.querySelectorAll('.scroll-left');
const scroll_right = document.querySelectorAll('.scroll-right');

// scroll variables
const desktop_img = document.querySelector('.desktop-img');
const mobile_img = document.querySelector('.mobile-img');
const sec_info_h1 = document.querySelector('.sec-info-h1');
const sec_info_p = document.querySelector('.sec-info-p');

// nav variables
const nav_btn = document.querySelector('.nav-btn');
const mobile_nav_links = document.querySelector('.nav-links-mobile');
const nav_img = document.querySelector('.nav-btn-img');

// global variables
let product_data; 
let product_number = 0;

const getData = () => {
  fetch('slides.json')
    .then(res => res.json())
    .then(data => {
      if (!data) {
        return;
      } else {
        product_data = data.slides;
        populateSlide(data.slides);
      }
    })
}

const populateSlide = (data) => {

  desktop_img.srcset = data[product_number].desktop_img;
  mobile_img.src = data[product_number].mobile_img;
  sec_info_h1.textContent = data[product_number].title;
  sec_info_p.textContent = data[product_number].desc;

}

scroll_left.forEach(btn => {
  btn.addEventListener('click', () => {
    if (product_data) {
      product_number--;
      if (product_number < 0) {
        product_number = product_data.length - 1;
      }
      populateSlide(product_data);
    }
  });
});

scroll_right.forEach(btn => {
  btn.addEventListener('click', () => {
    if (product_data) {
      product_number++;
      if (product_number > product_data.length - 1) {
        product_number = 0;
      }
      populateSlide(product_data);
    }
  });
});

nav_btn.addEventListener('click', () => {
  if (mobile_nav_links.classList.contains('open')) {
    mobile_nav_links.classList.remove('open');
    nav_img.src = 'images/icon-hamburger.svg';
  } else {
    mobile_nav_links.classList.add('open');
    nav_img.src = 'images/icon-close.svg';
  }
})

window.addEventListener('load', () => {
  getData();
});