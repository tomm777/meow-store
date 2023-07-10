const fileInput = document.getElementById('fileInput'); // 파일을 선택하는 input 요소
const uploadButton = document.getElementById('uploadButton'); // 업로드 버튼

uploadButton.addEventListener('click', () => {
  const formData = new FormData();
  formData.enctype = 'multipart/form-data';
  formData.append('name', 'test file');
  formData.append('price', '1234');
  formData.append('summary', 'summary');
  formData.append('description', 'description');

  formData.append('file', fileInput.files[0]); // 파일을 FormData에 추가

  fetch('/api/admin/product', {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      // 업로드 성공 처리
    })
    .catch((error) => {
      // 업로드 실패 처리
    });
});
