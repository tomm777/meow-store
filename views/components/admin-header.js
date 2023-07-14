const header = document.querySelector('.header'); // header 요소를 선택하여 변수에 할당
const admin = window.localStorage.getItem('admin');

header.innerHTML = `
<div class="logo-container">
    <div class="logo">
      <div class="img-box">
        <a href ='/admin/home'>
          <img src="/assets/로고.png">
        </a>
      </div>
      <div class="span-container">
      <button class="button is-normal user-home">사용자 홈</button>
          <span class="header-span login-text admin">관리자 계정</span>
      </div>
    </div>
</div>  
<nav class = "mainNav">
</nav>`;
const loginIcon = document.querySelector('.login');
const userHome = document.querySelector('.user-home');
const mainNav = document.querySelector('.mainNav'); // mainNav 클래스를 가진 요소를 선택하여 변수에 할당
if (admin) {
  userHome.style.display = 'inline-block';
  userHome.addEventListener('click', function () {
    window.location.href = '/';
  });
}

mainNav.innerHTML = `
        <ul>
            <li ep="/admin/home/" class="active" onclick="clickNav('home')">현황</li> 
            <li ep="/admin/category/" onclick="clickNav('category')">카테고리 관리</li> 
            <li ep="/admin/product/" onclick="clickNav('product')">상품관리</li> 
            <li ep="/admin/order/" onclick="clickNav('order')">주문관리</li> 
        </ul>
    </nav>`;

const endpoint = window.location.pathname.trim();
checkNav(endpoint);

function clickNav(ep) {
  window.location.href = `/admin/${ep}`;
}

function checkNav(ep) {
  const lis = mainNav.querySelectorAll('li');
  lis.forEach((li) => {
    li.classList.remove('active');
    if (li.getAttribute('ep').trim() === ep) {
      li.classList.add('active');
    }
  });
}
