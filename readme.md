## Synopsis

Word is a desktop app that will output the Word of the Day based on webpage on https://www.merriam-webster.com/word-of-the-day/ There is also code here that will use the dictionary API to find the definition of a user input word but I didn't implement it on the front end. Maybe another day... Need to clean up the code, find ways to keep it DRY and easily tested, smaller functions.

## Screen Shot
![alt text](http://i.imgur.com/LNMhsAA.png "Word app on my desktop")

## Code Example

```javascript
this.url = "https://www.merriam-webster.com/word-of-the-day"
this.getURL = function(){
  var web = new XMLHttpRequest();
  // GET request, ENDPOINT to hit
  web.open('GET', this.url);
  // Sending the GET request to ENDPOINT
  web.send();
  // Prepare a function to handle the response
  web.onreadystatechange = processRequest;
  // Function to handle the response from the ENDPOINT
  function processRequest(e){
    // A 4 readyState means it is DONE and
    // a 200 status means it finished loading the page succesfully
    if (web.readyState == 4 && web.status == 200) {
      // parse the response to output easily on the frontend
      parseResponse(web.responseText);
    }
  }
```

## Motivation

To practice my knowledge in JavaScript and to get familiar with all the technologies that applies the power of JavaScript.

## Installation

soon...

## API Reference
![alt text](http://i.imgur.com/b83sEy5.png "API reference")

## Tests

soon...

## Contributors

soon...

## License

MIT
