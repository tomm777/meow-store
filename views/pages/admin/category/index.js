// 더미데이터
const dummyCate = [
  {
    cateName: '사료',
    lowCate: [
      { name: '건사료' },
      { name: '주식캔' },
      { name: '주식파우치' },
      { name: '힐스' },
      { name: '인스팅트' },
      { name: '오리젠' },
    ],
  },
  {
    cateName: '간식/영양제',
    lowCate: [
      { name: '캔/파우더스틱' },
      { name: '저키' },
      { name: '건조/동결건조' },
      { name: '스낵/캔디' },
    ],
  },
  {
    cateName: '화장실/위생',
    lowCate: [
      { name: '모래' },
      { name: '모래부스터' },
      { name: '화장실' },
      { name: '모래삽/매트' },
    ],
  },
  {
    cateName: '목욕/미용',
    lowCate: [{ name: '목욕' }, { name: '미용' }, { name: '건강관리' }],
  },
];

// 자식요소에 데이터를 넣기위한 부모 요소 가져오기
let nested = document.querySelector('.nested-li');

// 카테고리 tree 구현을 위해 상위 엘리먼트를 가져온다
const toggler = document.getElementsByClassName('caret');
// 카테고리 추가 버튼 엘리먼트
const addButton = document.querySelector('.addCategory');
// 카테고리 삭제 버튼 엘리멘트
const deleteButton = document.querySelector('.deleteCategory');

// API를 받아와서 가공
const getCategory = (data) => {
  if (data) {
    data.map((cate) => {
      nested.insertAdjacentHTML(
        'beforeend',
        `<div>
        <span class="caret">${cate.cateName}</span>
        <ul class="nested">
        ${cate.lowCate
          .map((items) => `<li class="lowCateLi">${items.name}</li>`)
          .join('')}
        </ul>
        </div>`,
      );
    });
  }
};

getCategory(dummyCate);

function arrowClick() {
  this.parentElement.querySelector('.nested').classList.toggle('active');
  this.classList.toggle('caret-down');
}
function addToggle() {
  this.classList.toggle('active');
}
// function lowCateClick() {
//   const lowCateItem = document.querySelectorAll('.lowCateLi');
//   console.log(lowCateItem.length);
//   lowCateItem.forEach((item) => {
//     item.addEventListener('click', function () {
//       this.classList.toggle('active');
//       console.log(this);
//     });
//   });
// }
function lowCateClick() {
  const lowCateItem = document.querySelectorAll('.lowCateLi');
  console.log(lowCateItem.length);
  lowCateItem.forEach((item) => {
    item.addEventListener('click', addToggle);
  });
}
// click 이벤트로 active, caret-down 클래스를 부여해 tree 구조로 보이도록 구현
const nodeSet = () => {
  Array.from(toggler).forEach((data) => {
    data.addEventListener('click', arrowClick);
  });
  lowCateClick();
};

// 카테고리 가져오기 실행
nodeSet();

// 감시할 노드 선택
// let target = document.querySelector('.nested-li');
// // 감시자 인스턴스 만들기
// let observer = new MutationObserver((mutations) => {
//   // 노드가 변경 됐을 때 생성된 DOM의 요소를 바인딩 시켜줌
//   console.log('변화');
//   nodeSet();
// });
// // 감시자의 설정
// let option = {
//   // 자식 노드의 변경 감지
//   childList: true,
// };
// // 대상 노드에 감시자 전달
// observer.observe(target, option);

// 카테고리 추가 클릭 이벤트
addButton.addEventListener('click', function () {
  // 카테고리 이름 입력값
  let inputValue = document.getElementById('cate-input').value;
  let inputValue1 = document.getElementById('cate-input');

  // 선택된 카테고리 하위에 값을 넣기 위해 선택한 요소
  const caretDown = document.querySelector('.nested .active');

  // 선택된 카테고리의 개수
  const caretCheck = document.querySelectorAll('.caret-down');

  // input 값이 없을 때
  if (!inputValue) {
    alert('카테고리 이름을 입력하세요');
    return;
  }
  //카테고리를 선택 안했을 때
  if (caretCheck.length < 1) {
    alert('추가 할 카테고리를 선택해주세요');
    return;
  }

  // 전체 카테고리만 선택 했을 때 상위 카테고리를 만들기 위해 구분
  if (caretCheck.length === 1) {
    nested.insertAdjacentHTML(
      'beforeend',
      `<div>
      <span class="caret">${inputValue}</span>
      <ul class="nested">
      </ul>
      </div>`,
    );
    console.log(inputValue);
    nodeSet();
    return;
  }

  //
  if (caretCheck.length >= 3) {
    alert('추가 할 하나의 카테고리만 선택해주세요.');
    return;
  }
  caretDown.insertAdjacentHTML(
    'beforeend',
    `<li class="lowCateLi">${inputValue}</li>`,
  );
  lowCateClick();
  inputValue1.value = '';
});

const deleteCate = () => {
  const cateArray = document.querySelectorAll('.lowCateLi.active');
  if (cateArray.length === 0) {
    // alert('삭제 할 카테고리를 선택하세요');
  }
  cateArray.forEach((item) => {
    item.remove();
  });
};

// 카테고리 삭제 이벤트
deleteButton.addEventListener('click', deleteCate);
