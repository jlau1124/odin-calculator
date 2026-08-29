function add(a, b) {
	return a + b
};

function subtract(a, b) {
	return a - b
};

function multiply(a,b) {
  return a * b
};

function divide(a,b) {
  return a / b
}

let num1 = ""
let operator = ""
let num2 = ""


function operate(num1, operator, num2){
    if (operator === "+") {
        return add(num1, num2)
    } else if (operator === "-") {
        return subtract(num1, num2)
    } else if (operator === "*") {
        return multiply(num1, num2)
    } else if (operator === "/") {
        return divide(num1, num2)
    } else {
        return 'Error, you must enter two numbers and a valid operator'
    }
}

const display = document.querySelector(".display")


/* Query Selectors and event listeners */

const digits = document.querySelectorAll(".digits")
digits.forEach((digit) => {
    digit.addEventListener("click", (e) => {
        updateNum(e.target.textContent) // : click event => DOM element => string value. 
    })
})

let isWatingForSecondNum = false; // flag for checking if operator is clicked 

const operators = document.querySelectorAll(".operator")
operators.forEach((operator) => {
    operator.addEventListener("click", (e) => {
        num1 = display.textContent
        operator = e.target.textContent
        isWatingForSecondNum = true;
    })
})

function updateNum(currentNumber){
     num1 = num1 + currentNumber
     display.textContent = num1
}
