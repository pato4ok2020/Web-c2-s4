const stringInput1 = document.querySelector("#string_input1")
const stringInput2 = document.querySelector("#string_input2")
const resultButton = document.querySelector("#result_button")
const resultBox = document.querySelector("#result_box")

const areStringsHaveEqualSymbols = (string1, string2) => {
    for (el of string1) {
        if (!string2.includes(el)) {
            return false
        }
    }

    for (el of string2) {
        if (!string1.includes(el)) {
            return false
        }
    }

    return true
}

resultButton.addEventListener("click", () => {
    try {
        const string1 = stringInput1.value.trim()
        const string2 = stringInput2.value.trim()
        let result = "false"
        if (areStringsHaveEqualSymbols(string1, string2)) {
            result = "true"
        } 
        resultBox.innerHTML = result

        resultBox.classList.remove("error")
        resultBox.classList.add("success")
    } catch (e) {
        resultBox.innerHTML = e
        resultBox.classList.add("error")
        resultBox.classList.remove("success")
    }
})