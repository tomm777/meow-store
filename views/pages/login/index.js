import { getUrlParams, validateEmail, blockIfLogin } from '/utils/index.js';
blockIfLogin();
const email = document.getElementById('email');
const password = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');

email.addEventListener('focusout', (e) => {
  const iconNodes = e.target.closest('.field').querySelectorAll('.icon');

  //checkemail
  if (!validateEmail(e.target.value.trim())) {
    iconNodes.forEach((icon) => {
      icon.classList.remove('active');
    });
  } else {
    iconNodes.forEach((icon) => {
      icon.classList.add('active');
    });
  }
});

password.addEventListener('focusout', (e) => {
  const iconNodes = e.target.closest('.field').querySelectorAll('.icon');

  if (e.target.value.trim() === '') {
    iconNodes.forEach((icon) => {
      icon.classList.remove('active');
    });
  } else {
    iconNodes.forEach((icon) => {
      icon.classList.add('active');
    });
  }
});

loginBtn.addEventListener('click', login);
function enterKeyUp() {
  password.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
      login();
    }
  });
  email.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
      login();
    }
  });
}
enterKeyUp();
async function login() {
  if (!email.value.trim()) {
    alert('이메일을 입력하세요');
    return;
  }
  if (!password.value.trim()) {
    console.log('비번');
    alert('비밀번호를 입력하세요');
    return;
  }
  try {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    if (response.ok) {
      alert(`정상적으로 로그인되었습니다.`);

      const { token, isAdmin } = data;
      localStorage.setItem('token', token);

      if (isAdmin) {
        localStorage.setItem('admin', 'admin');
      }
      const { previouspage } = getUrlParams();

      if (previouspage) {
        window.location.href = previouspage;

        return;
      }
      window.location.href = '/';
    } else {
      if (data.message) {
        alert(data.message);
      }
    }
  } catch (e) {
    console.log('error msg: ', e);
  }
}
