const resultDisplay = document.querySelector("[resultDisplay]");
const inputDisplay = document.querySelector("[inputDisplay]");
const allButtons = document.querySelectorAll(".btn");
const validCharacters = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "(", ")", "%", "/", "*", "-", "+"];

let inputResult = "";
let outputResult = "0";
let cursorPosition = 0;

// Display the initial output result
showOutputResult();

// Set focus on the input display when the window is clicked
window.addEventListener("click", setFocus);

// Clear the input screen
function clearInputScreen() {
  inputResult = "";
  showInputResult();
}

// Display the input result in the input display
function showInputResult() {
  inputDisplay.value = inputResult;
  setFocus();
  inputDisplay.setSelectionRange(cursorPosition, cursorPosition);
}

// Display the output result in the result display
function showOutputResult() {
  resultDisplay.innerHTML = outputResult;
}

// Collect all input from the input display
function collectAllInput() {
  inputResult = inputDisplay.value;
}

// Check the result for special cases
function checkResult(data) {
  if (data == "Infinity") {
    outputResult = "Cannot divide by zero";
  }
}

// Set focus on the input display
function setFocus() {
  inputDisplay.focus();
}

// Evaluate the input result
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

// Update the cursor position when the input display is clicked
inputDisplay.addEventListener("click", () => {
  cursorPosition = inputDisplay.selectionStart;
});

// Add a value to the input result at the current cursor position
function addValue(data) {
  inputResult =
    inputResult.substring(0, cursorPosition) +
    data +
    inputResult.substring(cursorPosition);
  cursorPosition += 1;
  // () is only special key which one have two characters
  if (data === "()") cursorPosition += 1;
  showInputResult();
}

// Remove the character at the current cursor position
function removeCharacter() {
  // handling the case when the cursor is located at initial position and request comes to delete a character
  if (cursorPosition === 0) return;
  inputDisplay.setSelectionRange(cursorPosition, cursorPosition);
  inputResult =
    inputResult.substring(0, cursorPosition - 1) +
    inputResult.substring(cursorPosition);
  cursorPosition -= 1;
  showInputResult();
}

// Handle the button click events
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
}

// Attach click event listeners to all the buttons
allButtons.forEach((button) => {
  button.addEventListener("click", () => {
    handleButtonClick(button.value);
  });
});

// Handle keydown events on the input display
inputDisplay.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    // handling edge cases
    if (e.key == "ArrowLeft" && cursorPosition > 0) cursorPosition -= 1;
    if (e.key == "ArrowRight" && cursorPosition < inputResult.length)
      cursorPosition += 1;
  } else if (e.key === "Backspace") {
    removeCharacter();
    setTimeout(() => {
      showInputResult();
    }, 0);
  } else if (e.key == "Enter") {
    evaluateResult();
  } else if (validCharacters.indexOf(e.key) !== -1) {
    addValue(validCharacters[validCharacters.indexOf(e.key)]);
    // setTimeout is used to show results after adding a value to the input
    setTimeout(() => {
      showInputResult();
    }, 0);
  }
});
