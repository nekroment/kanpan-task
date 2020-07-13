
let draggedNote = null;
let shadowNote = null;
let isMove = false;
let lastNote = false;

export function dragstart_noteHandler(event) {

    draggedNote = this;

    if (draggedNote.querySelector('.note-text').classList.contains('focus')) {
        return;
    }
    if (document.elementFromPoint(event.clientX, event.clientY).classList.contains('delete-note')){
        return;
    }
    if (document.elementFromPoint(event.clientX, event.clientY).classList.contains('delete-note-two')){
        return;
    }

    event.preventDefault();

    let shiftX = event.clientX - draggedNote.getBoundingClientRect().left;
    let shiftY = event.clientY - draggedNote.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
        draggedNote.style.left = pageX - shiftX + 'px';
        draggedNote.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {

        if (draggedNote && draggedNote.classList.contains('focus')) {
            return;
        }
        if (!isMove) {
            draggedNote.classList.add('rotated');
            shadowNote = document.createElement('div');
            shadowNote.classList.add('shadow');
            shadowNote.style.width = draggedNote.offsetWidth + 'px';
            shadowNote.style.height = draggedNote.offsetHeight + 'px';
            draggedNote.after(shadowNote);
            draggedNote.style.width = draggedNote.offsetWidth + 'px';
            draggedNote.style.height = draggedNote.offsetHeight + 'px';
            draggedNote.style.position = 'absolute';
            document.body.append(draggedNote);
            draggedNote.style.zIndex = 1000;
            document.body.append(draggedNote);
            isMove = true;
        }
        draggedNote.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        draggedNote.hidden = false;
        let droppableBelow = elemBelow.closest('.note');
        let droppableFooter = elemBelow.closest('.column-footer');
        let droppableWrapper = elemBelow.closest('.wrapper');
        let droppableColumn = elemBelow.closest('.column');
        moveAt(event.pageX, event.pageY);
        if (droppableBelow) {
            droppableBelow.before(shadowNote);
            lastNote = true;
        }
        else if (droppableFooter) {
            droppableFooter.previousElementSibling.append(shadowNote);
            lastNote = true;
        }
        else if (droppableWrapper && !droppableColumn) {
            setTimeout(() => lastNote = false, 50);
            if (!lastNote) {
                droppableWrapper.lastElementChild.lastElementChild.previousElementSibling.append(shadowNote);
                lastNote = true;
            }
        }
    }

    document.onmousemove = onMouseMove;

    document.onmouseup = function () {
        if (draggedNote && shadowNote) {
            isMove = false;
            draggedNote.style.position = 'static';
            draggedNote.style.height = '';
            draggedNote.style.width = '';
            shadowNote.after(draggedNote);
            shadowNote.remove();
            draggedNote.classList.remove('rotated');
            draggedNote.onmouseup = null;
            draggedNote = null;
            document.onmousemove = null;
            document.onmouseup = null;

        }
    }
};