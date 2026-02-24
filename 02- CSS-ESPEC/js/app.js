// app.js

const API_URL = 'https://fakestoreapi.com/products?limit=8';
let allProducts = [];

// 1. Obtener datos
async function getProducts() {
    try {
        const response = await fetch(API_URL);
        allProducts = await response.json();
        renderProducts(allProducts); // Pintar inicial
        setupFilters();             // Activar botones
    } catch (error) {
        console.error("Error cargando productos:", error);
    }
}

// 2. Configurar Filtros
function setupFilters() {
    // Nota el punto (.) porque es una clase
    const filterButtons = document.querySelectorAll(".c-filter__btn");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // A. Quitar la clase active a TODOS los botones
            filterButtons.forEach(b => b.classList.remove("c-filter__btn--active"));
            
            // B. Poner la clase active al botón que clickeamos
            btn.classList.add('c-filter__btn--active');

            // C. Filtrar
            const category = btn.getAttribute("data-category");

            if(category === "all"){
                renderProducts(allProducts);
            } else {
                const filtered = allProducts.filter(p => p.category === category);
                renderProducts(filtered);
            }
        });
    });
}

// 3. Renderizar (Pintar en HTML)
function renderProducts(products) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = ''; 

    products.forEach(product => {
        
        let claseExtra = "";

        // Si es joyería, asignamos la clase del borde dorado
        if (product.category === "jewelery"){
            // ¡OJO AQUÍ! Agregué un espacio al inicio: ' c-card--featured'
            // Sin ese espacio, quedaba 'c-cardc-card--featured' y se rompía.
            claseExtra = ' c-card--featured';
        }

        const productHTML = `
            <article class="c-card${claseExtra}">
                <img src="${product.image}" alt="${product.title}" class="c-card__image">
                <div class="c-card__body">
                    <h2 class="c-card__title">${product.title}</h2>
                    <p class="c-card__price">$${product.price}</p>
                    <button class="c-card__btn">Agregar al carrito</button>
                </div>
            </article>
        `;
        grid.innerHTML += productHTML;
    });
}

// Iniciar
getProducts();