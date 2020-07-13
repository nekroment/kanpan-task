export function Contenteditable(element) {
    element.addEventListener('dblclick', function (event) {
        element.setAttribute('contenteditable', 'true');
        element.focus();
        element.classList.add('focus');
        document.onmousemove = null;
        document.onmouseup = null;
    });

    element.addEventListener('blur', function (event) {
        element.removeAttribute('contenteditable');
        element.classList.remove('focus');
        if (element.innerHTML == null || element.innerHTML == '' && element.classList.contains('column-header')) {
            element.closest('.column').remove();
        }
        if(element.innerHTML == null || element.innerHTML == '' && element.classList.contains('note-text')){
                element.closest('.note').remove();
        }
    });
}