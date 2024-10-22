import { galleryItems } from './gallery-items.js';
// Change code below this line
const galleryContainer = document.querySelector('ul.gallery');
const photosMarkup = createGalleryItem(galleryItems);

function createGalleryItem(element) {
    return element
        .map(({ preview, original, description }) => {
            return `
        <div class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
                />
            </a>
        </div>`
        })
        .join('');
};

const galleryHandler = (event) => {
    event.preventDefault();
    
    if (event.target.nodeName !== 'IMG') {
        return;
    };

    const originalUrl = event.target.dataset.source;
    const instance = basicLightbox.create(`<img src="${originalUrl}">`)
    instance.show();

    window.addEventListener('keydown', onEscKeyPress);

    function onEscKeyPress(event) {
        const ESC_KEY_CODE = 'Escape'
        if (event.code === ESC_KEY_CODE) {
            instance.close();
            window.removeEventListener('keydown', onEscKeyPress);
        };
    };
};

galleryContainer.insertAdjacentHTML('beforeend', photosMarkup);
galleryContainer.addEventListener('click', galleryHandler);


console.log(galleryItems);
