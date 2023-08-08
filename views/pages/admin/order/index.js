import * as API from '/api/index.js';
import { blockIfNotAdmin } from '/utils/index.js';
blockIfNotAdmin();
let flag = false;
async function getOrderList() {
  let totalCount = 0;
  try {
    const res = await API.get('/api/admin/orders');
    console.log(res);
    totalCount = res.length;
    document.querySelector('.b2').textContent = totalCount.toString();

    const tbody = document.getElementById('order_tbody');
    const html = res
      .map((data, index) => {
        return `<tr id="${data._id}">
      <td>${index + 1}</td>
      <td>${data.createDate}</td>
      <td>${data.number}</td>
      <td><img src="${data.repImgUrl}" /></td>
      <td>
        <div name="content" class="status">
          ${data.status}
        </div>
        <div class="option">
          <select id="select-value">
            <option value="none">주문상태 선택</option>
            <option value="배송중">배송중</option>
            <option value="배송완료">배송완료</option>
            <option value="결제완료">결제완료</option>
            <option value="취소">취소</option>
          </select>
        </div>
      </td>
      <td>${data.totalPrice.toLocaleString()}원</td>
      <td><button id="update-button" class="button">수정</button></td>
      <td><button id="delete-button" class="button">삭제</button></td>
    </tr>`;
      })
      .join('');
    document
      .querySelector('#order_tbody')
      .addEventListener('click', (event) => {
        const target = event.target;
        const id = event.target.id;
        if (id === 'update-button') {
          switchSelectBox(target);
        } else if (id === 'delete-button') {
          deleteOrder(target);
        }
      });
    tbody.innerHTML = html;
  } catch (error) {
    throw new Error(error);
  }
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
    select.style.display = 'inline-block';
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
    // status 업데이트
    updateOrderStatus(id, status);
    e.innerHTML = '수정';
  }
}
// TODO 주문상태 수정
async function updateOrderStatus(id, status) {
  //fetch
  //post/put
  try {
    await API.post(`/api/admin/order/${id}`, {
      status: status,
    });
  } catch (error) {
    throw error;
  }
}

async function deleteOrder(target) {
  const targetId = target.closest('tr').id;
  const tr = target.closest('tr');
  // 주문 삭제 API 호출
  const checkStatus = target
    .closest('tr')
    .querySelector('.status')
    .textContent.trim();
  if (!checkStatus.includes('취소')) {
    alert('주문 상태가 취소 일 경우에만 삭제가 가능합니다.');
    return;
  }
  try {
    await API.delete(`/api/admin/order/${targetId}`);
    // console.log(result);
    tr.remove();
    window.location.reload();
  } catch (error) {
    throw error;
  }
}
