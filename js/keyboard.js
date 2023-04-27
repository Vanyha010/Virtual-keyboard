import { keysEN } from "./keys-english.js";
import { keysRU } from "./keys-russian.js";


class Keyboard {
  constructor(options) {
    this.keys = options;
    this.shift = false;
    this.caps = false;
    this.ctrl = false;
    this.alt = false;
    this.lang = 'en';
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
    let shift = this.shift;
    let caps = this.caps;
    let lang = this.lang;
    buttonsList.forEach(function(item, index) {
      // Fill the buttons with values. altValue is mostly for buttons which content changes while Shift button is pressed

      if (caps === true && shift === true) {
        if (lang === 'en') {
          if (arr[index].row === 1) {
            item.innerText = arr[index].altValue
          } else {
            item.innerText = arr[index].value;
          }
        } else if (lang === 'ru') {
          if (arr[index].row === 1 && arr[index].code !== '192') {
            item.innerText = arr[index].altValue
          } else {
            item.innerText = arr[index].value;
          }
        }

      } else if (shift === false) {
        // Check this !!!!
        item.innerText = arr[index].value;
      } else if (shift === true) {
        item.innerText = arr[index].altValue;
      }

      if (caps === true && shift === false) {
        if (lang === 'en') {
          if (arr[index].code > 64 && arr[index].code < 90) {
            item.innerText = arr[index].altValue
          }
        } else if (lang === 'ru') {
          const extraCodes = ['186', '188', '190', '192', '219', '221', '222'];
          if ((arr[index].code > 64 && arr[index].code < 90) || extraCodes.includes(arr[index].code)) {
            item.innerText = arr[index].altValue
          }
        }
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
keyboard.lang = 'en';


keyboard.createKeys();
keyboard.initKeysValues();


window.addEventListener('keydown', function(event) {
  // console.log(event.code);
  let activeButton = document.querySelector(`[data-code="${event.which}"]`);
  if (activeButton.dataset.keycode) {
    activeButton = this.document.querySelector(`[data-keycode="${event.code}"]`)
  }

  if (event.code === 'Digit7') {
    console.log(activeButton.innerText)
  }

  if (activeButton.dataset.keycode !== 'CapsLock') {
    activeButton.classList.add("keyboard__key_pressed");
  } else if (activeButton.dataset.keycode === 'CapsLock') {
    if (keyboard.caps === false) {
      keyboard.caps = true;
      keyboard.initKeysValues();
      activeButton.classList.add("keyboard__key_pressed");
    } else if (keyboard.caps === true) {
      activeButton.classList.remove("keyboard__key_pressed");
      keyboard.caps = false;
      keyboard.initKeysValues();
    }
  }

  const textarea = document.querySelector(".textarea");
  textarea.focus();

  let beforeCursor = textarea.value.slice(0, textarea.selectionStart);
  let afterCursor = textarea.value.slice(textarea.selectionStart);
  if (!activeButton.dataset.keycode) {
    event.preventDefault()

    textarea.value = beforeCursor + activeButton.innerText + afterCursor;
    
    textarea.selectionStart = beforeCursor.length + 1;
    textarea.selectionEnd = textarea.selectionStart;

  } else if (event.code === 'Tab') {
    event.preventDefault();
    textarea.value = beforeCursor + "   " + afterCursor;
    
    textarea.selectionStart = beforeCursor.length + 3;
    textarea.selectionEnd = textarea.selectionStart;
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

  // Тут ещё одна работёнка для ведьмака: правильно реализовать CapsLock
  // Фронт работ: увеличить только те клавиши, что нужно, а также сделать так, чтобы при активном capslock и нажатии на shift кнопки снова становились маленькими

  if (keyboard.ctrl === true && keyboard.alt === true) {
    if (keyboard.keys === keysEN) {
      keyboard.keys = keysRU;
      keyboard.lang = 'ru';
    } else {
      keyboard.keys = keysEN;
      keyboard.lang = 'en';
    }
    
    keyboard.initKeysValues();

  }
})


window.addEventListener('keyup', function(event){
  let activeButton = document.querySelector(`[data-code="${event.which}"]`);
  if (activeButton.dataset.keycode) {
    activeButton = this.document.querySelector(`[data-keycode="${event.code}"]`)
  }

  if (activeButton.dataset.keycode !== 'CapsLock') {
    activeButton.classList.remove("keyboard__key_pressed");
  }
  
  if (event.key === 'Shift') {
    keyboard.shift = false;
    keyboard.initKeysValues();
  } else if (event.code === 'AltLeft') {
    keyboard.alt = false;
  } else if (event.code === 'ControlLeft') {
    keyboard.ctrl = false;
  }
})




// в initKeysValues добавить ещё одну проверку: на капслок, плюс одна дополнительная: на caps:true и shift:true одновременно

