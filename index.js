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

const checkForm = () => { // валидация формы
    const validForm = elementsModalSubmit.every(elem => elem.value);
    modaBtnSubmit.disabled = !validForm;
    modalBtnWarning.style.display = validForm ? 'none' : '';
};

const closeModal = function(event) { // закрытие модальных окон
    const target = event.target;
    if (target.closest('.modal__close') || target.classList.contains('modal') || event.code === 'Escape') {
        modalItem.classList.add('hide');
        modalAdd.classList.add('hide');
        document.removeEventListener('keydown', closeModal);
        modalSubmit.reset();
        checkForm();
    }
};

modalSubmit.addEventListener('input', checkForm);

modalSubmit.addEventListener('submit', event => {
    event.preventDefault();
    const itemObj = {};
    for (const elem of elementsModalSubmit) {
        itemObj[elem.name] = elem.value;
    }
    dataBase.push(itemObj);
    closeModal({ target: modalAdd });
    console.log(dataBase);
});

addAd.addEventListener('click', () => {
    modalAdd.classList.remove('hide');
    modaBtnSubmit.disabled = true;
    document.addEventListener('keydown', closeModal);
});

modalAdd.addEventListener('click', closeModal);
modalItem.addEventListener('click', closeModal);



catalog.addEventListener('click', event => {
    const target = event.target;
    if (target.closest('.card')) {
        modalItem.classList.remove('hide');
        document.addEventListener('keydown', closeModal);
    };
});