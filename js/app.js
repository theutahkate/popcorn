(function() {
	document.querySelector('.no-js').classList.remove('no-js');
})

function buildArticle(dataObj, num) {
	console.log(dataObj)
		var	articleId = `article-${num}`;
			articleInnards =
				`<div class='img-container'><img src='${dataObj.imgUrl}' alt=''></div>
				<div class='article__info'>
					<a href='' class='article__title'><h2>${dataObj.headline}</h2></a>
					<h3>${dataObj.author}</h3>
				</div>`;
	var article = document.createElement('article');
	main.appendChild(article);
	article.className = "article__listing";
	article.setAttribute("id", articleId);
	article.innerHTML = articleInnards;
}

var main = document.querySelector("#main");
document.querySelector("#nyt").addEventListener("click", nytApi);
document.querySelector("#ew").addEventListener("click", ewApi);
document.querySelector("#indiewire").addEventListener("click", indieWireApi);

// NYT API
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

function normalizeNytData(obj) {
	var nytNormalData = [];
	for (var i = 0; i < obj.length; i++) {
		var nytDataObj = {};
		nytDataObj.author = obj[i].byline;
		nytDataObj.headline = obj[i].headline;
		nytDataObj.imgUrl = obj[i].multimedia.src;
		nytDataObj.description = obj[i].summary_short;
		nytDataObj.url= obj[i].link.url;
		nytNormalData.push(nytDataObj);
	}
	return nytNormalData;
}

function normalizeEwData(obj) {
	var ewNormalData = [];
	for (var i = 0; i < obj.length; i++) {
		var ewDataObj = {};
		ewDataObj.author = obj[i].author;
		ewDataObj.description = obj[i].description;
		ewDataObj.headline = obj[i].title;
		ewDataObj.url= obj[i].url;
		ewDataObj.imgUrl = obj[i].urlToImage;
		ewNormalData.push(ewDataObj);
	}
	return ewNormalData;
}

function normalizeIndieWireData(obj) {
	var indieWireNormalData = [];
	for (var i = 0; i < obj.length; i++) {
		var indieWireDataObj = {};
		indieWireDataObj.author = obj[i].author;
		indieWireDataObj.description = obj[i].description;
		indieWireDataObj.headline = obj[i].title;
		indieWireDataObj.url= obj[i].url;
		indieWireDataObj.imgUrl = obj[i].urlToImage;
		indieWireNormalData.push(indieWireDataObj);
	}
	return indieWireNormalData;
}

function ewApi() {
	const baseUrl = 'https://newsapi.org/v2/everything?domains=',
			domain = 'ew.com',
			key = '&apiKey=66127631ccb94c1bb2e2a789f1d5392b';
	var	url = baseUrl + domain + key,
			req = new Request(url);
	fetch(req)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			var count = 0,
					ewArray = normalizeEwData(data.articles);
			main.innerHTML = "";
		  for (var i = 0; i < ewArray.length; i++) {
			  buildArticle(ewArray[i], count);
			  count++;
		  }
		});
}

function indieWireApi() {
	const baseUrl = 'https://newsapi.org/v2/everything?domains=',
			domain = 'indiewire.com',
			key = '&apiKey=66127631ccb94c1bb2e2a789f1d5392b';
	var	url = baseUrl + domain + key,
			req = new Request(url);
	fetch(req)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			var count = 0,
					indieWireArray = normalizeIndieWireData(data.articles);
			main.innerHTML = "";
		  for (var i = 0; i < indieWireArray.length; i++) {
			  buildArticle(indieWireArray[i], count);
			  count++;
		  }
		});
}