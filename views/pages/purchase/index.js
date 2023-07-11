function redirectToOrderDetails(_id) {
  location.href = `/order-details?id=${_id}`;
}

async function getOrderSummary() {
  const response = await fetch('/api/member/orders');
  const jsonData = await response.json();
  console.log(jsonData);

  const purchaseList = document.querySelector('.purchase-list');

  function showPurchaseList() {
    const purchaseListElements = jsonData.map(
      (purchaseInfo) => `
      <article class="purchase-item" id="${purchaseInfo._id}">
        <img class="thumbnail" src="고양이사료썸네일.jpg" alt='고양이사료썸네일'>
        <div class="purchase-details">
          <span class="order-number">주문번호: ${purchaseInfo._id}</span>
          <span class="purchaseDate">구매 일자: ${purchaseInfo.createDate}</span>
          <h3 class="product-name">${purchaseInfo.title}</h3>
          <h3 class="price">${purchaseInfo.totalPrice} 원</h3>
        </div>
        <div class="detailShipping">
          <button class="view-details" onclick="redirectToOrderDetails('${purchaseInfo._id}')">상세 내역 보기</button>
          <div class="shipping-status">${purchaseInfo.status}</div>
        </div>
      </article>
    `
    );
    purchaseList.innerHTML = purchaseListElements.join('');
  }

  

  showPurchaseList();
}

getOrderSummary();
