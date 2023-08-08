import { blockIfNotLogin } from '/utils/index.js';
blockIfNotLogin();
import * as API from '/api/index.js';
const delivery = document.querySelector('.delivery');
const deliveryReady = document.querySelector('.delivery-ready');
const paymentComplete = document.querySelector('.complete');

async function getInfo() {
  try {
    const result = await API.get('/api/member/orders');
    console.log(result);
    // 배송중
    let deliveryCount = 0;
    // 배송완료
    let deliveryCompleteCount = 0;
    // 결제완료
    let paymentCompleteCount = 0;
    // Switch문
    // result.forEach((item) => {
    //   switch (item.status) {
    //     case '결제완료':
    //       paymentCompleteCount++;
    //       break;
    //     case '배송중':
    //       deliveryCount++;
    //       break;
    //     case '배송완료':
    //       deliveryCompleteCount++;
    //       break;
    //   }
    // Object-Literals 방식으로 변경
    const obj = {
      결제완료: () => {
        return ++paymentCompleteCount;
      },
      배송중: () => {
        return ++deliveryCount;
      },
      배송완료: () => {
        return ++deliveryCompleteCount;
      },
      취소: () => {
        return;
      },
    };

    result.forEach((item) => {
      // 함수호출 부분이라서 ()를 붙혀줘야 실행
      obj[item.status]();
    });

    delivery.textContent = deliveryCompleteCount + '건'; // 배송완료
    deliveryReady.textContent = deliveryCount + '건'; // 배송중
    paymentComplete.textContent = paymentCompleteCount + '건'; // 결제완료
  } catch (error) {
    throw error;
  }
}
getInfo();
