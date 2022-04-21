let btAcessarRef = document.querySelector('#btCadastrar')
let nomeRef = document.querySelector('#inputNome')
let sobrenomeRef = document.querySelector('#inputSobrenome')
let emailRef = document.querySelector('#inputEmail')
let senhaRef = document.querySelector('#inputSenha')
let repetirSenhaRef = document.querySelector('#inputRepetirSenha')
let controladoresReferencia = document.querySelectorAll('.controlado')
let SenhaIgualRef = document.querySelector('#senhaIgual')



btAcessarRef.addEventListener('click', event => {

    event.preventDefault()

    let users = {
        firstName: nomeRef.value,
        lastName: sobrenomeRef.value,
        email: emailRef.value,
        password: senhaRef.value
    }

    let requestHeaders = {
        'Content-Type':'application/json'
    }

    let requestConfiguration = {
        method: 'POST',
        body:JSON.stringify(users),
        headers: requestHeaders
    }

    fetch('https://ctd-todo-api.herokuapp.com/v1/users/', requestConfiguration).then(
        response =>{
            response.json().then(
                data => {
                    localStorage.setItem('token', data.jwt)
                }
            )
        }
    )

})