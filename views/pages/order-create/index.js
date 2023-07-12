import * as API from '/api/index.js';

const receiverInput = document.querySelector('#receiver');
const contactInput = document.querySelector('#contact');
const zipCodeInput = document.querySelector('#zip_code');
const searchZipCodeBtn = document.querySelector('#search_zip_code');
const addressInput = document.querySelector('#address');
const detailAddressInput = document.querySelector('#detail_address');
const messageInput = document.querySelector('#message');
const orderBtn = document.querySelector('#order_btn');
const orderList = document.querySelector('.order_list');
const priceSumElement = document.querySelector('#price_sum');

let savedCartData = JSON.parse(localStorage.getItem('meowStoreCart')) || [];
let priceSum = 0;
let dataToSend = {
  receiver: '',
  receiverContact: '',
  zipCode: 0,
  address: '',
  detailAddress: '',
  shippingMessage: '',
  totalPrice: 0,
  orderItemList: [],
};

// savedCartData의 상품목록을 그려주고, 각 아이템을 dataToSend에 넣는 반복문
for (let i = 0; i < savedCartData.length; ++i) {
  let data = savedCartData[i];
  const subTotal = data.price * data.qty;
  priceSum += subTotal;
  const temp = {
    productId: data._id,
    quantity: data.qty,
    totalPrice: subTotal,
  };
  dataToSend.orderItemList.push(temp);

  const content = `
    <div class="product_wrap" product_id="${data._id}">
      <div class="thumbnail_wrap">
        <img src="${data.repImgUrl}" class="product_thumbnail" alt="thumbnail"/>
      </div>
      <div class="product_info">
        <span class="product_name">${data.name}</span>
        <span class="product_qty">${data.qty}개</span>
        <span class="product_price">${subTotal.toLocaleString()}원</span>
      </div>
    </div>
  `;
  const newLi = document.createElement('li');
  newLi.innerHTML = content;
  orderList.appendChild(newLi);
}
priceSumElement.innerText = priceSum.toLocaleString();

const searchZipCode = () => {
  new daum.Postcode({
    oncomplete: function (data) {
      zipCodeInput.value = data.zonecode;
      addressInput.value = data.address;
    },
  }).open();
};
searchZipCodeBtn.addEventListener('click', searchZipCode);

async function createOrder(event) {
  event.preventDefault();
  dataToSend.receiver = receiverInput.value;
  dataToSend.receiverContact = contactInput.value;
  dataToSend.zipCode = zipCodeInput.value;
  dataToSend.address = addressInput.value;
  dataToSend.detailAddress = detailAddressInput.value;
  dataToSend.shippingMessage = messageInput.value;
  dataToSend.totalPrice = priceSum;

  const userConfirm = confirm('결제하시겠습니까?');
  if (userConfirm) {
    const result = await API.post('/api/member/order', dataToSend);
    console.log(result);
  }
};
orderBtn.addEventListener('click', createOrder);
