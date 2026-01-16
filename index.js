import { saveToLocalStorage } from "./modules/saveToLocalStorage.js"
import { createDiv } from "./modules/createDiv.js"
import { createButton } from "./modules/createButton.js"
import { createFormRegister } from "./modules/createFormRegister.js"
import { createFormLogin } from "./modules/createFormLogin.js"
import { createFormStatement } from "./modules/createFormStatement.js"

let admins = [
    {
        name: "Админ", surname: "Админович", phone: 880005553535, email: "admin@yandex",
        login: '1234', password: 1234, role: 'Администратор'
    }
]

saveToLocalStorage(admins, 'Users')

let arrayUsers = JSON.parse(localStorage.getItem('Users')) && admins
let arrayRequests = JSON.parse(localStorage.getItem('Requests')) || []

// console.log(arrayUsers);



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
                password: password,
                role: undefined
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

        const admins = arrayUsers.find(admin => admin.login == login && admin.password == password && admin.role == 'Администратор')
        console.log(123, admins, arrayUsers);

        if (admins) {
            localStorage.setItem('CurrentUser', JSON.stringify(admins))
            createPageStatementsAdmin()
        } else {
            const user = arrayUsers.find(user => user.login === login && user.password === password)
            if (user) {
                localStorage.setItem('CurrentUser', JSON.stringify(user))
                createPageStatements()
            } else {
                alert('Неправельно введены данные')
            }
        }

        // const user = arrayUsers.find(user => user.login === login && user.password === password)
        // if (user) {
        //     localStorage.setItem('CurrentUser', JSON.stringify(user))
        //     createPageStatements()
        // } else {
        //     alert('Неправельно введены данные')
        // }


    })

    const btnRegister = createButton('Зарегистрироваться')
    loginDiv.append(btnRegister)

    btnRegister.addEventListener('click', () => {
        createAppRegister()
    })
}


function createPageStatementsAdmin() {
    const container = document.getElementById('container')
    container.innerHTML = ''

    const pageStatementsAdminDiv = createDiv('pageStatementsAdminDiv')
    container.append(pageStatementsAdminDiv)

    const user = JSON.parse(localStorage.getItem('CurrentUser'))
    if (!user) {
        createAppLogin()
        return
    }

    const title = document.createElement('h2')
    title.textContent = `Заявления пользователя ${user.surname} ${user.name}`
    pageStatementsAdminDiv.append(title)

    const requests = JSON.parse(localStorage.getItem('Requests')) || []
    console.log(requests);

    // const userRequests = requests.filter(request => request.userLogin === user.login)

    const table = document.createElement('table')
    const headerRow = document.createElement('tr')
    headerRow.classList.add('headerRow')
    const headerTable = ['Госномер', 'Описание нарушения', 'Статус', 'ФИО']
    headerTable.forEach(text => {
        const th = document.createElement('th')
        th.textContent = text
        headerRow.append(th)
    })

    table.append(headerRow)

    requests.forEach(req => {
        // userRequests.forEach(req => {
        const row = document.createElement('tr')

        const cellCar = document.createElement('td')
        const cellDesc = document.createElement('td')
        const cellStatus = document.createElement('td')
        const cellFio = document.createElement('td')

        const select = document.createElement('select')
        const option = document.createElement('option')
        const option1 = document.createElement('option')
        const option2 = document.createElement('option')
        const option3 = document.createElement('option')

        option1.textContent = 'Новое'
        option2.textContent = 'На рассмотрение'
        option3.textContent = 'Завершено'

        select.append(option)
        select.append(option1)
        select.append(option2)
        select.append(option3)

        cellStatus.append(select)


        cellCar.textContent = req.carNumber
        cellDesc.textContent = req.description
        
        // cellStatus.textContent = req.status
        option.textContent = req.status
        option1.textContent = 'Новое'
        option2.textContent = 'На рассмотрение'
        option3.textContent = 'Завершено'

        select.append(option)
        select.append(option1)
        select.append(option2)
        select.append(option3)

        cellStatus.append(select)

        cellFio.textContent = req.fio

        row.append(cellCar)
        row.append(cellDesc)
        row.append(cellStatus)
        row.append(cellFio)

        table.append(row)
    })

    pageStatementsAdminDiv.append(table)

    const buttonSave = createButton('Сохранить')
    pageStatementsAdminDiv.append(buttonSave)

    

    // const formReq = createFormStatement()
    // pageStatementsAdminDiv.append(formReq.form)

    // formReq.form.addEventListener('submit', (e) => {
    //     e.preventDefault()
    //     const carNumber = formReq.inputCarNumber.value.trim()
    //     const description = formReq.inputDescription.value.trim()

    //     if (carNumber && description) {
    //         const newReq = {
    //             carNumber,
    //             description,
    //             status: 'новое',
    //             userLogin: user.login,
    //             fio: user.surname + ' ' + user.name
    //         }
    //         arrayRequests.push(newReq)
    //         saveToLocalStorage(arrayRequests, 'Requests')
    //         createPageStatementsAdmin()
    //     } else {
    //         alert('Заполните все поля')
    //     }
    // })

    const btnExit = createButton('Выйти')
    pageStatementsAdminDiv.append(btnExit)
    btnExit.addEventListener('click', () => {
        localStorage.removeItem('CurrentUser')
        createAppLogin()
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
                userLogin: user.login,
                fio: user.surname + ' ' + user.name
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