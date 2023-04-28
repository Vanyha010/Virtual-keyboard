import { keyboard } from "./keyboard.js";

export function buttonClick(event) {
  if (event.target.dataset.code) {
    const textarea = document.querySelector('.textarea');
    let beforeCursor = textarea.value.slice(0, textarea.selectionStart);
    let afterCursor = textarea.value.slice(textarea.selectionStart);
    if (event.target.dataset.keycode) {
      if (event.target.dataset.keycode === 'Backspace') {
        beforeCursor = beforeCursor.slice(0, beforeCursor.length - 1);
        textarea.value = beforeCursor + afterCursor;
        textarea.selectionStart = beforeCursor.length;
        textarea.selectionEnd = textarea.selectionStart;
        textarea.focus();
      } else if (event.target.dataset.keycode === 'Tab') {
        textarea.value = beforeCursor + "   " + afterCursor;
        textarea.selectionStart = beforeCursor.length + 3;
        textarea.selectionEnd = textarea.selectionStart;
        textarea.focus();
      } else if (event.target.dataset.keycode === 'Delete') {
        afterCursor = afterCursor.slice(1);
        textarea.value = beforeCursor + afterCursor;
        textarea.selectionStart = beforeCursor.length;
        textarea.selectionEnd = textarea.selectionStart;
        textarea.focus();
      } else if (event.target.dataset.keycode === 'CapsLock') {
        if (keyboard.caps === false) {
          keyboard.caps = true;
          keyboard.initKeysValues();
        } else {
          keyboard.caps = false;
          keyboard.initKeysValues();
        }
      } else if (event.target.dataset.keycode === 'Enter') {
        textarea.value = beforeCursor + '\n' + afterCursor;
        textarea.selectionStart = beforeCursor.length + 1;
        textarea.selectionEnd = textarea.selectionStart;
        textarea.focus();
      } else if (event.target.dataset.keycode === 'ArrowLeft') {
        textarea.selectionStart--;
        textarea.selectionEnd = textarea.selectionStart;
        textarea.focus();
      } else if (event.target.dataset.keycode === 'ArrowRight') {
        textarea.selectionStart++;
        textarea.selectionEnd = textarea.selectionStart;
        textarea.focus();
      } else if (event.target.dataset.keycode === 'ArrowUp') {
        let rows = textarea.value.split(/\r\n|\r|\n/).length;
        // console.log(textarea.value.indexOf('s'))
      }

    } else {
      textarea.value = beforeCursor + event.target.textContent + afterCursor;
      textarea.selectionStart = beforeCursor.length + 1;
      textarea.selectionEnd = textarea.selectionStart;
      textarea.focus();
    }
  }
}


// Сделать стрелки
// Shift сделать отдельно через mousedown