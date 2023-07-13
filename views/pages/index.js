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
        <div class="image-box">
          <img src="${item.repImgUrl}" alt="${item.name}" />
        </div>
        <div class="item-bottom">
          <h3 class="title">${item.name}</h3>
          <span>${item.summary}</span>
          <span class="price">${item.price}원</span>
          
        </div>
      </div>
    `,
    );

    const itemBoxs = document.querySelector('.item-box');
    itemBoxs.innerHTML = itemElements.join('');
  }
  showItems();
  const price = document.querySelectorAll('.price');
  console.log(price);
  price.forEach((itme) => {
    itme.textContent = itme.textContent
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  });
}

getProductsList();
