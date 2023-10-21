//Obtenemos la referencia a los elementos del DOM

const formulario = document.getElementById("formulario");

const seleccionados = document.getElementById("seleccionados");

const delegado = document.getElementById("delegado");
const subdelegado = document.getElementById("subDelegado");
const numVotos = document.getElementById("numVotos");

const borrar = document.getElementById("borrar");
const grabar = document.getElementById("grabar");

//Este objeto controlará todo

const control = {
    listaVotados: [],
    votosEmitidos: 0,

    aumentaVoto(id) {
        this.listaVotados[id].votos++;
        this.votosEmitidos++;
        numVotos.textContent = this.votosEmitidos;
    },

    insertaVotado(nombre, voto = 0) {
        this.listaVotados.push({
            nombre: nombre,
            votos: voto,
        });

        const id = this.listaVotados.length - 1;

        const elementoListaSeleccionados = document.createElement("div");
        elementoListaSeleccionados.innerHTML = `    <p>${nombre}</p>
                            <input type="button" class="boton-modificado" value="${voto}" id="C${id}" data-counter >`;

        //añadimos el elemento a la lista de elementosdom
        elementoListaSeleccionados.id = nombre;

        seleccionados.append(elementoListaSeleccionados);

        //Asignamos los eventos a los botones
        document.getElementById(`C${id}`).addEventListener("click", (event) => {
            if (event.target.dataset.counter != undefined) {
                this.aumentaVoto(id);
                event.target.value++;
                this.dameDelegado();
                formulario["nombre"].focus();
            }
        });
    },
    reseteaFormulario() {
        formulario["nombre"].value = "";
        formulario["nombre"].focus();
    },
    grabarEnStorage() {
        const lista = this.listaVotados
            .map((el) => JSON.stringify(el))
            .join(";");
        localStorage.setItem("votados", lista);
    },
    dameDelegado() {
        //el ... se hace para no modificar el array
        //al hacer un push lo que hago es crear una lista cuyo primer elemento es un array entonces crea array = [[lista]]
        //al hacer [...lista] le dices haz un for de toda la lista y me haces u push [lista]
        const nombreDelegado = [...this.listaVotados].sort(
            (ele1, ele2) => ele2.votos - ele1.votos
        );
        delegado.textContent = `Delegado: ${nombreDelegado[0].nombre}`;
        const divDelegado = document.getElementById(
            `${nombreDelegado[0].nombre}`
        );
        //insertAdjacentElement aqui hace que div delegado lo meta dentro de seleccionados
        //el afterbegin hace que sea el primer elemento
        //Todo junto hace que divDelegado lo inserta en la primera posicion de seleccionados
        seleccionados.insertAdjacentElement("beforeend", divDelegado);
        if (nombreDelegado.length > 1) {
            subdelegado.textContent = `SubDelegado: ${nombreDelegado[1].nombre}`;
            const divSubDelegado = document.getElementById(
                `${nombreDelegado[1].nombre}`
            );
            divDelegado.insertAdjacentElement("afterend", divSubDelegado);
        }
    },
};
//El submit
formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    if (formulario["nombre"].value !== "") {
        control.insertaVotado(formulario["nombre"].value);
        control.reseteaFormulario();
    }
});

borrar.addEventListener("click", () => {
    localStorage.clear();
    control.votosEmitidos = 0;
    numVotos.textContent = "0";
    control.listaVotados.length = 0;
    seleccionados.innerHTML = "";
    subdelegado.textContent = "";
    delegado.textContent = " ";
});

grabar.addEventListener("click", () => {
    control.grabarEnStorage();
});

window.addEventListener("DOMContentLoaded", () => {
    //esto es para que no me de un error ya que si no compruebo me sale que no puede hacer un split de algo que no existe (cuando no tiene valores votados)
    if (localStorage.getItem("votados") != null) {
        const prueba = localStorage
            .getItem("votados")
            .split(";")
            .map((el) => JSON.parse(el));

        //Printeo el nombre
        prueba.map((el) => control.insertaVotado(el.nombre, el.votos));

        //pone el texto de arriba con los votos que habia votos Emitidos
        prueba.forEach((el) => {
            control.votosEmitidos += el.votos;
        });

        numVotos.textContent = control.votosEmitidos;
    }
});
