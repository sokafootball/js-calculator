numButtons = document.querySelectorAll(`.numButton`)
numButtons = Array.from(numButtons)
numButtons.forEach(button => {
	let buttonText = button.innerText
  document.addEventListener(`click`, buttonText => {
		console.log(buttonText)
		displayNumber(buttonText)})
});

function displayNumber(num){
  display = document.querySelector(`#display`)
  display.innerText = num
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
