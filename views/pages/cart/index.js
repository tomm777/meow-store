const cartList = document.querySelector('.cart_list');

// 로컬스토리지에 여러개의 상품을 하나의 key값으로 저장하도록 변경했으므로
// 그에 맞춰 로직 수정이 필요함.

let savedCartData = JSON.parse(localStorage.getItem('meowStoreCart')) || []; // 로컬 스토리지에 저장된 장바구니 데이터

console.log(savedCartData);

// 배열을 페이지의 innerHTML에 넣어 요소로 추가

for (let i = 0; i < savedCartData.length; ++i) {
  let parsed = savedCartData[i];
  if (!parsed.qty) parsed.qty = 1; // qty속성이 없을 경우에만 qty속성 추가

  const content = `
    <div class="product_wrap" product_id="${parsed._id}">
      <span class="product_index">${parsed.index}</span>
      <div>
        <div class="product_thumbnail">
        <!-- <img src="${parsed.repImgUrl}" alt="thumbnail"/> -->
        </div>
        <span>${parsed.name}</span>
        <span>
          <button class="qty_down" onclick="qtyDown(event)">-</button>
          <span class="product_qty" name="cart_qty" >${parsed.qty}</span>
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
  const target = event.target.closest('span').querySelector('[name=cart_qty]');
  const id = event.target.closest('.product_wrap').getAttribute('product_id');

  if (target.innerText === '9') {
    alert('최대 구매 수량은 9개입니다.');
  } else {
    target.innerText = Number(target.innerText) + 1;
    savedCartData = savedCartData.map((o) => {
      if (o._id === id) {
        o.qty += 1;
      }
      return o;
    });
    localStorage.setItem('meowStoreCart', JSON.stringify(savedCartData));
  }
}

function qtyDown(event) {
  const target = event.target.closest('span').querySelector('[name=cart_qty]');
  const id = event.target.closest('.product_wrap').getAttribute('product_id');

  if (Number(target.innerText) > 1) {
    target.innerText = Number(target.innerText) - 1;
    savedCartData = savedCartData.map((o) => {
      if (o._id === id) {
        o.qty -= 1;
      }
      return o;
    });
    localStorage.setItem('meowStoreCart', JSON.stringify(savedCartData));
  }
}

function deleteEach(event) {
  const id = event.target.closest('.product_wrap').getAttribute('product_id');
  const li = event.target.closest('.product_wrap').parentElement;
  li.remove();

  savedCartData = savedCartData.filter((o) => o._id !== id);
  localStorage.setItem('meowStoreCart', JSON.stringify(savedCartData));

  alert('삭제되었습니다.');
}

function deleteAll() {
  const userRes = confirm('장바구니를 비우시겠습니까?');
  if (userRes === false) {
    return;
  } else {
    localStorage.removeItem('meowStoreCart');
    cartList.innerHTML = '';
  }
}

deleteAllBtn.addEventListener('click', deleteAll);
