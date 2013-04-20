
// sending stuff...
chrome.tabs.executeScript(null, { file: "jquery.min.js" }, function() {
  chrome.tabs.executeScript(null, { file: "contentscript.js" });
});



builder = function(data) {
  var map = "<iframe width='425' height='350' frameborder='0' scrolling='no' marginheight='0' marginwidth='0' src='https://maps.google.com/maps?q= " + data[6] + " +netherlands&output=embed'></iframe>";
  var but1 = "<a draggable='true' target='_blank' class='downloader' download='cvsrow.cvs' href='" + _urlBuilder("MRO", data) + "'>Download CSV (MRO)</a>"
  var but2 = "<a draggable='true' target='_blank' class='downloader' download='cvsrow.cvs' href='" + _urlBuilder("NEXTMOBILIS", data) + "'>Download CSV (Next/Mobilis)</a>"
  $('#wrap').append( map + but1 + but2);
}

$('body').on('click', '.downloader', function(e) {
  e.preventDefault()
  var href = $(e.currentTarget).attr('href');
    chrome.tabs.getSelected(function(tab) {
      chrome.tabs.sendMessage(tab.id, {uri: href});
      // chrome.tabs.update(tab.id, {url: href});
    });


  return false;
})
// <a download="MyFile.txt" href="blob:http%3A//html5-demos.appspot.com/882ba40f-7415-4461-a7d4-1e0a1bc5df33" data-downloadurl="text/plain:MyFile.txt:blob:http%3A//html5-demos.appspot.com/882ba40f-7415-4461-a7d4-1e0a1bc5df33" draggable="true" class="dragout" data-disabled="true">Downloaded</a>

// 


_urlBuilder = function(service, f) {

  var gap = function(amount) {
    val = ",";
    for (var i = amount -1; i > 0; i--) { val += val;};
    return "," + val;
  };

  var base64     = "data:text/csv;charset=utf-8,"
      ,c         = ","
      ,email     = f[0]
      ,tel       = f[1]
      ,name      = f[2]
      ,company   = f[3]
      ,car       = f[4]
      ,country   = f[5]
      ,city      = f[6]
      ,postal    = f[7]
      ,address   = f[8]
      ,contractP = f[9]
      ,quantity  = f[10]
      ,notes     = f[13];

  if (service === "MRO") {
    return base64 + encodeURIComponent(
           company + c + car + gap(2) + name + c + "1" + gap(21) + address + c + postal + c + city + c + tel + c + email + gap(1) + notes + c + " " );
  }
  else if (service === "NEXTMOBILIS") {
    return base64 + encodeURIComponent(
           company + c + car + gap(2) + name + c + "1" + gap(20) + address + c + postal + c + city + c + tel + c + email + gap(2) + notes + c + " " );
  }
}


//receiving stuff...
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    
    console.log(request.fields);
    builder(request.fields);
  });
















