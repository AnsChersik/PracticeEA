export function createFormStatement() {
    const form = document.createElement('form')

    const pCar = document.createElement('p')
    const pDesc = document.createElement('p')

    pCar.classList.add('pForm')
    pDesc.classList.add('pForm')

    pCar.textContent = 'Введите номер автомобиля'
    pDesc.textContent = 'Описание нарушения'

    const inputCarNumber = document.createElement('input')
    const inputDescription = document.createElement('input')

    inputCarNumber.classList.add('inputForm')
    inputDescription.classList.add('inputForm')

    inputCarNumber.type = 'text'
    inputDescription.type = 'text'

    const button = document.createElement('button')
    button.textContent = 'Отправить заявление'

    form.append(pCar)
    form.append(inputCarNumber)
    form.append(pDesc)
    form.append(inputDescription)
    form.append(button)

    return {
        form,
        inputCarNumber,
        inputDescription
    }
}