import * as API from '/api/index.js';
import categoryModal from '/components/category-modal.js';
window.callbackCategoryModal = function (result) {
  console.log(result);
  const categoryName = document.getElementById('categoryName');
  const categoryId = document.getElementById('categoryId');
  const subcategoryId = document.getElementById('subcategoryId');

  categoryName.innerText = result.name;
  categoryId.value = result.categoryId;
  subcategoryId.value = result.subcategoryId ? result.subcategoryId : '';
};
categoryModal();

const fileInput = document.getElementById('fileInput'); // 파일을 선택하는 input 요소
const uploadButton = document.getElementById('uploadButton'); // 업로드 버튼

const productName = document.getElementById('product_name');
const categoryId = document.getElementById('categoryId');
const subcategoryId = document.getElementById('subcategoryId');
const stock = document.getElementById('stock');
const price = document.getElementById('price');
const summary = document.getElementById('summary');
const description = document.getElementById('description');

uploadButton.addEventListener('click', createProduct);

async function createProduct() {
  const formData = new FormData();
  formData.enctype = 'multipart/form-data';
  formData.append('categoryId', categoryId.value);
  if(subcategoryId.value !== ""){
    formData.append('subcategoryId', subcategoryId.value);
  }
  formData.append('name', productName.value);
  formData.append('price', price.value);
  formData.append('stock', stock.value);
  formData.append('summary', summary.value);
  formData.append('description', description.value);

  formData.append('file', fileInput.files[0]); // 파일을 FormData에 추가
  console.log(formData);

  //validation 추가할것

  const result = await API.post('/api/admin/product', formData, true, true);

  console.log(result);
  alert('제품등록이 완료되었습니다.');
  location.href = '/admin/product';
}
