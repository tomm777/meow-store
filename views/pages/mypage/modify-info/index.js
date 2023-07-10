const addressValue = document.querySelector('#address-input');
const cansleButton = document.querySelector('.cansle-button');
const emailInput = document.querySelector('#email');
const phoneNumberInput = document.querySelector('#phone-number');
const addressDetailInput = document.querySelector('#address-detail-input');
// const passwordCheck = document.querySelector('#password-check');

cansleButton.addEventListener('click', function () {
  window.location.href = '/mypage';
});
window.onload = function () {
  // api
  addressValue.value = '서울특별시 무슨구 무슨도로...';
  emailInput.value = 'Test@gmail.com';
  phoneNumberInput.value = '01012341234';
  addressDetailInput.value = '무슨아파트 10동';
  // 도로명 주소 가져오기
  document
    .querySelector('.modify-address')
    .addEventListener('click', function () {
      //주소입력칸을 클릭하면
      //카카오 지도 발생
      new daum.Postcode({
        oncomplete: function (data) {
          //선택시 입력값 세팅
          document.getElementById('address-input').value = data.address; // 주소 넣기
          // document.querySelector("input[name=address_detail]").focus(); //상세입력 포커싱
        },
      }).open();
    });
};
