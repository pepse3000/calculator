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
        case "÷":
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
    const allButtons = document.querySelectorAll(".btn-input");

    allButtons.forEach((btn) => {
        if (isNumber(btn)) {
            btn.addEventListener("click", () => appendNumber(btn.textContent));
        }

        if (btn.textContent == "AC") {
            btn.addEventListener("click", resetOutput);
        }

        if (btn.textContent == "Del") {
            btn.addEventListener("click", deleteNumber);
        }

        if (btn.textContent == ".") {
            btn.addEventListener("click", addComma);
        }

        if (btn.textContent == "+") {
            btn.addEventListener("click", () => addOperation("+"));
        }

        if (btn.textContent == "-") {
            btn.addEventListener("click", () => addOperation("-"));
        }

        if (btn.textContent == "x") {
            btn.addEventListener("click", () => addOperation("x"));
        }

        if (btn.textContent == "÷") {
            btn.addEventListener("click", () => addOperation("÷"));
        }

        if (btn.textContent == "%") {
            btn.addEventListener("click", countPercent);
        }

        if (btn.textContent == "=") {
            btn.addEventListener("click", submitOperate);
        }
    })
}

function appendNumber (number) {
    if (output.textContent.length > 15 || output.textContent == "Limit") {
        output.textContent = "Limit";
        return;
    }

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

    if (output.textContent.length > 15 || output.textContent == "Limit") {
        output.textContent = "Limit";
        return;
    }

    const input = memoryOutput.textContent.split(" ")

    if (input[3] == "%") {
        countPercent();
        return;
    }

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
        if (floatArr.length > 5) {
            return +result.toFixed(5);
        }
        
    }
    return result;
}

function countPercent() {
    let percent = output.textContent / 100;
    let input = memoryOutput.textContent.split(" ")
    let firstNumber = input[0];
    let operation = input[1];

    if (memoryOutput.textContent.split(" ")[3] == "%") {
        percent = memoryOutput.textContent.split(" ")[2]
        input = parseFloat(output.textContent)

        let result = 0;

        switch (operation) {
            case "+":
                result = input + (input * percent / 100);
                break;
            case "x":
                result = input * (input * percent / 100);
                break;
            case "÷":
                result = input / (input * percent / 100);
                break;
            case "-":
                result = input - (input * percent / 100);
                break;
        }
        
        output.textContent = checkFloat(result)
        memoryOutput.textContent = `${input} ${operation} ${percent} % =`
        return;
    }

    const result = parseFloat(firstNumber) + (firstNumber * percent)
    memoryOutput.textContent = `${firstNumber} ${operation} ${output.textContent} % =`
    output.textContent = checkFloat(result)
}

output = document.querySelector(".current-output");
memoryOutput = document.querySelector(".memory-output");

// App Init
startApp();
