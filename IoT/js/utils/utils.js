//Crea una cadena para poder usarla en un elemento.innerHTML para evitar escribir lineas dentro
export const crearCadenaHTML = (array, estado) => {
    let cadena = "";
    array.map((el) => {
        cadena += `<option value=${el === "Encendido" ? true : el === "Apagado" ? false : el} ${estado === el ? ` selected ` : 0}>${el}</option> `;
    });
    return cadena;
};
