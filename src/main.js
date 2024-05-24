import { renderImages } from './js/render-functions';
import { fetchImages } from './js/pixabay-api';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let gallery = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});
const formInput = document.querySelector('.search-image-form');
let imagesDiv = document.querySelector('.gallery');
const span = document.querySelector('.loader');
const showMore = document.querySelector('.show-more');
let page = 1;
let totalPage = 0;
formInput.addEventListener('submit', event => {
  event.preventDefault();
  page = 1;
  imagesDiv.innerHTML = '';
  const searchRequest = formInput.elements.input.value.trim();
  if (!searchRequest) {
    return iziToast.error({
      position: 'topRight',
      message: 'Search request must not be blank',
    });
  }
  showMore.classList.add('visually-hidden');
  span.classList.remove('visually-hidden');
  fetchImages(searchRequest)
    .then(imagesData => {
      if (!imagesData.total) {
        iziToast.error({
          position: 'topRight',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        span.classList.add('visually-hidden');
        return;
      }
      return imagesData;
    })
    .then(imagesData => {
      totalPage = Math.ceil(imagesData.totalHits / 15);
      imagesDiv.append(...renderImages(imagesData));
      gallery.refresh();
      span.classList.add('visually-hidden');
      showMore.classList.remove('visually-hidden');
      if (page === totalPage) {
        showMore.classList.add('visually-hidden');
        span.classList.add('visually-hidden');
        iziToast.error({
          position: 'topRight',
          message: "We're sorry, but you've reached the end of search results.",
        });
        return;
      }
    })
    .catch(error => console.log(`Error: ${error}`));
});
showMore.addEventListener('click', () => {
  showMoreHandler();
});
function showMoreHandler() {
  showMore.classList.add('visually-hidden');
  span.classList.remove('visually-hidden');
  page++;
  const searchRequest = formInput.elements.input.value.trim();
  fetchImages(searchRequest, page)
    .then(imagesData => {
      imagesDiv.append(...renderImages(imagesData));
      gallery.refresh();
      if (page === totalPage) {
        showMore.classList.add('visually-hidden');
        span.classList.add('visually-hidden');
        iziToast.error({
          position: 'topRight',
          message: "We're sorry, but you've reached the end of search results.",
        });
        return;
      }
      span.classList.add('visually-hidden');
      const scrollSize =
        (imagesDiv.firstChild.getBoundingClientRect().height + 24) * 2; //тут я додаю додатково 24 пікселі бо елемент не включає в себе розмір гепу. Але можна переробити верстку на маржін.
      window.scrollBy({
        top: scrollSize,
        behavior: 'smooth',
      });
      showMore.classList.remove('visually-hidden');
    })
    .catch(error => {
      console.log(`Error: ${error}`);
    });
}
