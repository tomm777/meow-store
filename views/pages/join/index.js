const emailInput = document.querySelector('#email');
const addressValue = document.querySelector('#address-input');
const nameValue = document.querySelector('#name-input');
const phoneNumberInput = document.querySelector('#phone-number');
const addressDetailInput = document.querySelector('#address-detail-input');
const zipcodeInput = document.querySelector('#zipcode-input');
const searchButton = document.querySelector('.search-address');
const sumitButton = document.querySelector('.submit-button');
const inputArr = document.getElementsByTagName('input');
const emailSpan = document.querySelector('.check.email');
const nameSpan = document.querySelector('.check.name');
const phoneSpan = document.querySelector('.check.phone');
// 이메일 정규식
let joinFlag = 0;
// 도로명 주소 가져오기
window.onload = function () {
  // console.log(
  //   Array.from(inputArr).forEach((item) => {
  //     console.log(item.classList);
  //   }),
  // );
  searchButton.addEventListener('click', function () {
    //주소입력칸을 클릭하면
    //카카오 지도 발생
    new daum.Postcode({
      oncomplete: function (data) {
        //선택시 입력값 세팅
        zipcodeInput.value = data.zonecode;
        addressValue.value = data.address; // 주소 넣기
      },
    }).open();
  });
};
sumitButton.addEventListener('click', function () {
  // if (joinFlag) {
  //   console.log('완료');
  // }
});
const validationCheck = () => {
  // 이메일 validation
  emailInput.onblur = function () {
    let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');

    if (!emailInput.value) {
      emailSpan.textContent = '이메일을 입력하세요.';
      emailSpan.style.display = 'block';
      return;
    }
    if (!regex.test(emailInput.value)) {
      emailSpan.textContent = '이메일을 올바르게 입력하세요.';
      emailSpan.style.display = 'block';
      return;
    }
    emailSpan.style.display = 'none';
  };
  // 이름 validation
  nameValue.onblur = function () {
    console.log(nameValue.value);
    if (nameValue.value === null) {
      nameSpan.style.display = 'block';
      return;
    }
    console.log('통과');
    nameSpan.style.display = 'none';
  };
  phoneNumberInput.onblur = function () {
    let regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    console.log(regPhone.test(phoneNumberInput.value));
    if (!regPhone.test(phoneNumberInput.value)) {
      phoneSpan.style.display = 'block';
      phoneSpan.textContent = '휴대폰 번호를 정확하게 입력하세요.';
      return;
    }
    phoneSpan.style.display = 'none';
    console.log(joinFlag);
  };
};
validationCheck();

// sumitButton.addEventListener('click', function () {

//   if (!nameValue.value) {
//     alert('이름을 입력하세요');
//     return;
//   }
// });
