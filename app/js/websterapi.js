// Wait for the page to load before executing JavaScript function
document.addEventListener('DOMContentLoaded', function () {
    function WebsterAPI(){
      // Set variables to easily manipulate to change the word
      this.base = "http://www.dictionaryapi.com/api/v1/references/collegiate/xml/";
      this.word = "harm";
      // oh wells, personal project so ill just put my key out there :p
      this.key = "?key=2e472083-b6a7-4dce-9c89-7423d29b54f4";
      this.getUrl = function(){ return this.base+this.word+this.key; }
      this.updateWord = function(word){ this.word = word; }
      this.getWebsterWord = function(word){
        // if user passed a value for word, update word
        if(word){ this.updateWord(word); }
        // XMLHttpRequest object to hit the webster api
        var web = new XMLHttpRequest();
        // GET request, ENDPOINT to hit
        web.open('GET', this.getUrl());
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
        function parseResponse(response){
          // create a DOMParser object to parse the response
          var parser = new DOMParser();
          // returns a DOM object
          xmlDoc = parser.parseFromString(response,"application/xml");
          /**
           * Structure of a success return XML is
           *
           * entry
           *   -> ew
           *   -> def
           *     -> dt
           *
           * A lot has been removed from this example.
           * See the dictionaryapi documentation for complete structure
           */
          displayResponse(xmlDoc.getElementsByTagName("entry"));
        }
        function displayResponse(xmlEntryObj){
          // Ititarate each 'entry' from the DOM
          for(i = 0; i < xmlEntryObj.length; i++){
              ShowResults(xmlEntryObj[i]);
          }
          // Function that will do something with each entry object
          function ShowResults(value) {
            console.log(value.getElementsByTagName("fl")[0].textContent);
            console.log(value.getElementsByTagName("ew")[0].textContent);
            console.log(value.getElementsByTagName("def")[0].getElementsByTagName("dt")[0].textContent);
          }
        }
      }
    }

    function WebsterWOD(){
      this.url = "https://www.merriam-webster.com/word-of-the-day/distaff-2017-02-21"
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
        function parseResponse(response){
          // create a DOMParser object to parse the response
          var parser = new DOMParser();
          // returns a DOM object
          xmlDoc = parser.parseFromString(response,"text/html");
          console.log(xmlDoc.getElementsByClassName("word-and-pronunciation")[0].firstElementChild.innerHTML);
          console.log(xmlDoc.getElementsByClassName("word-attributes")[0].firstElementChild.innerHTML);
          // output definitions
          console.log()
          var l = xmlDoc.getElementsByClassName("wod-definition-container")[0].children.length;
          var childNodes = xmlDoc.getElementsByClassName("wod-definition-container")[0].children;
          var count = 0;
          console.log('HERE ARE DEFINITIONS');
          while(childNodes[count].textContent != 'Examples'){
            console.log(childNodes[count].textContent)
            count++;
          }
          console.log('HERE ARE EXAMPLES');
          while(count < l){
            console.log(childNodes[count].textContent)
            count++;
          }
        }
        function displayResponse(xmlEntryObj){
          // Ititarate each 'entry' from the DOM
          for(i = 0; i < xmlEntryObj.length; i++){
              ShowResults();
          }
          // Function that will do something with each entry object
          function ShowResults(value) {

          }
        }
      }
    }

    var webster = new WebsterWOD();
    webster.getURL();
});
