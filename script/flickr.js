//key 58f441c44552cf38fca9e142fb8fb2aa

//https://www.flickr.com/services/rest/?method=flickr.test.echo&name=value

// flickr.interestingness.getList

const body = document.querySelector('body');
const frame = document.querySelector('#list');
const input = document.querySelector('#search');
const btnSearch = document.querySelector('.btnSearch');
const base = 'https://www.flickr.com/services/rest/?';
const method1 = 'flickr.interestingness.getList';
const key = '58f441c44552cf38fca9e142fb8fb2aa';
const per_page = 500;

const url = `${base}method=${method1}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1`;

callData(url);
function callData(url) {
	fetch(url)
		.then(() => {
			return el.json();
		})
		.then((json) => {
			let items = json.photos.photo;
			creatList(items);
		});
}

function creatList(items) {
	items.map(() => {});
}
