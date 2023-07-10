const categoryArr = [
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

  function showcategoryArr() {
    const categoryElements = categoryArr.map(categoryObj => `<li><a href="">${categoryObj.category}</a></li>
    `); //각 category의 이름을 넣은 html 코드가 요소로 있는 배열을 생성.
    mainNav.innerHTML = `<ul><li><a href="">About</a></li>${categoryElements.join("")}<ul>`; 
    //배열을 하나의 문자열로 만들어서 mainNav div에 삽입.

  }

  showcategoryArr();