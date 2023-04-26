import { keysEN } from "./keys-english.js";
import { keysRU } from "./keys-russian.js";


class Keyboard {
  constructor(options) {
    this.keys = options;
    this.shift = false;
    this.ctrl = false;
    this.alt = false;
  }


  createKeys() {
    const keyboardContainer = document.createElement("div");
    keyboardContainer.className = "keyboard";
    const textarea = document.createElement("textarea");
    textarea.className = "textarea"
    document.body.prepend(textarea);
    // Create 5 rows of keys
    for (let i = 1; i < 6; i++) {
      const row = document.createElement("div");
      row.className = "Keyboard__row";
      row.dataset.row = i;
      keyboardContainer.append(row)
      // Fill each row with rigth amount of keys
      this.keys.forEach(function(item){
        const button = document.createElement("button");
        button.className = "keyboard__key";
        if (item.row === i) {
          row.append(button)
        }
      })
      // Insert keyboard with all the rows and buttons inside them into HTML body tag (buttons are empty)
      document.body.append(keyboardContainer)
    }
  }

  initKeysValues() {
    const buttonsList = document.querySelectorAll(".keyboard__key");
    const arr = this.keys;
    const shift = this.shift;
    buttonsList.forEach(function(item, index) {
      // Fill the buttons with values. altValue is mostly for buttons which content changes while Shift button is pressed
      if (shift === false) {
        item.innerText = arr[index].value;
      } else if (shift === true) {
        item.innerText = arr[index].altValue;
      }
      // Data-code attribute is code of each key, made mostly to differ left Shift from rigth etc.
      item.dataset.code = arr[index].code;
      if (arr[index].keycode) {
        item.dataset.keycode = arr[index].keycode;
      }
      switch(arr[index].value){
        case 'Backspace':
          item.classList.add("keyboard__key_wide");
          break;

        case 'Tab':
          item.classList.add("keyboard__key_wide");
          break;

        case 'Del':
          item.classList.add("keyboard__key_wide");
          break;

        case 'CapsLock':
          item.classList.add("keyboard__key_wide");
          break;

        case 'Enter':
          item.classList.add("keyboard__key_wide");
          break;

        case 'Shift':
          item.classList.add("keyboard__key_wide");
          break;

        case 'Space':
          item.classList.add("keyboard__key_super-wide");
          break;

      }
    })
  }
}

const keyboard = new Keyboard(keysEN);


keyboard.createKeys();
keyboard.initKeysValues();


window.addEventListener('keydown', function(event) {
  console.log(event.code);
  let activeButton = document.querySelector(`[data-code="${event.which}"]`);
  if (activeButton.dataset.keycode) {
    activeButton = this.document.querySelector(`[data-keycode="${event.code}"]`)
  }
  activeButton.classList.add("keyboard__key_pressed");
  const textarea = document.querySelector(".textarea");

  // Вот тут
  // Порешать вопросик
  // Собака зарыта здесь

  textarea.focus();
  if (!activeButton.dataset.keycode) {
    event.preventDefault()
    let beforeCursor = textarea.value.slice(0, textarea.selectionStart);
    let afterCursor = textarea.value.slice(textarea.selectionStart);
    textarea.value = beforeCursor + activeButton.innerHTML + afterCursor;
    
    textarea.selectionStart = beforeCursor.length + 1;
    textarea.selectionEnd = textarea.selectionStart;



    // Ещё раз всё протестировать
    // Перепроверить
    // Мб какая ошибка закралась
    // Сразу ошибка номер раз : научить код отличать левый шифт от правого, альт и ктрл то же самое - solved!!!
    // Ошибка два: tab пихает двойной пробел в конец, вне зависимости от положения курсора

  } else if (event.code === 'Tab') {
    event.preventDefault();
    textarea.value += "  ";
  } else if (event.key === 'Shift') {
    keyboard.shift = true;
    keyboard.initKeysValues();
  } else if (event.code === 'AltLeft') {
    keyboard.alt = true;
    event.preventDefault();
  } else if (event.code === 'AltRight') {
    event.preventDefault();
  } else if (event.code === 'ControlLeft') {
    keyboard.ctrl = true;
  }

  if (keyboard.ctrl === true && keyboard.alt === true) {
    if (keyboard.keys === keysEN) {
      keyboard.keys = keysRU;
    } else {
      keyboard.keys = keysEN;
    }
    
    keyboard.initKeysValues();

  }
  
})


window.addEventListener('keyup', function(event){
  // Тут тоже глянуть, как именно я нахожу нажатую кнопку, нужно будет поменять code на which
  let activeButton = document.querySelector(`[data-code="${event.which}"]`);
  if (activeButton.dataset.keycode) {
    activeButton = this.document.querySelector(`[data-keycode="${event.code}"]`)
  }

  activeButton.classList.remove("keyboard__key_pressed");
  if (event.key === 'Shift') {
    keyboard.shift = false;
    keyboard.initKeysValues();
  } else if (event.code === 'AltLeft') {
    keyboard.alt = false;
  } else if (event.code === 'ControlLeft') {
    keyboard.ctrl = false;
  }
})


