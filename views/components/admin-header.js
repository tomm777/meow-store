const header = document.querySelector('header'); // header 요소를 선택하여 변수에 할당

header.innerHTML = `
<div class="logo-container">
    <div class="logo">
      <div class="img-box">
        <a href ='/admin/home'>
          <img src="/assets/로고.png">
        </a>
      </div>
      <div class="span-container">
          <span class="header-span login-text admin">관리자 계정</span>
      </div>
    </div>
</div>  
<nav class = "mainNav">
</nav>`;
const loginIcon = document.querySelector('.login');

const mainNav = document.querySelector('.mainNav'); // mainNav 클래스를 가진 요소를 선택하여 변수에 할당

function clickNav(e, type) {
  // clickNav 함수 정의, o 매개변수는 클릭된 메뉴 아이템을 나타냄
  console.log(e);
  const lis = mainNav.querySelectorAll('li'); // mainNav 내부의 모든 li 요소를 선택하여 변수에 할당
  lis.forEach((li) => {
    // lis 배열의 각 요소에 대해 반복문 실행
    li.classList.remove('active'); // 모든 li 요소의 active 클래스 제거
  });
  e.classList.add('active'); // 클릭된 메뉴 아이템에 active 클래스 추가
  // if (type === 'home') {
  //   window.location.href = '/admin/home';
  // } else if (type === 'category') {
  //   window.location.href = '/admin/category>';
  // } else if (type === 'product') {
  //   window.location.href = '/admin/product';
  // } else if (type === 'order') {
  //   window.location.href = '/admin/order';
  // }
}

mainNav.innerHTML = `
        <ul>
            <li class="active" onclick="clickNav(this, 'home')">현황</li> 
            <li onclick="clickNav(this,'category')">카테고리 관리</li> 
            <li onclick="clickNav(this,'product')">상품관리</li> 
            <li onclick="clickNav(this, 'order')">주문관리</li> 
        </ul>
    </nav>`;
