/* 제품 정보 받아서 페이지에 출력. 나중에 API데이터 받으면 fetch하기
fetch('API 요청 보낼 URL')
  .then((response) => {
    if (!response.ok) throw new Error('400 또는 500 에러');
    return response.json();
  })
  .then((result) => productData)
  .catch(() => {
    console.log('에러');
  });
*/

// 더미데이터
const productData = {
  _id: '444',
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

const addToCartBtn = document.querySelector('#addToCartButton');

// JSON.stringify() --- JavaScript object를 JSON string으로 변환
// JSON.parse() --- JSON string을 JavaScript object로 변환

const addToCart = () => {
  if (localStorage.getItem('meowStoreCart') === null) {
    localStorage.setItem('meowStoreCart', JSON.stringify(productData));
    return;
  }

  // JSON이 배열형식이 아니어서 에러로 동작하지 않음 (forEach, push 메소드 사용불가)
  // 수정이 필요함

  // const prevCartData = JSON.parse(localStorage.getItem('meowStoreCart')); // prev는 JS object이다.
  // console.log("prevCartData: ", prevCartData);

  // const isAlreadyIn = prevCartData.forEach((object) => {
  //   console.log("isAlreadyIn: ", isAlreadyIn);
  //   console.log("object: ", object);
  //   if (object.id === productData.id) return true;
  //   return false;
  // });

  // if (isAlreadyIn) {
  //   alert(`이미 장바구니에 담겨진 상품입니다.`);
  //   return;
  // } else {
  //   const newCartData = prevCartData.push(productData);
  //   localStorage.setItem('mewoStoreCart', JSON.stringify(newCartData));
  //   alert(`'${productData.name}'이(가) 장바구니에 추가되었습니다.`);
  // }
};

addToCartBtn.addEventListener('click', addToCart);
