/*index.js*/


// 주문 상품 정보
const orderData = {
    "_id": "주문 id(sfsdf)",
    "number": "230706ssfesfes",
    "receiver": "최하은",
    "contack": "010-1234-5678",
    "zipCode": "010-010",
    "address": "서울특별시 무슨구 무슨도로...",
    "detailAddress": "무슨아파트 몇동 몇호",
    "shippingMessage": "문앞에 두세영",
    "products": [
        {
            "_id": "상품 id(sdfsdf)",
            "name": "[사료]로얄캐닌 10kg",
            "price": 100000,
            "summary": "어린 고양이를 위한 사료 10kg",
            "repImgUrl": "http:image/1/",
            "deleteYn": "N"
        },
        {
            "_id": "상품 id(sdfsdf)",
            "name": "[사료]로얄캐닌 10kg",
            "price": 100000,
            "summary": "어린 고양이를 위한 사료 10kg",
            "repImgUrl": "http:image/1/",
            "deleteYn": "N"
        },
        {
            "_id": "상품 id(sdfsdf)",
            "name": "[사료]로얄캐닌 10kg",
            "price": 100000,
            "summary": "어린 고양이를 위한 사료 10kg",
            "repImgUrl": "http:image/1/",
            "deleteYn": "N"
        },
    ]
};

let totalAmount = 0;

// 주문 초기화
window.onload = () => {
    for (let i = 0; i < orderData.products.length; i++) {
        let product = orderData.products[i];
        insertRow(product, i);
        totalAmount += product.price;
    }
    updateTotalAmount();
};

// 테이블에 새로운 행 삽입
const insertRow = (product, idx) => {
    let table = document.getElementById('orderTable');
    let row = table.insertRow(-1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);

    cell1.innerHTML = `<img src="${product.repImgUrl}" width="50" height="50"><span id="productName${idx}">${product.name}</span>`;
    cell2.innerHTML = `1`;
    cell3.innerHTML = `<span id="productPrice${idx}">${product.price}원</span>`;
    cell4.innerHTML = `<input type="checkbox" id="checkbox${idx}" onclick="toggleCheckbox(${idx}, ${product.price})">`;
};

// 체크박스 토글 및 총액 조정
const toggleCheckbox = (idx, price) => {
    let checkbox = document.getElementById(`checkbox${idx}`);
    let productName = document.getElementById(`productName${idx}`);
    let productPrice = document.getElementById(`productPrice${idx}`);

    // 체크박스가 선택되었는지 확인
    if (checkbox.checked) {
        totalAmount -= price;
        productName.classList.add('strikethrough');
        productPrice.classList.add('strikethrough');
    } else {
        totalAmount += price;
        productName.classList.remove('strikethrough');
        productPrice.classList.remove('strikethrough');
    }
    updateTotalAmount();
};

// 총액 업데이트
const updateTotalAmount = () => {
    let totalAmountDiv = document.getElementById('totalAmount');
    totalAmountDiv.innerHTML = `총 결제금액: ${totalAmount}원`;
};

// 전체 주문 취소 토글
const toggleCancelOrder = () => {
    for (let i = 0; i < orderData.products.length; i++) {
        let checkbox = document.getElementById(`checkbox${i}`);
        if(!checkbox.checked) {
            checkbox.click();
        }
    }
};

// 모든 체크박스 선택 해제 및 총액 업데이트
const uncheckAll = () => {
    for (let i = 0; i < orderData.products.length; i++) {
        let checkbox = document.getElementById(`checkbox${i}`);
        if(checkbox.checked) {
            checkbox.click();
        }
    }
    updateTotalAmount();
};


const submitCancelRequest = () => {
    // 취소된 상품들의 ID를 수집
    let cancelledProductIds = [];
    for (let i = 0; i < orderData.products.length; i++) {
        let checkbox = document.getElementById(`checkbox${i}`);
        if(checkbox.checked) {
            cancelledProductIds.push(orderData.products[i].id);
        }
    }

    // 서버에 취소 요청 보내기
  
};


// let shippingData = {
//     recipient: "홍길동",
//     contact: "010-1234-5678",
//     zipcode: "12345",
//     address: "서울특별시 강남구 테헤란로",
//     message: "부재시 경비실에 맡겨주세요."
// };

// window.onload = () => {
//     displayInfo();
// };

// const displayInfo = () => {
//     document.getElementById('recipientP').textContent = shippingData.recipient;
//     document.getElementById('contactP').textContent = shippingData.contact;
//     document.getElementById('zipcodeP').textContent = shippingData.zipcode;
//     document.getElementById('addressP').textContent = shippingData.address;
//     document.getElementById('messageP').textContent = shippingData.message;
// };

// const editInfo = () => {
//     document.getElementById('recipientP').innerHTML = `<input type="text" id="recipientInput" value="${shippingData.recipient}">`;
//     document.getElementById('contactP').innerHTML = `<input type="text" id="contactInput" value="${shippingData.contact}">`;
//     document.getElementById('zipcodeP').innerHTML = `<input type="text" id="zipcodeInput" value="${shippingData.zipcode}">`;
//     document.getElementById('addressP').innerHTML = `<input type="text" id="addressInput" value="${shippingData.address}">`;
//     document.getElementById('messageP').innerHTML = `<input type="text" id="messageInput" value="${shippingData.message}">`;

//     // 수정하기 버튼을 수정 완료 버튼으로 바꾸기
//     document.getElementById('editBtn').textContent = "수정 완료";
//     document.getElementById('editBtn').onclick = submitInfo;
// };

// const submitInfo = () => {
//     // 수정된 정보 가져오기
//     shippingData.recipient = document.getElementById('recipientInput').value;
//     shippingData.contact = document.getElementById('contactInput').value;
//     shippingData.zipcode = document.getElementById('zipcodeInput').value;
//     shippingData.address = document.getElementById('addressInput').value;
//     shippingData.message = document.getElementById('messageInput').value;

//     // 수정 완료 후, 원래 텍스트로 복구
//     displayInfo();

//     // 수정 완료 버튼을 다시 수정하기 버튼으로 바꾸기
//     document.getElementById('editBtn').textContent = "수정하기";
//     document.getElementById('editBtn').onclick = editInfo;

//     // 서버에 데이터 업데이트 요청
//     // ...
// };
