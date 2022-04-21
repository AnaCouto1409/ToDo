let nomeUserRef = document.querySelector('#nameUser')
let adicionaTarefaRef = document.querySelector('#adicionaTarefa')
let novaTarefaRef = document.querySelector('#novaTarefa')
let skeletonRef = document.querySelector('#skeleton')
let tarefasPendentesRef = document.querySelector('.tarefas-pendentes')
let tarefasTerminadasRef = document.querySelector('.tarefas-terminadas')
let finalizarSessaoRef = document.querySelector('#closeApp')

window.onload = function () {
    getTasks();
}

// Formatação de data 
const dataAtual = new Date()
const dataFormatada = dataAtual.toLocaleDateString(
    'pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }
)


// Finaliza a sessão
finalizarSessaoRef.addEventListener('click', event => {
    event.preventDefault()
    localStorage.removeItem('token')
    window.location.href = './index.html'
})


//Lista os usuários 
let requestConfiguration = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }
}

fetch('https://ctd-todo-api.herokuapp.com/v1/users/getMe', requestConfiguration)
    .then(response => {
        return response.json()
    })
    .then(dados => {
        nomeUserRef.innerHTML = `<p>${dados.firstName}</p>`

    })

// Posta a tarefa do usuário
adicionaTarefaRef.addEventListener('click', event => {
    event.preventDefault()

    let tarefas = {
        description: novaTarefaRef.value,
        completed: false
    }

    let requestHeadersPost = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }


    let requestConfigurationPost = {
        method: 'POST',
        body: JSON.stringify(tarefas),
        headers: requestHeadersPost
    }

    if(novaTarefaRef.value === ""){
        Swal.fire('Escreve aí preguiçoso!')
    }else{
    fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', requestConfigurationPost)
        .then(response => {
            response.json().then(
                dados => {
                    skeletonRef.remove('#skeleton');
                    tarefasPendentesRef.innerHTML += `
                                <li class="tarefa">
                                <div class="not-done" onclick="terminarTarefa(${dados.id})"></div>
                                <div class="descricao">
                                  <p class="nome">${dados.description}</p>
                                  <p class="timestamp">Criada em: ${dataFormatada}</p>
                                  <div>
                                  <button><i id="${dados.id}" class="far fa-trash-alt" onclick="deletaTarefa(${dados.id})"></i></button>
                                 </div>
                                </div>
                              </li>`
                }
                
            )
           
        })
        
        Swal.fire({
            
            icon: 'success',
            title: 'Mais trabalho pendente',
            showConfirmButton: false,
            timer: 1500
          })
        novaTarefaRef.value = ""
    }    
})

// atualiza a tarefa do usuário
let configuracaoPutAutorizado = {
    method: 'PUT',
    body: JSON.stringify({
        completed: false
    }),
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

}

let resquestGetConfiguracaoAutorizado = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }
}



// Terminar as tarefas
function terminarTarefa(id) {

    configuracaoPutAutorizado.body = JSON.stringify({
    completed: true
    })

    fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, configuracaoPutAutorizado)
        .then(
            response => {
                if (response.ok) {
                    getTasks()
                }
            }
        )
}

// Tarefa Pendente
function tarefaPendente(id) {

    configuracaoPutAutorizado.body = JSON.stringify({
    completed: false
    })

    fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, configuracaoPutAutorizado)
        .then(
            response => {
                if (response.ok) {
                    getTasks()
                }
            }
        )
}

// deleta a tarefa do usuário
let configuracaoDeletaAutorizado = {
    method: 'DELETE',   
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

}

function deletaTarefa(id) {
    Swal.fire({
        title: 'Deseja mandar essa porcaria para o espaço?',
        imageUrl: 'https://i.pinimg.com/564x/c3/31/52/c3315210b495973e2f0d1b4484e8851d.jpg',
        imageWidth: 200,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Mandar já',
        cancelButtonText: 'Deixa quieto'
      }).then((result) => {
          
        if (result.isConfirmed) {
            fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, configuracaoDeletaAutorizado)
            .then(
                response => {
                    if (response.ok) {
                        getTasks()
                    }
                }
            )
          Swal.fire(
            'Mais um lixo espacial detectado',
          )
        }
      })



  
}

// Função que lista as tarefas criadas
function getTasks() {
    fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', resquestGetConfiguracaoAutorizado)
        .then(
            response => {
                response.json().then(
                    tasks => {
                        tarefasTerminadasRef.innerHTML = ""
                        tarefasPendentesRef.innerHTML = ""
                        for (let task of tasks) {
                            if (task.completed) {
                                tarefasTerminadasRef.innerHTML += `
                           <li class="tarefa">
                                <div class="not-done" onclick="tarefaPendente(${task.id})"></div>
                                <div class="descricao">
                                  <p class="nome">${task.description}</p>
                                  <p class="timestamp">Criada em: ${dataFormatada}</p>
                                  <div>
                                  <button><i id="${task.id}" class="far fa-trash-alt" onclick="deletaTarefa(${task.id})"></i></button>
                                 </div>
  
                                </div>
                              </li>    
                           `
                            } else {
                                tarefasPendentesRef.innerHTML += `
                                            <li class="tarefa">
                                            <div class="not-done" onclick="terminarTarefa(${task.id})"></div>
                                            <div class="descricao">
                                              <p class="nome">${task.description}</p>
                                              <p class="timestamp" id="data">Criada em: ${dataFormatada}</p>
                                              <div>
                                                <button><i id="${task.id}" class="far fa-trash-alt" onclick="deletaTarefa(${task.id})"></i></button>
                                              </div>
                                            </div>
                                          </li>`
                            }
                        }
                    }
                )
            }
        )
}
