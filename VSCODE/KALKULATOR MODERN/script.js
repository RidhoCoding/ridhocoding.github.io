const displayBox = document.querySelector(".display"),
    displayInput = document.querySelector(".display-input"),
    displayResult = document.querySelector(".display-result"),
    buttons = document.querySelectorAll("button"),
    operators = ["%", "÷", "×", "-", "+"]
let input = "",
    result = "";


const calculate = btnValue => {

    if (btnValue === "AC") {
        input = "";
        result = "";
        displayBox.classList.remove("active");
    } else if (btnValue === "=") {
        const formattedInput = replaceOperators(input);
        try {
            const calculatedValue = eval(formattedInput);
            result = calculatedValue;
            input = result.toString();
        } catch {
            result = "Error";
            input = "";
        }
        displayBox.classList.add("active");
    } else {
        input += btnValue;
    }

    displayInput.value = input;
    displayResult.value = result;
    displayInput.scrollLeft = displayInput.scrollWidth;
};

const replaceOperators = input => input.replaceAll("÷", "/").replaceAll("×", "*");

buttons.forEach(button => 
    button.addEventListener("click", e => calculate(e.target.textContent))
);