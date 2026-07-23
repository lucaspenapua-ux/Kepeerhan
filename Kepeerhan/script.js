// ===============================
// KEEPERHAN - Script Principal
// ===============================

let carrito = [];
let total = 0;

// Agregar productos al carrito
function agregarCarrito(nombre, precio) {
    carrito.push({
        nombre: nombre,
        precio: precio
    });

    total += precio;

    actualizarCarrito();

    alert(nombre + " fue añadido al carrito.");
}

// Actualizar carrito
function actualizarCarrito() {

    const lista = document.getElementById("listaCarrito");
    const totalTexto = document.getElementById("total");
    const contador = document.getElementById("contador");

    lista.innerHTML = "";

    carrito.forEach((producto, index) => {

        lista.innerHTML += `
            <div class="productoCarrito">
                <p><strong>${producto.nombre}</strong></p>
                <p>$${producto.precio.toLocaleString("es-CL")}</p>

                <button onclick="eliminarProducto(${index})">
                    Eliminar
                </button>

                <hr>
            </div>
        `;
    });

    contador.innerHTML = carrito.length;

    totalTexto.innerHTML = total.toLocaleString("es-CL");
}

// Eliminar producto
function eliminarProducto(indice){

    total -= carrito[indice].precio;

    carrito.splice(indice,1);

    actualizarCarrito();

}

// Mostrar descripción
function mostrarDescripcion(texto){

    document.getElementById("popup").style.display="flex";

    document.getElementById("textoDescripcion").innerHTML=texto;

}

// Cerrar descripción
function cerrarPopup(){

    document.getElementById("popup").style.display="none";

}

// Comprar
const botonesComprar=document.querySelectorAll(".comprar");

botonesComprar.forEach(boton=>{

    boton.addEventListener("click",()=>{

        if(carrito.length==0){

            alert("Primero agrega un producto al carrito.");

            return;

        }

        alert("✅ Gracias por comprar en KEEPERHAN.\n\nTu pedido fue registrado correctamente.");

        carrito=[];

        total=0;

        actualizarCarrito();

    });

});

// Abrir / cerrar carrito
const carritoPanel=document.getElementById("carrito");

const botonCarrito=document.getElementById("carritoBtn");

let abierto=true;

botonCarrito.addEventListener("click",()=>{

    if(abierto){

        carritoPanel.style.display="none";

        abierto=false;

    }else{

        carritoPanel.style.display="block";

        abierto=true;

    }

});

// Buscador de productos
const buscador=document.getElementById("buscar");

buscador.addEventListener("keyup",()=>{

    const texto=buscador.value.toLowerCase();

    const tarjetas=document.querySelectorAll(".card");

    tarjetas.forEach(card=>{

        const nombre=card.querySelector("h3").innerText.toLowerCase();

        if(nombre.includes(texto)){

            card.style.display="block";

        }else{

            card.style.display="none";

        }

    });

});

// Animación al cargar la página
window.onload=()=>{

    document.body.style.opacity="0";

    setTimeout(()=>{

        document.body.style.transition="1s";

        document.body.style.opacity="1";

    },200);

};

// Finalizar compra
const finalizar = document.querySelector(".finalizar");

if (finalizar) 
    finalizar.addEventListener("click", () => {
    if(carrito.length===0){

        alert("Tu carrito está vacío.");

        return;

    }

    let resumen="RESUMEN DE COMPRA\n\n";

    carrito.forEach(producto=>{

        resumen+=`${producto.nombre} - $${producto.precio.toLocaleString("es-CL")}\n`;

    });

    resumen+=`\nTOTAL: $${total.toLocaleString("es-CL")}`;

    alert(resumen);

});