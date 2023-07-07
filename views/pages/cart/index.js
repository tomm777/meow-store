// 로컬스토리지의 key(id)만 배열로 가져옴
const idList = [];
for (let i = 0; i < localStorage.length; ++i) {
  idList.push(localStorage.key(i));
}

// 각 상품 id로 API에서 상품정보를 얻어와서 장바구니에 추가
// idList배열의 길이만큼 반복해서 추가해줘야 함

if (localStorage.getItem('상품 id(sfsdf)')) {
  let productData = '';
  productData = JSON.parse(localStorage.getItem(productData));
} else {
  console.log('localStorage is empty.');
}

// querySelectorAll로 고치기
const qtyDownBtn = document.querySelector(".qty_down");
const qtyUpBtn = document.querySelector(".qty_up");
const deleteEachBtn = document.querySelector('.delete_each');
const deleteAllBtn = document.querySelector('.delete_all');

// (이슈1/2) 수량은 어떻게 보존하는가? 다른 페이지 갔다가 오면 1이 되나?
// 만들어 보고 동작 이상하면 이슈 올리기

// 수량 변경 함수 구현하기

const productQty = document.querySelector('.product_qty');

function qtyDown() {
  if (productQty.innerText === "1") return;
  else productQty.innerText = Number(productQty.innerText) - 1;
}

function qtyUp() {
  if (productQty.innerText === "99") alert("최대 구매 수량은 99개입니다.");
  else productQty.innerText = Number(productQty.innerText) + 1;
}

// 로컬스토리지에서도 삭제하는 기능 구현해야 함
// id배열을 filter로 !== 조건 걸어서 업데이트하기

function deleteEach(event) {
  // event.target은 deleteEachBtn임
  const li = event.target.parentElement.parentElement;
  li.remove();
  alert('삭제되었습니다.');
}

// (이슈2/2) 이것 때문에 async await를 쓰는 게 맞나...?

async function deleteAll() {
  await alert("장바구니를 비우시겠습니까?")
  // 팝업에서 확인 누르면 로컬스토리지를 싹 비우고
  // 취소누르면 아무것도 안 하고 return;하는 로직 짜기
  // https://devsp.tistory.com/24
}

qtyDownBtn.addEventListener('click', qtyDown);
qtyUpBtn.addEventListener('click', qtyUp);
deleteEachBtn.addEventListener('click', deleteEach);
deleteAllBtn.addEventListener('click', deleteAll);