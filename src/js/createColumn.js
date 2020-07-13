import {Contenteditable} from './contenteditable.js';
import {columnProcess} from './columnProcess.js';

let columnIdCounter = document.querySelectorAll('.wrapper').length;

export function createColumn(){
    let columnIdCounter = document.querySelectorAll('.wrapper').length;
const addColumnForm = document.querySelector('.add-column-form');
const addNewColumn = document.querySelector('[data-action-addColumn]');
Contenteditable(addColumnForm.querySelector('textarea'));

addColumnForm.addEventListener('submit', function (event) {
    event.preventDefault();
    let value = addColumnForm.querySelector('textarea').value;
    const columnElement = document.createElement('div');
    columnElement.classList.add('column');
    columnElement.setAttribute('data-column-id', columnIdCounter);
    columnIdCounter++;

    const headerElement = document.createElement('p');
    headerElement.classList.add('column-header');
    if (value == null || value == '') {
        value = `Таблица №${columnIdCounter}`;
    }
    headerElement.innerHTML = value;
    addColumnForm.querySelector('textarea').value = '';
    Contenteditable(headerElement);
    const deleteColumn = document.createElement('div');
    deleteColumn.classList.add('delete-column');
    const deleteColumnTwo = document.createElement('div');
    deleteColumnTwo.classList.add('delete-column-two');
    deleteColumn.append(deleteColumnTwo);
    deleteColumn.onclick = function (event) {
        columnElement.remove();
    }
    columnElement.append(headerElement);
    columnElement.append(deleteColumn);

    const notesElement = document.createElement('div');
    notesElement.setAttribute('data-notes', '');
    notesElement.classList.add('notes');
    columnElement.append(notesElement);

    const footerElement = document.createElement('p');
    footerElement.classList.add('column-footer')
    const spanElement = document.createElement('span');
    spanElement.classList.add('action');
    spanElement.innerHTML = 'Добавить еще одну карточку';
    const vector = document.createElement('div');
    vector.classList.add('vector');
    const vectorTwo = document.createElement('div');
    vectorTwo.classList.add('vector_two');
    const formElement = document.createElement('form');
    formElement.classList.add('add-note');
    const addFormElement = document.createElement('div');
    addFormElement.setAttribute('data-action-addNote', '');
    addFormElement.classList.add('add-form');
    formElement.hidden = true;
    const textAreaElement = document.createElement('textarea');
    textAreaElement.setAttribute('placeholder', 'Введите название карточки');
    const buttonElement = document.createElement('button');
    buttonElement.setAttribute('type', 'submit');
    buttonElement.innerHTML = 'Добавить карточку';
    const cross = document.createElement('div');
    cross.classList.add('cross');
    const crossTwo = document.createElement('div');
    crossTwo.classList.add('cross_two');
    cross.append(crossTwo);
    vector.append(vectorTwo);
    formElement.append(textAreaElement);
    formElement.append(buttonElement);
    formElement.append(cross);
    addFormElement.append(vector);
    addFormElement.append(spanElement);
    footerElement.append(addFormElement);
    footerElement.append(formElement);
    columnElement.append(footerElement);

    columnProcess(columnElement);

    const wrapperColumn = document.createElement('div');
    wrapperColumn.classList.add('wrapper');
    wrapperColumn.append(columnElement);

    document.querySelector('.columns').append(wrapperColumn);

    if(document.documentElement.clientWidth - addColumnForm.getBoundingClientRect().right < 0){
        window.scrollBy(addColumnForm.getBoundingClientRect().right - document.documentElement.clientWidth, 0);
    }

    addColumnForm.hidden = true;
    addNewColumn.hidden = false;
})

addColumnForm.querySelector('.cross').addEventListener('click', function (event) {
    addColumnForm.hidden = true;
    addNewColumn.hidden = false;
})

addColumnForm.hidden = true;

document.ondragstart = function () {
    return false;
}

document
    .querySelector('[data-action-addColumn]')
    .addEventListener('click', function (event) {
        addColumnForm.hidden = false;
        this.hidden = true;
        addColumnForm.querySelector('textarea').focus();
    })
}