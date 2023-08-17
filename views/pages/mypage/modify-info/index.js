import { blockIfNotLogin } from '/utils/index.js';
blockIfNotLogin();
import { failValidation, elementNone } from '/utils/data-check.js';
import * as API from '/api/index.js';
const addressValue = document.querySelector('#address-input');
const cansleButton = document.querySelector('.cansle-button');
const email = document.querySelector('.email');
const nameValueInput = document.querySelector('#name-input');
const phoneNumberInput = document.querySelector('#phone-number');
const addressDetailInput = document.querySelector('#address-detail-input');
const addressZipCode = document.querySelector('#address-zip-input');
const saveButton = document.querySelector('.save-button');
const phoneSpan = document.querySelector('.check.phone');
const nameSpan = document.querySelector('.check.name');
const detailAddrSpan = document.querySelector('.check.address-check');

let validation = '';
let nameFlag = false;
let numberFlag = false;
let detailAddressFlag = false;

window.onload = function () {
  // 도로명 주소 가져오기
  document
    .querySelector('.modify-address')
    .addEventListener('click', function () {
      //주소입력칸을 클릭하면
      //카카오 지도 발생
      new daum.Postcode({
        oncomplete: function (data) {
          // console.log(data.zonecode);
          //선택시 입력값 세팅
          addressZipCode.value = data.zonecode; // 주소 넣기
          addressValue.value = data.address; // 주소 넣기
          // document.querySelector("input[name=address_detail]").focus(); //상세입력 포커싱
        },
      }).open();
    });
};
async function getUserInfo() {
  try {
    const data = await API.get(`/api/user/mypage/`);
    nameValueInput.value = `${data.name}`;
    email.textContent = `${data.email}`;
    phoneNumberInput.value = `${data.contact}`;
    addressValue.value = `${data.address.address}`;
    addressDetailInput.value = `${data.address.detailAddress}`;
    addressZipCode.value = `${data.address.zipCode}`;
    validation = data._id;
    numberFlag = true;
    nameFlag = true;
    detailAddressFlag = true;
  } catch (error) {
    throw error;
  }
}
getUserInfo();
// 번호 validation
phoneNumberInput.onblur = function () {
  let regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  console.log(regPhone.test(phoneNumberInput.value));
  if (!regPhone.test(phoneNumberInput.value)) {
    failValidation(phoneSpan, '휴대폰 번호를 정확하게 입력하세요.');
    numberFlag = false;
    console.log(numberFlag);
    return;
  }
  // 하이픈 달아주기
  // const newphone = phone.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
  phoneNumberInput.value = phoneNumberInput.value.replace(
    /^(\d{2,3})(\d{3,4})(\d{4})$/,
    `$1-$2-$3`,
  );

  numberFlag = elementNone(phoneSpan);
  // numberFlag = true;
};
nameValueInput.onblur = function () {
  if (!nameValueInput.value.trim()) {
    failValidation(nameSpan, '이름을 입력하세요');
    nameFlag = false;
    return;
  }
  nameFlag = elementNone(nameSpan);
  // console.log(nameFlag);
  // nameFlag = true;
};
addressDetailInput.onblur = function () {
  if (!addressDetailInput.value.trim()) {
    failValidation(detailAddrSpan, '상세 주소를 입력하세요');
    detailAddressFlag = false;
    return;
  }
  detailAddressFlag = elementNone(detailAddrSpan);
  // detailAddressFlag = true;
};

cansleButton.addEventListener('click', function () {
  window.location.href = '/mypage';
});

saveButton.addEventListener('click', function () {
  if (!nameFlag) {
    nameValueInput.focus();
    return;
  }
  if (!numberFlag) {
    phoneNumberInput.focus();
    return;
  }
  if (!detailAddressFlag) {
    addressDetailInput.focus();
    return;
  }
  if (!addressValue.value.trim() || !addressZipCode.value.trim()) {
    alert('주소를 입력하세요');
    return;
  }
  modifyUserInfo();
});

async function modifyUserInfo() {
  try {
    await API.post('/api/user/mypage', {
      contact: phoneNumberInput.value,
      name: nameValueInput.value,
      address: {
        address: addressValue.value,
        detailAddress: addressDetailInput.value,
        zipCode: addressZipCode.value,
      },
    });
    alert('정보 수정이 완료 되었습니다.');
    window.location.href = '/mypage';
  } catch (error) {
    throw error;
  }
}
