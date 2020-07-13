const dataBase = JSON.parse(localStorage.getItem('avito')) || [];

const addAd = document.querySelector('.add__ad'),
    modalAdd = document.querySelector('.modal__add'),
    modalClose = document.querySelector('.modal__close'),
    modaBtnSubmit = document.querySelector('.modal__btn-submit'),
    modalSubmit = document.querySelector('.modal__submit'),
    catalog = document.querySelector('.catalog'),
    modalItem = document.querySelector('.modal__item'),
    modalBtnWarning = document.querySelector('.modal__btn-warning'),
    modalFileInput = document.querySelector('.modal__file-input'),
    modalFileBtn = document.querySelector('.modal__file-btn'),
    modalImageAdd = document.querySelector('.modal__image-add'),
    modalContent = document.querySelector('.modal__content');


const textFileBtn = modalFileBtn.textContent;
const srcModalImg = modalImageAdd.src;

const elementsModalSubmit = [...modalSubmit.elements]
    .filter(elem => elem.tagName !== 'BUTTON');

const infoPhoto = {};

const saveDB = () => localStorage.setItem('avito', JSON.stringify(dataBase));

const checkForm = () => { // валидация формы на заполнение
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
        modalFileBtn.textContent = textFileBtn; // очистка кнопки "Добавить"
        modalImageAdd.src = srcModalImg; // очистка картинки
        checkForm();
    }
};
const renderCard = () => { // добавляем объявление
    catalog.textContent = '';
    dataBase.forEach((item, i) => {
        catalog.insertAdjacentHTML('beforeend', `
        <li class="card" data-id="${i}">
        <img class="card__image" src="data:image/jpeg;base64,${item.image}" alt="test">
        <div class="card__description">
            <h3 class="card__header">${item.nameItem}</h3>
            <div class="card__price">Цена: ${item.costItem} ГРН</div>
        </div>
    </li>
        `)
    });
}
const renderModal = () => {

}
modalFileInput.addEventListener('input', event => {
    const target = event.target;
    const reader = new FileReader();
    const file = target.files[0];
    infoPhoto.filename = file.name; // добавляем имя и размер файла
    infoPhoto.size = file.size;
    reader.readAsBinaryString(file); // отслеживаем файл 

    reader.addEventListener('load', event => {
        if (infoPhoto.size < 200000) {
            modalFileBtn.textContent = infoPhoto.filename;
            infoPhoto.base64 = btoa(event.target.result);
            modalImageAdd.src = `data:image/jpeg;base64,${infoPhoto.base64}`; // добавляем фото
        } else {
            modalFileBtn.textContent = 'Файл не должен превышать 200кб';
            modalFileInput.value = '';
            checkForm();
        }
    });
});

modalSubmit.addEventListener('input', checkForm);

modalSubmit.addEventListener('submit', event => { // отправка формы
    event.preventDefault();
    const itemObj = {};
    for (const elem of elementsModalSubmit) {
        itemObj[elem.name] = elem.value;
    }
    itemObj.image = infoPhoto.base64;
    dataBase.push(itemObj);
    closeModal({ target: modalAdd });
    saveDB();
    renderCard();
});

addAd.addEventListener('click', () => {
    modalAdd.classList.remove('hide');
    modaBtnSubmit.disabled = true;
    document.addEventListener('keydown', closeModal);
});

modalAdd.addEventListener('click', closeModal);
modalItem.addEventListener('click', closeModal);


catalog.addEventListener('click', function(event) {
    const target = event.target;
    const id = +target.closest('.card').getAttribute('data-id');
    const modalHeaderItem = document.querySelector('.modal__header-item'),
        modalStatusItem = document.querySelector('.modal__status-item'),
        modalDescriptionItem = document.querySelector('.modal__description-item'),
        modalCostItem = document.querySelector('.modal__cost-item'),
        modalImageItem = document.querySelector('.modal__image-item');
    if (target.closest('.card')) {
        dataBase.forEach((item, i) => {
            if (id === i) {
                modalHeaderItem.textContent = `${item.nameItem}`;
                modalStatusItem.textContent = `${item.status}`;
                modalDescriptionItem.textContent = `${item.descriptionItem}`;
                modalCostItem.textContent = `${item.costItem} ГРН`;
                modalImageItem.src = `data:image/jpeg;base64,${item.image}`;
            }
        });
        modalItem.classList.remove('hide');
        document.addEventListener('keydown', closeModal);
    };
});
renderCard();