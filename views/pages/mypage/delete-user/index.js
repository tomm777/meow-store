import * as API from '/api/index.js';
// confirm창이 2번뜨는 문제 발생
const deleteButton = document.getElementById('delete-button');

deleteButton.addEventListener('click', deleteUser);

async function deleteUser() {
  if (confirm('정말 탈퇴하시겠습니까?')) {
    // const data = await API.get(`/api/user/mypage/`);
    // console.log(data._id);
    const result = await API.delete('/api/user/mypage');
    console.log(result);
  } else {
    console.log('취소');
  }
}
