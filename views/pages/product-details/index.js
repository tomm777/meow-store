// function test() {
//   location.href = '/product-details?id=64a8b5c760e6ded9c555e247'; // 이 주소로 이동
// }

console.log(location.search);
//product-details?64a8b5c760e6ded9c555e247

const infoBox = document.querySelector('#info_box');
let productData = {};

async function getProductData(id) {
  try {
    const response = await fetch(`/api/product/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    productData = await response.json();

    infoBox.innerHTML = `
      <p>${productData.name}</p>
      <p>${productData.summary}</p>
      <p>${productData.price}</p>
      <p>${productData.description}</p>
      <button id="addToCartButton" class="button is-warning">장바구니에 추가</button>
    `;

    //const thumbnail = document.querySelector('#product_thumbnail');
    //thumbnail.src = `${productData.repImgUrl}`;

    const addToCartBtn = document.querySelector('#addToCartButton');
    addToCartBtn.addEventListener('click', test);
  } catch (err) {
    console.log(err);
  }
}

getProductData('64a8b5c760e6ded9c555e247');

function addToCart() {
  // 로컬스토리지가 비어있으면 현재 상품을 추가
  if (localStorage.getItem('meowStoreCart') === null) {
    localStorage.setItem('meowStoreCart', JSON.stringify([productData]));
    return;
  }

  // 로컬스토리지에 meowStoreCart가 있다면, 이 상품이 포함되어있는지 체크
  const prevCartData = JSON.parse(localStorage.getItem('meowStoreCart'));
  const isAlreadyIn = () => {
    let bool = false;
    const count = prevCartData.length;
    for (let i = 0; i < count; ++i) {
      const curCartData = prevCartData[i];
      if (productData._id === curCartData._id) {
        bool = true;
        break;
      }
    }
    return bool;
  };

  // 이미 담겨있으면 수량 추가하기. map으로 아이디 찾아서 수량. 수량속성을 이 페이지에서 미리 넣어서 넘기기.

  if (isAlreadyIn()) {
    alert(`이미 장바구니에 담겨진 상품입니다.`);
    return;
  }
  // 상품이 들어있지 않으면 로컬스토리지에 추가
  localStorage.removeItem('meowStoreCart');
  prevCartData.push(productData);
  localStorage.setItem('meowStoreCart', JSON.stringify(prevCartData));
  alert(`'${productData.name}'이(가) 장바구니에 추가되었습니다.`);
}
