document.addEventListener("DOMContentLoaded", function(){
    //seleconar los elementos de la inferfaz
    const inputEmail = document.querySelector("#email");
    const inputAsunto = document.querySelector("#asunto");
    const inputMensaje = document.querySelector("#mensaje");
    const fromulario = document.querySelector("#formulario");

    // asignar eventos
    inputEmail.addEventListener("blur", validar);
    inputAsunto.addEventListener("blur", validar);
    inputMensaje.addEventListener("blur", validar);

    function validar(evento) {    
        if (evento.target.value.trim() === "") {
            mostrarAlerta(`El campo ${evento.target.id} es obligatorio`, evento.target.parentElement);
            return;
        }

        limpiarAlerta(evento.target.parentElement)
    }

    function mostrarAlerta(mensaje, referencia) {
        limpiarAlerta(referencia)
        //generar alerta en html con scripting
        const error = document.createElement("P")
        error.textContent = mensaje;
        error.classList.add("bg-red-600", "text-white", "p-2", "text-center");
        // inyectar el error al formulario
        referencia.appendChild(error);
        
    }

    function limpiarAlerta(referencia) {
        // comprueba si ya existe una alerta
        const alerta = referencia.querySelector(".bg-red-600");
        if (alerta) {
            alerta.remove();
        }
    }
}) 

