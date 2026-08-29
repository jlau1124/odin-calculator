function add(a, b) {
    let result = a + b;
	return Number(result.toFixed(2));
}

function subtract(a, b) {
    let result = a - b;
	return Number(result.toFixed(2));
}

function multiply(a, b) {
    let result = a * b
    return Number(result.toFixed(2));
}

function divide(a, b) {
    let result = a / b
    return Number(result.toFixed(2));
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
        if (num2 === 0) {
            return "Nice try, Einstein! Hit Clear."
        }
        else{
            return divide(num1, num2)
        }
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
operators.forEach((op) => {
    op.addEventListener("click", (e) => {
        // console.log(num1, operator, num2)
        if (num1 !== null && operator !== "") { /* that means there is an operation going*/
            num1 = operate(Number(num1), operator, Number(display.textContent));
            if (typeof num1 === "string") {
                display.textContent = num1;
                clearAll();
            } else {
                display.textContent = num1;
                operator = e.target.textContent;
                isWatingForSecondNum = true;
            }
        } else { /* no operation is going*/
            num1 = Number(display.textContent);
            operator = e.target.textContent;
            isWatingForSecondNum = true;
        }
    })
})

function updateNum(currentNumber){
     if (isWatingForSecondNum === true) {
        display.textContent = currentNumber;
        isWatingForSecondNum = false;
     } else {
        display.textContent += currentNumber;
     }
}

const equals = document.querySelector("#equals")
equals.addEventListener('click', () => {
    if (num1 && operator && num2) { /* if we don't have all 3 */
        return 
    } else {
        num2 = Number(display.textContent);
        let result = operate(num1, operator, num2);
        num1 = result;
        if (typeof num1 === "string") {
            display.textContent = num1;
            clearAll()
        }
        else {
            isWatingForSecondNum = true;
            display.textContent = num1;
            operator = "";
            num2 = "";
        }
    }

})

const clear = document.querySelector("#clear")
clear.addEventListener('click', () => {
    display.textContent = "";
    clearAll();
})

function clearAll(){
    num1 = "";
    operator = "";
    num2 = "";
    isWatingForSecondNum = false;
}