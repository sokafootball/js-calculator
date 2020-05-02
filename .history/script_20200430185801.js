const MAX_DISPLAY_LENGTH = 15
let overwriteIsOn = true
let operation = null, operand1 = null, operand2 = null
let numButtons = document.querySelectorAll(`.numButton`)
numButtons = Array.from(numButtons)
numButtons.forEach(button => {
  button.addEventListener(`click`, () => pressNumBtn(button.innerText))
});

let opButtons = document.querySelectorAll(`.opButton`)
opButtons = Array.from(opButtons)
opButtons.forEach(button => {
  button.addEventListener(`click`, () => pressOperationBtn(button.innerText))
});


/*
if i press the equal button
	if both operands are populated
		i save in operand1 the result of operand1, operand2 with operation in operationVar
		i set operand2 a null
		set operation a null
		put operand1 on display
		turn overwrite ON
	else
		set operation a null
		put operand1 on display
		set operand2 a null
		turn overwrite ON
*/

/*
if i press a num button
	if the display is full
		i return
	if overwrite is on
		i put it on display replacing what's before
		turn overwrite off
	else
		i add to the current string in display
	if operand1 is null
		i save what's in the display in operand1
	else
		i save what's in the display in operand2


*/

function pressNumBtn(num){
	if (operand1 == null){
		operand1 = Number(num)
	} else {
		operand2 = Number(num)
	}
}


/*
if i press an operation button
	if operationVar is null
		i save the operation in operationVar
		i turn overwrite ON
	else
		if both operands are populated
			i save in operand1 the result of operand1, operand2 with operation in operationVar
			i set operand2 a null
			i put on display operand1
		i save in operationVar the operation i pressed
		i turn overwrite ON
*/

function pressOperationBtn(operationSign){
	let display = document.querySelector(`#display`).innerText
	if(display == ``) return
	if (operand1 == null){
		operand1 = Number(display)
		operation = operationSign
		overwriteIsOn = true
	} else if (operand2 == null){
			operand2 = Number(display)
			operation = operationSign
			overwriteIsOn = true
	} else {
			let result = operate(operation, operand1, operand2)
			displayNumber(result)
			operand1 = null
			operand2 = null
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
  return Number(operation(a,b))
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
