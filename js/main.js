import images from './gallery-items.js';

const urls = images.map(({ original }) => {
  return original;
});

let currentImage;

const refs = {
  galleryRef: document.querySelector('.gallery'),
  getModal: document.querySelector('.lightbox'),
  getModalOverlay: document.querySelector('.lightbox__overlay'),
  getModalImg: document.querySelector('.lightbox__image'),
  getModalCloseBtn: document.querySelector(
    'button[data-action="close-lightbox"]',
  ),
};

const createItem = function () {
  const itemHTML = images.reduce((acc, { preview, original, description }) => {
    acc += `<li class="gallery__item">\
    <a class="gallery__link" href="${original}">\
      <img class="gallery__image"\
      src="${preview}"\
      data-source="${original}"\
      alt="${description}"/>\
    </a></li>`;
    return acc;
  }, '');
  return itemHTML;
};

refs.galleryRef.insertAdjacentHTML('beforeend', createItem());

refs.galleryRef.addEventListener('click', event => {
  event.preventDefault();
  // if (event.target.tagName !== 'IMG') return;
  if (!event.target.classList.contains('gallery__image')) return;

  currentImage = getUrlImages(event.target);
  openModal();
});

const getUrlImages = target => {
  const curImage = target.dataset.source;
  return curImage;
};

const openModal = () => {
  refs.getModal.classList.add('is-open');
  refs.getModalImg.src = currentImage;
  refs.getModal.addEventListener('click', onClickMouse);
  window.addEventListener('keydown', onPressKey);
};

const CloseModal = () => {
  refs.getModal.classList.remove('is-open');
  refs.getModal.removeEventListener('click', onClickMouse);
  window.removeEventListener('keydown', onPressKey);
  refs.getModalImg.src = '';
};

const onPressKey = event => {
  if (event.code === 'Escape') {
    return CloseModal();
  }
  let index = urls.indexOf(currentImage);

  if (event.code === 'ArrowLeft') {
    if (--index < 0) index = urls.length - 1;
  }
  if (event.code === 'ArrowRight') {
    if (++index > urls.length - 1) index = 0;
  }
  // if (index < 0 || index > urls.length - 1) return;
  currentImage = urls[index];
  refs.getModalImg.src = currentImage;
};

const onClickMouse = event => {
  if (
    event.target === refs.getModalCloseBtn ||
    event.target === refs.getModalOverlay
  )
    return CloseModal();
};
