const MAX_DISPLAY_LENGTH = 15
let overwriteIsOn = true
let operation, operand1, operand2 = null
let numButtons = document.querySelectorAll(`.numButton`)
numButtons = Array.from(numButtons)
numButtons.forEach(button => {
  button.addEventListener(`click`, () => displayNumber(button.innerText))
});

let operationButtons = document.querySelectorAll(`.opButton`)

/*
if i press an operator button
	if there is something in the display
		if operand1 is null
			save the number in operand1
			save the operation in operation variable
		else
			if operand 2 is null
				save it in operand2
				assign it to operand1 result of operate with operand1 operand2 and operation variables
				set operand2 to null
				set operation to new operation pressed
				set display to operand1
*/

function pressOperationBtn(operationSign){
	let display = document.querySelector(`#display`).innerText
	if(display == ``) return
	if (operand1 == null){
		operand1 = display
		operation = operationSign
		overwriteIsOn = true
	} else {
		operand2 = display
		operand1 = operate(operation, operand1, operand2)
		operand2 = null
		operation = operationSign
		displayNumber(operand1)
	}
}

function displayNumber(num){
	let display = document.querySelector(`#display`)
	if(display.innerText.length >= MAX_DISPLAY_LENGTH) return
  if(overwriteIsOn){
		display.innerText = num
		overwriteIsOn = false
	}else{
		display.innerText += num
	}
}

function operate(operation, a, b){
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
	}
  return(operation(a,b))
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
	return nums.reduce((total, num) => total / num
	)
}

function multiply (arr) {
	return arr.reduce((total, num) => {
		return total * num
	})
}
