(function() {
	document.querySelector('.no-js').classList.remove('no-js');
})

function buildArticle(obj, num) {
	var main = document.querySelector("#main"),
			articleId = `article-${num}`;
			articleInnards =
				`<div class='img-container'><img src='${obj['multimedia']['src']}' alt=''></div>
				<div class='article__info'>
					<a href='' class='article__title'><h2>${obj['headline']}</h2></a>
					<h3>${obj['byline']}</h3>
				</div>`;
	var article = document.createElement('article');
	main.appendChild(article);
	article.className = "article__listing";
	article.innerHTML = articleInnards;
}

// NYT API
var url = "https://api.nytimes.com/svc/movies/v2/reviews/search.json";
url += '?' + $.param({
  'api-key': "6d2a32f885d74b27a33c0761d0f3b0f0"
});
$.ajax({
  url: url,
  method: 'GET',
}).done(function(result) {
	var nytResults = result.results;
	var count = 0;
  for (var i = 0; i < nytResults.length; i++) {
	  buildArticle(nytResults[i], count);
	  count++;
  }
}).fail(function(err) {
  throw err;
});
