const count = document.querySelector(".b2");

async function deleteSelectedRows() {
  let radioes = document.querySelectorAll(".product tbody input[type='radio']");
  let rowsToDelete = [];

  radioes.forEach(function (radio) {
    if (radio.checked) {
      rowsToDelete.push(radio.parentNode.parentNode);
    }
  });

  rowsToDelete.forEach(function (row) {
    row.parentNode.removeChild(row);
  });
  await countList();
  console.log(count.innerText)
  count.innerText = Number(count.innerText)-1;
  console.log(count.innerText)
}

//총 몇건인지 조회
async function countList() {
  const res = await fetch("/api/products");
  const dataList = await res.json()

  const totalCount = dataList.length;

  count.innerHTML = totalCount.toString();
}

countList();






// const dummyData = [{
//     number: '1',
//     image: "이미지",
//     name: "Aquila Foster",
//     category: "blue",
//     price: "20000",
//   },
//   {
//     number: '2',
//     image: "이미지",
//     name: "Aquila Foster",
//     category: "blue",
//     price: "40000",
//   },
//   {
//     number: '3',
//     image: "이미지",
//     name: "Aquila Foster",
//     category: "blue",
//     price: "50000",
//   }
// ];

// function getCategoryList() {
//   let tbody = document.querySelector('#table-body');
//   dummyData.forEach(function (item, index) {
//     tbody.insertAdjacentHTML('beforeend',
//       `
//       <tr id="table-body">
//         <td><input type="checkbox" name="" id=""></td>
//         <td name="number">${item.index}</td>
//         <td name="image"><img src="${item.repImgUrl}" /></td>
//         <td name="name">${item.name}</td>
//         <td name="category"></td>
//         <td name="price">${item.price}</td>
//         <td><button id="fix_btn" class="btn_black">수정</button></td>
//       </tr>
//       `
//     );
//   });
// }
//document.querySelector("[name=number]")
//getCategoryList();


// let fixBtns = document.querySelectorAll(".fix_btn");
// fixBtns.forEach(function (btn) {
//   btn.addEventListener("click", fixRow);
// });











// 더미데이터
// let tbody = document.querySelector('#table-body');
// const getCategoryList = () => {
//   dummyData.map((item) =>
//     tbody.insertAdjacentHTML('beforeend',
//       `
// <tr id="table-body">
//     <td><input type="checkbox" name="" id=""></td>
//     <td class="number">${item.number}</td>
//     <td class="catename">${item.cateName}</td>
//     <td class="name">${item.name}</td>
//     <td>${item.list}</td>
//     <td><button class="btn_black">수정</button></td>
//   </tr>
//   `)
//   )
// }

async function getProductList() {
  const response = await fetch("/api/products");
  const data = await response.json();
  console.log(data)

  let tbody = document.querySelector('#table-body');
  data.forEach(function (item, index) {
    tbody.insertAdjacentHTML('beforeend',
      `
      <tr name="table-body" product_id="${item._id}" >
        <td><input type="radio"></td>
        <td name="number">${index+1}</td>
        <td name="image"><img src="${item.repImgUrl}" /></td>
        <td name="name">${item.name}</td>
        <td name="category">${item.categoty}</td>
        <td name="price">${item.price}</td>
        <td><button onclick="goToUpdate(this)" class="btn_black">수정</button></td>
      </tr>
      `
    );
  });
}

getProductList()



function goToUpdate(o) {
  const tr = o.closest("[name=table-body]");
  const id = tr.getAttribute("product_id");

  location.href = "/admin/product-details?id=" + id;
}

const createBtn = document.getElementById("createBtn");
createBtn.addEventListener("click", () => {
  location.href = "/admin/product-create"
})

//될까..?













// getCategoryList()


// fetch('/api/admin/category', {
//   method: 'POST', // 요청 방식 설정 (POST)
//   headers: {
//     'Content-Type': 'application/json', // 요청 헤더 설정
//   },
//   body: JSON.stringify({
//     "name": "[사료]로얄캐닌 10kg",
// "price": 100000,
//   }),
// })
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);
//     nested.insertAdjacentHTML(
//       'beforeend',
//       `<div>
//       <span class="caret">${inputValue.value}</span>
//       <ul class="nested">
//       </ul>
//       </div>`,
//     );
//     nodeSet();
//     inputValue.value = '';
//   })
//   .catch((error) => {
//     // 에러 처리하는 코드 작성
//     console.log('Error:', error);
//   });

// html
// <button class="update save">수정</button>
// <button class="save ">완료</button>

// css
// .save {
// display = none
// }

// .save.active {
// display  = block;
// }
// saveButton
// updateButton.addEventLisner('click', updateOne)

// const updateOne =() => {
//   saveButton.classList.add("active")
//   // api 호출 후 

//   saveButton.classList.remove("active")
// }


// span을 input으로 변환
// const spanEle = caretCheck[caretCheck.length - 1];

// const spanValue = spanEle.textContent;

// let input = document.createElement('input');
// input.type = 'text';
// input.value = spanValue;


// input.classList.add('updateInput');
//   spanEle.parentNode.replaceChild(input, spanEle);





//검색 기능 

const searchButton = document.querySelector('.btn_black');
searchButton.addEventListener('click', performSearch);

function performSearch() {
  const radioes = document.querySelectorAll('.product tbody input[type="radio"]');
  const selectedRows = [];

  radioes.forEach(function (radio) {
    if (radio.checked) {
      const row = radio.parentNode.parentNode;
      selectedRows.push(row);
    }
  });

  const tableBody = document.getElementById('table-body');
  tableBody.innerHTML = ''; // 검색 결과를 표시하기 전에 테이블 바디 내용을 비웁니다.

  selectedRows.forEach(function (row) {
    tableBody.appendChild(row); // 선택된 행을 테이블 바디에 다시 추가하여 검색 결과로 표시합니다.
  });
}

//총 몇건인지 조회
async function countList() {
  const res = await fetch("/api/products");
  const dataList = await res.json()

  const totalCount = dataList.length;

  document.querySelector(".b2").innerHTML = totalCount.toString();
}

countList();


//수정버튼 눌렀을때 페이지가 이동되서 그안에 데이터들이 입력값이 있는 상태로 구현되는 동작

