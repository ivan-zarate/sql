let baseUrl = "http://localhost:8080";
let productos = [];


const getProducts = () => {
    fetch(baseUrl + '/api/products').then(res => {
        res.json().then(json => {
            productos = json;
            printProducts()
        })
    })
}
const printProducts = () => {
    let container = document.getElementById('products');
    container.innerHTML = "";
    productos.product.forEach(producto => {
        container.innerHTML += mapProducts(producto);
    })
}

const mapProducts = (product) => {
    return `<div>
            
            <h5>${product.name}</h5>
            <p>$${product.price}</p>
            <img src="${product.url}" alt="${product.name}">
            <button type="button" class="btn btn-danger btn-sm" onclick="deleteProduct(${product.id})">Eliminar</button>
            <button type="button" class="btn btn-warning btn-sm" onclick="populateData(${product.id})">Actualizar</button>
            </div>
            `

}

const deleteProduct = (productId) => {
    fetch(baseUrl + '/api/products/' + productId, { method: "Delete" }).then(res => {
        getProducts();
    })
}

const addProduct = () => {
    let data = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        code: document.getElementById("code").value,
        url: document.getElementById("url").value,
        price: document.getElementById("price").value,
        stock: document.getElementById("stock").value,
    }
    fetch(baseUrl + '/api/products/', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": 'application/json; charset=UTF-8'
        }
    }).then(res => {
        getProducts();
    })
}

const populateData = (productId) => {
    let product = productos.product.filter(product => product.id == productId)[0];
    document.getElementById("name").value = product.name;
    document.getElementById("description").value = product.description;
    document.getElementById("code").value = product.code;
    document.getElementById("url").value = product.url;
    document.getElementById("price").value = product.price;
    document.getElementById("stock").value = product.stock;
    document.getElementById("productId").value = product.id;
}

const actualizeProduct = () => {
    let data = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        code: document.getElementById("code").value,
        url: document.getElementById("url").value,
        price: document.getElementById("price").value,
        stock: document.getElementById("stock").value,
        id: document.getElementById("productId").value
    }
    fetch(baseUrl + '/api/products/' + data.id, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": 'application/json; charset=UTF-8'
        }
    }).then(res => {
        getProducts();
    })
}
const productsInCart = () => {
    fetch(baseUrl + '/api/cart/1/products').then(res => {
        res.json().then(json => {
            productos = json;
            printCartProducts()
        })
    })
}

const printCartProducts = () => {
    let container = document.getElementById('cartProducts');
    container.innerHTML = "";
    productos.products.forEach(producto => {
        container.innerHTML += mapCartProducts(producto);
    })
    productsTo();
}

const mapCartProducts = (product) => {
    return `
    <div>
    <h6>${product.name}</h6>
    <p>$${product.price}</p>
    <img style="height:4em" src="${product.url}" alt="${product.name}">
</div>`

}

const productsTo = () => {
    fetch(baseUrl + '/api/products').then(res => {
        res.json().then(json => {
            productos = json;
            printProductsCart()
        })
    })
}
const printProductsCart = () => {
    let container = document.getElementById('items');
    container.innerHTML = "";
    productos.allProducts.forEach(producto => {
        container.innerHTML += mapProductsCart(producto);
    })
}

const mapProductsCart = (product) => {
    return `<div>
            
            <h5>${product.name}</h5>
            <p>$${product.price}</p>
            <img src="${product.url}" alt="${product.name}">
            <button type="button" class="btn btn-danger btn-sm" onclick="addProductCart(${product.id})">Agregar</button>
            </div>
            `
}

const addProductCart = (productId) => {
    fetch(baseUrl + '/api/cart/1/products/' + productId, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json; charset=UTF-8'
        }
    }).then(res => {
        printCartProducts();
    })
}

