const dataBase = JSON.parse(localStorage.getItem('avito')) || [];
let counter = dataBase.length;
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

const modalHeaderItem = document.querySelector('.modal__header-item'),
    modalStatusItem = document.querySelector('.modal__status-item'),
    modalDescriptionItem = document.querySelector('.modal__description-item'),
    modalCostItem = document.querySelector('.modal__cost-item'),
    modalImageItem = document.querySelector('.modal__image-item');

const searchInput = document.querySelector('.search__input'),
    menuСontainer = document.querySelector('.menu__container');

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
const renderCard = (DB = dataBase) => { // добавляем объявление
    catalog.textContent = '';
    DB.forEach((item) => {
        catalog.insertAdjacentHTML('beforeend', `
        <li class="card" data-id="${item.id}">
        <img class="card__image" src="data:image/jpeg;base64,${item.image}" alt="test">
        <div class="card__description">
            <h3 class="card__header">${item.nameItem}</h3>
            <div class="card__price">Цена: ${item.costItem} ГРН</div>
        </div>
    </li>
        `)
    });
}

searchInput.addEventListener('input', event => {
    const valueSearch = searchInput.value.trim().toLowerCase();
    if (valueSearch.length > 2) {
        const result = dataBase.filter(item => item.nameItem.toLowerCase().includes(valueSearch) || item.descriptionItem.toLowerCase().includes(valueSearch));
        renderCard(result);
    }
});
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
    itemObj.id = counter++;
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
    const card = target.closest('.card');

    if (card) {
        const item = dataBase.find(item => item.id === +card.dataset.id);
        modalHeaderItem.textContent = `${item.nameItem}`;
        modalStatusItem.textContent = `${item.status}`;
        modalDescriptionItem.textContent = `${item.descriptionItem}`;
        modalCostItem.textContent = `${item.costItem} ГРН`;
        modalImageItem.src = `data:image/jpeg;base64,${item.image}`;

        modalItem.classList.remove('hide');
        document.addEventListener('keydown', closeModal);
    };
});

menuСontainer.addEventListener('click', event => {
    const target = event.target;
    if (target.tagName === 'A') {
        const result = dataBase.filter(item => item.category === target.dataset.category);
        renderCard(result);
    }
});
renderCard();