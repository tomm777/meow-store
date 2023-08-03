import { blockIfNotLogin } from '/utils/index.js';
blockIfNotLogin();
import * as API from '/api/index.js';
// confirm창이 2번뜨는 문제 발생
const deleteButton = document.getElementById('delete-button');

deleteButton.addEventListener('click', deleteUser);

async function deleteUser() {
  const password = document.getElementById('password').value;
  if (password === '') {
    alert('비밀번호를 입력하세요');
    return false;
  }
  if (confirm('정말 탈퇴하시겠습니까?')) {
    // const data = await API.get(`/api/user/mypage/`);
    // console.log(data._id);
    try {
      const result = await API.delete('/api/user/mypage', '', {
        password,
      });
      console.log(result);
      if (localStorage.getItem('admin')) {
        localStorage.removeItem('admin');
      }
      localStorage.removeItem('token');
      alert('탈퇴가 완료 되었습니다.');
      window.location.href = '/';
    } catch (error) {
      throw error;
    }
  } else {
    console.log('취소');
  }
}
