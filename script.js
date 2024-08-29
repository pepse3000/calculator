function add (a, b) {
    return parseFloat(a) + parseFloat(b);
}

function substract (a, b) {
    return parseFloat(a) - parseFloat(b);
}

function multiply (a, b) {
    return parseFloat(a) * parseFloat(b);
}

function divide (a, b) {
    return parseFloat(a) / parseFloat(b);
}

function operate (operator, a, b) {
    switch(operator) {
        case "+":
            add(a, b);
            break;
        case "-":
            substract(a, b);
            break;
        case "*":
            multiply(a, b);
            break;
        case "/":
            divide(a, b);
            break;
    }
}

function startApp() {

}

function isNumber(btn) {
    const numbers = "123456789"
    return numbers.includes(btn.textContent);
}

function addEventToEachButton () {
    const allButtons = document.querySelectorAll(".btn-input")
    const numberButtons = Object.values(allButtons).filter(isNumber)

    numberButtons.forEach((btn) => {
        btn.addEventListener("click", () => appendNumber(btn.textContent))
    })

    return numberButtons
}

function appendNumber (number) {
    output = document.querySelector(".current-output");

    if (output.textContent) {
        output.textContent += number;
    } else {
        output.textContent = number;
    }
}