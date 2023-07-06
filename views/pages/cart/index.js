const productInfo = document.querySelector('.product_info');

// if (localStorage.getItem(productData)) {
//   const productData = JSON.parse(localStrage.getItem(productData));
// } else {
//   console.log('로컬스토리지 비어있음');
// }

// 하나의 제품이 아니라 여러건이어도 받을 수 있게 해야 함
// 수량 변경 기능 추가해야 함
// 전체삭제 버튼 기능 구현하기

// 여러 개의 제품을 각각 삭제할 수 있어야 함.
const deleteEachBtn = document.querySelector('.delete_each');
const deleteAllBtn = document.querySelector('.delete_all');

function deleteEach(event) {
  // event.target은 deleteEachBtn임
  const li = event.target.parentElement.parentElement;
  li.remove();
  alert('삭제되었습니다.');
}

function deleteAll() {
  console.log('전체삭제버튼을 누름');
}

deleteEachBtn.addEventListener('click', deleteEach);
deleteAllBtn.addEventListener('click', deleteAll);
