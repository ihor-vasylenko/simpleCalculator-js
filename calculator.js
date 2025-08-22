const buttonValues = [
  'AC',
  '+/-',
  '%',
  '÷',
  '7',
  '8',
  '9',
  '×',
  '4',
  '5',
  '6',
  '-',
  '1',
  '2',
  '3',
  '+',
  '0',
  '.',
  '=',
];

const rightSymbols = ['÷', '×', '-', '+', '='];
const topSymbols = ['AC', '+/-', '%'];

const display = document.getElementById('display');

// A+B A-B A/B A*B
let A = 0;
let operator = null;
let B = null;

function clearALL() {
  A = 0;
  operator = null;
  B = null;
}

// render buttons
for (let i = 0; i < buttonValues.length; i++) {
  let value = buttonValues[i];
  let button = document.createElement('button');
  button.innerHTML = value;

  // style '0' button
  if (value === '0') {
    button.style.width = '160px';
    button.style.gridColumn = 'span 2';
  }

  // style right and top buttons
  if (rightSymbols.includes(value)) {
    button.style.backgroundColor = '#FF9500';
  } else if (topSymbols.includes(value)) {
    button.style.backgroundColor = '#D4D4D2';
    button.style.color = '#1C1C1C';
  }

  // process buttons
  function processButtonInput() {
    // operators
    if (rightSymbols.includes(value)) {
      if (value === '=') {
        if (A !== null) {
          B = display.value;
          let numA = Number(A);
          let numB = Number(B);
          if (operator === '÷') {
            display.value = numA / numB;
          } else if (operator === '×') {
            display.value = numA * numB;
          } else if (operator === '+') {
            display.value = numA + numB;
          } else if (operator === '-') {
            display.value = numA - numB;
          }
          clearALL();
        }
      } else {
        operator = value;
        A = display.value;
        display.value = '';
      }
    } else if (topSymbols.includes(value)) {
      if (value === 'AC') {
        clearALL();
        display.value = '';
      } else if (value === '+/-') {
        // toggle '-', do nothing when input does have nothing
        if (display.value != '' && display.value != '0') {
          display.value = display.value * -1;
        }
      } else if (value === '%') {
        display.value = Number(display.value) / 100;
      }
    } else {
      // numbers or .
      if (value === '.') {
        // prevents multiple dots: 5.5 instead of 5....5
        if (display.value !== '' && !display.value.includes(value)) {
          display.value += value;
        }
      }
      // replace leading 0 with new input, avoid multiple starting zeros
      else if (display.value === '0') {
        display.value = value;
      } else {
        display.value += value;
      }
    }
  }

  button.addEventListener('click', processButtonInput);

  document.getElementById('buttons').insertAdjacentElement('beforeend', button);
}
