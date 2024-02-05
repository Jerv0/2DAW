//Imports
import { saveData, getDataChanged_collection, getDataChanged_document, deleteData, saveData2, deleteData2, modifyData } from "./firebase.js";
import { crearCadenaHTML } from "./utils/utils.js";

//Elementos HTML
const formulario = document.getElementById("formulario");
const formularioAdd = document.getElementById("formularioAdd");
const espacios = document.getElementById("espacios");
const datosEspacio = document.getElementById("datosEspacio");
const atributosEspacio = document.getElementById("elementosEspacio");
const textoNombreEspacio = document.getElementById("textoNombreEspacio");
const tipo = document.getElementById("tipo");
const infoEspacio = document.getElementById("infoEspacio");

//Variables
const coleccion = "IoT";
const valorSensor = ["Humedad", "Temperatura", "Luminosidad", "Presion"];
const valorEjecutor = ["Encendido", "Apagado"];

const sensores = "sensores";
const ejecutores = "ejecutores";
console.log(window.location.href);
/**
 * Función que crea elementos HTML basados en un array y un tipo dado y dentro contiene el manejo del cambio y borrado de ejecutores/sensores
 * @param {Array} array - El array de datos.
 * @param {string} tipo - El tipo de datos.
 */
const crearHTMLArray = (array, tipo) => {
    array.forEach((el, ind) => {
        const elemento = document.createElement("div");
        // Utilizo un ternario anidado para mostrar "Encendido" o "Apagado" o el valor en caso de no ser un ejecutor
        const estado = el.valor === true ? "Encendido" : el.valor === false ? "Apagado" : el.valor;
        elemento.className = "mb-2 col-3";
        elemento.innerHTML = `
        <input class="form-control" id="${tipo}${ind}" type="text" value="${el.nombre}" /> 
        <input class="form-control " name="nombre"  type="text" value="${el.nombre} (Name Base Datos)" disabled /> 
        <input 
        style="${estado === "Apagado" ? "color: red;" : estado === "Encendido" ? "color: green;" : 0}" 
        class="form-control" name="nombre"
        type="text" value="${estado} (Valor Base Datos)"
        disabled />
        <select id="select${tipo}${ind}" class="form-select"> ${tipo === ejecutores ? crearCadenaHTML(valorEjecutor, estado) : crearCadenaHTML(valorSensor, estado)}</select>
        <button class="btn btn-danger mb-3 mt-2 " id="Borrar${tipo}${ind}">Borrar</button>`;
        atributosEspacio.appendChild(elemento);

        const input = document.getElementById(tipo + ind);
        input.addEventListener("change", (e) => {
            const datos = { nombre: e.target.value, valor: estado };
            modifyData(formularioAdd.id, coleccion, [tipo], el, datos);
        });

        const select = document.getElementById("select" + tipo + ind);
        select.addEventListener("change", (e) => {
            const datos = { nombre: input.value, valor: e.target.value === "true" ? true : e.target.value === "false" ? false : e.target.value };
            modifyData(formularioAdd.id, coleccion, [tipo], el, datos);
        });

        const botonBorrar = document.getElementById("Borrar" + tipo + ind);
        botonBorrar.addEventListener("click", () => {
            deleteData2(formularioAdd.id, coleccion, [tipo], el);
        });
    });
};
/**
 * Función que crea un elemento select y lo llena con opciones basadas en un array dado.
 * @param {Array} array - El array de opciones.
 * @param {string} tipo - El tipo de select a crear.
 */
const crearSelect = (array, tipo) => {
    formularioAdd.valor.innerHTML = "";
    formularioAdd.valor.id = tipo;
    array.forEach((el) => {
        const elemento = document.createElement("option");
        elemento.innerHTML = `${el}`;
        el === "Encendido" ? (elemento.value = true) : el === "Apagado" ? (elemento.value = false) : elemento.value;
        formularioAdd.valor.appendChild(elemento);
    });
};
//Creacion de espacios
formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    saveData(coleccion, {
        nombre: formulario["espacio"].value,
        sensores: [],
        ejecutores: [],
    });
    formulario.espacio.value = "";
});
tipo.addEventListener("change", (e) => {
    formularioAdd.valor.innerHTML = "";
    formularioAdd.style.display = "inline";
    e.target.value === "sensor" ? crearSelect(valorSensor, sensores) : e.target.value === "ejecutor" ? crearSelect(valorEjecutor, ejecutores) : (formularioAdd.style.display = "none");
});
//Control de Formularios para añadir Ejecutores/Sensores
formularioAdd.addEventListener("submit", (e) => {
    e.preventDefault();
    const datos = {
        valor: e.target.valor.value === "true" ? true : e.target.valor.value === "false" ? false : e.target.valor.value,
        nombre: e.target.nombre.value,
    };

    saveData2(formularioAdd.id, coleccion, [formularioAdd.valor.id], datos);
    formularioAdd.nombre.value = "";
});
//Carga inicial de la pagina
document.addEventListener("DOMContentLoaded", function () {
    datosEspacio.style.display = "none";
    formularioAdd.style.display = " none";
    getDataChanged_collection(coleccion, (datos) => {
        espacios.innerHTML = "";
        datos.forEach((doc) => {
            const elemento = document.createElement("div");
            elemento.className = "col-md-6 text-center rounded div";
            elemento.innerHTML = `
            <h3 class="mt-3 mx-5 ">${doc.data().nombre}</h3>
            <button class="btn btn-danger mt-3 mb-3" id="Borrar${doc.id}">Borrar</button>`;
            espacios.appendChild(elemento);
            elemento.addEventListener("click", () => {
                // Esto lo hago para tener almacenado el id del documento seleccionado y así poder usarlo donde quiera
                formularioAdd.id = doc.id;
                datosEspacio.style.display = "inline";
                // Ver los arrays y que se actualicen si añado un elemento nuevo
                getDataChanged_document(coleccion, formularioAdd.id, (datos) => {
                    atributosEspacio.innerHTML = "";
                    textoNombreEspacio.textContent = `Dispositivos vinculados al espacio ${datos.data().nombre}`;
                    datos.data().sensores.length == 0 && datos.data().ejecutores.length == 0 ? (infoEspacio.textContent = "No hay dispositivos asignados") : (infoEspacio.textContent = "");
                    crearHTMLArray(datos.data().sensores, sensores);
                    crearHTMLArray(datos.data().ejecutores, ejecutores);
                });
            });

            const botonBorrar = document.getElementById("Borrar" + doc.id);
            botonBorrar.addEventListener("click", (e) => {
                e.stopPropagation();
                datosEspacio.style.display = "none";
                deleteData(e.target.id.split("Borrar")[1], coleccion);
            });
        });
    });
});