const count = document.querySelector('.b2');
//총 몇건인지 조회
async function countList() {
  const res = await fetch('/api/products');
  const dataList = await res.json();

  const totalCount = dataList.length;
  count.innerHTML = totalCount.toString();
}
countList();

async function getProductList() {
  const response = await fetch('/api/products');
  const data = await response.json();

  let tbody = document.querySelector('#table-body');
  data.forEach(function (item, index) {
    let category = '';
    if (item.categoryId) {
      category = item.categoryId.categoryName;
    }
    let subCategory = '';
    if (item.subcategoryId) {
      subCategory = ` > ${item.subcategoryId.subCategoryName}`;
    }

    tbody.insertAdjacentHTML(
      'beforeend',
      `
      <tr name="table-body" product_id="${item._id}" >
        <td><input type="radio"></td>
        <td name="number">${index + 1}</td>
        <td name="image">
        <div class="img-box">
        <img src="${item.repImgUrl}" />
        </div>
        </td>
        <td name="name">${item.name}</td>
        <td name="category">${category}${subCategory}</td>
        <td name="price">${item.price.toLocaleString()}원</td>
        <td><button onclick="goToUpdate(this)" class="button is-light">수정</button></td>
      </tr>
      `,
    );
  });
}
getProductList();

async function deleteSelectedRows() {
  let radioes = document.querySelectorAll(".product tbody input[type='radio']");
  let rowsToDelete = [];

  radioes.forEach(function (radio) {
    if (radio.checked) {
      rowsToDelete.push(radio.parentNode.parentNode);
    }
  });

  rowsToDelete.forEach(function (row) {
    row.parentNode.removeChild(row);
  });
  await countList();
  count.innerText = Number(count.innerText) - 1;
  // getProductList();
}

function goToUpdate(o) {
  const tr = o.closest('[name=table-body]');
  const id = tr.getAttribute('product_id');

  location.href = '/admin/product-details?id=' + id;
}

const createBtn = document.getElementById('createBtn');
createBtn.addEventListener('click', () => {
  location.href = '/admin/product-create';
});

// //총 몇건인지 조회
async function countList() {
  const res = await fetch('/api/products');
  const dataList = await res.json();

  const totalCount = dataList.length;
  document.querySelector('.b2').innerHTML = totalCount.toString();
}
countList();
