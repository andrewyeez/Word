document.addEventListener('DOMContentLoaded', function () {

    var base = "http://www.dictionaryapi.com/api/v1/references/collegiate/xml/";
    var word = "harm";
    var key = "?key=2e472083-b6a7-4dce-9c89-7423d29b54f4";
    var web = new XMLHttpRequest();

    web.open('GET', base+word+key, true);
    web.send();
    web.onreadystatechange = processRequest;

    function processRequest(e){
      if (web.readyState == 4 && web.status == 200) {
        var response = web.responseText;
        var parser = new DOMParser();
        xmlDoc = parser.parseFromString(response,"application/xml");
        xmlEntryObj = xmlDoc.getElementsByTagName("entry")
        for(i = 0; i < xmlEntryObj.length; i++){
            ShowResults(xmlEntryObj[i]);
        }
        function ShowResults(value) {
          console.log(value.getElementsByTagName("fl")[0].textContent);
          console.log(value.getElementsByTagName("ew")[0].textContent);
          console.log(value.getElementsByTagName("def")[0].getElementsByTagName("dt")[0].textContent);

        }
      }
    }
});
