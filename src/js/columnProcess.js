import {dragstart_columnHandler} from './columnMove.js';
import {Contenteditable} from './contenteditable.js';
import {dragstart_noteHandler} from './noteMove.js';

let noteIdCounter = document.querySelectorAll('.note').length;

function noteProcess(noteElement) {

    Contenteditable(noteElement.querySelector('.note-text'));

    noteElement.addEventListener('mousedown', dragstart_noteHandler);
}

export function columnProcess(columnElement) {

    const addNote = columnElement.querySelector('[data-action-addNote]');
    const formNote = columnElement.querySelector('.add-note');

    addNote.addEventListener('click', function (event) {
        formNote.hidden = false;
        addNote.hidden = true;
        formNote.querySelector('textarea').focus();
    })

    Contenteditable(formNote.querySelector('textarea'));

    formNote.addEventListener('submit', function (event) {
        event.preventDefault();
        let value = formNote.querySelector('textarea').value;
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.setAttribute('data-note-id', noteIdCounter);
        const noteText = document.createElement('div');
        noteText.classList.add('note-text');
        noteIdCounter++;
        if (value == null || value == '') {
            value = `План №${noteIdCounter}`;
        }
        noteText.innerHTML = value;
        formNote.querySelector('textarea').value = '';
        const deleteCross = document.createElement('img');
        deleteCross.setAttribute('src', './cross.png')
        deleteCross.classList.add('cross-img');
        deleteCross.onclick = function (event) {
            noteElement.remove();
        }
        noteElement.append(noteText);
        noteElement.append(deleteCross);
        noteProcess(noteElement);
        columnElement.querySelector('[data-notes]').append(noteElement);

        if (columnElement.querySelector('[data-notes]').clientHeight - noteElement.getBoundingClientRect().bottom < 0) {
            columnElement.querySelector('[data-notes]').scrollBy(0, noteElement.getBoundingClientRect().bottom - columnElement.querySelector('[data-notes]').clientHeight);
        }

        formNote.hidden = true;
        addNote.hidden = false;
    })

    formNote.querySelector('.cross').addEventListener('click', function (event) {
        formNote.hidden = true;
        addNote.hidden = false;
    })

    columnElement.addEventListener('mousedown', dragstart_columnHandler)

    const headerElement = columnElement.querySelector('.column-header');
    Contenteditable(headerElement);
}