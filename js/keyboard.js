import { keysEN } from "./keys-english.js";



class Keyboard {
  constructor(options) {
    this.keys = options;
    this.shift = false;
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


keyboard.createKeys()
keyboard.initKeysValues()