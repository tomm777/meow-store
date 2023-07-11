const receiverInput = document.querySelector('#receiver');
const contactInput = document.querySelector('#contact');
const zipCodeInput = document.querySelector('#zip_code');
const searchZipCodeBtn = document.querySelector('#search_zip_code');
const addressInput = document.querySelector('#address');
const detailAddressInput = document.querySelector('#detail_address');
const messageInput = document.querySelector('#message');

let savedCartData = JSON.parse(localStorage.getItem('meowStoreCart')) || [];
const orderList = document.querySelector('.order_list');

// savedCartData의 상품목록을 그려주는 반복문
for (let i = 0; i < savedCartData.length; ++i) {
  let data = savedCartData[i];
  const content = `
    <div class="product_wrap" product_id="${data._id}">
      <div class="product_thumbnail">
        <!-- <img src="${data.repImgUrl}" alt="thumbnail"/> -->
      </div>
      <span>${data.name}</span>
      <span class="product_qty">${data.qty}개</span>
      <span class="product_price">${data.price}원</span>
    </div>
  `;
  const newLi = document.createElement('li');
  newLi.innerHTML = content;
  orderList.appendChild(newLi);
}

const searchZipCode = () => {
  new daum.Postcode({
    oncomplete: function (data) {
      zipCodeInput.value = data.zonecode;
      addressInput.value = data.address;
    },
  }).open();
};
searchZipCodeBtn.addEventListener('click', searchZipCode);

const data = {
  receiver: `${receiverInput.value}`,
  receiverContact: `${contactInput.value}`,
  zipCode: `${zipCodeInput.value}`,
  address: `${addressInput.value}`,
  detailAddress: `${detailAddressInput.value}`,
  shippingMessage: `${messageInput.value}`,
  totalPrice: 100000,
  orderItemList: [
    {
      productId: '64a80c24e44baefcf37f9fe6',
      quantity: 1,
      totalPrice: 10000,
    },
  ],
};

const createOrder = () => {
  const userConfirm = confirm('결제하시겠습니까?');
  if (userConfirm) {
    fetch('api/member/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // 전송할 데이터의 형식 지정 (JSON 형식 예시)
      },
      body: JSON.stringify(data), // 데이터를 JSON 형식으로 변환하여 전송
    })
      .then(function (response) {
        if (response.ok) {
          return response.text();
        }
        throw new Error('Network response was not ok.');
      })
      .then(function (responseText) {
        // 요청이 성공적으로 완료되었을 때의 처리 로직
        console.log(responseText);
      })
      .catch(function (error) {
        // 요청이 실패했을 때의 처리 로직
        console.log('Error: ', error.message);
      });
  }
};
