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
            return add(a, b);
        case "-":
            return substract(a, b);
        case "x":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }
}

function startApp() {
    addEventToEachButton();
}

function isNumber(btn) {
    const numbers = "0123456789"
    return numbers.includes(btn.textContent);
}

function addEventToEachButton () {
    const allButtons = document.querySelectorAll(".btn-input")

    allButtons.forEach((btn) => {
        if (isNumber(btn)) {
            btn.addEventListener("click", () => appendNumber(btn.textContent))
        }

        if (btn.textContent == "AC") {
            btn.addEventListener("click", resetOutput)
        }

        if (btn.textContent == "Del") {
            btn.addEventListener("click", deleteNumber)
        }

        if (btn.textContent == ".") {
            btn.addEventListener("click", addComma)
        }

        if (btn.textContent == "+") {
            btn.addEventListener("click", () => addOperation("+"))
        }

        if (btn.textContent == "x") {
            btn.addEventListener("click", () => addOperation("x"))
        }

        if (btn.textContent == "=") {
            btn.addEventListener("click", submitOperate)
        }
    })
}

function appendNumber (number) {
    if (output.textContent && output.textContent != "0") {
        output.textContent += number;
    } else {
        output.textContent = number;
    }

}

function resetOutput () {
    output.textContent = "0"
    memoryOutput.textContent = "";
}

function deleteNumber () {
    if (output.textContent.length <= 1) {
        output.textContent = 0;
        return;
    }

    output.textContent = output.textContent.slice(0, output.textContent.length - 1);
}

function addComma () {
    if (output.textContent.includes(".")) {
        return;
    } else {
        output.textContent += ".";
    }
}

function addOperation (operation) {
    memoryOutput.textContent = output.textContent + ` ${operation} `;
    output.textContent = "0";
}

// Gets directly variables from the transaction history and/or from the current input. Performs the desired operations
function submitOperate () {
    if (output.textContent == "0" || memoryOutput.textContent == "") {
        return;
    }

    const input = memoryOutput.textContent.split(" ")
    let firstNumber = input[0];
    const operation = input[1];
    let secondNumber = 0;

    if (input[2] == "") {
        secondNumber = output.textContent;
    } else {
        firstNumber = output.textContent;
        secondNumber = input[2];
    }
    
    let result = operate(operation, firstNumber, secondNumber);
    
    let floatResult = checkFloat(result);

    output.textContent = floatResult;
    memoryOutput.textContent = `${firstNumber} ${operation} ${secondNumber} =`;
}

// Checks the number of zeros after the decimal point. If more than 5, rounds up
function checkFloat(result) {
    const splittedResult = result.toString().split("");
    if (splittedResult.includes(".")) {
        const floatArr = splittedResult.slice(splittedResult.indexOf(".") + 1);
        console.log(floatArr)
        if (floatArr.length > 5) {
            return +result.toFixed(5);
        }
        
    }
    return result;
}

output = document.querySelector(".current-output");
memoryOutput = document.querySelector(".memory-output")

// App Init
startApp();