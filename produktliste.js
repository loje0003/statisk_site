console.log("loaded");

const category = new URLSearchParams(window.location.search).get("category");
const url = `https://kea-alt-del.dk/t7/api/products?category=${category}`;

getData(url);

const productContainer = document.querySelector(".product_list_container");

let allData = [];
function getData(url) {
  console.log("Henter data...");
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      allData = data;
      showProducts(data);
    });
}

getData(url);

document.querySelectorAll(".buttons button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.season;
    if (filter === "All") {
      showProducts(allData);
    } else {
      const filtered = allData.filter((p) => p.season === filter);
      showProducts(filtered);
    }
  });
});

function showProducts(products) {
  console.log("products", products);
  productContainer.innerHTML = "";

  products.forEach((product) => {
    console.log("productdisplayname", product.productdisplayname);

    productContainer.innerHTML += `
  <article class="product ${product.soldout === 1 ? "soldout" : ""}">
    <div class="imageContainer">
      <a href="produkt.html?id=${product.id}">
        <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="${product.productdisplayname}">
      </a>
      <p class="soldout-label">Ikke på lager</p>

      <div class="top-right">
        <button class="favorite">&#9825;</button>
        <p class="${product.discount > 0 ? "onSale" : "hidden"}">
          -${product.discount}%
        </p>
      </div>
    </div>
<div class="tekst_produktliste">
    <h3>${product.productdisplayname}</h3>

    <h4>
      ${product.discount > 0 ? `<span style="text-decoration: line-through;">${product.price} kr.</span>` : product.price + " kr."}
    </h4>
    ${product.discount > 0 ? `<h4 style="color: #bb1a1aff;">Ny pris: ${(product.price * (1 - product.discount / 100)).toFixed(2)} kr.</h4>` : ""}

    <a class="read_more" href="produkt.html?id=${product.id}">read more</a>

</div>
  </article>
`;
  });
}
