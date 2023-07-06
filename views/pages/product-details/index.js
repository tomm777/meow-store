/* 제품 정보 받아서 페이지에 출력. 나중에 API데이터 받으면 fetch하기
fetch('API주소')
  .then(res => res.json())
  .then(data => productData);
*/
const productData = {
  _id: '상품 id(sfsdf)',
  name: '[사료]로얄캐닌 10kg',
  price: 100000,
  summary: '어린 고양이를 위한 사료 10kg',
  description: '어린 고양이에 너무 좋다고 하더라...',
  repImgUrl:
    'https://github.com/onblana/vanillajs-challenge/assets/51261847/ef77fe8d-6805-4096-ad4b-dfa627083e7c',
  createDate: '2023-07-05',
  createUser: '최하은',
  deleteYn: 'N',
  category: [
    {
      _id: '카테고리 id(sdfsdf)',
      category: '사료',
    },
  ],
};

const thumbnail = document.querySelector('#product_thumbnail');
thumbnail.src = `${productData.repImgUrl}`;

const infoBox = document.querySelector('#info_box');
infoBox.innerHTML = `
  <p>${productData.category[0].category}</p>
  <p>${productData.name}</p>
  <p>${productData.summary}</p>
  <p>${productData.price}</p>
  <p>${productData.description}</p>
  <button id="addToCartButton" class="button is-warning">장바구니에 추가</button>
`;

const addCartBtn = document.querySelector('#addToCartButton');

function addCart() {
  if (localStorage.getItem(`${productData._id}`)) {
    alert(`이미 장바구니에 추가되어있습니다.`);
  } else {
    localStorage.setItem(`${productData._id}`, JSON.stringify(productData));
    alert(`'${productData[1]['name']}'이(가) 장바구니에 추가되었습니다.`);
  }
}

addCartBtn.addEventListener('click', addCart);