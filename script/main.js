const btnCall = document.querySelector('.btnCall');
const menuMo = document.querySelector('.menuMo');

btnCall.addEventListener('click', function (e) {
	e.preventDefault();

	// btnCall.classList.add('on');
	// menuMo.classList.add('on');

	// btnCall.classList.toggle('on');
	// menuMo.classList.toggle('on');

	let isOn = btnCall.classList.contains('on');

	if (isOn) {
		btnCall.classList.remove('on');
	} else {
		btnCall.classList.add('on');
	}

	let isOn2 = menuMo.classList.contains('on');

	if (isOn2) {
		menuMo.classList.remove('on');
	} else {
		menuMo.classList.add('on');
	}
});
