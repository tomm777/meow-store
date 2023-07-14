const header = document.querySelector('header');
const token = window.localStorage.getItem('token');
const admin = window.localStorage.getItem('admin');

header.innerHTML = `
<div class="logo-container">
    <div class="logo">
      <div class="img-box">
        <a href ='/'>
          <img src="/assets/로고.png">
        </a>
      </div>
      <div class="span-container">
        <a href = '/login'>
          <span class="header-span login-text">로그인</span>
        </a>
        <a href = '/cart'>
          <span class="header-span">장바구니</span>
        </a>
        <a href = '/mypage' class="mypage">
            <span class="header-span">마이페이지</span>
        </a>
        <a href = '/admin/home'>
        <span class="header-span admin">관리자 페이지</span>
      </a>
      </div>
    </div>
</div>  
`;
const login = document.querySelector('.header-span.login-text');
const mypage = document.querySelector('.mypage');
const adminHome = document.querySelector('.admin');
if (token) {
  login.textContent = '로그아웃';
  mypage.style.display = 'inline-block';
  // loginIcon.style.display = 'none';
}
if (admin) {
  adminHome.style.display = 'inline-block';
}

login.addEventListener('click', function () {
  console.log('click');
  if (token) {
    if (localStorage.getItem('admin')) {
      localStorage.removeItem('admin');
    }
    localStorage.removeItem('token');
    alert('로그아웃 되었습니다.');
    window.location.href = '/';
  } else {
    window.location.href = '/login';
  }
});
