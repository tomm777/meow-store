import * as API from '/api/index.js';

async function getOrderSummary() {
  const jsonData = await API.get('/api/member/orders');
  const purchaseList = document.querySelector('.purchase-list');

  const purchaseListElements = jsonData.map(
    (purchaseInfo) => `
    <article class="purchase-item" id="${purchaseInfo._id}">
      <img class="thumbnail" src="${purchaseInfo.repImgUrl}" alt='고양이사료썸네일'>
      <div class="purchase-details">
        <span class="order-number">주문번호: ${purchaseInfo.number}</span>
        <span class="purchaseDate">구매 일자: ${purchaseInfo.createDate}</span>
        <h3 class="product-name">${purchaseInfo.title}</h3>
        <h3 class="price">${purchaseInfo.totalPrice} 원</h3>
      </div>
      <div class="detailShipping">
        <button class="view-details" name="goToOrderDetailBtn">상세 내역 보기</button>
        <div class="shipping-status">${purchaseInfo.status}</div>
      </div>
    </article>
  `,
  );
  purchaseList.innerHTML = purchaseListElements.join('');

  //반복적인 요소에 이벤트 버블링을 이용해서 위임하기
  purchaseList.addEventListener('click', (event) => {
    const target = event.target;
    if (target.getAttribute('name') === 'goToOrderDetailBtn') {
      const orderId = target.closest('.purchase-item').getAttribute('id');
      location.href = `/order-details?id=${orderId}`;
    }
  });
}

getOrderSummary();
