import * as API from '/api/index.js';



var products = [
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
];

// 페이지 로드 시 실행
window.onload = function() {
    for (var i = 0; i < products.length; i++) {
        addProductToTable(products[i]);
    }
    calculateTotalAmount();
};

// 테이블에 상품 추가
function addProductToTable(product) {
    var table = document.getElementById('orderTable');
    var row = table.insertRow(-1);
    row.insertCell(0).innerHTML = "<img src=\"" + product.repImgUrl + "\"><span>" + product.name + "</span>";
    row.insertCell(1).innerHTML = "1";
    row.insertCell(2).innerHTML = product.price;
    var cancelCell = row.insertCell(3);
    cancelCell.innerHTML = "<input type=\"checkbox\" onclick=\"toggleCancel(this)\">";
    cancelCell.style.textAlign = "center";
}

// 선택 취소 토글
function toggleCancel(checkbox) {
    var row = checkbox.parentNode.parentNode;
    if (checkbox.checked) {
        row.style.textDecoration = "line-through";
    } else {
        row.style.textDecoration = "none";
    }
    calculateTotalAmount();
}

// 전체 주문 취소
function cancelAll() {
    var checkboxes = document.querySelectorAll('#orderTable input[type="checkbox"]');
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = true;
        toggleCancel(checkboxes[i]);
    }
}

// 총 금액 계산
function calculateTotalAmount() {
    var table = document.getElementById('orderTable');
    var totalAmount = 0;
    for (var i = 2; i < table.rows.length; i++) {
        if (!table.rows[i].cells[3].children[0].checked) {
            totalAmount += parseInt(table.rows[i].cells[2].innerHTML);
        }
    }
    document.getElementById('totalAmount').innerText = totalAmount + "원";
}