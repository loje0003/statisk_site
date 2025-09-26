console.log("loaded");

getData("https://kea-alt-del.dk/t7/api/products/");
const productContainer = document.querySelector(".product_list_container");
function getData(url) {
  fetch(url).then((res) => res.json().then((data) => showProducts(data)));
}

function showProducts(products) {
  console.log("products", products);
  products.forEach((product) => {
    console.log("productdisplayname", product.productdisplayname);

    let soldOutClass = "";
    if (product.soldout === 1) {
      soldOutClass = "udsolgt";
    }

    productContainer.innerHTML += ` 
<article>
  <div class="billede">
    <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="${product.productdisplayname}">
  </div>
  <button class="favorite">&#9825;</button>

  ${
    product.soldout === 1
      ? `
    <div class="udsolgt">
      <p>Ikke på lager</p>
      <a href="produktliste.html">Se lignende produkter</a>
    </div>
  `
      : ""
  }

  <p class="onSale">${product.discount}%</p>
  <h3>${product.productdisplayname}</h3>
  <div class="rating">
    &starf;&starf;&starf;&starf;&star;<span>(42)</span>
  </div>
  <h4>${product.price} kr.</h4>
  <a href="produkt.html">read more</a>
</article>
`;
  });
}
