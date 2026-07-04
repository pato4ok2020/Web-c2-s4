const numberInput = document.querySelector("#number_input")
const resultButton = document.querySelector("#result_button")
const resultBox = document.querySelector("#result_box")

const isPrimeNumber = (number) => {
    if (number <= 1 || !Number.isInteger(number)) {
        throw new Error("Пожалуйста, введите целое число больше 1")
    }

    for (let i = 2; i <= Math.sqrt(number); i++) {
        if (number % i == 0) {
            return false
        }
    }

    return true
}

resultButton.addEventListener("click", () => {
    const number = Number(numberInput.value)
    
    try {
        if (isPrimeNumber(number)) {
            resultBox.innerText = `Число ${number} ПРОСТОЕ!`
        } else {
            resultBox.innerText = `Число ${number} НЕ ПРОСТОЕ!`
        }

        resultBox.classList.remove("error")
        resultBox.classList.add("success")
    } catch (error) {
        resultBox.innerText = error.message
        resultBox.classList.add("error")
        resultBox.classList.remove("success")
    }
})