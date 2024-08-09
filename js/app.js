document.addEventListener("DOMContentLoaded", function(){
    
    const email = {
        email: "",
        asunto: "",
        mensaje: ""
    }

    //seleconar los elementos de la inferfaz
    const inputEmail = document.querySelector("#email");
    const inputAsunto = document.querySelector("#asunto");
    const inputMensaje = document.querySelector("#mensaje");
    const formulario = document.querySelector("#formulario");
    const btnSubmit = document.querySelector("#formulario button[type='submit']");
    const btnReset = document.querySelector("#formulario button[type='reset']");
    const spinner = document.querySelector("#spinner");

    // asignar eventos
    inputEmail.addEventListener("input", validar);
    inputAsunto.addEventListener("input", validar);
    inputMensaje.addEventListener("input", validar);

    formulario.addEventListener("submit", enviarEmail)

    btnReset.addEventListener("click", function(evento) {
        evento.preventDefault();

        // reiniciar el objeto
        resetFormulario()
    });

    function enviarEmail(evento) {
        evento.preventDefault()
        spinner.classList.add("flex");
        spinner.classList.remove("hidden");

        // reiniciar el objeto
        resetFormulario()

        setTimeout(() => {
            spinner.classList.remove("flex");
            spinner.classList.add("hidden");

            //alerta 
            const alertaExito = document.createElement("P");
            alertaExito.classList.add("bg-green-500","text-white", "p-2", "text-center", "rounded-md", "mt-10", "text-sm");
            alertaExito.textContent = "Mensaje enviado correctamente"
            formulario.appendChild(alertaExito)

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);

        }, 3000);
    }

    function validar(evento) {    
        if (evento.target.value.trim() === "") {
            mostrarAlerta(`El campo ${evento.target.id} es obligatorio`, evento.target.parentElement);
            email[evento.target.name] = "";
            comprobarEmail();
            return;
        }

        if (evento.target.id === "email" && !validarEmail(evento.target.value)){
            mostrarAlerta("El email no es válido", evento.target.parentElement);
            email[evento.target.name] = "";
            comprobarEmail();
            return;
        }

        limpiarAlerta(evento.target.parentElement)

        // asignar los valores al objeto
        email[evento.target.name] = evento.target.value.trim().toLowerCase();
        // comprobar el objeto email
        comprobarEmail()
        
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

    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarEmail() {
        if(Object.values(email).includes("")){
            btnSubmit.classList.add("opacity-50");
            btnSubmit.disabled = true;
            return
        }
        
        btnSubmit.classList.remove("opacity-50");
        btnSubmit.disabled = false;
        
    }

    function resetFormulario() {
        
        email.email = "";
        email.asunto = "";
        email.mensaje = "";

        formulario.reset();
        comprobarEmail()
    }
}) 

