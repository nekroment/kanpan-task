let draggedColumn = null;
let shadowColumn = null;
let columnPositionX = null;
let isMove = false;

export function dragstart_columnHandler(event) {

    if (!document.elementFromPoint(event.clientX, event.clientY).classList.contains('column')){
        return;
    }

    draggedColumn = this;

    const parent = event.target.parentElement;

    if (document.elementFromPoint(event.clientX, event.clientY).classList.contains('focus')) {
        return;
    }

    event.preventDefault();

    let shiftX = event.clientX - draggedColumn.getBoundingClientRect().left;
    let shiftY = event.clientY - draggedColumn.getBoundingClientRect().top;

    let timer = setInterval(() => columnPositionX = event.clientX, 20);

    function moveAt(pageX, pageY) {
        draggedColumn.style.left = pageX - shiftX + 'px';
        draggedColumn.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {

        if (!isMove && draggedColumn) {

            if (document.elementFromPoint(event.clientX, event.clientY).classList.contains('focus')) return;
            draggedColumn.classList.add('rotated');
            shadowColumn = document.createElement('div');
            shadowColumn.classList.add('shadow-column');
            shadowColumn.style.width = draggedColumn.offsetWidth + 'px';
            shadowColumn.style.height = draggedColumn.offsetHeight + 'px';
            draggedColumn.after(shadowColumn);
            draggedColumn.style.width = draggedColumn.offsetWidth + 'px';
            draggedColumn.style.height = draggedColumn.offsetHeight + 'px';
            draggedColumn.style.position = 'absolute';
            document.body.append(draggedColumn);
            draggedColumn.style.zIndex = 1000;
            document.body.append(draggedColumn);
            isMove = true;
        }
        draggedColumn.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        draggedColumn.hidden = false;
        if (elemBelow) {
            let droppableBelow = elemBelow.closest('.wrapper');
            let adderBelow = elemBelow.closest('.adder');
            let droppableColumn = elemBelow.closest('.column');
            moveAt(event.pageX, event.pageY);
            if (droppableBelow) {
                if (columnPositionX < event.clientX) {
                    droppableBelow.after(shadowColumn);
                }
                else {
                    droppableBelow.before(shadowColumn);
                }
            }
            else if (adderBelow) {
                adderBelow.before(shadowColumn);
            }
            else if (droppableColumn) {
                if (columnPositionX < event.clientX) {
                    droppableBelow.parentElement.after(shadowColumn);
                }
                else {
                    droppableBelow.parentElement.before(shadowColumn);
                }
            }

        }
    }
    document.onmousedown = function (event) {
        shadowColumn = null;
    }
    document.onmousemove = onMouseMove;

    document.onmouseup = function (event) {
        if (draggedColumn && shadowColumn) {
            draggedColumn.style.position = 'static';
            draggedColumn.style.height = '';
            draggedColumn.style.width = '';
            const newParent = document.createElement('div');
            newParent.classList.add('wrapper');
            newParent.append(draggedColumn);
            shadowColumn.after(newParent);
            shadowColumn.remove();
            parent.remove();
            draggedColumn.classList.remove('rotated');
            draggedColumn.onmouseup = null;
            draggedColumn = null;
            isMove = false;
            clearTimeout(timer);
            timer = null;
            document.onmousemove = null;
            document.onmouseup = null;
        }
        else {
            document.onmousemove = null;
        }
    }
};