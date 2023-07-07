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
let addButton = document.querySelector('.addCategory');
// 카테고리 삭제 버튼 엘리멘트
let deleteButton = document.querySelector('.deleteCategory');
// 카테고리 수정 버튼 엘리먼트
let updateButton = document.querySelector('.updateCategory');
// 수정 후 저장버튼
const saveButton = document.querySelector('.button.saveCategory');

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
  // 토글 클래스 추가
  this.parentElement.querySelector('.nested').classList.toggle('active');
  this.classList.toggle('caret-down');
  // 하위, 상위 카테고리가 활성화 된 상태에서 전체를 누르면
  // 선택 해제
  const caretCheck = document.querySelectorAll('.caret-down');
  const caret_down = document.querySelector('.top');
  const nested_active = document.querySelectorAll('.nested .active');
  // 전체를 눌렀을 때 상위 카테고리 선택해제
  if (caret_down.className !== 'caret top caret-down') {
    caretCheck.forEach((item) => {
      item.classList.remove('caret-down');
    });
    nested_active.forEach((item) => {
      item.classList.remove('active');
    });
  }
  // 상위 카테고리를 한번 더 눌렀을 때 하위 카테고리 선택해제
  if (this.className === 'caret') {
    const lowCate = this.parentElement.querySelectorAll('.lowCateLi');
    lowCate.forEach((item) => {
      item.classList.remove('active');
    });
  }
}
// 선택한 하위카테고리에 active 클래스 추가
function addToggle() {
  this.classList.toggle('active');
}
// 하위 카테고리를 클릭 했을 때 이벤트
function lowCateClick() {
  const lowCateItem = document.querySelectorAll('.lowCateLi');
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

// 카테고리 추가 클릭 이벤트
addButton.addEventListener('click', function () {
  // 카테고리 이름 입력값
  // let inputValue = document.getElementById('cate-input').value;
  let inputValue = document.getElementById('cate-input');

  // 선택된 카테고리 하위에 값을 넣기 위해 선택한 요소
  const caretDown = document.querySelector('.nested .active');

  // 선택된 카테고리의 개수
  const caretCheck = document.querySelectorAll('.caret-down');

  // input 값이 없을 때
  if (!inputValue.value) {
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
      <span class="caret">${inputValue.value}</span>
      <ul class="nested">
      </ul>
      </div>`,
    );
    nodeSet();
    inputValue.value = '';
    return;
  }

  // 상위 카테고리가 하나 이상일 때
  if (caretCheck.length >= 3) {
    alert('추가 할 하나의 카테고리만 선택해주세요.');
    return;
  }
  // 하위 카테고리 추가
  caretDown.insertAdjacentHTML(
    'beforeend',
    `<li class="lowCateLi">${inputValue.value}</li>`,
  );
  lowCateClick();
  // input value 초기화
  inputValue.value = '';
});
// 카테고리 삭제 메서드
const deleteCate = () => {
  const cateArray = document.querySelectorAll('.lowCateLi.active');
  const caretCheck = document.querySelectorAll('.caret-down');
  // 아무것도 선택되지 않을 때
  if (caretCheck.length === 0) {
    alert('삭제 할 카테고리를 선택하세요');
    return;
  }
  const lowCateItem = document.querySelectorAll('.lowCateLi');
  // 하위 카테고리를 선택하지 않고 상위카테고리를 선택 했을때를 구분하기 위함
  const nullArrayCheck = Array.from(lowCateItem).filter((item) => {
    return item.className === 'lowCateLi active';
  });
  // 전체 카테고리만 선택했을 때
  if (caretCheck.length === 1) {
    alert('전체 카테고리를 삭제 할 수 없습니다');
    return;
  }
  // 상위 카테고리가 여러개 일 때
  if (caretCheck.length >= 3) {
    alert('삭제 할 하나의 카테고리만 선택해주세요.');
    return;
  }
  // 하위 카테고리가 선택되지않고 상위 카테고리를 선택 했을 때
  if (nullArrayCheck.length === 0) {
    if (confirm('정말 상위카테고리를 삭제하시겠습니까?')) {
      caretCheck[caretCheck.length - 1].parentElement.remove();
    }
  }
  cateArray.forEach((item) => {
    item.remove();
  });
};
// 카테고리 수정 메서드
const updateCate = () => {
  const cateArray = document.querySelectorAll('.lowCateLi.active');
  const caretCheck = document.querySelectorAll('.caret-down');
  const saveButton = document.querySelector('.button.saveCategory');
  // 하위 카테고리를 선택하지 않고 상위카테고리를 선택 했을때를 구분하기 위함
  const lowCateItem = document.querySelectorAll('.lowCateLi');
  const nullArrayCheck = Array.from(lowCateItem).filter((item) => {
    return item.className === 'lowCateLi active';
  });
  // 아무것도 선택되지 않을 때
  if (caretCheck.length <= 1) {
    alert('수정 할 카테고리를 선택하세요');
    return;
  }
  // 상위 카테고리가 여러개 일 때
  if (caretCheck.length >= 3) {
    alert('수정 할 하나의 카테고리만 선택해주세요.');
    return;
  }

  // 하위 카테고리가 선택되지않고 상위 카테고리를 선택 했을 때
  if (nullArrayCheck.length === 0) {
    // 수정하는 동안 다른 버튼 비활성화
    updateButton.disabled = true;
    addButton.disabled = true;
    deleteButton.disabled = true;
    // span을 input으로 변환
    const spanEle = caretCheck[caretCheck.length - 1];
    const spanValue = spanEle.textContent;
    let input = document.createElement('input');
    input.type = 'text';
    input.value = spanValue;
    input.classList.add('updateInput');
    if (spanEle.parentNode) {
      spanEle.parentNode.replaceChild(input, spanEle);
    }
    saveButton.classList.add('active');
    // 저장 수정 API가 들어갈 곳
    saveButton.addEventListener('click', function () {
      // 비활성화 해제
      addButton.disabled = false;
      deleteButton.disabled = false;
      updateButton.disabled = false;
      // 원래대로 변환
      let span = document.createElement('span');
      span.className = spanEle.className;
      span.textContent = input.value;
      if (input.parentNode) {
        input.parentNode.replaceChild(span, input);
      }
      saveButton.classList.remove('active');
      nodeSet();
    });
    return;
  }
  if (cateArray.length >= 2) {
    alert('수정 할 하나의 하위 카테고리를 선택하세요.');
    return;
  }
  updateButton.disabled = true;
  addButton.disabled = true;
  deleteButton.disabled = true;
  const liEle = document.querySelector('.lowCateLi.active');
  const liValue = liEle.textContent;
  let input = document.createElement('input');
  input.type = 'text';
  input.value = liValue;
  if (liEle.parentNode) {
    liEle.parentNode.replaceChild(input, liEle);
  }
  // liEle.parentNode.replaceChild(input, liEle);
  saveButton.classList.add('active');

  saveButton.addEventListener('click', function () {
    addButton.disabled = false;
    deleteButton.disabled = false;
    updateButton.disabled = false;
    liEle.classList.remove('active');
    let li = document.createElement('li');
    li.className = liEle.className;
    li.textContent = input.value;
    if (input.parentNode) {
      input.parentNode.replaceChild(li, input);
    }
    // addButton.disabled = false;
    // deleteButton.disabled = false;
    saveButton.classList.remove('active');
    liEle.classList.remove('active');
    nodeSet();
  });
};

// 카테고리 삭제 이벤트
deleteButton.addEventListener('click', deleteCate);
// 카테고리 수정 이벤트
updateButton.addEventListener('click', updateCate);
