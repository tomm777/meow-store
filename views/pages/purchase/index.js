/*DB로 부터 데이터 받아옴. api 완성시 사용.*/
// async function getProductsList() {
//   const response = await fetch("/api/products");
//   const jsonData = await response.json();
//   console.log(jsonData);
// }

// getProductsList();

const purchaseListArr = [
    {
      "_id": "주문 id(sfsdf)",
      "number": "2023070601(날짜와 시간 외 조합)",
      "title": "[사료]로얄캐닌 10kg 외 25건",
      "price": 200000,
      "repImgUrl": "https://github.com/SparklingMind/JavaScript/assets/129268793/4f752356-00a6-4ca9-bd70-b9e970aa5a2e",
      "createDate": "2023-07-05"
    },
    {
      "_id": "주문 id(asdfgh)",
      "number": "2023070702(날짜와 시간 외 조합)",
      "title": "[장난감]캣닢볼 외 5건",
      "price": 50000,
      "repImgUrl": "https://github.com/SparklingMind/JavaScript/assets/129268793/4f752356-00a6-4ca9-bd70-b9e970aa5a2e",
      "createDate": "2023-07-06"
    },
    {
      "_id": "주문 id(qwerty)",
      "number": "2023070803(날짜와 시간 외 조합)",
      "title": "[배변패드]캣그리드 50매 외 10건",
      "price": 80000,
      "repImgUrl": "https://github.com/SparklingMind/JavaScript/assets/129268793/4f752356-00a6-4ca9-bd70-b9e970aa5a2e",
      "createDate": "2023-07-07"
    }
  ];

/*구매내역리스트 보여주는 함수*/
const purchaseList = document.querySelector(".purchase-list");


function showPurchaseList() {
  const purchaseListElements = purchaseListArr.map(purchaseInfo => `
  <article class="purchase-item" id="${purchaseInfo._id}">
        <div class="purchase-details">
          <span class="order-number">주문번호: ${purchaseInfo.number}</span>
          <span class="purchaseDate">구매 일자: ${purchaseInfo.createDate}</span>
          <h3 class="product-name">${purchaseInfo.title}</h3>
          <h3 class="price">${purchaseInfo.price} 원</h3>
        </div>
        <div class="detailShipping">
          <button class="view-details">상세 내역 보기</button>
          <div class="shipping-status">배송 상태</div>
        </div>
  </article>`);
  purchaseList.innerHTML = purchaseListElements.join("");
  
}
showPurchaseList();





const categoryArr = [
    {
      "_id": "1",
      "category": "사료"
    },
    {
      "_id": "2",
      "category": "외출용품"
    },
    {
      "_id": "3",
      "category": "장난감"
    },
    {
      "_id": "4",
      "category": "고양이 의류"
    },
    {
      "_id": "5",
      "category": "건강관리"
    }
  ];

  // 카테고리 불러오기 함수
  let currentCategoryIndex = 0;
  const mainNav = document.querySelector('.mainNav');

  function showcategoryArr() {
    const categoryElements = categoryArr.map(categoryObj => `<li><a href="">${categoryObj.category}</a></li>
    `); //각 category의 이름을 넣은 html 코드가 요소로 있는 배열을 생성.
    mainNav.innerHTML = `<ul><li><a href="">About</a></li>${categoryElements.join("")}</ul>`; 
    //배열을 하나의 문자열로 만들어서 mainNav div에 삽입.
  }

  showcategoryArr();