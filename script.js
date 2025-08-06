let expression = '';
let pendingFunction = null;

function press(value) {
  const display = document.getElementById('display');

  // If a function key is pressed first
  if (['sin', 'cos', 'tan', 'log', 'ln', '√'].includes(value)) {
    pendingFunction = value;
    expression = '';
    updateDisplay(`${value}(`);
    return;
  }

  // Handle power operator
  if (value === '^') {
    expression += '**';
    updateDisplay(expression);
    return;
  }

  // Handle regular input
  expression += value;
  updateDisplay(pendingFunction ? `${pendingFunction}(${expression})` : expression);
}

function clearDisplay() {
  expression = '';
  pendingFunction = null;
  updateDisplay('0');
}

function calculate() {
  try {
    let result;

    if (pendingFunction) {
      const num = parseFloat(expression);
      switch (pendingFunction) {
        case 'sin':
          result = Math.sin(toRadians(num));
          break;
        case 'cos':
          result = Math.cos(toRadians(num));
          break;
        case 'tan':
          result = Math.tan(toRadians(num));
          break;
        case 'log':
          result = Math.log10(num);
          break;
        case 'ln':
          result = Math.log(num);
          break;
        case '√':
          result = Math.sqrt(num);
          break;
      }
      expression = result.toString();
      pendingFunction = null;
    } else {
      result = eval(expression);
      expression = result.toString();
    }

    updateDisplay(expression);
  } catch {
    updateDisplay('Error');
    expression = '';
    pendingFunction = null;
  }
}

function updateDisplay(value) {
  document.getElementById('display').textContent = value;
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}