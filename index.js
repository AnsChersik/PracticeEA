let arrayUsers = JSON.parse(localStorage.getItem('Users')) || []
let arrayRequests = JSON.parse(localStorage.getItem('Requests')) || []

function saveToLocalStorage(arr, name) {
    localStorage.setItem(name, JSON.stringify(arr))
}

function createDiv(text) {
    const div = document.createElement('div')
    div.className = text
    div.classList.add('conteinerDiv')
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

function createFormStatement() {
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
            const User = arrayUsers.find(user => user.login === login)
            if (User) {
                alert('Логин занят')
                return
            }

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
    registerDiv.append(btnLogin)
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
    loginDiv.append(btnRegister)

    btnRegister.addEventListener('click', () => {
        createAppRegister()
    })
}

function createPageStatements() {
    const container = document.getElementById('container')
    container.innerHTML = ''

    const pageStatementsDiv = createDiv('pageStatementsDiv')
    container.append(pageStatementsDiv)

    const user = JSON.parse(localStorage.getItem('CurrentUser'))
    if (!user) {
        createAppLogin()
        return
    }

    const title = document.createElement('h2')
    title.textContent = `Заявления пользователя ${user.surname} ${user.name}`
    pageStatementsDiv.append(title)

    const requests = JSON.parse(localStorage.getItem('Requests')) || []
    const userRequests = requests.filter(request => request.userLogin === user.login)

    const table = document.createElement('table')
    const headerRow = document.createElement('tr')
    headerRow.classList.add('headerRow')
    const headerTable = ['Госномер', 'Описание нарушения', 'Статус']
    headerTable.forEach(text => {
        const th = document.createElement('th')
        th.textContent = text
        headerRow.append(th)
    })

    table.append(headerRow)

    userRequests.forEach(req => {
        const row = document.createElement('tr')

        const cellCar = document.createElement('td')
        const cellDesc = document.createElement('td')
        const cellStatus = document.createElement('td')

        cellCar.textContent = req.carNumber
        cellDesc.textContent = req.description
        cellStatus.textContent = req.status

        row.append(cellCar)
        row.append(cellDesc)
        row.append(cellStatus)

        table.append(row)
    })

    pageStatementsDiv.append(table)

    const formReq = createFormStatement()
    pageStatementsDiv.append(formReq.form)

    formReq.form.addEventListener('submit', (e) => {
        e.preventDefault()
        const carNumber = formReq.inputCarNumber.value.trim()
        const description = formReq.inputDescription.value.trim()

        if (carNumber && description) {
            const newReq = {
                carNumber,
                description,
                status: 'новое',
                userLogin: user.login
            }
            arrayRequests.push(newReq)
            saveToLocalStorage(arrayRequests, 'Requests')
            createPageStatements()
        } else {
            alert('Заполните все поля')
        }
    })

    const btnExit = createButton('Выйти')
    pageStatementsDiv.append(btnExit)
    btnExit.addEventListener('click', () => {
        localStorage.removeItem('CurrentUser')
        createAppLogin()
    })

}


document.addEventListener('DOMContentLoaded', createAppRegister)