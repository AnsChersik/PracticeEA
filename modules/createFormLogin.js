export function createFormLogin() {
    const form = document.createElement('form')

    const pLogin = document.createElement('p')
    const pPassword = document.createElement('p')

    pLogin.classList.add('pForm')
    pPassword.classList.add('pForm')

    pLogin.textContent = 'Введите логин'
    pPassword.textContent = 'Введите пароль'

    const inputLogin = document.createElement('input')
    const inputPassword = document.createElement('input')

    inputLogin.classList.add('inputForm')
    inputPassword.classList.add('inputForm')

    inputLogin.type = 'text'
    inputPassword.type = 'password'

    const button = document.createElement('button')
    button.textContent = 'Войти'

    form.append(pLogin)
    form.append(inputLogin)
    form.append(pPassword)
    form.append(inputPassword)
    form.append(button)

    return {
        form,
        inputLogin,
        inputPassword
    }
}
