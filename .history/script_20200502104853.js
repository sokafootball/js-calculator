/*
TO DO
-mettere feedback visivo per display troppo pieno
-gestire tasto cancella
*/
const MAX_DISPLAY_LENGTH = 15
const MAX_DECIMALS = 3
const EXPONENTIAL_NOTATION_DIGITS = MAX_DISPLAY_LENGTH - 4 //4 digits are reserved for the exponential notation and the dot
let display = document.querySelector(`#display`)
let overwriteIsOn = true
let operation = null, operand1 = null, operand2 = null
addFunctionsToBtns()

function pressDeleteBtn(){
	if(display.innerText.length == 0) return
	display.innerText = display.innerText.slice(0, -1);

}

function pressClearBtn(){
	clear()
}

function clear(){
	display.innerText = `0`
	operation = null
	operand1 = null
	operand2 = null
	overwriteIsOn = true
}

function pressEqualBtn(){
	if(operand1 != null && operand2 != null){
		displayResult()
		operation = null
		overwriteIsOn = true
		operand2 = null
	}else{
		operation = null
		overwriteIsOn = true
		operand2 = null
		display.innerText = operand1 == null ? `0` : operand1
	}
}

function displayResult(){
	operand1 = operate(operation, operand1, operand2)
	operand2 = null
	display.innerText = operand1
}

function pressNumBtn(num){
	displayNumber(Number(num))
	saveNumber()
}

function saveNumber(){
	/*
	if(operand1 == null){
	  operand1 =  Number(display.innerText)
	}else{
		operand2 = Number(display.innerText)
	}
	*/
}

function pressOperationBtn(operationSign){
	if (operation == null){
		saveOperation(operationSign)
	}else{
		if(operand1 != null && operand2 != null){
			displayResult()
		}
		saveOperation(operationSign)
	}
}

function displayNumber(num){
  if(overwriteIsOn){
		display.innerText = num
		overwriteIsOn = false
	}else{
		if(display.innerText.length >= MAX_DISPLAY_LENGTH){
			console.log(`The display is full!`)
			return
		}
		display.innerText += num
	}
}

function operate(operation, a, b){
	let result = null
	switch (operation){
		case `+`:
			operation = add
			break
		case `-`:
			operation = subtract
			break;
		case `*`:
			operation = multiply
			break
		case `/`:
			operation = divide
			break;
		default:
			console.log(`invalid operation`)
			return
	}
	result = Number(operation(a,b))
	result = truncateDecimals(result)
	result = truncateIntegers(result)
  return result
}

function add (...nums) {
	return nums.reduce((total, num) => {
		return total + num
	}, 0)
}

function subtract (...nums) {
	return nums.reduce((total, num) => {
		return total - num
	})
}

function sum (arr) {
	return add(...arr)
}

function divide (...nums){
	if (nums[1] == 0){
		console.log(`you can't divide by 0!`)
		clear()
		return 0
	}
	return nums.reduce((total, num) => total / num
	)
}

function multiply (...nums) {
	return nums.reduce((total, num) => {
		return total * num
	})
}


function saveOperation(operationSign){
	operation = operationSign
	overwriteIsOn = true
}


function addFunctionsToBtns(){
	let numButtons = document.querySelectorAll(`.num-button`)
	numButtons = Array.from(numButtons)
	numButtons.forEach(button => {
		button.addEventListener(`click`, () => pressNumBtn(button.innerText))
	});

	let opButtons = document.querySelectorAll(`.operation-button`)
	opButtons = Array.from(opButtons)
	opButtons.forEach(button => {
		button.addEventListener(`click`, () => pressOperationBtn(button.innerText))
	});

	let equalButton = document.querySelector(`#equal-button`)
	equalButton.addEventListener(`click`, pressEqualBtn)

	let clearButton = document.querySelector(`#clear-button`)
	clearButton.addEventListener(`click`, pressClearBtn)
}

function truncateDecimals(num){
	if((num % 1).toString().length > MAX_DECIMALS) return Number(num).toFixed(MAX_DECIMALS)
	return num
}

function truncateIntegers(num){
	if(num.toString().length <= MAX_DISPLAY_LENGTH) return num
	return num.toExponential(EXPONENTIAL_NOTATION_DIGITS)
}
