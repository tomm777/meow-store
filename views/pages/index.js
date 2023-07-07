
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

const items = [
    { 
        name: "아이템 1", 
        repImgUrl: "https://dummyimage.com/200x200/000000/fff",
        summary: "이 아이템은 아이템 1입니다." 
      },
      { 
        name: "아이템 2", 
        repImgUrl: "https://dummyimage.com/200x200/ff0000/fff",
        summary: "이 아이템은 아이템 2입니다." 
      },
      { 
        name: "아이템 3", 
        repImgUrl: "https://dummyimage.com/200x200/00ff00/fff",
        summary: "이 아이템은 아이템 3입니다." 
      },
      // 아이템 4부터 15까지 추가
      { 
        name: "아이템 4", 
        repImgUrl: "https://dummyimage.com/200x200/0000ff/fff",
        summary: "이 아이템은 아이템 4입니다." 
      },
      { 
        name: "아이템 5", 
        repImgUrl: "https://dummyimage.com/200x200/ff00ff/fff",
        summary: "이 아이템은 아이템 5입니다." 
      },
      { 
        name: "아이템 6", 
        repImgUrl: "https://dummyimage.com/200x200/ffff00/fff",
        summary: "이 아이템은 아이템 6입니다." 
      },
      { 
        name: "아이템 7", 
        repImgUrl: "https://dummyimage.com/200x200/00ffff/fff",
        summary: "이 아이템은 아이템 7입니다." 
      },
      { 
        name: "아이템 8", 
        repImgUrl: "https://dummyimage.com/200x200/ff6600/fff",
        summary: "이 아이템은 아이템 8입니다." 
      },
      { 
        name: "아이템 9", 
        repImgUrl: "https://dummyimage.com/200x200/6600ff/fff",
        summary: "이 아이템은 아이템 9입니다." 
      },
      { 
        name: "아이템 10", 
        repImgUrl: "https://dummyimage.com/200x200/990000/fff",
        summary: "이 아이템은 아이템 10입니다." 
      },
      { 
        name: "아이템 11", 
        repImgUrl: "https://dummyimage.com/200x200/009900/fff",
        summary: "이 아이템은 아이템 11입니다." 
      },
      { 
        name: "아이템 12", 
        repImgUrl: "https://dummyimage.com/200x200/000099/fff",
        summary: "이 아이템은 아이템 12입니다." 
      },
      { 
        name: "아이템 13", 
        repImgUrl: "https://dummyimage.com/200x200/999900/fff",
        summary: "이 아이템은 아이템 13입니다." 
      },
      { 
        name: "아이템 14", 
        repImgUrl: "https://dummyimage.com/200x200/009999/fff",
        summary: "이 아이템은 아이템 14입니다." 
      },
      { 
        name: "아이템 15", 
        repImgUrl: "https://dummyimage.com/200x200/990099/fff",
        summary: "이 아이템은 아이템 15입니다." 
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

  

  let currentItemIndex = 0;
  const itemBox = document.querySelector('.item-box');
  
  // featured 아이템을 보여주는 함수. 베스트셀러, 신상품, 추천상품 등 섹션마다 다른 데이터 목록 가져올 함수 추가적으로 필요함.
  function showItems() {
    const itemElements = items.slice(currentItemIndex, currentItemIndex + 5).map(item => `
      <div class="item">
      <img src="${item.repImgUrl}" alt="${item.name}" />
      <h3>${item.name}</h3>
      <p>${item.summary}</p>
    </div>
    `);
    itemBox.innerHTML = itemElements.join('');
  }
  
  

  // 이전 아이템 보기 함수
  function previousItem() {
    currentItemIndex -= 5;
    if (currentItemIndex < 0) {
      currentItemIndex = items.length - 5;
    }
    showItems();
  }
  
  // 다음 아이템 보기 함수
  function nextItem() {
    currentItemIndex += 5;
    if (currentItemIndex >= items.length) {
      currentItemIndex = 0;
    }
    showItems();
  }
 
  //페이지 로드 시 카테고리 보여주기
  showCategories();

  // 3초마다 자동으로 다음 아이템 보여주기
  setInterval(nextItem, 3000);
  
  // 페이지 로드 시 초기 아이템 보여주기
  showItems();


  