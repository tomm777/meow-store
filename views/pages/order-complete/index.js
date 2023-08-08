import * as API from '/api/index.js';

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const ulElement = document.querySelector('#order-ul');
try {
  const promise = API.get(`/api/member/order/${id}`);

  promise.then((data) => {
    ulElement.innerHTML = `
      <li>
        <div class="order-list">
          <span>주문자</span>
          <span>${data.order.receiver}</span>
        </div>
      </li>
      <li>
        <div class="order-list">
          <span>상품명</span>
          <span>${data.order.title}</span>
        </div>
      </li>
      <li>
        <div class="order-list">
          <span>주문번호</span>
          <span>${data.order.number}</span>
        </div>
      </li>
      <li>
        <div class="order-list">
          <span>배송지</span>
          <span>${data.order.address} ${data.order.detailAddress}</span>
        </div>
      </li>
      <li>
        <div class="order-list">
          <span>총 결제 금액</span>
          <span>${data.order.totalPrice.toLocaleString()}</span>
        </div>
      </li>
    `;
    localStorage.removeItem('meowStoreCart');
  });
} catch (error) {
  throw error;
}

const orderListBtn = document.querySelector('#to_order_list');
const homeBtn = document.querySelector('#to_home');

orderListBtn.addEventListener('click', () => {
  location.href = '/purchase/';
});

homeBtn.addEventListener('click', () => {
  location.href = '/';
});
