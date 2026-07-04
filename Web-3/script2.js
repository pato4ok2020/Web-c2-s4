const arrayInputA = document.querySelector("#array_inputA")
const resultButtonA = document.querySelector("#result_buttonA")
const resultBoxA = document.querySelector("#result_boxA")

const arrayInputB = document.querySelector("#array_inputB")
const resultButtonB = document.querySelector("#result_buttonB")
const resultBoxB = document.querySelector("#result_boxB")

resultButtonA.addEventListener("click", () => {
    try {
        if (arrayInputA.value.trim().length === 0) {
            throw new Error()
        }

        const array = arrayInputA.value.split(",")

        let sum = 0
        for (el of array) {
            value = Number(el)
            if (isNaN(value)) {
                throw new Error()
            }
            sum += value
            console.log(`Math.sin(${value}) = ${Math.sin(value)}`)
            if (Math.sin(value) > 0) {
                break
            }
        }

        resultBoxA.innerHTML = `Результат суммы: ${sum}`

        resultBoxA.classList.remove("error")
        resultBoxA.classList.add("success")
    } catch (error) {
        resultBoxA.innerHTML = "Некорретный массив!"
        resultBoxA.classList.add("error")
        resultBoxA.classList.remove("success")
    }
})

const isAllDigitsEven = (number) => {
    integerPart = Math.abs(Math.trunc(number))
    for (el of String(integerPart)) {
        if (el % 2 !== 0) {
            return false
        }
    }
    return true
}

resultButtonB.addEventListener("click", () => {
    try {
        if (arrayInputB.value.trim().length === 0) {
            throw new Error()
        }
        const array = arrayInputB.value.split(",").map(Number)

        for (let i = 0; i < array.length; i++) {
            if (isAllDigitsEven(array[i])) {
                array.splice(i, 1)
                i--
            }
        }
        resultBoxB.innerHTML = `Результат: ${array.join(", ")}`

        resultBoxB.classList.remove("error")
        resultBoxB.classList.add("success")
    } catch (error) {
        resultBoxB.innerHTML = "Некорретный массив!"
        resultBoxB.classList.add("error")
        resultBoxB.classList.remove("success")
    }
})