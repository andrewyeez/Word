// Wait for the page to load before executing JavaScript function
document.addEventListener('DOMContentLoaded', function () {
  function wordApp () {
    url = "https://www.merriam-webster.com/word-of-the-day";
    this.httpGET = function () {
      var http = new XMLHttpRequest();
      http.open('GET', url);
      http.send();
      http.onreadystatechange = processRequest;
      function processRequest (e) {
        if (http.readyState == 4 && http.status == 200) {
          parseResponse(http.responseText);
        }
      }
      function parseResponse (response) {
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(response,"text/html");
        mainDisplay(xmlDoc);
      }
    }
    function mainDisplay (xmlDoc) {
      outputWord(xmlDoc);
      outputWordType(xmlDoc);
      outputDefinition(xmlDoc);
    }
    //
    // Display Word
    //
    function outputWord (xmlDoc) {
      var word = xmlDoc.getElementsByClassName("word-and-pronunciation")[0].firstElementChild.innerHTML;
      document.getElementsByClassName("word")[0].innerHTML = upperCaseFirstLetter(word);
    }
    function upperCaseFirstLetter (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    //
    // Display Word Type
    //
    function outputWordType (xmlDoc) {
      var type = xmlDoc.getElementsByClassName("word-attributes")[0].firstElementChild.innerHTML;
      document.getElementsByClassName("type")[0].innerHTML = "("+type+")";
    }
    //
    // Display Word Definition
    //
    function outputDefinition (xmlDoc) {
      var count = 1;
      var childNodes = xmlDoc.getElementsByClassName("wod-definition-container")[0].children;
      while(childNodes[count].textContent != 'Examples'){
        appendToDefinition(childNodes[count].textContent);
        count++;
      }
    }
    function appendToDefinition (string) {
      if(string[0] == ":" || string[0] == "1" ){
        var str = string.split(":");
        document.getElementsByClassName("definition-container")[0].appendChild(createPElement(str[1]));
      }
    }
    function createPElement (text) {
      var element = document.createElement("p");
      element.innerHTML = text;
      return element;
    }
  }

  var w = new wordApp();
  w.httpGET();
});
