const addModalBtn = document.querySelector('.add__ad');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal__close');


addModalBtn.addEventListener('click', event => {
    console.log(event);
    modal.classList.remove('hide');
})
modalClose.addEventListener('click', event => {
    console.log(event);
    modal.classList.add('hide');
})