export const BASEURL = "https://pokeapi.co/api/v2/pokemon";

//recoge los datos
export const recogerDatos = async (url,tiempo=2) => {
    return new Promise((resolve) => {
        setTimeout(async() => {
            const response = await axios.get(`${url}`)
            console.log("cargando...")
            resolve(response.data)
            
        }, tiempo*1000);
    })
 
};

export const recogidaDatos = async (url) => {
    try{
        const resp = await recogerDatos(url)
        return resp;
    }catch(err){
        console.log("error:_ ", err)
    }
}

export const listaPokemon = async (url, num) => {
    try {
        const response = await fetch(`${url}?limit=${num}`);
        const allpokemon = await response.json();
        console.log(allpokemon.results);
        return allpokemon.results;
    } catch (error) {
        console.log(error);
    }
};

export const pokemon = async (url) => {
    try {
      //`${url}/${tabla}?${campo}=${valor}`
      const response = await axios.get(`${url}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };