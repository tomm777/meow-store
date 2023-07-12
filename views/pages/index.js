function redirectToProductDetails(itemId) {
  location.href = `/product-details?id=${itemId}`;
}

async function getProductsList() {
  const response = await fetch('/api/products');
  const jsonData = await response.json();
  console.log(jsonData);

  //전체 아이템 표시
  function showItems() {
    const itemElements = jsonData.map(
      (item) => `
      <div class="item" id="${item._id}" onclick="redirectToProductDetails('${item._id}')">
        <img src="${item.repImgUrl}" alt="${item.name}" />
        <h3>${item.name}</h3>
        <p>${item.summary}</p>
      </div>
    `
    );

    const itemBoxs = document.querySelector('.item-box');
    itemBoxs.innerHTML = itemElements.join('');
  }
  showItems();
}

getProductsList();
