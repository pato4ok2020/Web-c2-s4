const stringInput = document.querySelector("#string_input")
const resultButton = document.querySelector("#result_button")
const resultBox = document.querySelector("#result_box")
const vowels = "ёуеыаоэяию"
const alphabet = "ёйцукенгшщзхъфывапролджэячсмитьбю"

const calcAmountSyllables = (string) => {
    const buf = string.toLowerCase()
    let amountSyllables = 0

    for (el of buf) {
        if (vowels.includes(el)) {
            amountSyllables++
        }
    }

    return amountSyllables
}

const validString = (string) => {
    if (string.length === 0) {
        return false
    }
    
    const buf = string.toLowerCase()

    for (el of buf) {
        if (!alphabet.includes(el) && !"-".includes(el)) {
            return false
        }
    }

    return true
}

resultButton.addEventListener("click", () => {
    try {
        const string = stringInput.value.trim()

        if (!validString(string)) {
            throw new Error()
        }
        const amountSyllables = calcAmountSyllables(string)
        resultBox.innerHTML = `Количество слогов: ${amountSyllables}`

        resultBox.classList.remove("error")
        resultBox.classList.add("success")
    } catch (Error) {
        resultBox.innerHTML = "Надо ввести одно слово из русских букв!"
        resultBox.classList.add("error")
        resultBox.classList.remove("success")
    }
})