## Synopsis

Word is a desktop app that will use the Webster API to present its word of the day on the users desktop.

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
      // return the response from the request
      // we made to the ENDPOINT
      parseResponse(web.responseText);
    }
  }
```

## Motivation

To practice my knowledge in JavaScript and to get familiar with all the technologies that applies the power of JavaScript.

## Installation

soon...

## API Reference

Webster API (examples soon...)

## Tests

soon...

## Contributors

soon...

## License

MIT
