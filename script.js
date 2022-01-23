let firstOperand = '';
let secondOperand = '';
let currentOperation = null;
let shouldResetScreen = false;

const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.getElementById('equal-btn');
const allClearButton = document.getElementById('all-clear-btn');
const clearButton = document.getElementById('clear-btn');
const dotButton = document.getElementById('dot-btn');
const lastDisplay = document.getElementById('last-display');
const currentDisplay = document.getElementById('current-display');

window.addEventListener('keydown', handleKeyboardInput);
equalsButton.addEventListener('click', evaluate);
allClearButton.addEventListener('click', clear);
clearButton.addEventListener('click', deleteNumber);
dotButton.addEventListener('click', appendDot);

numberButtons.forEach((button) =>
    button.addEventListener('click', () => appendNumber(button.textContent))
)

function appendNumber(number) {
    if(currentDisplay.textContent === '0' || shouldResetScreen)
        resetScreen()
    currentDisplay.textContent += number
}

function resetScreen() {
    currentDisplay.textContent = ''
    shouldResetScreen = false
}

function clear() {
    currentDisplay.textContent = '0'
    lastDisplay.textContent = ''
    firstOperand = ''
    secondOperand = ''
    currentOperation = null
}

function appendDot() {
    if(shouldResetScreen) resetScreen()
    if(currentDisplay.textContent === '')
        currentDisplay.textContent = '0'
    if(currentDisplay.textContent.includes('.')) return
    currentDisplay.textContent += '.'
}

function deleteNumber() {
    currentDisplay.textContent = currentDisplay.textContent
    .toString()
    .slice(0, -1)
}

function setOperation(operator) {
    if(currentOperation !== null) evaluate()
    firstOperand = currentDisplay.textContent
    currentOperation = operator
    lastDisplay.textContent = `${firstOperand} ${currentOperation}`
    shouldResetScreen = true
}

function evaluate() {
    if(currentOperation === null || shouldResetScreen) return
    if(currentOperation === '÷' && currentDisplay.textContent === '0') {
        alert('You can\'t divide by 0!')
        return
    }
    secondOperand = currentDisplay.textContent
    currentDisplay.textContent = roundResult(
        operate(currentOperation, firstOperand, secondOperand)
    )
    lastDisplay.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
    currentOperation = null
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000
}

operatorButtons.forEach((button) =>
    button.addEventListener('click', () => setOperation(button.textContent))
)

function handleKeyboardInput(e) {
    if(e.key >= 0 && e.key <= 9) appendNumber(e.key)
    if(e.key === '.') appendDot()
    if(e.key === '=' || e.key === 'Enter') evaluate()
    if(e.key === 'Backspace') deleteNumber()
    if(e.key === 'Escape') clear()
    if(e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
        setOperation(convertOperator(e.key)) 
}

function convertOperator(keyboardOperator) {
    if(keyboardOperator === '/') return '÷'
    if(keyboardOperator === '*') return 'x'
    if(keyboardOperator === '-') return '-'
    if(keyboardOperator === '+') return '+'
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    a = Number(a)
    b = Number(b)

    switch(operator) {
        case '+':
            return add(a, b);
            break;
        case '-':
            return subtract(a, b);
            break;
        case 'x':
            return multiply(a, b);
            break;
        case '÷':
            if(b === 0) return null
            else return divide(a, b);
            break;
        default:
            return null          
    }
}