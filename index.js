const dataBase = [];

const addAd = document.querySelector('.add__ad');
const modalAdd = document.querySelector('.modal__add');
const modalClose = document.querySelector('.modal__close');
const modaBtnSubmit = document.querySelector('.modal__btn-submit');
const modalSubmit = document.querySelector('.modal__submit');
const catalog = document.querySelector('.catalog');
const modalItem = document.querySelector('.modal__item');
const elementsModalSubmit = [...modalSubmit.elements].filter(elem => elem.tagName !== 'BUTTON');
const modalBtnWarning = document.querySelector('.modal__btn-warning');

const closeModal = function(event) {
    const target = event.target;
    if (target.classList.contains('modal__close') || target === this) {
        this.classList.add('hide');
        if (this === modalAdd) {
            modalSubmit.reset();
        }
    }
};
const closeModalEsc = function(event) {
    if (event.code === 'Escape') {
        modalItem.classList.add('hide');
        modalAdd.classList.add('hide');
        modalSubmit.reset();
        document.addEventListener('keydown', closeModalEsc);
    };
};

modalSubmit.addEventListener('input', () => {
    const validForm = elementsModalSubmit.every(elem => elem.value);
    modaBtnSubmit.disabled = !validForm;
    modalBtnWarning.style.display = validForm ? 'none' : '';
});

modalSubmit.addEventListener('submit', event => {
    event.preventDefault();
    const itemObj = {};
    for (const elem of elementsModalSubmit) {
        itemObj[elem.name] = elem.value;
    }
    dataBase.push(itemObj);
    modalSubmit.reset();
    console.log(dataBase);
});

addAd.addEventListener('click', () => {
    modalAdd.classList.remove('hide');
    modaBtnSubmit.disabled = true;
    document.addEventListener('keydown', closeModalEsc);
});

modalAdd.addEventListener('click', closeModal);
modalItem.addEventListener('click', closeModal);



catalog.addEventListener('click', event => {
    const target = event.target;
    if (target.closest('.card')) {
        modalItem.classList.remove('hide');
        document.addEventListener('keydown', closeModalEsc);
    };
});