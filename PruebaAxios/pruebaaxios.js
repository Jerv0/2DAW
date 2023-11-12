import { guardarDatos, BASEURL, obtenerDatos ,fecthAsync ,guardarDatosFetch } from "./crudAxios.js";
const botonGuarda = document.getElementById("boton");
const botonObten = document.getElementById("boton2");
const nombre = document.getElementById("nombre");
const anadeTabla = document.getElementById("anadeTabla");
const correo = document.getElementById("correo");

const lista = document.getElementById("lista");
const tabla = [
    /*
   { nombre:...,
     email:....,
 }
*/
];


anadeTabla.addEventListener("click", () => {
    tabla.push({
        nombre: nombre.value,
        email: correo.value,
    });
    console.log(tabla);
});

botonGuarda.addEventListener("click", ()=>{
    //tabla.forEach((el) => guardarDatos(BASEURL, "conceptos", el));
    tabla.forEach( (el) =>  guardarDatosFetch(BASEURL, 'conceptos', el));
    
});

botonObten.addEventListener("click", async () => {
    lista.innerHTML = "";
    /*const resultado = await obtenerDatos(
        BASEURL,
        "conceptos",
        "nombre",
        nombre.value //para que el valor que busca sea el que pongamos en la caja de texto
    );*/

    //que genere una tabla con todos los resultados
    //Llamamos a la funcion Fetch Con Async
    const resultadoFecthAsync = await fecthAsync(BASEURL,"conceptos","nombre",nombre.value);
    resultadoFecthAsync.forEach((el) => {
        const elemento = document.createElement("li");
        elemento.innerHTML = `<div id=${el.id}>
                                <p>${el.nombre}</p>
                                <p>${el.email}</p>
                            </div>`;
        lista.append(elemento);
    });

    console.log(resultadoFecthAsync);
});
