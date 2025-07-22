const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const toggleTheme = document.getElementById('toggle-theme');
let currentInput = '';
let isDark = false;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');
    handleInput(value);
  });
});

document.addEventListener('keydown', (e) => {
  const allowedKeys = '0123456789+-*/.^%';
  if (allowedKeys.includes(e.key)) {
    handleInput(e.key);
  } else if (e.key === 'Enter') {
    handleInput('=');
  } else if (e.key === 'Backspace') {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
  } else if (e.key.toLowerCase() === 'c') {
    handleInput('C');
  }
});

toggleTheme.addEventListener('change', () => {
  document.body.classList.toggle('dark');
});

function handleInput(value) {
  if (value === 'C') {
    currentInput = '';
  } else if (value === '=') {
    try {
      currentInput = evaluateExpression(currentInput);
    } catch {
      currentInput = 'Error';
    }
  } else if (value === '√') {
    try {
      currentInput = Math.sqrt(eval(currentInput)).toString();
    } catch {
      currentInput = 'Error';
    }
  } else if (value === '^') {
    currentInput += '**';
  } else {
    currentInput += value;
  }
  updateDisplay();
}

function updateDisplay() {
  display.value = currentInput;
}

function evaluateExpression(expr) {
  return Function('"use strict";return (' + expr + ')')();
}
