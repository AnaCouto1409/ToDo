let buttonLoginRef = document.querySelector('#btAcessar')
let inputEmailRef = document.querySelector('#inputEmail')
let inputSenhaRef = document.querySelector('#inputPassword')

buttonLoginRef.addEventListener('click', event => {
    event.preventDefault()

    let credentials = {

        email: inputEmailRef.value,
        password: inputSenhaRef.value

    }

    let requestHeaders = {
        'Content-Type': 'application/json'
    }

    let requestConfiguration = {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: requestHeaders

    }

    fetch('https://ctd-todo-api.herokuapp.com/v1/users/login', requestConfiguration).then(
        response => {
            response.json().then(

                data => {

                    localStorage.setItem('token', data.jwt)
                    window.location.href = './tarefas.html'
                    
                }


            )
        }
    )
})