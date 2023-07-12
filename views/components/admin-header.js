const header = document.querySelector('header'); // header 요소를 선택하여 변수에 할당

header.innerHTML = `
    <div class="logo-container">
      <div class="logo">
        <a href ='/'><img src="/assets/로고.png" height="90px" width="300px"></a>
      </div>
      
      <div class="button-container">
        <button><a href=''><img src="icon-admin.png" alt="Admin-logout" /></a></button> 
      </div>
    </div>
    <nav class = "mainNav">
    </nav>`;

const mainNav = document.querySelector('.mainNav'); // mainNav 클래스를 가진 요소를 선택하여 변수에 할당

function clickNav(o) {
    // clickNav 함수 정의, o 매개변수는 클릭된 메뉴 아이템을 나타냄
    console.log(o); // 클릭된 메뉴 아이템 출력
    const lis = mainNav.querySelectorAll('li'); // mainNav 내부의 모든 li 요소를 선택하여 변수에 할당
    lis.forEach((li) => {
        // lis 배열의 각 요소에 대해 반복문 실행
        li.classList.remove('active'); // 모든 li 요소의 active 클래스 제거
    });
    o.classList.add('active'); // 클릭된 메뉴 아이템에 active 클래스 추가
    }
    
mainNav.innerHTML =`
        <ul>
            <li class="active" onclick="clickNav(this, '')">현황</li> 
            <li onclick="clickNav(this)">카테고리 관리</li> 
            <li onclick="clickNav(this)">상품관리</li> 
            <li onclick="clickNav(this)">주문관리</li> 
        </ul>
    </nav>`;


    




