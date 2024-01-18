import { recogerDatos, listaPokemon, BASEURL, recogidaDatos, pokemon } from "./crudAxios.js";
const divPokemon = document.getElementById("listaPokemon");
const datosPokemon = document.getElementById("datosPokemon");
const imgBusqueda = document.getElementById("imgBusqueda");

const limite = 13;
const tiempo = 2;

const allPokemon = await listaPokemon(BASEURL, limite);

allPokemon.map((el) => {
    const { name, url } = el;
    const elemento = document.createElement("div");
    elemento.classList = "list-group-item list-group-item-info text-center cursor";
    elemento.dataset.url = url;
    //esto es para poner la primera letra en mayuscula, es simplemente visual
    elemento.innerHTML = `${name.charAt(0).toUpperCase() + name.slice(1)}`;
    divPokemon.appendChild(elemento);
    elemento.addEventListener("click", (e) => {
        datosPokemon.innerHTML = "";
        imgBusqueda.style.display = "inline";
        const elemento = document.createElement("div");
        elemento.classList.add("stylePokemon");
        const url = e.target.dataset.url;
        setTimeout(async () => {
            const datos = await pokemon(url);
            const { abilities, sprites, name, id, moves, weight } = datos;
            elemento.innerHTML = `
            <p >${name.toUpperCase()} - ${id}</p>
            <img src="${sprites.other.showdown.front_default}">
            <p> Habilidad: ${abilities[0].ability.name}</p>
            <p>Ataque: ${moves[0].move.name}</p>
            <p>Peso: ${weight} </p>`;
            datosPokemon.innerHTML = "";
            datosPokemon.append(elemento);
            imgBusqueda.style.display = "none";
        }, tiempo * 1000);
    });
});
