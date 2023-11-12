export const BASEURL = "http://localhost:3000";

//ponemos en async ya que sabemos que es una promesa
//post = 
export const guardarDatos = async (url, tabla, dato) => {
    try {
        await axios.post(`${url}/${tabla}`, dato);
    } catch (e) {
        console.log(e);
    }
};

export const obtenerDatos = async (url, tabla, campo, valor) => {
    try {
        const response = await axios.get(
            `${url}/${tabla}?${campo}=${valor}`
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const fecthAsync = async (url, tabla, campo, valor) => {
    try {
        const response = await fetch(`${url}/${tabla}?${campo}=${valor}`);
        const resultado = await response.json();
        return resultado;
    } catch (error) {
        console.log(error);
    }
};

//fetch post

export const guardarDatosFetch = async (url, tabla, dato) => {
    try {
        await fetch(`${url}/${tabla}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dato),
        });
    } catch (error) {
        console.error(error);
    }
};