# Popcorn
Hot Buttered Entertainment News  
[Would you like some Popcorn?](https://theutahkate.github.io/popcorn/)

## Overview
Popcorn pulls entertainment news from multiple sources and lets the user choose which news to display.

### Sources
The news outlets Popcorn uses are:
* [Entertainment Weekly](http://ew.com) (EW)
* [TVLine](http://tvline.com) (TVL)
* [New York Times Movie Reviews](www.nytimes.com/reviews/movies) (NYT)

### APIs
For NYT, Popcorn hits the [NYT Movie Reviews API](https://developer.nytimes.com/movie_reviews_v2.json).  
For EW and TVL, Popcorn hits [News API](https://newsapi.org/), changing the `domains` parameter in the request to specify news source.

## How Popcorn?
### How To Use
The default news source is EW. Click any of the three buttons in the header to see articles from those sources.  
Clicking on an article title will activate a modal with article title, short description, and a link to the full article.  
Click the 'X' in the top right corner of the modal to close the modal.

### How It Works
Popcorn has a default active feed that calls the News API to get news from EW, and gives the EW button an `.active` class to visually suggest that page content comes from EW.

Each button has a click handler that calls two functions. The first removes the `active` class from other buttons, and adds it to the clicked button.
The second calls an API function (either `nytApi` or `newsApi`). Both of these:
1. build the request
2. pass response object to a data normalization function (again, based on source)
3. pass normalized data object to a single function that builds the HTML for each article listing, using aticle headline, byline, and image. 

The function that builds the article listing HTML also installs a click handler with a callback for injecting content into the modal HTML.

## Future Directions/Technical hurdles
* Finding APIs that did what I wanted and shared enough functionality across them to be useful took some time
* This app was intended as an SPA, but this raised a lot of questions about semantics and accessibility that I wasn't able to find answers to. (e.g. Is the `<nav>` tag and `<a>`s appropriate when there is no true navigation happening? What is the most semantic way to trigger a modal opening on the click of a title, where communicating the heading level and the clickability are both important?)
* Future: The buttons and associated content are essentially tabs and should get marked up that way in the future
* Future: Trap focus in modal
* Future: Add pagination or infinite scroll
* Future: Add an aggregated main feed from all three sources

