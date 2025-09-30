console.log("loaded");

const category = new URLSearchParams(window.location.search).get("category");
const url = `https://kea-alt-del.dk/t7/api/products?category=${category}`;

getData(url);

const productContainer = document.querySelector(".product_list_container");

function getData(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => showProducts(data));
}

function showProducts(products) {
  console.log("products", products);
  productContainer.innerHTML = ""; // Tøm containeren først

  products.forEach((product) => {
    console.log("productdisplayname", product.productdisplayname);

    productContainer.innerHTML += `
      <article class="product_list_container ${product.soldout === 1 ? "soldout" : ""}">
        <div class="imageContainer">
          <a href="produkt.html?id=${product.id}">
            <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="${product.productdisplayname}">
          </a>
          <p class="soldout">Ikke på lager</p>
        </div>
        
        <button class="favorite">&#9825;</button>

        <p class="${product.discount > 0 ? "onSale" : "hidden"}">
        -${product.discount}%
        </p>

          <h3>${product.productdisplayname}</h3>
          

        <h4> ${product.discount > 0 ? `<span style="text-decoration: line-through;">${product.price} kr.</span>` : product.price + " kr."}
        </h4>
        ${product.discount > 0 ? `<h4 style="color: #bb1a1aff;">Ny pris: ${(product.price * (1 - product.discount / 100)).toFixed(2)} kr.</h4>` : ""}

         <a href="produkt.html?id=${product.id}">read more</a>
      </article>


     
    `;
  });
}
