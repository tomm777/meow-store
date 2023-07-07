const categories = [
    {
      "_id": "1",
      "category": "사료"
    },
    {
      "_id": "2",
      "category": "외출용품"
    },
    {
      "_id": "3",
      "category": "장난감"
    },
    {
      "_id": "4",
      "category": "고양이 의류"
    },
    {
      "_id": "5",
      "category": "건강관리"
    }
  ];

// 카테고리 불러오기 함수
let currentCategoryIndex = 0;
const mainNav = document.querySelector('.mainNav');

function showCategories() {
    const categoryElements = categories.map(category => `<li><a href="">${category.category}</a></li>
    `);
    mainNav.innerHTML = `<ul>${categoryElements.join('')}<ul>`;

    console.log(categoryElements);
}

//페이지 로드 시 카테고리 보여주기
showCategories();