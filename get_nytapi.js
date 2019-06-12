// API Documentation: https://developer.nytimes.com/indexV2.html

//
// Variables
//

// Note that it's not best practice to put API_KEYS on the client side.
// It needs to be stored on the client side.
var app = document.querySelector('#app');
var apiKey = "80m18vYle2vU77hSb3RDnKRfA3lM44PZ";
var sections = ['technology', 'science', 'magazine'];
var articleCount = 3;

//
// Methods
//

/**
 * Make a request to the NYT API
 * @param  {String} section The section to request articles from
 * @return {Promise}        The XHR request as a Promise
 */

// Returns a Promise (XHR request as a promise)
var makeRequest = function (section) {

	// Setup the request URL
	var url = 'https://api.nytimes.com/svc/topstories/v2/' + section + '.json?api-key=' + apiKey;

	// Create the XHR request
	var request = new XMLHttpRequest();

	// Return it as a Promise
	/* A promise is a returned object to which you attach callbacks, 
	instead of passing callbacks into a function. The benefit of this is that
	because of 'callback hell', code becomes unmanageable. So by adding 
	resolve and reject states, the problem gets cut very early on. */
	return new Promise(function (resolve, reject) {

		// Setup our HTTP requestj
		request.open('GET', url, true);

		// Setup our listener to process compeleted requests
		// whenever you see the word listener, it's a CALLBACK
		request.onreadystatechange = function () { // CALLBACK FUNCTION

			// Only run if the request is complete
			// The XMLHttpRequest.readyState property returns the state an XMLHttpRequest client is in
			// Wait until it's 4. Otherwise, keep running it (??? - it seems to loop)
			if (request.readyState !== 4) return;

			// Process the response
			if (request.status >= 200 && request.status < 300) {
				// If successful, return the XMLHttpRequest
				resolve(request);
			} else {
				// If failed
				reject({
					status: request.status,
					statusText: request.statusText
				});
			}

		};



		// Send the request
		request.send();

	});
};

/**
 * Render article list elements from the articles object
 * @param  {Object} articles The articles and article data
 * @return {String}          The article markup as a string
 */
var renderArticles = function (articles) {
	var content = ''
	articles.forEach(function (article) {
		content +=
			'<li>' +
				'<strong><a href="' + article.url + '">' + article.title + '</a></strong><br>' +
				'<span class="text-muted text-small">' + article.byline + '</span><br>' +
				'<span class="text-small">' + article.abstract + '</span>' +
			'</li>';
	});
	return content;
};

/**
 * Render a section of articles
 * @param  {Object} articles The article data for the section
 * @param  {String} title    The title of the section
 */
var renderSection = function (articles, title) {
	// create an element
	var section = document.createElement('div');
	// add an id to that element
	section.id = 'section-' + section;
	// inserr the html to the element
	section.innerHTML =
		'<h2 class="title-case">' + title + '</h2>' +
		'<ol>' +
			renderArticles(articles) +
		'</ol>';
	// add the newly created HTML inside
	app.append(section);
};

/**
 * Make an API request for each section
 */
var getArticles = function () {
	sections.forEach(function (section, index) {
		// Make the request
		makeRequest(section)
			// you can use then because the return value of makeRequest is a promise
			// the "data" here is the XMLHTTPRequest Object
			.then(function (ReturnedXHPObject) {
				// Get the responseText of the XHPobject and results gets the article names
				return JSON.parse(ReturnedXHPObject.responseText).results;
			})
			// from that returned JSON object of articles...
			.then(function (articles) {
				// Reduce the array to a set number of JSON article objects
				return articles.slice(0, articleCount);
			})
			// from that fitlered articles...
			.then(function (articles) {
				// Render the section
				renderSection(articles, section);
			});
	});
};


//
// Inits and Event Listeners
//

getArticles();