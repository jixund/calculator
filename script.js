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

function clearDisplay() {
	const display = Array.from(document.querySelectorAll('.display'));
	console.log(display);
	display[0].innerHTML = "";
	leftParenthesisCount = 0;
	rightParenthesisSwitch = false;
	decimalSwitch = false;
	operatorSwitch = false;
	displayArray = [];
	parenthesisArray = [];
	operationLocation = [];

}

function backspace() {
	const display = Array.from(document.querySelectorAll('.display'));
	console.log(display[0].innerHTML.replace(/\s+/g,''));
	displayArray.pop();
	display[0].innerHTML = display[0].innerHTML.slice(0,-1);
}

function equalOperation() {

}

function userInput(e) {
	const testValue = this.innerHTML.replace(/\s+/g,'');
	const priorCharacterTestValue = displayArray[displayArray.length - 1];
	  //Display class is not an input logic.
	if (this.classList.contains("display")) { 
		return;
	} //If the input is a number and the right parenthesis switch is engaged, return.
	else if (!isNaN(testValue) && rightParenthesisSwitch) {
		return;
	} //Equals as input logic.
	else if (equalsCheck(testValue)) {
		equalOperation();
	} //Left parenthesis as input logic.
	else if (leftParenthesisCheck(testValue)) {
		if (displayCheckLeftParenthesis()){
				leftParenthesisCount += 1;
				console.log(leftParenthesisCount);
				const display = Array.from(document.querySelectorAll('.display'));
				display[0].innerHTML = display[0].innerHTML.replace(/\s+/g,'') + this.innerHTML.replace(/\s+/g,'');
				displayArray.push(testValue);
				parenthesisArray.push([leftParenthesisCount, displayArray.length - 1 , 0]);
		} else {
			return;
		}
	} //Right parenthesis as input logic.
	else if (rightParenthesisCheck(testValue)) {
		if( rightParenthesisSwitch){
			return;
		} else {
			if (displayCheckRightParenthesis()){
				rightParenthesisSwitch = true;
				leftParenthesisCount -= 1;
				const display = Array.from(document.querySelectorAll('.display'));
				display[0].innerHTML = display[0].innerHTML.replace(/\s+/g,'') + this.innerHTML.replace(/\s+/g,'');
				displayArray.push(testValue);
				parenthesisArray.push([leftParenthesisCount, displayArray.length - 1 ,1]);
			} else {
				return;
			}
		}
	} //Decimal as input logic.
	else if (decimalCheck(testValue)){
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
	} //Operator as input logic.
	else if (operatorCheck(testValue)){
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
				operationLocation.push([displayArray.length -1, testValue]);
			} else if (displayCheckOperator()){
				operatorSwitch = true;
				decimalSwitch = false;
				const display = Array.from(document.querySelectorAll('.display'));
				display[0].innerHTML = display[0].innerHTML.replace(/\s+/g,'') + this.innerHTML.replace(/\s+/g,'');
				displayArray.push(testValue); 
				operationLocation.push([displayArray.length -1, testValue]);
			} else {
				return;
			}
		}
	} //Clear Display.
	else if( this.classList.contains("clear") ) {
		clearDisplay();
	} else if (this.classList.contains("backspace")){
		if(decimalCheck(displayArray[displayArray.length -1])){
			decimalSwitch = false;
		} else if(rightParenthesisCheck(displayArray[displayArray.length -1])){
			rightParenthesisSwitch = false;
			parenthesisArray.pop();
		} else if(leftParenthesisCheck(displayArray[displayArray.length -1])) {
			leftParenthesisCount -= 1;
			parenthesisArray.pop();
		} else if(operatorCheck(displayArray[displayArray.length -1])) {
			operationLocation.pop();
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

//Switches and counters.
let leftParenthesisCount = 0;
let rightParenthesisSwitch = false;
let decimalSwitch = false;
let operatorSwitch = false;
let displayArray = [];
let operationLocation = [];

let leftParenthesisArray = [];
let rightParenthesisArray = [];
let operatorArray = [];
let cleanedOperatorArray = [];

let pemdasedOperatorArray = [];
let cleanedParenthesisArray = [];
let numberArray = [];

let calculationArray = [];


//Clear the display.
clearDisplay();

//Add input listener
const squares = document.querySelectorAll('.square');
squares.forEach(square => square.addEventListener('click', userInput));


function equalOperator() {
	parenthesisCleaner();
	operatorCleaner();
	pemdas();
	numberArrayConstructor();
	calculationArrayConstructor();


}

function calculationArrayConstructor() {
	//Iterate through pemdased operation array
	for(i=0;i<pemdasedOperatorArray.length;i++){
		calculationArray.push(); 
	}

}

function whereIsTheDecimal(numberInArrayForm) {
	let decimalLocation = 0;
	while(numberInArrayForm[decimalLocation] != '.'){
		decimalLocation++;
		if(decimalLocation == numberInArrayForm.length -1){
			return numberInArrayForm.length;
		}
	}
	return decimalLocation;

}

function stringToNumber(numberInArrayForm,locationOfDecimal){
	let arrayOfNumbers = [];
	let index = numberInArrayForm.length;
	let result = 0;
	for(i=0;i<index;i++){
		if(i == locationOfDecimal){
			continue;
		}
		arrayOfNumbers.push(parseFloat(numberInArrayForm[i])*Math.pow(10,i));
	}
	for(j=0;j<arrayOfNumbers.length;j++){
		result += arrayOfNumbers[j];
	}
	return result;
}

function numberArrayConstructor() {
	temporaryNumber = [];
	for(i=0; i<displayArray.length; i++){
		if(displayArray[i]='.'){
			temporaryNumber.push();
		} else if(operatorCheck(displayArray[i]) || rightParenthesisCheck(displayArray[i]) || leftParenthessiCheck(displayArray[i])){
			continue;
		} else {
			while(!(operatorCheck(displayArray[i]) || rightParenthesisCheck(displayArray[i]) || leftParenthessiCheck(displayArray[i]))){
				temporaryNumber.push(displayArray[i]);
				i++;
			}
			let decimalLocation = whereIsTheDecimal(temporaryNumber);
			let number = stringToNumber(temporaryNumber,decimalLocation);
		}
	}
}

function pemdas() {
	//Iterate through cleaned operation array and pemdas all operation arrays.
	for(i=0; i < cleanedOperatorArray.length; i++){
		let operationStringLength = cleanedOperatorArray[i].length;
		let selectedOperatorArray = cleanedOperatorArray[i];
		let temporaryOperatorStorage = [];
		for(j=0; j < operationStringLength; j++){
			//If the operator is + or -, put to the back of the array. Else, put to the front of the array.
			if(selectedOperatorArray[0][j]=='+' || selectedOperatorArray[0][j] =='-'){
				temporaryOperatorStorage.push([selectedOperatorArray[0][j],selectedOperatorArray[1][j]]);
			} else{
				temporaryOperatorStorage.unshift([selectedOperatorArray[0][j],selectedOperatorArray[1][j]]);
			}
		}
		pemdasedOperatorArray.push(temporaryOperatorStorage);
		temporaryOperatorStorage = [];
	}
}

//Orders the operation so that the first array of operations in cleanedOperatorArray is the first set of operations that should occur
function operatorCleaner() {
	let temporaryOperatorStorage = [];
	if (cleanedParenthesisArray == [])  {
		for(j = 0; j < operatorArray.length; j++){
				temporaryOperatorStorage.push(operatorArray[j]); 
			}
			cleanedOperatorArray.push(temporaryOperatorStorage);
			temporaryOperatorStorage = [];
	} else {
		for(i = 0; i < cleanedParenthesisArray.length; i++){
			for(j = 0; j < operatorArray.length; j++){
				if(operatorArray[j][1] >= cleanedParenthesisArray[i][0] && operatorArray[j][1] <= cleanedParenthesisArray[i][1]){
					temporaryOperatorStorage.push(operatorArray[j]);
				}
			}
			cleanedOperatorArray.push(temporaryOperatorStorage);
			temporaryOperatorStorage = [];
		} 		
	}
}


function parenthesisCleaner() {
	while(rightParenthesisArray.length > 0){
		let currentLeftParenthesisMax = leftParenthesisMax();
		let currentRightParenthesisMax = rightParenthesisMax();

		parenthesisArray.unshift([currentLeftParenthesisMax[0],currentRightParenthesisMax[0]]);
		leftParenthesisArray.splice(currentLeftParenthesisMax[1],1);
		rightParenthesisArray.splilce(currentRightParenthesisMax[1],1);

	}
}

function leftParenthesisMax() {
	let max = [0,0];

	for(i=0;i<leftParenthesisArray.length ; i++) {
		if(leftParenthesisArray[0][i] > max) {
			max[0] = leftParenthesisArray[0][i];
			max[1] = leftParenthesisArray[1][i];
		}
	}

	return max;
}

function rightParenthesisMax() {
	let max = [0,0];
	
	for(i=0;i<rightParenthesisArray.length ; i++) {
		if(rightParenthesisArray[0][i] > max) {
			max[0] = rightParenthesisArray[0][i];
			max[1] = rightParenthesisArray[1][i];
		}
	}	

	return max;
}