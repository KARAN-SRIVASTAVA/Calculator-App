const resultDisplay = document.querySelector("[resultDisplay]");
const inputDisplay = document.querySelector("[inputDisplay]");
const allButtons = document.querySelectorAll(".btn");
const validKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const validOperator = ["(", ")", "%", "/", "*", "-", "+"];
let inputResult = "";
let outputResult = "0";
showOutputResult();
let cursorPosition = 0;

window.addEventListener("click", setFocus);

function clearInputScreen() {
  inputResult = "";
  showInputResult();
}

function showInputResult() {
  inputDisplay.value = inputResult;
  setFocus();
  inputDisplay.setSelectionRange(cursorPosition, cursorPosition);
}

function showOutputResult() {
  resultDisplay.innerHTML = outputResult;
}

function collectAllInput() {
  inputResult = inputDisplay.value;
}

function checkResult(data) {
  if (data == "Infinity") {
    outputResult = "Cannot divide by zero";
  }
}

function setFocus() {
  inputDisplay.focus();
}

function evaluateResult() {
  let newResult = "0";
  try {
    newResult = eval(inputResult);
    outputResult = newResult;
  } catch (err) {
    outputResult = "Syntax Error";
    console.log("Error in evaluation of expression");
    console.log(err);
  }
  showOutputResult();
}

inputDisplay.addEventListener("click", () => {
  cursorPosition = inputDisplay.selectionStart;
  console.log(cursorPosition);
});

function addValue(data) {
  inputDisplay.setSelectionRange(cursorPosition, cursorPosition);
  inputResult =
    inputResult.substring(0, cursorPosition) +
    data +
    inputResult.substring(cursorPosition);
  cursorPosition += 1;
  if (data === "()") cursorPosition += 1;
  console.log(cursorPosition);
  console.log(cursorPosition);
  showInputResult();
}

function removeCharacter() {
  if (cursorPosition === 0) return;
  inputDisplay.setSelectionRange(cursorPosition, cursorPosition);
  inputResult =
    inputResult.substring(0, cursorPosition - 1) +
    inputResult.substring(cursorPosition);
  cursorPosition -= 1;
  showInputResult();
}

function handleButtonClick(buttonValue) {
  if (buttonValue === "AC") {
    clearInputScreen();
    showInputResult();
  } else if (buttonValue === "DEL") {
    removeCharacter();
  } else if (buttonValue === "=") {
    evaluateResult();
  } else {
    addValue(buttonValue);
  }
  console.log(inputResult);
}

allButtons.forEach((button) => {
  button.addEventListener("click", () => {
    handleButtonClick(button.value);
  });
});

inputDisplay.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    if (e.key == "ArrowLeft" && cursorPosition > 0) cursorPosition -= 1;
    if (e.key == "ArrowRight" && cursorPosition < inputResult.length)
      cursorPosition += 1;
    console.log(cursorPosition);
  } else if (e.key === "Backspace") {
    removeCharacter();
    setTimeout(() => {
      showInputResult();
    }, 0);
  } else if (e.key == "Enter") {
    evaluateResult();
  } else if (validKeys.indexOf(e.key) !== -1) {
    addValue(validKeys[validKeys.indexOf(e.key)]);
    setTimeout(() => {
      showInputResult();
    }, 0);
  } else {
    if (validOperator.indexOf(e.key) !== -1) {
      addValue(validOperator[validOperator.indexOf(e.key)]);
    }
    setTimeout(() => {
      showInputResult();
    }, 0);
  }
});
