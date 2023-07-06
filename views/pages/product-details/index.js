/*
// 제품 정보 받아서 페이지에 출력
// 나중에 API데이터 받으면 파싱하기
fetch('API주소')
  .then(res => res.json())
  .then(data => productData);
*/

const productData = [
  { category: '생활용품 > 위생/청소' },
  { name: '탈취 스프레이' },
  { summary: '국내산 천연 편백수 함유 탈취제' },
  { price: 12900 },
  { description: '리모넨이 포함되지 않은 국내산 심재 편백 탈취 스프레이. 고양이와 함께하는 공간에서는 인공 향료나 에센셜 오일이 포함되지 않은 천연 탈취 스프레이를 사용해야 합니다. 천연 탈취 스프레이로 안심하고 사용하실 수 있습니다.' },
  {rep_img_url: ""},
];

const infoBox = document.querySelector('#info_box');
let infoContent = '';

for (i = 0; i < productData.length; ++i) {
  for (let key in productData[i]) {
    infoContent += `<p>${productData[i][key]}</p>`;
    console.log("infoContent: ", infoContent);
  }
}
infoContent += '<button id="addToCartButton" class="button is-warning">장바구니에 추가</button>';
infoBox.innerHTML = infoContent;

const addCartBtn = document.querySelector('#addToCartButton');

function addCart() {
  alert(`'${productData[1]["name"]}'이(가) 장바구니에 추가되었습니다.`);
  localStorage.setItem("productData", JSON.stringify(productData));
  // 제품 데이터를 로컬스토리지에 저장하고 장바구니에서 다시 받아오려고 함
}

addCartBtn.addEventListener('click', addCart);
