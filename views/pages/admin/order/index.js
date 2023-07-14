import * as API from '/api/index.js';
let flag = false;
async function getOrderList() {
  const res = await API.get('/api/admin/orders');
  console.log(res);
  const totalCount = res.length;

  document.querySelector('.b2').innerHTML = totalCount.toString();

  const tbody = document.getElementById('order_tbody');
  const html = res
    .map((data, index) => {
      return `<tr id="${data._id}">
    <td>${index + 1}</td>
    <td>${data.createDate}</td>
    <td>${data.number}</td>
    <td><img src="${data.repImgUrl}" /></td>
    <td>
      <div name="content">
        ${data.status}
      </div>
      <div class="option">
        <select id="select-value" value=${data.status}>
          <option value="none">주문상태 선택</option>
          <option value="배송 중">배송 중</option>
          <option value="배송 완료">배송 완료</option>
          <option value="환불중">환불중</option>
          <option value="환불 완료">환불 완료</option>
        </select>
      </div>
    </td>
    <td>${data.totalPrice.toLocaleString()}원</td>
    <td><button id="update-button" class="button">수정</button></td>
    <td><button id="delete-button" class="button">삭제</button></td>
  </tr>`;
    })
    .join('');
  document.querySelector('#order_tbody').addEventListener('click', (event) => {
    const target = event.target;
    const id = event.target.id;
    if (id === 'update-button') {
      switchSelectBox(target);
    } else if (id === 'delete-button') {
      deleteOrder(target);
    }
  });
  tbody.innerHTML = html;
}
getOrderList();

function switchSelectBox(e) {
  const tr = e.closest('tr');
  const option = tr.querySelector('.option');
  const content = tr.querySelector('[name=content]');
  const select = tr.querySelector('select');
  const text = e.innerHTML.trim();
  e.classList.add('on');

  if (text === '수정') {
    select.style.display = 'block';
    option.style.display = 'block';
    content.style.display = 'none';
    e.innerHTML = '완료';
  } else {
    const status = select.value;
    if (status === 'none') {
      alert('주문 상태를 선택해주세요');
      return;
    }
    option.style.display = 'none';
    content.style.display = 'block';
    content.innerHTML = status;

    const id = tr.getAttribute('id');
    updateOrderStatus(id, status)
      .then(() => {
        e.innerHTML = '수정';
        console.log('주문 상태 업데이트 완료');
      })
      .catch((error) => {
        console.error('주문 상태 업데이트 중 오류 발생:', error);
      });
    //
  }
}
// TODO 주문상태 수정
async function updateOrderStatus(id, status) {
  //fetch
  //post/put

  const result = await API.post(`/api/admin/order/${id}`, {
    status: status,
  });
  console.log(result);
}

async function deleteOrder(target) {
  const targetId = target.closest('tr').id;
  const tr = target.closest('tr');
  console.log('CLICK');
  // 주문 삭제 API 호출
  const result = await API.delete(`/api/admin/order/${targetId}`);
  console.log(result);
  if (result) {
    tr.remove();
    window.location.reload();
  }
  // 테이블에서 행 제거
}

//총 몇건인지 조회
async function countList() {
  // const res = await fetch('/api/admin/orders');
  // const dataList = await res.json();
  // const totalCount = dataList.length;
  // document.querySelector('.b2').innerHTML = totalCount.toString();
}

countList();

//새로고침 구현하는 동작
const button = document.querySelector('.btn_red');

// button.addEventListener('click', () => {
//   window.location.reload();
// });

//검색기능

document.getElementById('searchButton').addEventListener('click', function () {
  const searchText = document.getElementById('searchInput').value;
  performSearch(searchText);
});

function performSearch(searchText) {
  // Perform the search logic here
  // You can use the entered searchText to filter the data and display the relevant results
  // You can access the order items and perform the necessary filtering or searching operations

  // Example:
  const orderItems = document.querySelectorAll('#order_tbody tr');
  for (const item of orderItems) {
    const orderNumber = item.querySelector('td:nth-child(3)').innerText;
    if (orderNumber.includes(searchText)) {
      item.style.display = 'table-row'; // Show the matching items
    } else {
      item.style.display = 'none'; // Hide the non-matching items
    }
  }
}

// api 호출
// 주문 상태 변경 api
// 함수호출
// const id = tr.getAttribute("id");

// updateOrderStatus(id, status);

// o.innerHTML = "수정"

///보란님
// fetch('/api/admin/orders', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify(dataToSend), // 데이터를 JSON 형식으로 변환하여 전송
// })
//   .then((response) => {
//     if (response.ok) {
//       return response.json(); // 새로 생성된 ID
//     }
//     throw new Error('Network response was not ok.');
//   })
//   .then((responseText) => {
//     console.log(responseText); // 새 아이디가 나옴
//     location.href = 'http://localhost:3000/order-complete/';
//   })
//   .catch((error) => {
//     // 요청이 실패했을 때의 처리 로직
//     console.log('Error: ', error.message);
//   });
