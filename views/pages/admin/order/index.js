
let option = document.querySelector(".option");
let content = document.querySelector("#content");
let update_btns = document.querySelector("#update_btn");
let o2 = document.querySelector("#o2");





update_btns.addEventListener("click", deleteRow);

// 각각 열에 해당되는 수정 버튼을 눌러서 동작하게끔 구현해야 되는데 모르겠음...


function deleteRow() {
  content.style.display = "none";
  option.style.display = "block";
  update_btns.innerHTML = "완료";
  update_btns.removeEventListener("click", deleteRow);
  update_btns.addEventListener("click", play2);
}

function play2() {
  update_btns.innerHTML = "수정";
  option.style.display = "none";
  content.style.display = "block";
  content.innerHTML = o2.value;
  update_btns.removeEventListener("click", play2);
  update_btns.addEventListener("click", deleteRow);
}




let delete_btns = document.querySelectorAll("#delete_btn");

delete_btns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    let row = event.target.closest("tr");
    if (row) {
      row.remove();
    }
  });
});


