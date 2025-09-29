console.log("loaded category siden");

const categories = "https://kea-alt-del.dk/t7/api/categories";

function getData() {
  console.log("getdata");
  fetch(categories).then((res) => res.json().then((data) => showCategory(data)));
}
function showCategory(categories) {
  console.log("categories: ", categories);
  categories.forEach((category) => {
    console.log("categories", categories);

    category_list_container.innerHTML += `
    <div class="category_list_container">
  <a class="knap" href="produktliste.html?category=${category.category}">
    ${category.category}
  </a>
  </div>
`;
  });
}
getData();
