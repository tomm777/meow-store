async function getOrderList() {
  const res = await fetch("/api/admin/orders");
  const dataList = await res.json();

  const tbody = document.getElementById("order_tbody");
  const html = dataList.map((data, index) => {
    console.log(data);
    return `<tr id="${data._id}">
    <td>${index+1}</td>
    <td>${data.createDate}</td>
    <td>${data.number}</td>
    <td><img src="${data.repImgUrl}" /></td>
    <td>
      <div name="content">
        ${data.status}
      </div>
      <div class="option">
        <select value=${data.status}>
          <option value="배송중">배송중</option>
          <option value="배송 완료">배송 완료</option>
          <option value="환불중">환불중</option>
          <option value="환불 완료">환불 완료</option>
        </select>
      </div>
    </td>
    <td>${data.totalPrice}원</td>
    <td><button class="btn_black" onclick="switchSelectBox(this)" >수정</button></td>
    <td><button class="btn_black" onclick="deleteRow(this)" >삭제</button></td>
  </tr>`;
  }).join("");

  tbody.innerHTML = html;


}
getOrderList();

function switchSelectBox(o) {
  const tr = o.closest("tr");
  const option = tr.querySelector(".option");
  const content = tr.querySelector("[name=content]")
  const select = tr.querySelector("select");

  const text = o.innerHTML.trim();

  console.log(text)
  if (text === "수정") {
    option.style.display = "block";
    content.style.display = "none";

    o.innerHTML = "완료"
  } else {
    option.style.display = "none";
    content.style.display = "block";
    const status = select.value;
    content.innerHTML = status;

    // api 호출
    // 주문 상태 변경 api
    // 함수호출
    // const id = tr.getAttribute("id");

    // updateOrderStatus(id, status);

    // o.innerHTML = "수정"
    
    ///보란님
    // fetch('/api/admin/orders', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(dataToSend), // 데이터를 JSON 형식으로 변환하여 전송
    // })
    //   .then((response) => {
    //     if (response.ok) {
    //       return response.json(); // 새로 생성된 ID
    //     }
    //     throw new Error('Network response was not ok.');
    //   })
    //   .then((responseText) => {
    //     console.log(responseText); // 새 아이디가 나옴
    //     location.href = 'http://localhost:3000/order-complete/';
    //   })
    //   .catch((error) => {
    //     // 요청이 실패했을 때의 처리 로직
    //     console.log('Error: ', error.message);
    //   });




    //
    // 
    const id = tr.getAttribute("id");
    updateOrderStatus(id, status)
      .then(() => {
        o.innerHTML = "수정";
        console.log("주문 상태 업데이트 완료");
      })
      .catch((error) => {
        console.error("주문 상태 업데이트 중 오류 발생:", error);
      });
    //
  }

}

async function updateOrderStatus(id, status) {
  //fetch
  //post/put
  await fetch(`/api/admin/order/${id}`, {
    method: "POST", // post 메소드 사용하여 요청을 보냄
    body: JSON.stringify({
      status
    }), //요청 본문에 새로운 상태를 포함시킴
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// function deleteRow(o) {
//   const tr = o.closest("tr");
//   const id = tr.getAttribute("id");

//   tr.remove()
  

//   // api 호출
//   // 주문 삭제
//   // validation check (화면상 체크 => 무작정 삭제x, 주문 취소일때 삭제가능)
// }

// -------------

async function deleteRow(o) {
  const tr = o.closest("tr");
  const id = tr.getAttribute("id");

  try {
    // 주문 삭제 API 호출
    await deleteOrder(id);

    // 테이블에서 행 제거
    tr.remove();

    console.log("주문이 성공적으로 삭제되었습니다.");
  } catch (error) {
    console.error("주문 삭제 중 오류가 발생했습니다:", error);
  }
}

async function deleteOrder(id) {
  await fetch(`/api/admin/order/${id}`, {
    method: "DELETE", // 삭제 요청을 보내기 위해 DELETE 메서드를 사용합니다.
  });
}


//총 몇건인지 조회
async function countList() {
  const res = await fetch("/api/admin/orders");
  const dataList = await res.json();

  const totalCount = dataList.length;

  document.querySelector('.b2').innerHTML = totalCount.toString();
}

countList();

//새로고침 구현하는 동작
const button = document.querySelector(".btn_red");

button.addEventListener("click", () => {
  window.location.reload();
});



//검색기능

document.getElementById("searchButton").addEventListener("click", function() {
  const searchText = document.getElementById("searchInput").value;
  performSearch(searchText);
});

function performSearch(searchText) {
  // Perform the search logic here
  // You can use the entered searchText to filter the data and display the relevant results
  // You can access the order items and perform the necessary filtering or searching operations

  // Example:
  const orderItems = document.querySelectorAll("#order_tbody tr");
  for (const item of orderItems) {
    const orderNumber = item.querySelector("td:nth-child(3)").innerText;
    if (orderNumber.includes(searchText)) {
      item.style.display = "table-row"; // Show the matching items
    } else {
      item.style.display = "none"; // Hide the non-matching items
    }
  }
}