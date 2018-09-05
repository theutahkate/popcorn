const main = document.querySelector("#main"),
			titleLinks = document.querySelectorAll(".article__title-link"),
			modal = document.querySelector("#modal"),
			srcBtns = document.querySelectorAll(".source__btn");

document.querySelector("#tvline").addEventListener("click", function() {
	setActiveBtn(this);
	newsApi(this);
});
document.querySelector("#ew").addEventListener("click", function() {
	setActiveBtn(this);
	newsApi(this);
});
document.querySelector("#nytimes").addEventListener("click", function() {
	setActiveBtn(this);
	nytApi();
});
document.querySelector("#closeModal").addEventListener("click", function() {
	modal.classList.add("hidden");
})

function setActiveBtn(ele) {
	for (let i = 0; i < srcBtns.length; i++) {
		srcBtns[i].classList.remove("active");
	}
	ele.classList.add("active");
}

function buildArticle(dataObj, num) {
	let	article = document.createElement('article'),
			articleInnards =
				`<div class='img-container'>
						<img src='${dataObj.imgUrl}' alt=''>
					</div>
					<div class='article__info'>
						<h2 class='article__title'>
							<button id='article-${num}' class='article__modal-btn'>${dataObj.headline}
							</button>
						</h2>
						<h3>${dataObj.author}</h3>
					</div>`;
	main.appendChild(article);
	article.className = "article__listing";
	article.innerHTML = articleInnards;
	document.querySelector(`#article-${num}`).addEventListener("click", function() {
		modal.classList.remove("hidden");
		document.querySelector(".modal__title").innerHTML = `${dataObj.headline}`;
		document.querySelector(".modal__desc").innerHTML = `${dataObj.description}`;
		document.querySelector(".modal__link").setAttribute("href", `${dataObj.url}`);
	})
}

function nytApi() {
	let url = "https://api.nytimes.com/svc/movies/v2/reviews/search.json";
	url += '?' + $.param({
	  'api-key': "6d2a32f885d74b27a33c0761d0f3b0f0"
	});
	$.ajax({
	  url: url,
	  method: 'GET',
	}).done(function(result) {
		let nytResults = result.results,
				count = 0,
				nytArray = normalizeNytData(nytResults);
		main.innerHTML = "";
	  for (let i = 0; i < nytArray.length; i++) {
		  buildArticle(nytArray[i], count);
		  count++;
	  }
	}).fail(function(err) {
	  throw err;
	});
}

function newsApi(ele) {
	const baseUrl = 'https://newsapi.org/v2/everything?domains=',
			key = '&apiKey=66127631ccb94c1bb2e2a789f1d5392b';
	let	src = ele === window ? "ew.com" : `${ele.id}.com`,
			url = baseUrl + src + key,
			req = new Request(url);

	fetch(req)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			let count = 0,
					parsedData = normalizeNewsApiData(data.articles);
			main.innerHTML = "";
		  for (let i = 0; i < parsedData.length; i++) {
			  buildArticle(parsedData[i], count);
			  count++;
		  }
		});
}

function normalizeNytData(obj) {
	let normalData = [];
	for (let i = 0; i < obj.length; i++) {
		let articleObj = {};
		articleObj.author = obj[i].byline;
		articleObj.headline = obj[i].headline;
		articleObj.imgUrl = obj[i].multimedia.src;
		articleObj.description = obj[i].summary_short;
		articleObj.url= obj[i].link.url;
		normalData.push(articleObj);
	}
	return normalData;
}

function normalizeNewsApiData(obj) {
	let normalData = [];
	for (let i = 0; i < obj.length; i++) {
		let articleObj = {};
		articleObj.author = obj[i].author;
		articleObj.description = obj[i].description;
		articleObj.headline = obj[i].title;
		articleObj.url= obj[i].url;
		articleObj.imgUrl = obj[i].urlToImage;
		normalData.push(articleObj);
	}
	return normalData
}

(function() {
	document.querySelector('.no-js').classList.remove('no-js');
	setActiveBtn(document.querySelector("#ew"));
	newsApi(this);
})();