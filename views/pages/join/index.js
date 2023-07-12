const emailInput = document.querySelector('#email');
const addressValue = document.querySelector('#address-input');
const nameValue = document.querySelector('#name-input');
const phoneNumberInput = document.querySelector('#phone-number');
const addressDetailInput = document.querySelector('#address-detail-input');
const zipcodeInput = document.querySelector('#zipcode-input');
const searchButton = document.querySelector('.search-address');
const submitButton = document.querySelector('.submit-button');
const inputArr = document.getElementsByTagName('input');
const emailSpan = document.querySelector('.check.email');
const nameSpan = document.querySelector('.check.name');
const phoneSpan = document.querySelector('.check.phone');
const password = document.querySelector('#password');
const passwordCheck = document.querySelector('#password-check');
let nameFlag = false;
let emailFlag = false;
let numberFlag = false;
// 도로명 주소 가져오기
window.onload = function () {
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
// HTML onclick 이벤트
function register() {
  // console.log(joinFlag);
  if (
    zipcodeInput.value === '' ||
    addressValue.value === '' ||
    addressDetailInput.value === ''
  ) {
    alert('주소를 입력해주세요.');
    return;
  }
  if (password.value === '') {
    alert('비밀번호를 입력하세요.');
    return;
  }
  if (password.value !== passwordCheck.value) {
    alert('비밀번호가 일치하지 않습니다.');
    return;
  }
  if (!nameFlag || !emailFlag || !numberFlag) {
    alert('정보를 입력해주세요.');
    return;
  }
  fetch('/api/user/register', {
    method: 'POST', // 요청 방식 설정 (POST)
    headers: {
      'Content-Type': 'application/json', // 요청 헤더 설정
    },
    body: JSON.stringify({
      name: nameValue.value,
      email: emailInput.value,
      password: password.value,
      address: {
        zipCode: zipcodeInput.value,
        address: addressValue.value,
        detailAddress: addressDetailInput.value,
      },
    }),
  })
    .then((data) => data.json())
    .then((result) => console.log(result));
  console.log('완료');
  // 로그인 페이지로 이동
  // window.location.href = '/login';
}

// 로그에 2번찍힘
// submitButton.addEventListener('click', function () {
//   console.log('CLI');
// });
const validationCheck = () => {
  // 이메일 validation
  emailInput.onblur = function () {
    let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
    if (!emailInput.value) {
      emailSpan.textContent = '이메일을 입력하세요.';
      emailSpan.style.display = 'block';
      emailFlag = false;
      return;
    }
    if (!regex.test(emailInput.value)) {
      emailSpan.textContent = '이메일을 올바르게 입력하세요.';
      emailSpan.style.display = 'block';
      emailFlag = false;
      return;
    }
    emailSpan.style.display = 'none';
    emailFlag = true;
  };
  // 이름 validation
  nameValue.onblur = function () {
    console.log(nameValue.value);
    console.log(nameValue.value === '');
    if (nameValue.value === '') {
      nameSpan.style.display = 'block';
      nameFlag = false;
      return;
    }
    nameFlag = true;
    nameSpan.style.display = 'none';
  };
  phoneNumberInput.onblur = function () {
    let regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    console.log(regPhone.test(phoneNumberInput.value));
    if (!regPhone.test(phoneNumberInput.value)) {
      phoneSpan.style.display = 'block';
      phoneSpan.textContent = '휴대폰 번호를 정확하게 입력하세요.';
      numberFlag = false;
      return;
    }
    numberFlag = true;
    phoneSpan.style.display = 'none';
  };
};
validationCheck();

// sumitButton.addEventListener('click', function () {

//   if (!nameValue.value) {
//     alert('이름을 입력하세요');
//     return;
//   }
// });
