
// app.js

const API_URL = 'https://fakestoreapi.com/products?limit=8';
let todosProductos = [];
let todosFiltrados = []; 


// Obtener datos
async function obtenerProductos() {
    try{
        const respuesta = await fetch(API_URL);
        todosProductos = await respuesta.json();
        imprimirProductos(todosProductos);
        renderProductos();
    }catch(error) {
        console.error("Error cargando productos:", error);
    }
    
}


// Ejercicio botones cambian de color al dar click y imprimir los de la categoria correspondiente
function renderProductos(){
    const filtradoBotones = document.querySelectorAll(".c-filter__btn[data-category]");

    filtradoBotones.forEach(btn =>{
        btn.addEventListener("click",()=>{
            filtradoBotones.forEach(b=>b.classList.remove("c-filter__btn--active"))
            btn.classList.add("c-filter__btn--active");
            
            const categoria = btn.getAttribute("data-category");
            

            if (categoria === "all"){
                todosFiltrados = todosProductos;
                console.log("prueba"+todosProductos)
                
            }else{
                todosFiltrados = todosProductos.filter(p => p.category === categoria);
            }

            imprimirProductos(todosFiltrados);
        })

    })

};















async function imprimirProductos(todosProductos){
    const contenedor = document.getElementById("contenedorRopa");
    contenedor.innerHTML = "";


    todosProductos.forEach(producto => {
        let claseExtra = "";

        if (producto.category === "jewelery"){
            claseExtra = 'c-card--featured';
        }

        const productoHTML = `
            <div class=" c-card ${claseExtra}">
                <img src="${producto.image}" alt="${producto.title}" class="c-card__image">
                <div class="c-card__body">
                    <h2 class="c-card__title">${producto.title}</h2>
                    <p class="c-card__price">$${producto.price}</p>
                    <button class="c-card__btn c-card__btn--buy">
                        Agregar al carrito
                    </button>
                </div>
            </div>
        `;
        contenedor.innerHTML += productoHTML;
        
    });
}



obtenerProductos();



