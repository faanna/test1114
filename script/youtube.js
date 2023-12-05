let key = 'AIzaSyDzGkbbBXdo00gbXsalYQ2I70ZIZJJp3_4';
let playlistId = 'PLmx-RkRTWJ6u6YKitI52s_VPcVqBIelIT';
let vidList = document.querySelector('.vidList');

const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}`;
let body = document.querySelector('body');

fetch(url)
	.then((data) => {
		return data.json();
	})
	.then((json) => {
		let items = json.items;
		let result = '';

		items.map((el) => {
			let title = el.snippet.title;
			if (title.length > 20) {
				title = title.substr(0, 20) + '...';
			}
			let des = el.snippet.description;
			if (des.length > 100) {
				des = des.substr(0, 100) + '...';
			}
			let date = el.snippet.publishedAt;
			date = date.split('T')[0];

			result += `
            <article>
                <a href="${el.snippet.resourceId.videoId}" class="pic"
                    ><img src="${el.snippet.thumbnails.medium.url}" alt="${el.snippet.title}"
                /></a>
                <div class="con">
                    <h2>${title}</h2>
                    <p>${des}</p>
                    <span>${date}</span>
                </div>
            </article>
            `;
		});
		vidList.innerHTML = result;
	});

vidList.addEventListener('click', (e) => {
	e.preventDefault();

	if (!e.target.closest('a')) return;

	const vidId = e.target
		.closest('article')
		.querySelector('a')
		.getAttribute('href');

	let pop = document.createElement('aside');
	pop.classList.add('pop');
	pop.innerHTML = `
    <iframe src="https://www.youtube.com/embed/${vidId}" frameborder="0"></iframe>
	<span class="btnClose">close</span>`;

	vidList.append(pop);
	body.style.overflow = 'hidden';
});

vidList.addEventListener('click', (e) => {
	const pop = vidList.querySelector('.pop');

	if (pop) {
		const close = pop.querySelector('span');
		if (e.target == close) {
			pop.remove();
			body.style.overflow = 'auto';
		}
	}
});
