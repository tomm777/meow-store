const cartList = document.querySelector('.cart_list');

// 로컬스토리지에 여러개의 상품을 하나의 key값으로 저장하도록 변경했으므로
// 그에 맞춰 로직 수정이 필요함.

const idList = [];
for (let i = 0; i < localStorage.length; ++i) {
  idList.push(localStorage.key(i));
}

// 각 상품을 id로 가져와서 Value를 배열에 넣기
// 배열을 페이지의 innerHTML에 넣어 요소로 추가
for (let i = 0; i < idList.length; ++i) {
  const parsed = JSON.parse(localStorage.getItem(idList[i]));
  parsed.index = i + 1; // 일련번호 지정
  if (!parsed.qty) parsed.qty = 1; // qty속성이 없을 경우에만 qty속성 추가

  const content = `
    <div class="product_wrap">
      <span class="product_index">${parsed.index}</span>
      <div>
        <div class="product_thumbnail">
          <img src="${parsed.repImgUrl}" alt="thumbnail"/>
        </div>
        <span>${parsed.name}</span>
        <span>
          <button class="qty_down" onclick="qtyDown(event)">-</button>
          <span class="product_qty">${parsed.qty}</span>
          <button class="qty_up" onclick="qtyUp(event)">+</button>
        </span>
        <span class="product_price">${parsed.price}</span>
        <button class="delete_each" onclick="deleteEach(event)">❌</button>
      </div>
    </div>
  `;

  const newLi = document.createElement('li');
  newLi.innerHTML = content;
  cartList.appendChild(newLi);
}

const qtyUpBtns = document.querySelectorAll('.qty_up');
const qtyDownBtns = document.querySelectorAll('.qty_down');
const qtyElements = document.querySelectorAll('.product_qty');
const deleteEachBtns = document.querySelectorAll('.delete_each');
const deleteAllBtn = document.querySelector('.delete_all');

function qtyUp(event) {
  const index =
    Number(
      event.target.parentElement.parentElement.previousSibling.previousSibling
        .innerText,
    ) - 1;
  if (qtyElements[index].innerText === '9') {
    alert('최대 구매 수량은 9개입니다.');
  } else {
    qtyElements[index].innerText = Number(qtyElements[index].innerText) + 1;
    //=====로컬스토리지의 qty도 함께 수정되어야 함
  }
}

function qtyDown(event) {
  const index =
    Number(
      event.target.parentElement.parentElement.previousSibling.previousSibling
        .innerText,
    ) - 1;
  if (qtyElements[index].innerText === '1') {
    return;
  } else {
    qtyElements[index].innerText = Number(qtyElements[index].innerText) - 1;
    //=====로컬스토리지의 qty도 함께 수정되어야 함
  }
}

function deleteEach(event) {
  // event.target은 deleteEachBtns임
  const li = event.target.parentElement.parentElement.parentElement;
  li.remove();
  // localStorage.removeItem();
  //=======삭제할 제품의 id값을 알아야 함
  alert('삭제되었습니다.');
}

function deleteAll() {
  const userRes = confirm('장바구니를 비우시겠습니까?');
  if (userRes === false) {
    return;
  } else {
    localStorage.clear();
    cartList.innerHTML = '';
  }
}

deleteAllBtn.addEventListener('click', deleteAll);
