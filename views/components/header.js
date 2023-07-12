const header = document.querySelector('header');
const token = window.localStorage.getItem('token');
header.innerHTML = `
<div class="logo-container">
<div class="logo">
<a href ='/'><img src="/assets/로고.png" height="90px" width = "300px"></a>
</div>
<div class="button-container">
<button type="button" class="logout-button">로그인</button>
<button><a href = '/login'><img src="/assets/icon-login.png" alt="Login" /></a></button>
<button><a href = '/cart'><img src="/assets/icon-cart.png" alt="Cart" /></a></button>
<button><a href = '/admin/home'><img src="/assets/icon-admin.png" alt="Admin" /></a></button>
</div>
</div>  
<nav class = "mainNav">
</nav>
`;
const logoutButton = document.querySelector('.logout-button');
if (token) {
  logoutButton.textContent = '로그아웃';
}

logoutButton.addEventListener('click', function () {
  if (token) {
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

getCategoryList();
async function getCategoryList() {
  //const response = await fetch("/api/products");
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
