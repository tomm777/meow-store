const header = document.querySelector('header');
const token = window.localStorage.getItem('token');
// const admin = window.localStorage.getItem('admin');
// 로그인 로고
// <a href = '/login' class="login">
//   <i class="login-icon">
//     <span class="tooltip">로그인</span>
//   </i>
// </a>
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
      </div>
    </div>
</div>  
<nav class = "mainNav">
</nav>
`;
const login = document.querySelector('.header-span.login-text');
const mypage = document.querySelector('.mypage');
if (token) {
  login.textContent = '로그아웃';
  mypage.style.display = 'inline-block';
  // loginIcon.style.display = 'none';
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

const mainNav = document.querySelector('.mainNav');
function clickNav(o, filter_id) {
  console.log(o);
  const lis = mainNav.querySelectorAll('li');
  lis.forEach((li) => {
    li.classList.remove('active');
  });
  o.classList.add('active');

  //main 요소에 list뿌려주기
}

async function getCategoryList() {
  // await fetch('/api/admin/subcategory')
  //   .then((response) => {
  //     response.json();
  //   })
  //   .then((data) => {
  //     console.log(data);
  //   });
  const result = await fetch('/api/admin/subcategory');
  console.log(result);
  //const jsonData = await response.json();

  const categoryArr = [
    {
      _id: '1',
      category: '사료',
    },
    {
      _id: '2',
      category: '외출용품',
    },
    {
      _id: '3',
      category: '장난감',
    },
    {
      _id: '4',
      category: '고양이 의류',
    },
    {
      _id: '5',
      category: '건강관리',
    },
  ];

  const categoryElements = categoryArr.map(
    (categoryObj) =>
      `<li onclick="clickNav(this,'${categoryObj._id}')">${categoryObj.category}</li>`,
  );
  mainNav.innerHTML = `<ul><li class="active" onclick="clickNav(this,'')" >전체</li>${categoryElements.join(
    '',
  )}</ul>`;
}
getCategoryList();
