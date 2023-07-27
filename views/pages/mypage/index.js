import { blockIfNotLogin } from '/utils/index.js';
blockIfNotLogin();
import * as API from '/api/index.js';
const delivery = document.querySelector('.delivery');
const deliveryReady = document.querySelector('.delivery-ready');
const paymentComplete = document.querySelector('.complete');

async function getInfo() {
  const result = await API.get('/api/member/orders');
  console.log(result);
  // 배송중
  let deliveryCount = 0;
  // 배송완료
  let deliveryCompleteCount = 0;
  // 결제완료
  let paymentCompleteCount = 0;
  result.forEach((item) => {
    switch (item.status) {
      case '결제완료':
        paymentCompleteCount++;
        break;
      case '배송중':
        deliveryCount++;
        break;
      case '배송완료':
        deliveryCompleteCount++;
        break;
    }
    // result.forEach((item) => {
    //   item.status === '결제완료'
    //     ? paymentCompleteCount++
    //     : item.status === '배송중'
    //     ? deliveryCount++
    //     : item.status === '배송완료'
    //     ? deliveryCompleteCount++
    //     : '';
    // });
  });
  delivery.textContent = deliveryCompleteCount + '건';
  deliveryReady.textContent = deliveryCount + '건';
  paymentComplete.textContent = paymentCompleteCount + '건';
}
getInfo();
