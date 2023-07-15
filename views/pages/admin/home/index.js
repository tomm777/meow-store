// /*더미데이터 완성 후 사용*/
// async function getOrderSummary() {
//     const response = await fetch("");
//     const jsonData = await response.json();
//     console.log(jsonData);
//   }

/*더미데이터*/
const orderSummaryArr = [
    {
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
]
// 테이블 데이터 로드 함수
function loadDummyData() {
    // 전체 주문현황 테이블
    const orderSummaryTable = document.getElementById("orderSummaryTable");
    const orderSummaryData = orderSummaryArr[0];
  
    if (orderSummaryTable) {
      // 총 주문건수
      const totalOrderCountCell = orderSummaryTable.querySelector(
        "tbody tr:last-child td:first-child"
      );
      totalOrderCountCell.textContent = orderSummaryData.totalOrderCount;
  
      // 총 주문액
      const totalOrderAmountCell = orderSummaryTable.querySelector(
        "tbody tr:last-child td:last-child"
      );
      totalOrderAmountCell.textContent = orderSummaryData.totalOrderAmount;
    }
  
    // 주문상태현황 테이블
    const orderStatusTable = document.getElementById("orderStatusTable");
    const orderStatusData = orderSummaryArr[0];
  
    if (orderStatusTable) {
      // 입금대기
      const paymentPendingCell = orderStatusTable.querySelector(
        "tbody tr:last-child td:first-child"
      );
      paymentPendingCell.textContent = orderStatusData.paymentPending;
  
      // 입금완료
      const paymentCompletedCell = orderStatusTable.querySelector(
        "tbody tr:last-child td:nth-child(2)"
      );
      paymentCompletedCell.textContent = orderStatusData.paymentCompleted;
  
      // 배송대기
      const shippingPendingCell = orderStatusTable.querySelector(
        "tbody tr:last-child td:nth-child(3)"
      );
      shippingPendingCell.textContent = orderStatusData.shippingPending;
  
      // 배송중
      const shippingInProgressCell = orderStatusTable.querySelector(
        "tbody tr:last-child td:nth-child(4)"
      );
      shippingInProgressCell.textContent = orderStatusData.shippingInProgress;
  
      // 배송완료
      const shippingCompletedCell = orderStatusTable.querySelector(
        "tbody tr:last-child td:last-child"
      );
      shippingCompletedCell.textContent = orderStatusData.shippingCompleted;
    }
  
    // 구매확정/클레임현황 테이블
    const purchaseClaimsTable = document.getElementById("purchaseClaimsTable");
    const purchaseClaimsData = orderSummaryArr[0];
  
    if (purchaseClaimsTable) {
      // 구매미확정
      const purchaseNotConfirmedCell = purchaseClaimsTable.querySelector(
        "tbody tr:last-child td:first-child"
      );
      purchaseNotConfirmedCell.textContent = purchaseClaimsData.purchaseNotConfirmed;
  
      // 취소
      const cancelledCell = purchaseClaimsTable.querySelector(
        "tbody tr:last-child td:nth-child(2)"
      );
      cancelledCell.textContent = purchaseClaimsData.cancelled;
  
      // 환불
      const refundedCell = purchaseClaimsTable.querySelector(
        "tbody tr:last-child td:nth-child(3)"
      );
      refundedCell.textContent = purchaseClaimsData.refunded;
  
      // 반품
      const returnedCell = purchaseClaimsTable.querySelector(
        "tbody tr:last-child td:nth-child(4)"
      );
      returnedCell.textContent = purchaseClaimsData.returned;
  
      // 교환
      const exchangedCell = purchaseClaimsTable.querySelector(
        "tbody tr:last-child td:last-child"
      );
      exchangedCell.textContent = purchaseClaimsData.exchanged;
    }
  }
  
  //테이블 로드시 데이터 로딩
  window.addEventListener("DOMContentLoaded", loadDummyData);