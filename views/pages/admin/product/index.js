import { blockIfNotAdmin } from '/utils/index.js';
blockIfNotAdmin();
import * as API from '/api/index.js';

const count = document.querySelector('.b2');

getProductList();

async function getProductList() {
  try {
    const rawData = await API.get('/api/products');
    const sortedData = rawData.toSorted((a, b) =>
      b.createDate - a.createDate ? 1 : -1,
    );
    count.innerHTML = sortedData.length.toString();
    let tbody = document.querySelector('#table-body');
    tbody.innerHTML = '';

    sortedData.forEach(async (item, index) => {
      let subCategory = '';
      if (item.subcategoryId) {
        subCategory = ` > ${item.subcategoryId.subCategoryName}`;
      }

      tbody.insertAdjacentHTML(
        'beforeend',
        `<tr name="table-body" product_id="${item._id}">
          <td><input type="radio"></td>
          <td name="number">${index + 1}</td>
          <td name="image">
            <div class="img-box">
              <img src="${item.repImgUrl}" />
            </div>
          </td>
          <td name="name">${item.name}</td>
          <td name="category">${
            item?.categoryId?.categoryName
          }${subCategory}</td>
          <td name="price">${item.price.toLocaleString()}원</td>
          <td><button class="modify button is-light" name="modify" type="button">수정</button></td>
        </tr>`,
      );
    });
    setFuncToModifyBtns();
  } catch (error) {
    throw error;
  }
}

function setFuncToModifyBtns() {
  const modifyBtns = document.querySelectorAll('button.modify');
  modifyBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      // e.stopPropagation();
      const productId = e.target
        .closest('[name=table-body]')
        .getAttribute('product_id');
      location.href = `/admin/product-details?id=${productId}`;
    });
  });
}

function deleteSelectedRows() {
  const userConfirm = confirm('선택된 상품을 정말 삭제하시겠습니까?');
  if (userConfirm) {
    let radioes = document.querySelectorAll(
      ".product tbody input[type='radio']",
    );
    let rowsToDelete = [];

    radioes.forEach(function (radio) {
      if (radio.checked) {
        rowsToDelete.push(radio.parentNode.parentNode);
      }
    });

    rowsToDelete.forEach(async function (row) {
      row.parentNode.removeChild(row); // 화면에서 삭제
      count.innerHTML = Number(count.innerText) - 1;
      const id = row.getAttribute('product_id');
      try {
        await API.delete('/api/admin/product/', id); // API에서 삭제
        // alert('삭제되었습니다.');
        getProductList();
      } catch (error) {
        throw error;
      }
    });
  }
}
const deleteBtn = document.getElementById('deleteRows');
deleteBtn.addEventListener('click', deleteSelectedRows);

const createBtn = document.getElementById('createBtn');
createBtn.addEventListener('click', () => {
  location.href = '/admin/product-create';
});
