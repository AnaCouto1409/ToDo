export default function validacao(controladores, btReferencia){

    for(let controladorReferencia of controladores){
        let inputReferencia = controladorReferencia.children[1]

        inputReferencia.addEventListener('keyup', function(){
            if(inputReferencia.checkValidity()){
                controladorReferencia.classList.remove('erro')
                btReferencia.disabled = false
            }else
                controladorReferencia.classList.add('erro')
                btReferencia.disabled = true
        })

    }
}
    //https://github.com/ezioweb/CPfrontEnd02/blob/main/scripts/validacao.js#:~:text=%7D-,%7D,-%C2%A9%202022%20GitHub%2C%20Inc
