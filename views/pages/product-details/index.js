import * as API from '/api/index.js';
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const infoBox = document.querySelector('#info_box');
let productData = {};

async function getProductData(id) {
  try {
    const response = await API.get(`/api/product/${id}`);

    productData = { ...response };
    productData.qty = 1;

    let subCategory = '';
    if (productData.subcategoryId)
      subCategory = ` > ${productData.subcategoryId.subCategoryName}`;
    infoBox.innerHTML = `
      <p class="product_category">${
        productData.categoryId.categoryName
      }${subCategory}</p>
      <p class="product_name title is-3">${productData.name}</p>
      <p class="line"></p>
      <p class="product_summary">${productData.summary}</p>
      <p class="product_description">${productData.description}</p>
      <p class="line"></p>
      <p class="product_price">${productData.price.toLocaleString()} 원</p>
      <div class="addToCart">
        <button id="order_button" class="button is-warning">구매하기</button>
        <button id="cart_button" class="button is-warning">장바구니에 추가</button>
      </div>
    `;

    const thumbnail = document.querySelector('#product_thumbnail');
    thumbnail.src = `${productData.repImgUrl}`;

    document.querySelector('#cart_button').addEventListener('click', addToCart);
    document
      .querySelector('#order_button')
      .addEventListener('click', addToCart);
  } catch (err) {
    console.log(err);
  }
}

getProductData(id);

function addToCart() {
  if (localStorage.getItem('meowStoreCart') === null) {
    localStorage.setItem('meowStoreCart', JSON.stringify([productData]));
    alert(`'${productData.name}'이(가) 장바구니에 추가되었습니다.`);
    return;
  }

  // 로컬스토리지에 meowStoreCart가 있다면, 이 상품이 들어가있는지 체크
  let savedCartData = JSON.parse(localStorage.getItem('meowStoreCart'));

  const isAlreadyIn = () => {
    let bool = false;
    const count = savedCartData.length;
    for (let i = 0; i < count; ++i) {
      const currentCartData = savedCartData[i];
      if (productData._id === currentCartData._id) {
        bool = true;
        break;
      }
    }
    return bool;
  };

  if (isAlreadyIn()) {
    const userConfirm = confirm(
      '이미 장바구니에 담겨진 상품입니다. 1개 더 추가하시겠습니까?',
    );
    if (userConfirm) {
      savedCartData = savedCartData.map((o) => {
        if (o._id === productData._id && o.qty < 9) o.qty += 1;
        return o;
      });
      localStorage.setItem('meowStoreCart', JSON.stringify(savedCartData));
    }
    return;
  }
  // 이 상품이 장바구니에 담겨있지 않다면 추가
  savedCartData.push(productData);
  localStorage.setItem('meowStoreCart', JSON.stringify(savedCartData));
  alert(`'${productData.name}'이(가) 장바구니에 추가되었습니다.`);
}
