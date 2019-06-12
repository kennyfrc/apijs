## API JS

A vanilla js project that demonstrates how to to consume the New York Times API.

## Logic

* Initialize by selecting the div id of the app, the API key, the sections you have available, and the number of articles you want
* Starts with getArticles();, which uses sections as arguments
* For each section, make a request
* The request does a GET request on a url
* Upon state change, run a callback where in if the status is 200, resolve a promise by returning a XMLHttpRequest
* Get the response text from that XMLHttpRequest and grab only the article JSON object
* Filter the articles
* Render the articles on the page by adding an element, id, and innerHTML

## Stuff Learned

* Think in terms of data structures and how data structures evolve through the call stack
* Promise functions return promised values
* You can use Promise.then to apply callback functions on that returned value