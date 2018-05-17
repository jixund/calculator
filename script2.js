function add(numberOne, numberTwo) {
	return numberOne + numberTwo;
}

function subtract(numberOne, numberTwo) {
	return numberOne - numberTwo;
}

function multiply(numberOne, numberTwo) {
	return numberOne * numberTwo;
}

function divide(numberOne, numberTwo) {
	return numberOne / numberTwo;
}

function operate(numberOne, numberTwo, operator) {
	return operator(numberOne, numberTwo);
}

function clearDisplay() {
	const display = Array.from(document.querySelectorAll('.display'));
	console.log(display);
	display[0].innerHTML = "";
	displayArray = [];
	leftParenthesisCount = 0;
	rightParenthesisSwitch = false;
	decimalSwitch = false;
	operatorSwitch = false;

}

function displayCheckNumberForDecimal() {
	const display = Array.from(document.querySelectorAll('.display'));
	const displayTest = parseFloat(displayArray[displayArray.length -1]);
	if (isNaN(displayTest)){
		return false;
	} else {
		return true;
	}

}

function displayCheckOperator() {
	const display = Array.from(document.querySelectorAll('.display'));
	const displayText = display[0].innerHTML;
	if (displayText == ""){
		return false;
	} else if(operatorCheck(displayText.substr(displayText.length - 1 ))) {
		return false;
	} else if (decimalCheck(displayArray[displayArray.length -1])) {
		return false;
	} else {
		return true;
	}
}

function displayCheckDecimal() {
	const display = Array.from(document.querySelectorAll('.display'));
	const displayText = display[0].innerHTML;
	if(decimalCheck(displayText.substr(displayText.length - 1 ))) {
		return false;
	} else {
		return true;
	}
}

function displayCheckLeftParenthesis() {
	const display = Array.from(document.querySelectorAll('.display'));
	const displayText = display[0].innerHTML;
	if(decimalCheck(displayText.substr(displayText.length - 1 ))) {
		return false;
	} else if( !isNaN(displayArray[displayArray.length -1]) ) {
		return false;
	} else if (rightParenthesisCheck(displayArray[displayArray.length-1])) {
		console.log("Yay.");
		return false;
	} else {
		return true;
	}
}

function displayCheckRightParenthesis() {
	const display = Array.from(document.querySelectorAll('.display'));
	const displayText = display[0].innerHTML;
	if(decimalCheck(displayText.substr(displayText.length - 1 ))) {
		return false;
	} else if (leftParenthesisCount <= 0){
		return false;
	} else if ( operatorCheck(displayArray[displayArray.length -1]) ) {
		return false;
	}else{
		return true;
	}
}

function backspace() {
	const display = Array.from(document.querySelectorAll('.display'));
	console.log(display[0].innerHTML.replace(/\s+/g,''));
	displayArray.pop();
	display[0].innerHTML = display[0].innerHTML.slice(0,-1);
}

function decimalCheck(test) {
	if ( test == '.') {
		return true;
	}
}

function equalsCheck(test) {
	if (test == '=') {
		return true;
	}
}

function leftParenthesisCheck(test) {
	if (test == '(') {
		return true;
	}
}

function rightParenthesisCheck(test) {
	if (test == ')') {
		return true;
	}
}

function operatorCheck(test) {
	if( test == '*' || 
		test == '-' || 
		test == '+' ||
		test == '/'
		) {
			return true;
	}
}

function userInput(e) {
	const testValue = this.innerHTML.replace(/\s+/g,'');
	const priorCharacterTestValue = displayArray[displayArray.length - 1];
	if (this.classList.contains("display")) { 
		return;
	} else if (!isNaN(testValue) && rightParenthesisSwitch) {
		return;
	} else if (equalsCheck(testValue)) {

	} else if (leftParenthesisCheck(testValue)) {
		if (displayCheckLeftParenthesis()){
				leftParenthesisCount += 1;
				console.log(leftParenthesisCount);
				const display = Array.from(document.querySelectorAll('.display'));
				display[0].innerHTML = display[0].innerHTML.replace(/\s+/g,'') + this.innerHTML.replace(/\s+/g,'');
				displayArray.push(testValue);
		} else {
			return;
		}
	} else if (rightParenthesisCheck(testValue)) {
		if( rightParenthesisSwitch){
			return;
		} else {
			if (displayCheckRightParenthesis()){
				rightParenthesisSwitch = true;
				leftParenthesisCount -= 1;
				const display = Array.from(document.querySelectorAll('.display'));
				display[0].innerHTML = display[0].innerHTML.replace(/\s+/g,'') + this.innerHTML.replace(/\s+/g,'');
				displayArray.push(testValue);
			} else {
				return;
			}
		}
	} else if (decimalCheck(testValue)){
		if( decimalSwitch){
			return;
		} else {
			if (displayCheckDecimal() && displayCheckNumberForDecimal()){
				decimalSwitch = true;
				const display = Array.from(document.querySelectorAll('.display'));
				display[0].innerHTML = display[0].innerHTML.replace(/\s+/g,'') + this.innerHTML.replace(/\s+/g,'');
				displayArray.push(testValue);
			} else {
				return;
			}
		}
	} else if (operatorCheck(testValue)){
		if( operatorSwitch ){
			return;
		} else {
			if (displayCheckOperator() && rightParenthesisCheck(priorCharacterTestValue)){
				operatorSwitch = true;
				decimalSwitch = false;
				rightParenthesisSwitch = false;
				const display = Array.from(document.querySelectorAll('.display'));
				display[0].innerHTML = display[0].innerHTML.replace(/\s+/g,'') + this.innerHTML.replace(/\s+/g,'');
				displayArray.push(testValue);
			} else if (displayCheckOperator()){
				operatorSwitch = true;
				decimalSwitch = false;
				const display = Array.from(document.querySelectorAll('.display'));
				display[0].innerHTML = display[0].innerHTML.replace(/\s+/g,'') + this.innerHTML.replace(/\s+/g,'');
				displayArray.push(testValue); 
			} else {
				return;
			}
		}
	} else if( this.classList.contains("clear") ) {
		//Clear Display
		clearDisplay();
	} else if (this.classList.contains("backspace")){
		if(decimalCheck(displayArray[displayArray.length -1])){
			decimalSwitch = false;
		} else if(rightParenthesisCheck(displayArray[displayArray.length -1])){
			rightParenthesisSwitch = false;
		} else if(leftParenthesisCheck(displayArray[displayArray.length -1])) {
			leftParenthesisCount -= 1;
		}
		backspace();
		operatorSwitch = false;
	} else {
		console.log(this.classList);
		const display = Array.from(document.querySelectorAll('.display'));
		console.log(this.innerHTML);
		display[0].innerHTML = display[0].innerHTML.replace(/\s+/g,'') + this.innerHTML.replace(/\s+/g,'');
		displayArray.push(testValue);
		operatorSwitch = false;
		console.log(displayArray);
	}
}

let leftParenthesisCount = 0;
let rightParenthesisSwitch = false;
let decimalSwitch = false;
let operatorSwitch = false;
let displayArray = [];

//Clear the display.
clearDisplay();

//Add input listener
const squares = document.querySelectorAll('.square');
squares.forEach(square => square.addEventListener('click', userInput));
