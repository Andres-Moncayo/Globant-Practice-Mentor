



// 1. URL de la API (Fake Store API)
const API_URL = 'https://fakestoreapi.com/products?limit=8';
let AllProducts = [];
let Allfiltered = []; 

// 2. Función para obtener los datos
async function getProducts() {
    try {
        const response = await fetch(API_URL);
        AllProducts = await response.json();

        Allfiltered = AllProducts;
        renderProducts(AllProducts);
        setupFilters();
    } catch (error) {
        console.error("Error cargando productos:", error);
    }
}










// Configuracion Theming

const root = document.documentElement; // Defino Root como el Html
const themeToggleBtn = document.getElementById("theme-toggle");

function getCurrentTheme() { // Obtener el tema actual
  return root.getAttribute('data-theme') || 'Auto';
}

function setTheme(theme){  // Establecer la palabra del tema actual
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (themeToggleBtn){
        themeToggleBtn.textContent = `Tema: ${theme}`;
    }
}


function applySavedTheme(){ // Guardar
    const saved = localStorage.getItem('theme');
    if (saved === 'Light' || saved === 'Dark' || saved === 'Auto'){
        setTheme(saved);
    }
}


if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const current = getCurrentTheme();
    let next;
    if (current === 'Auto') next = 'Dark';
    else if (current === 'Dark') next = 'Light';
    else next = 'Auto';

    setTheme(next);
    
  });
}

applySavedTheme();























// Ejercicio botones cambian de color al dar click y imprimir los de la categoria correspondiente
function setupFilters(){
  const filterButtons = document.querySelectorAll(".c-filter__btn[data-category]");

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // 1. Estado visual
      filterButtons.forEach(b => b.classList.remove("c-filter__btn--active"));
      btn.classList.add("c-filter__btn--active");

      // 2. Filtrado
      const category = btn.getAttribute("data-category");

      if (category === "all") {
        Allfiltered = AllProducts
      } else {
        Allfiltered = AllProducts.filter(p => p.category === category); // solo esa categoría
      }

      renderProducts(Allfiltered);
    });
  });
}



// 3. Función para pintar los productos en el HTML
function renderProducts(products) {
    
    const grid = document.getElementById('product-grid');
    grid.innerHTML = ''; // Limpiar el contenedor

    products.forEach(product => {

        // Ejercicio,
        // Lógica para cortar el título
        // const shortTitle = product.title.length > 15 
            //? product.title.substring(0, 15) + '...' 
            //: product.title;


        // Ejercicio, Si la categoria es Joyeria aplicar un estilo diferente
        let claseExtra = "";

        if (product.category === "jewelery"){
            claseExtra = 'c-card--featured';
        }


        // Creamos la estructura usando tus clases de la capa COMPONENTS
        const productHTML = `
            <div class=" c-card ${claseExtra}">
                <img src="${product.image}" alt="${product.title}" class="c-card__image">
                <div class="c-card__body">
                    <h2 class="c-card__title">${product.title}</h2>
                    <p class="c-card__price">$${product.price}</p>
                    <button class="c-card__btn c-card__btn--buy">
                        Agregar al carrito
                    </button>
                </div>
            </div>
        `;
        grid.innerHTML += productHTML;
    });
}

// Ejecutar la función al cargar la página
getProducts();