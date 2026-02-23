
// app.js

const API_URL = 'https://fakestoreapi.com/products?limit=8';
let allProductos = ["hola"];


// Obtener datos
async function obtenerProductos() {
    try{
        const respuesta = await fetch(API_URL);
        allProductos = await respuesta.json();
        console.log(allProductos)
        imprimirProductos(allProductos)
    }catch(error) {
        console.error("Error cargando productos:", error);
    }
    
}


async function imprimirProductos(){
    const contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = "";

    

}



obtenerProductos();

