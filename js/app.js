(function() {
	document.querySelector('.no-js').classList.remove('no-js');
})

const main = document.querySelector("#main"),
			titleLinks = document.querySelectorAll(".article__title-link"),
			modal = document.querySelector("#modal");

document.querySelector("#nytimes").addEventListener("click", nytApi);
document.querySelector("#ew").addEventListener("click", newsApi);
document.querySelector("#tvline").addEventListener("click", newsApi);
document.querySelector("#closeModal").addEventListener("click", function() {
	modal.classList.add("hidden");
})

function buildArticle(dataObj, num) {
	var	article = document.createElement('article'),
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
	var url = "https://api.nytimes.com/svc/movies/v2/reviews/search.json";
	url += '?' + $.param({
	  'api-key': "6d2a32f885d74b27a33c0761d0f3b0f0"
	});
	$.ajax({
	  url: url,
	  method: 'GET',
	}).done(function(result) {
		var nytResults = result.results,
				count = 0,
				nytArray = normalizeNytData(nytResults);
		main.innerHTML = "";
	  for (var i = 0; i < nytArray.length; i++) {
		  buildArticle(nytArray[i], count);
		  count++;
	  }
	}).fail(function(err) {
	  throw err;
	});
}

function newsApi() {
	const baseUrl = 'https://newsapi.org/v2/everything?domains=',
			key = '&apiKey=66127631ccb94c1bb2e2a789f1d5392b';
	var	src = `${this.id}.com`
			url = baseUrl + src + key,
			req = new Request(url);
	fetch(req)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			var count = 0,
					parsedData = normalizeNewsApiData(data.articles);
			main.innerHTML = "";
		  for (var i = 0; i < parsedData.length; i++) {
			  buildArticle(parsedData[i], count);
			  count++;
		  }
		});
}

function normalizeNytData(obj) {
	var normalData = [];
	for (var i = 0; i < obj.length; i++) {
		var articleObj = {};
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
	var normalData = [];
	for (var i = 0; i < obj.length; i++) {
		var articleObj = {};
		articleObj.author = obj[i].author;
		articleObj.description = obj[i].description;
		articleObj.headline = obj[i].title;
		articleObj.url= obj[i].url;
		articleObj.imgUrl = obj[i].urlToImage;
		normalData.push(articleObj);
	}
	return normalData
}
