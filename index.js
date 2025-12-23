let arrayUsers = JSON.parse(localStorage.getItem('Users')) || []

function saveToLocalStorage(arr, name) {
    localStorage.setItem(name, JSON.stringify(arr))
}

function createDiv(text) {
    const div = document.createElement('div')
    div.className = text
    return div
}

function createButton(text) {
    const btn = document.createElement('button')
    btn.textContent = text
    btn.classList.add('btn')
    return btn
}

function createFormRegister() {
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

function createFormLogin() {
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

function createAppRegister() {
    const container = document.getElementById('container')
    container.innerHTML = ''

    const registerDiv = createDiv('registerDiv')
    container.append(registerDiv)

    const formReg = createFormRegister()
    registerDiv.append(formReg.form)

    formReg.form.addEventListener('submit', (e) => {
        e.preventDefault()
        const name = formReg.inputName.value.trim()
        const surname = formReg.inputSurname.value.trim()
        const phone = formReg.inputPhone.value.trim()
        const email = formReg.inputEmail.value.trim()
        const login = formReg.inputLogin.value.trim()
        const password = formReg.inputPassword.value.trim()

        if (name && surname && phone && email && login && password) {
            const newUser = {
                name: name,
                surname: surname,
                phone: phone,
                email: email,
                login: login,
                password: password
            }
            arrayUsers.push(newUser)
            saveToLocalStorage(arrayUsers, 'Users')
            alert('Вы зарегестрировавны')
            createAppLogin()
        } else {
            alert('Заполните все поля!')
        }
    })

    const btnLogin = createButton('Войти')
    container.append(btnLogin)
    btnLogin.addEventListener('click', () => {
        createAppLogin()
    })
}

function createAppLogin() {
    const container = document.getElementById('container')
    container.innerHTML = ''

    const loginDiv = createDiv('loginDiv')
    container.append(loginDiv)

    const loginForm = createFormLogin()
    loginDiv.append(loginForm.form)

    loginForm.form.addEventListener('submit', (e) => {
        e.preventDefault()
        const login = loginForm.inputLogin.value.trim()
        const password = loginForm.inputPassword.value.trim()

        const user = arrayUsers.find(user => user.login === login && user.password === password)
        if (user) {
            localStorage.setItem('CurrentUser', JSON.stringify(user))
            createPageStatements()
        } else {
            alert('Неправельно введены данные')
        }
    })

    const btnRegister = createButton('Зарегистрироваться')
    container.append(btnRegister)

    btnRegister.addEventListener('click', () => {
        createAppRegister()
    })
}

document.addEventListener('DOMContentLoaded', createAppRegister)