const fileInput = document.getElementById('fileInput'); // 파일을 선택하는 input 요소
const uploadButton = document.getElementById('uploadButton'); // 업로드 버튼

const productName = document.getElementById('product_name');
const price = document.getElementById('price');
const summary = document.getElementById('summary');
const description = document.getElementById('description');

uploadButton.addEventListener('click', () => {
  const formData = new FormData();
  formData.enctype = 'multipart/form-data';
  formData.append('name', productName.value);
  formData.append('price', price.value);
  formData.append('summary', summary.value);
  formData.append('description', description.value);

  formData.append('file', fileInput.files[0]); // 파일을 FormData에 추가

  console.log(formData);

  fetch('/api/admin/product', {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      // 업로드 성공 처리
      alert('제품등록이 완료되었습니다.');
      location.href = '/admin/product';
    })
    .catch((error) => {
      // 업로드 실패 처리
    });
});
