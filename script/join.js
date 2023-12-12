const form = document.querySelector('#member');
const btnSubmit = form.querySelector('input[type=submit]');

let toggleBtn = document.getElementById('toggleBtn');
let pwd = form.querySelector('#pwd1');
toggleBtn.addEventListener('click', () => {
	if (pwd.type === 'password') {
		pwd.setAttribute('type', 'text');
		toggleBtn.classList.add('hide');
	} else if (pwd.type === 'text') {
		pwd.setAttribute('type', 'password');
		toggleBtn.classList.remove('hide');
	}
});

//원리 : 서브밋버튼은 기본적인 이벤트로 form태그의 액션속성에
//적어둔 경로로 보내버리는 기본이벤트가 있습니다
//따라서 서브밋버튼을 클릭했을때 사용자가 작성한 값이 로직함수에
//맞지 않다면 e.preventDefault();를 이용해서 기본이벤트인
//경로로 보내는 이벤트를 막아 회원가입을 저지합니다
// 사용자가 작성한 값이 로직함수에 모두 맞다면, 그떄 비로소
// 서브밋버튼을 제대로 구현되어서 회원가입이 성공합니다
btnSubmit.addEventListener('click', (e) => {
	if (!isTxt('username', 2)) e.preventDefault();
	if (!isTxt('userid', 5)) e.preventDefault();
	if (!isEmail('email')) e.preventDefault();
	if (!isTxt('comments', 10)) e.preventDefault();
	if (!isCheck('gender')) e.preventDefault();
	if (!isCheck('path')) e.preventDefault();
	if (!isSelect('town')) e.preventDefault();
	if (!isPwd('pwd1', 'pwd2', 10)) e.preventDefault();
});

//name
function isTxt(el, len) {
	if (len === undefined) len = 2;
	let input = form.querySelector(`[name=${el}]`);
	let txt = input.value;

	if (txt.length >= len) {
		const errMsgs = input.closest('td').querySelectorAll('p');
		if (errMsgs.length > 0) input.closest('td').querySelector('p').remove();

		return true;
	} else {
		const errMsgs = input.closest('td').querySelectorAll('p');
		if (errMsgs.length > 0) input.closest('td').querySelector('p').remove();

		let errMessage = document.createElement('p');
		errMessage.append(`입력항목을 ${len}글자 이상 입력하셔야 합니다.`);
		input.closest('td').append(errMessage);
		return false;
	}
}

//id
function isTxt(el, len) {
	if (len === undefined) len = 2;
	let input = form.querySelector(`[name=${el}]`);
	let txt = input.value;

	if (txt.length >= len) {
		const errMsgs = input.closest('td').querySelectorAll('p');
		if (errMsgs.length > 0) input.closest('td').querySelector('p').remove();

		return true;
	} else {
		const errMsgs = input.closest('td').querySelectorAll('p');
		if (errMsgs.length > 0) input.closest('td').querySelector('p').remove();

		let errMessage = document.createElement('p');
		errMessage.append(`입력항목을 ${len}글자 이상 입력하셔야 합니다.`);
		input.closest('td').append(errMessage);
		return false;
	}
}

// email
function isEmail(el) {
	let input = form.querySelector(`[name=${el}]`);
	let txt = input.value;

	if (/@/.test(txt)) {
		const errMsgs = input.closest('td').querySelectorAll('p');
		if (errMsgs.length > 0) input.closest('td').querySelector('p').remove();

		return true;
	} else {
		const errMsgs = input.closest('td').querySelectorAll('p');
		if (errMsgs.length > 0) input.closest('td').querySelector('p').remove();

		let errMessage = document.createElement('p');
		errMessage.append(`@를 포함한 전체 이메일 주소를 입력하세요.`);
		input.closest('td').append(errMessage);
		return false;
	}
}

