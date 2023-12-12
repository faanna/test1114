const body = document.querySelector('body');
const frame = document.querySelector('#list');
const input = document.querySelector('#search');
const btnSearch = document.querySelector('.btnSearch');
const base = 'https://www.flickr.com/services/rest/?';
const method1 = 'flickr.interestingness.getList';
const method2 = 'flickr.photos.search';
const key = '58f441c44552cf38fca9e142fb8fb2aa';
const loading = document.querySelector('.loading');
const per_page = 20;
const main = document.querySelector('#gallery');
const url = `${base}method=${method1}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1`;
callData(url);

btnSearch.addEventListener('click', () => {
	let tag = input.value;
	//빈칸스페이스바를 눌러서 빈값일 경우
	tag = tag.trim();
	//trim()을 사용해서 의미없는 스페이스바를 지워줍니다
	const url = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&privacy_filter=1&tags=${tag}`;

	if (tag != '') {
		callData(url);
	} else {
		frame.innerHTML = '';
		frame.classList.remove('on');
		frame.style.height = 'auto';

		const AllErrMsg = frame.parentElement.querySelectorAll('p');
		if (AllErrMsg.length > 0) return;

		const errMsg = document.createElement('p');
		errMsg.append('검색어가 없습니다, 검색어를 입력하세요');
		frame.parentElement.append(errMsg);
	}
});
input.addEventListener('keyup', (e) => {
	//내가 눌렀다 뗀 키가 엔터인지??
	if (e.key === 'Enter') {
		let tag = input.value;
		//빈칸스페이스바를 눌러서 빈값일 경우
		tag = tag.trim();
		//trim()을 사용해서 의미없는 스페이스바를 지워줍니다
		const url = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&privacy_filter=1&tags=${tag}`;

		if (tag != '') {
			callData(url);
		} else {
			frame.innerHTML = '';
			frame.classList.remove('on');
			frame.style.height = 'auto';

			const AllErrMsg = frame.parentElement.querySelectorAll('p');
			if (AllErrMsg.length > 0) return;

			const errMsg = document.createElement('p');
			errMsg.append('검색어가 없습니다, 검색어를 입력하세요');
			frame.parentElement.append(errMsg);
		}
	}
});

frame.addEventListener('click', (e) => {
	e.preventDefault();
	// e.currentTarget : 이벤트리스터가 붙은 대상인 frame에 고정됨
	// e.target : 이벤트가 직접 발생한 대상
	let target = e.target.closest('.item').querySelector('.thumb');
	// if(!e.target == target) return;
	// let target = e.target.closest('.item');
	// let imgSrc = target.querySelector('a').getAttribute('href');
	//imgSrc에는 큰이미지 주소가 담김
	if (e.target == target) {
		let imgSrc = target.parentElement.getAttribute('href');
		//popup을 생성합니다
		let pop = document.createElement('aside');

		let pops = `
		<img src="${imgSrc}">
		<span class="close">닫기</span>
	`;
		pop.innerHTML = pops;
		main.append(pop);
		body.style.overflow = 'hidden';
	}
});
main.addEventListener('click', (e) => {
	let pop = body.querySelector('aside');
	if (pop != null) {
		let close = pop.querySelector('.close');
		if (e.target == close) {
			pop.remove();
			body.style.overflow = 'auto';
		}
	}
});
function callData(url) {
	//fetch로 url의 정보를 요청하고 성공하면 프로미스객체로 반환됩니다

	frame.innerHTML = '';
	loading.classList.remove('off');
	frame.classList.remove('on');

	fetch(url)
		.then((el) => {
			return el.json();
		})
		.then((json) => {
			let items = json.photos.photo;

			console.log(items.length);
			//검색결과가 있을때만 createList(items);delayLoading();
			//이것을 호출해야합니다
			if (items.length > 0) {
				createList(items);
				delayLoading();
			} else {
				loading.classList.add('off');

				const AllErrMsg = frame.parentElement.querySelectorAll('p');
				if (AllErrMsg.length > 0) return;

				const errMsg = document.createElement('p');
				errMsg.append('검색하신 검색어의 이미지가 없습니다');
				frame.parentElement.append(errMsg);

				frame.classList.remove('on');
				frame.style.height = 'auto';
			}
		});
}
function createList(items) {
	//forEach 와 map의 차이점 거의 없습니다. 단어만 달라진것
	//큰차이점 1개, map은 무조건 배열, forEach는 배열이 아닌것도 가능
	//불변성의 개념때문에 map을 사용합
	let htmls = '';
	items.map((el, index) => {
		// 여기에서 동적으로 html리스트를 생성합니다
		// console.log(el);
		let imgSrc = `https://live.staticflickr.com/${el.server}/${el.id}_${el.secret}_m.jpg`;
		//썸네일이되는 작은이미지 주소
		let imgSrcBig = `https://live.staticflickr.com/${el.server}/${el.id}_${el.secret}_b.jpg`;
		//클릭했을때 나오는 큰이미지 주소
		// 어떤것은 변수로 설정해서사용하고 어떤것은 그냥 바로 쓸때도??
		//길면 변수를 사용하는것
		//유지보수를 위해서 자주 바뀔 내용은 변수로 담는것
		htmls += `
			<li class="item">
				<div>
					<a href=${imgSrcBig}>
						<img class="thumb" src=${imgSrc}>
					</a>
					<p>${el.title}</p>
					
				</div>
			</li>
		`;
	});
	frame.innerHTML = htmls;
}
function delayLoading() {
	const imgs = frame.querySelectorAll('img');
	const len = imgs.length; //500
	let count = 0;
	for (let el of imgs) {
		// el.addEventListener("load",()=>{})
		el.onload = () => {
			count++;
			if (count == len) isotope();
			//이때비로소 isotope를 사용해서 레이아웃완성
		};
	}
}
function isotope() {
	loading.classList.add('off');
	//off클래스를 추가해서 보이지 않게함
	frame.classList.add('on');
	//on클래스를 추가해서 보이게함
	new Isotope('#list', {
		itemSelector: '.item',
		columnWidth: '.item',
		transitionDuration: '0.5s',
	});
}
