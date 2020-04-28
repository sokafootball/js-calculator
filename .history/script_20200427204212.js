const MAX_DISPLAY_LENGTH = 15
let operation, operand1, operand2 = null
numButtons = document.querySelectorAll(`.numButton`)
numButtons = Array.from(numButtons)
numButtons.forEach(button => {
  button.addEventListener(`click`, () => displayNumber(button.innerText))
});

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
	}
}



/*
if i press equal

*/

function displayNumber(num){
	let display = document.querySelector(`#display`)
	if(display.innerText.length >= MAX_DISPLAY_LENGTH) return
  display.innerText += num
}

function operate(operation, a, b){
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

function multiply (arr) {
	return arr.reduce((total, num) => {
		return total * num
	})
}
