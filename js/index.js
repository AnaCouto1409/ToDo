import validacao from './validacao.js'

let botaoAcessarReferencia = document.querySelector('#btnAcessar')
let controladoresReferencia = document.querySelectorAll('.controlador')
validacao(controladoresReferencia,botaoAcessarReferencia)
botaoAcessarReferencia.addEventListener('click', function(event) {
    
    event.preventDefault()       

    console.log("teste")

});   