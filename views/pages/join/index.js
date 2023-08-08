import * as API from '/api/index.js';
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
const addressSpan = document.querySelector('.check.address');
const passwordSpan = document.querySelector('.check.password-validation');
const passwordCheckSpan = document.querySelector(
  '.check.password-validation-check',
);
const password = document.querySelector('#password');
const passwordCheck = document.querySelector('#password-check');
let nameFlag = false;
let emailFlag = false;
let numberFlag = false;
let passwordFlag = false;
let passwordCheckFlag = false;
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
// onClick 이벤트
submitButton.addEventListener('click', register);
async function register() {
  if (!emailFlag) {
    emailInput.focus();
    return;
  }
  if (!nameFlag) {
    nameValue.focus();
    return;
  }
  if (!numberFlag) {
    phoneNumberInput.focus();
    return;
  }
  if (zipcodeInput.value === '' || addressValue.value === '') {
    alert('주소를 입력해주세요.');
    return;
  }
  if (addressDetailInput.value === '') {
    addressDetailInput.focus();
    return;
  }
  if (!passwordFlag) {
    password.focus();
    return;
  }
  if (!passwordCheckFlag) {
    passwordCheck.focus();
    return;
  }
  try {
    await API.post('/api/user/register', {
      name: nameValue.value,
      email: emailInput.value,
      password: password.value,
      contact: phoneNumberInput.value,
      address: {
        zipCode: zipcodeInput.value,
        address: addressValue.value,
        detailAddress: addressDetailInput.value,
      },
    });
    alert('회원가입 되었습니다.');
    // 로그인 페이지로 이동
    window.location.href = '/login';
  } catch (error) {
    throw error;
  }
}
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
      nameSpan.textContent = '이름을 입력하세요';
      nameFlag = false;
      return;
    }
    nameFlag = true;
    nameSpan.style.display = 'none';
  };
  phoneNumberInput.onblur = function () {
    let regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    if (!regPhone.test(phoneNumberInput.value)) {
      phoneSpan.style.display = 'block';
      phoneSpan.textContent = '휴대폰 번호를 정확하게 입력하세요.';
      numberFlag = false;
      return;
    }
    // 하이픈 달아주기

    // const newphone = phone.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
    phoneNumberInput.value = phoneNumberInput.value.replace(
      /^(\d{2,3})(\d{3,4})(\d{4})$/,
      `$1-$2-$3`,
    );
    numberFlag = true;
    phoneSpan.style.display = 'none';
  };
  addressDetailInput.onblur = function () {
    if (addressDetailInput.value === '') {
      addressSpan.style.display = 'block';
      addressSpan.textContent = '상세주소를 입력하세요.';
      return;
    }
    addressSpan.style.display = 'none';
  };
  password.onblur = function () {
    if (password.value === '') {
      passwordSpan.style.display = 'block';
      passwordSpan.textContent = '패스워드를 입력하세요';
      passwordFlag = false;
      return;
    }
    passwordSpan.style.display = 'none';
    passwordFlag = true;
  };
  passwordCheck.onblur = function () {
    if (passwordCheck.value === '') {
      passwordCheckSpan.style.display = 'block';
      passwordCheckSpan.textContent =
        '확인을 위해 새 비밀번호를 다시 입력해주세요.';
      passwordCheckFlag = false;
      return;
    } else if (password.value !== passwordCheck.value) {
      passwordCheckSpan.style.display = 'block';
      passwordCheckSpan.textContent = '비밀번호가 일치하지 않습니다';
      passwordCheckFlag = false;
      return;
    }
    console.log('통과');
    passwordCheckSpan.style.display = 'none';
    passwordCheckFlag = true;
  };
};
validationCheck();
