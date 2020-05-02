const MAX_DISPLAY_LENGTH = 15
let display = document.querySelector(`#display`)
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

function pressEqualBtn(){

}

function pressNumBtn(num){
	displayNumber(Number(num))
	saveNumber()
}

function saveNumber(){
	if(operand1 == null){
	  operand1 = Number(display.innerText)
	}else{
		operand2 = Number(display.innerText)
	}
}

function pressOperationBtn(operationSign){
	if (operation == null){
		saveOperation(operationSign)
	}else{
		if(operand1 != null && operand2 != null){
			operand1 = operate(operation, operand1, operand2)
			operand2 = null
			display.innerText = operand1
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


function saveOperation(operationSign){
	operation = operationSign
	overwriteIsOn = true
}