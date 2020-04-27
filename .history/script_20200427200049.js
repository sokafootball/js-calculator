const MAX_DISPLAY_LENGTH = 15
numButtons = document.querySelectorAll(`.numButton`)
numButtons = Array.from(numButtons)
numButtons.forEach(button => {
  button.addEventListener(`click`, () => displayNumber(button.innerText))
});

function displayNumber(num){
	display = document.querySelector(`#display`)
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
