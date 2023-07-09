async function getOrderSummary() {
    const response = await fetch("");
    const jsonData = await response.json();
    console.log(jsonData);
  }

const orderSummary = {
      "totalOrderCount": 10,
      "totalOrderAmount": 500000,
      "paymentPending": 2,
      "paymentCompleted": 5,
      "shippingPending": 1,
      "shippingInProgress": 1,
      "shippingCompleted": 1,
      "purchaseNotConfirmed": 3,
      "cancelled": 2,
      "refunded": 1,
      "returned": 1,
      "exchanged": 0
    }

// // 카테고리 불러오기 함수
// let currentCategoryIndex = 0;
// const mainNav = document.querySelector('.mainNav');

// function showCategories() {
//     const categoryElements = categories.map(category => `<li><a href="">${category.category}</a></li>
//     `);
//     mainNav.innerHTML = `<ul>${categoryElements.join('')}<ul>`;

//     console.log(categoryElements);
// }

//페이지 로드 시 카테고리 보여주기
showCategories();