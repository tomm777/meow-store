import * as API from '/api/index.js';

const count = document.querySelector('.b2');

async function getProductList() {
  const response = await fetch(
    '/api/products',
  );
  const data = await response.json();

  count.innerHTML = data.length.toString();
  let tbody = document.querySelector('#table-body');
  tbody.innerHTML = '';

  data.forEach(async (item) => {
    const response = await fetch(`/api/product/${item._id}`);
    const productDetailData = await response.json();

    let subCategory = '';
    if (productDetailData.subcategoryId) subCategory = ` > ${productDetailData.subcategoryId.subCategoryName}`;
    tbody.insertAdjacentHTML(
      'beforeend',
      `<tr name="table-body" product_id="${item._id}">
        <td><input type="radio"></td>
        <td name="image">
          <div class="img-box">
            <img src="${item.repImgUrl}" />
          </div>
        </td>
        <td name="name">${item.name}</td>
        <td name="category">${productDetailData.categoryId.categoryName}${subCategory}</td>
        <td name="price">${item.price.toLocaleString()}원</td>
        <td><button class="modify button is-light" name="modify" type="button">수정</button></td>
      </tr>`,
      );
  });
}
getProductList();

function modify() {
  document.querySelectorAll('button.modify').forEach((btn) => {
    console.log('수정버튼에 이벤트리스너 추가중');
    btn.addEventListener('click', (e) => {
      const productId = e.target
        .closest('[name=table-body]')
        .getAttribute('product_id');
      location.href = `/admin/product-details?id=${productId}`;
    });
  });
  console.log(document.querySelectorAll('button.modify'));
}
modify();

function deleteSelectedRows() {
  console.log('delete버튼 클릭됨');
  let radioes = document.querySelectorAll(".product tbody input[type='radio']");
  let rowsToDelete = [];

  radioes.forEach(function (radio) {
    if (radio.checked) {
      rowsToDelete.push(radio.parentNode.parentNode);
    }
  });

  rowsToDelete.forEach(function (row) {
    row.parentNode.removeChild(row); // 화면에서 삭제
    const id = row.getAttribute('product_id');
    API.delete('/api/admin/product/', id); // API에서 삭제
  });
  count.innerHTML = Number(count.innerText) - 1;
}
const deleteBtn = document.getElementById('deleteRows');
deleteBtn.addEventListener('click', deleteSelectedRows);

const createBtn = document.getElementById('createBtn');
createBtn.addEventListener('click', () => {
  location.href = '/admin/product-create';
});
