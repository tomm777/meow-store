let savedCartData = JSON.parse(localStorage.getItem('meowStoreCart')) || [];
const cartList = document.querySelector('.cart_list');

// savedCartData의 상품목록을 장바구니 페이지에 그려주는 반복문
for (let i = 0; i < savedCartData.length; ++i) {
  let data = savedCartData[i];
  const content = `
    <div class="product_wrap" product_id="${data._id}">
      <div>
        <div class="product_thumbnail">
        <!-- <img src="${data.repImgUrl}" alt="thumbnail"/> -->
        </div>
        <span>${data.name}</span>
        <span>
          <button class="qty_down" onclick="qtyDown(event)">-</button>
          <span class="product_qty" name="cart_qty" >${data.qty}</span>
          <button class="qty_up" onclick="qtyUp(event)">+</button>
        </span>
        <span class="product_price">${data.price}</span>
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
      if (o._id === id) o.qty += 1;
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
      if (o._id === id) o.qty -= 1;
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
}

function deleteAll() {
  const userConfirm = confirm('장바구니를 비우시겠습니까?');
  if (userConfirm) {
    localStorage.removeItem('meowStoreCart');
    cartList.innerHTML = '';
  }
}
deleteAllBtn.addEventListener('click', deleteAll);