// 체크박스
function isCheck(el) {
	let inputs = form.querySelectorAll(`[name=${el}]`);
	let isCheck = false;

	for (let el of inputs) {
		if (el.checked) isCheck = true;
	}
	if (isCheck) {
		const errMsgs = inputs[0].closest('td').querySelectorAll('p');
		if (errMsgs.length > 0) inputs[0].closest('td').querySelector('p').remove();
		return true;
	} else {
		const errMsgs = inputs[0].closest('td').querySelectorAll('p');
		if (errMsgs.length > 0) inputs[0].closest('td').querySelector('p').remove();

		let errMessage = document.createElement('p');
		errMessage.append('필수 입력항목을 체크해주세요.');
		inputs[0].closest('td').append(errMessage);
		return false;
	}
}

// 셀렉트 메뉴
function isSelect(el) {
	let select = form.querySelector(`[name=${el}]`);
	let selectIndex = select.options.selectedIndex;
	let value = select[selectIndex].value;
	if (value !== '') {
		const errMsgs = select.closest('td').querySelectorAll('p');
		if (errMsgs.length > 0) select.closest('td').querySelector('p').remove();

		return true;
	} else {
		const errMsgs = select.closest('td').querySelectorAll('p');
		if (errMsgs.length > 0) select.closest('td').querySelector('p').remove();

		let errMessage = document.createElement('p');
		errMessage.append('항목을 선택해주세요.');
		select.closest('td').append(errMessage);
		return false;
	}
}

// 비밀번호
// function isPwd(el1, el2, len) {
// 	let pwd1 = form.querySelector(`[name=${el1}]`);
// 	let pwd2 = form.querySelector(`[name=${el2}]`);
// 	let pwd1_value = pwd1.value;
// 	let pwd2_value = pwd2.value;

// 	const num = /[0-9]/;
// 	const eng = /[a-zA-Z]/;
// 	const spc = /[~!@#$%^&*()_+?><]/;

// 	if (
// 		pwd1_value === pwd2_value &&
// 		pwd1_value.length >= len &&
// 		num.test(pwd1_value) &&
// 		eng.test(pwd1_value) &&
// 		spc.test(pwd1_value)
// 	) {
// 		const errMsgs = pwd1.closest('td').querySelectorAll('p');
// 		if (errMsgs.length > 0) pwd1.closest('td').querySelector('p').remove();
// 		return true;
// 	} else {
// 		const errMsgs = pwd1.closest('td').querySelectorAll('p');
// 		if (errMsgs.length > 0) pwd1.closest('td').querySelector('p').remove();
// 		const errMessage = document.createElement('p');
// 		errMessage.append(
// 			`비밀번호는 ${len}글자 이상으로 숫자,영어,특수문자를 포함하여 작성되어야 합니다.`
// 		);
// 		pwd1.closest('td').append(errMessage);
// 		return false;
// 	}
// }

function isPwd(el1, el2, len) {
	let pwd1 = form.querySelector(`[name=${el1}]`);
	let pwd2 = form.querySelector(`[name=${el2}]`);
	let pwd1_value = pwd1.value;
	let pwd2_value = pwd2.value;

	const num = /[0-9]/;
	const eng = /[a-zA-Z]/;
	const spc = /[~!@#$%^&*()_+?><]/;

	const errMsgWrap = pwd1.closest('td');
	function addErr(msg) {
		const errMessage = document.createElement('p');
		errMessage.textContent = msg;
		errMsgWrap.append(errMessage);
	}
	function removeErr() {
		const errMessage = errMsgWrap.querySelector('p');
		if (errMessage) {
			errMessage.remove();
		}
	}

	if (
		pwd1_value === pwd2_value &&
		pwd1_value.length >= len &&
		num.test(pwd1_value) &&
		eng.test(pwd1_value) &&
		spc.test(pwd1_value)
	) {
		removeErr();
		return true;
	} else {
		removeErr();
		let errMsg = '비밀번호는';
		if (pwd1_value.length < len) {
			errMsg += `${len}글자이상,`;
		}
		if (!num.test(pwd1_value)) {
			errMsg += `숫자를 포함,`;
		}
		if (!eng.test(pwd1_value)) {
			errMsg += `영문을 포함,`;
		}
		if (!spc.test(pwd1_value)) {
			errMsg += `특수문자를 포함,`;
		}
		errMsg += `동일하게 입력하세요.`;
		addErr(errMsg);
		return false;
	}
}
