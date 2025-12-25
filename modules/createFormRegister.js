export function createFormRegister() {
    const form = document.createElement('form')

    const pName = document.createElement('p')
    const pSurname = document.createElement('p')
    const pPhone = document.createElement('p')
    const pEmail = document.createElement('p')
    const pLogin = document.createElement('p')
    const pPassword = document.createElement('p')

    pName.classList.add('pForm')
    pSurname.classList.add('pForm')
    pPhone.classList.add('pForm')
    pEmail.classList.add('pForm')
    pLogin.classList.add('pForm')
    pPassword.classList.add('pForm')

    pName.textContent = 'Введите имя'
    pSurname.textContent = 'Введите фамилию'
    pPhone.textContent = 'Введите телефон'
    pEmail.textContent = 'Введите почту'
    pLogin.textContent = 'Введите логин'
    pPassword.textContent = 'Введите пароль'

    const inputName = document.createElement('input')
    const inputSurname = document.createElement('input')
    const inputPhone = document.createElement('input')
    const inputEmail = document.createElement('input')
    const inputLogin = document.createElement('input')
    const inputPassword = document.createElement('input')

    inputName.type = 'text'
    inputSurname.type = 'text'
    inputPhone.type = 'tel'
    inputEmail.type = 'email'
    inputLogin.type = 'text'
    inputPassword.type = 'password'

    inputName.classList.add('inputForm')
    inputSurname.classList.add('inputForm')
    inputPhone.classList.add('inputForm')
    inputEmail.classList.add('inputForm')
    inputLogin.classList.add('inputForm')
    inputPassword.classList.add('inputForm')

    const button = document.createElement('button')
    button.textContent = 'Зарегистрироваться'

    form.append(pName)
    form.append(inputName)
    form.append(pSurname)
    form.append(inputSurname)
    form.append(pPhone)
    form.append(inputPhone)
    form.append(pEmail)
    form.append(inputEmail)
    form.append(pLogin)
    form.append(inputLogin)
    form.append(pPassword)
    form.append(inputPassword)
    form.append(button)

    return {
        form,
        inputName,
        inputSurname,
        inputPhone,
        inputEmail,
        inputLogin,
        inputPassword
    }
}