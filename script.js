// ==========================================
// 1. STATE / GLOBAL VARIABLES
// ==========================================
let num1 = "";
let operator = "";
let num2 = "";
let isWatingForSecondNum = false; // Flag for checking if operator was clicked


// ==========================================
// 2. DOM ELEMENTS
// ==========================================
const display = document.querySelector(".display");
const digits = document.querySelectorAll(".digits");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector("#equals");
const clear = document.querySelector("#clear");


// ==========================================
// 3. CORE MATH FUNCTIONS
// ==========================================
function add(a, b) {
    let result = a + b;
    return Number(result.toFixed(2));
}

function subtract(a, b) {
    let result = a - b;
    return Number(result.toFixed(2));
}

function multiply(a, b) {
    let result = a * b;
    return Number(result.toFixed(2));
}

function divide(a, b) {
    let result = a / b;
    return Number(result.toFixed(2));
}

function operate(num1, operator, num2) {
    if (operator === "+") {
        return add(num1, num2);
    } else if (operator === "-") {
        return subtract(num1, num2);
    } else if (operator === "*") {
        return multiply(num1, num2);
    } else if (operator === "/") {
        if (num2 === 0) {
            return "Nice try, Einstein! Hit Clear.";
        } else {
            return divide(num1, num2);
        }
    } else {
        return 'Error, you must enter two numbers and a valid operator';
    }
}


// ==========================================
// 4. DISPLAY & STATE HELPER FUNCTIONS
// ==========================================
function updateNum(currentNumber) {
    if (isWatingForSecondNum === true) {
        display.textContent = currentNumber;
        isWatingForSecondNum = false;
    } else {
        display.textContent += currentNumber;
    }
}

function clearAll() {
    num1 = "";
    operator = "";
    num2 = "";
    isWatingForSecondNum = false;
}


// ==========================================
// 5. EVENT LISTENERS
// ==========================================

// Digits Listener
digits.forEach((digit) => {
    digit.addEventListener("click", (e) => {
        updateNum(e.target.textContent);
    });
});

// Operators Listener
operators.forEach((op) => {
    op.addEventListener("click", (e) => {
        if (num1 !== null && operator !== "") { /* Operation already in progress */
            if (num2 === "") {
                operator = e.target.textContent;
            } else {
                num1 = operate(Number(num1), operator, Number(display.textContent));
                if (typeof num1 === "string") {
                    display.textContent = num1;
                    clearAll();
                } else {
                    display.textContent = num1;
                    operator = e.target.textContent;
                    isWatingForSecondNum = true;
                }
            }
        } else { /* Starting a new operation */
            num1 = Number(display.textContent);
            operator = e.target.textContent;
            isWatingForSecondNum = true;
        }
    });
});

// Equals Listener
equals.addEventListener('click', () => {
    if (num1 && operator && num2) {
        return;
    } else {
        num2 = Number(display.textContent);
        let result = operate(num1, operator, num2);
        num1 = result;
        if (typeof num1 === "string") {
            display.textContent = num1;
            clearAll();
        } else {
            isWatingForSecondNum = true;
            display.textContent = num1;
            operator = "";
            num2 = "";
        }
    }
});

// Clear Listener
clear.addEventListener('click', () => {
    display.textContent = "";
    clearAll();
});