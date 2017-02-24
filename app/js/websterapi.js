// Wait for the page to load before executing JavaScript function
document.addEventListener('DOMContentLoaded', function () {
  // websterWOD is an object that will get the data from webster WOD page
  var websterWOD = {
    wodURI: "https://www.merriam-webster.com/word-of-the-day",
    // http is an instance of XMLHttpRequest object
    // we are going to use http inside two functions in
    // consecutive order. httpGET() -> processRequest()
    http: new XMLHttpRequest(),
    // set up, get request
    httpGET: function () {
      this.http.open('GET', this.wodURI);
      this.http.onreadystatechange = this.processRequest;
      this.http.send();
    },
    // process the request made by httpGET()
    processRequest: function (e) {
      // success at loading the page from a GET request
      if (this.http.readyState == 4 && this.http.status == 200) {
        var parser = new DOMParser();
        xmlDoc = parser.parseFromString(this.http.responseText,"text/html");
        return xmlDoc;
      }
      // failed
      return false;
    }
  };
  // helpers is an object that will have functions to do outputs and string modifiers
  var helpers = {
    // turns the string into an array and output the definitions for the WOD
    // the element with a class name of "definition-container" will hold the
    // definitions
    appendToDef: function (string) {
      if (string[0] == ":" || string[0] == "1" ) {
        var str = string.split(":");
        var element = this.elementP(str[1]);
        document.getElementsByClassName("definition-container")[0].appendChild(element);
      }
    },
    // returns a paragraph element containing the string parameter
    elementP: function (string) {
      return document.createElement("p").innerHTML = string
    },
    // capitalize the first letter of the string parameter
    toUpperFirstLeter: function (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    mainDisplay: function (xmlDoc) {
      var count = 1;
      var l = xmlDoc.getElementsByClassName("wod-definition-container")[0].children.length;
      var word = xmlDoc.getElementsByClassName("word-and-pronunciation")[0].firstElementChild.innerHTML;
      var type = xmlDoc.getElementsByClassName("word-attributes")[0].firstElementChild.innerHTML;
      var childNodes = xmlDoc.getElementsByClassName("wod-definition-container")[0].children;
      document.getElementsByClassName("word")[0].innerHTML = this.toUpperFirstLeter(word);
      document.getElementsByClassName("type")[0].innerHTML = "("+type+")";
      while(childNodes[count].textContent != 'Examples'){
        this.appendToDef(childNodes[count].textContent);
        count++;
      }
    }
  };

  var wod = new websterWOD();
  var helper = new helpers();
  var xmlDoc = wod.httpGET();
  if (xmlDoc) helper.mainDisplay(xmlDoc);
});
