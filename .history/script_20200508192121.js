/*
CODE BY LAURENT CAPELLO

-remove opacity when button is activated
*/

//#region STARTUP
const MAX_DISPLAY_LENGTH = 11
const MAX_DECIMALS = 3
const EXPONENTIAL_NOTATION_DIGITS = MAX_DISPLAY_LENGTH - 4 //4 digits are reserved for the exponential notation and the dot
let display = document.querySelector(`#display`)
let overwriteIsOn = true
let operation = null, operand1 = null, operand2 = null

// let allButtons = document.querySelectorAll(`.button`)
// allButtons = Array.from(allButtons)
// allButtons.forEach(button => {
// 	button.addEventListener(`click`, () => button.classList.add(`button-pressed`))
// });

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

let bckSpaceBtn = document.querySelector(`#backspace`)
bckSpaceBtn.addEventListener(`click`, pressBackspaceBtn)

let decimalBtn = document.querySelector(`#decimal-button`)
decimalBtn.addEventListener(`click`, pressDecimalBtn)

document.onkeydown = (e) => filterKeyPress(e)

function filterKeyPress(e){
	console.log(`key pressed`)
	if (e.which <= 105 && e.which >= 96){
		pressNumBtn(Number(e.key))
	} else if (e.which == 106 || e.which == 107 || e.which == 109 || e.which == 111) {
		pressOperationBtn(e.key)
	} else if (e.which == 13){
		pressEqualBtn()
	} else if (e.which == 110){
		pressDecimalBtn()
	} else if (e.which == 8){
		pressBackspaceBtn()
	}
}
//#endregion

//#region SUPPORT FUNCTIONS
function clear(){
	display.innerText = `0`
	operation = null
	operand1 = null
	operand2 = null
	overwriteIsOn = true
}

function displayNumber(num){
	if(num == 0 && display.innerText == `0`) return
  if(overwriteIsOn){
		if(num == `.`){
			display.innerText += num
		}else{
			display.innerText = num
		}
		overwriteIsOn = false
	}else{
		if(display.innerText.length >= MAX_DISPLAY_LENGTH){
			animateDisplay()
			return
		}
		display.innerText += num
	}
}

function displayResult(){
	operand1 = operate(operation, operand1, operand2)
	operand2 = null
	display.innerText = truncateIntegers(operand1)

}

function saveNumber(){
	if(operation == null)
		operand1 =  Number(display.innerText)
	else operand2 =  Number(display.innerText)
}

function saveOperation(operationSign){
	operation = operationSign
	overwriteIsOn = true
}

function truncateDecimals(num){
	if((num % 1).toString().length > MAX_DECIMALS) return Number(num).toFixed(MAX_DECIMALS)
	return num
}

function truncateIntegers(num){
	if(num.toString().length <= MAX_DISPLAY_LENGTH) return num
	return num.toExponential(EXPONENTIAL_NOTATION_DIGITS)
}
//#endregion

//#region BUTTONS FUNCTIONS
function highLightBtn(button){
	button.classList.add(`button-pressed`)
	setTimeout( () => button.classList.remove(`button-pressed`), 100)
}

function pressBackspaceBtn(){
	if(display.innerText.length == 1){
		display.innerText = `0`
	}else{
		let displayArray = Array.from(display.innerText)
		displayArray.pop()
		display.innerText = displayArray.join(``)
	}
	saveNumber()
}

function pressDecimalBtn(){
	if (display.innerText.includes(`.`)) return
	displayNumber(`.`)
	saveNumber()
}

function pressClearBtn(){
	clear()
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

function pressNumBtn(num){
	highLightBtn(numButtons.find(btn => btn.innerText == num))
	displayNumber(Number(num))
	saveNumber()
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
//#endregion

//#region MATH FUNCTIONS
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
  return Number(result)
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
//#endregion

//#region DISPLAY ANIMATION FUNCTIONS
function convertDuration(durationString){
	let duration = Number(durationString.replace(`s`, ``))
	return duration * 1000
}

function animateDisplay(){
	let animDurationString = getComputedStyle(document.querySelector(`.display-full`)).animationDuration
	const ANIM_DURATION = convertDuration(animDurationString)
	display.classList.remove(`display-full`)
	display.classList.add(`display-full`)
	setTimeout(() => display.classList.remove(`display-full`), ANIM_DURATION);
}
//#endregion











