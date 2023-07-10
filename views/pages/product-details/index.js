// API 나오면 하기
// fetch('API 요청 보낼 URL')
//   .then((response) => {
//     if (!response.ok) throw new Error('400 또는 500 에러');
//     return response.json();
//   })
//   .then((result) => productData)
//   .catch(() => {
//     console.log('에러');
//   });

// 더미데이터
const productData = {
  _id: '111',
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
let cartArr = [];
cartArr.push(productData);

const addToCart = () => {
  // 로컬스토리지가 비어있으면 현재 상품을 추가
  if (localStorage.getItem('meowStoreCart') === null) {
    localStorage.setItem('meowStoreCart', JSON.stringify(cartArr));
    return;
  }

  // 로컬스토리지에 meowStoreCart가 있다면
  // 현재 상품이 이미 들어가있는지 체크
  const prevCartData = JSON.parse(localStorage.getItem('meowStoreCart'));
  const isAlreadyIn = () => {
    let bool = false;
    const count = prevCartData.length;
    for(let i = 0 ; i < count ; ++i) {
      const curCartData = prevCartData[i];
      if (productData._id === curCartData._id) {
        bool = true;
        break;
      }
    }
    return bool;
};

  if (isAlreadyIn()) {
    alert(`이미 장바구니에 담겨진 상품입니다.`);
    return;
  }
  // 상품이 들어있지 않으면 로컬스토리지에 추가
  localStorage.removeItem('meowStoreCart');
  prevCartData.push(productData);
  localStorage.setItem('meowStoreCart', JSON.stringify(prevCartData));
  alert(`'${productData.name}'이(가) 장바구니에 추가되었습니다.`);
};

addToCartBtn.addEventListener('click', addToCart);