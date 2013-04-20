
// init array
var content = [];

// grab selectors
var fields = $('#ui-dialog-title-6').parent().parent().find('input');
var textarea = $('#ui-dialog-title-6').parent().parent().find('textarea');

// add fields to the array
for (var i = fields.length - 1; i >= 0; i--) {
  content.push($(fields[i]).val());
};
// add the textarea
content.push($(textarea).val());

// quick debug
console.log(content);

// add a fake click function
window.fakeClick = function (event, anchorObj) {
  if (anchorObj.click) {
    anchorObj.click()
  } else if(document.createEvent) {
    if(event.target !== anchorObj) {
      var evt = document.createEvent("MouseEvents"); 
      evt.initMouseEvent("click", true, true, window, 
          0, 0, 0, 0, 0, false, false, false, false, 0, null); 
      var allowDefault = anchorObj.dispatchEvent(evt);
      // you can check allowDefault for false to see if
      // any handler called evt.preventDefault().
      // Firefox will *not* redirect to anchorObj.href
      // for you. However every other browser will.
    }
  }
}

// send data to extension
chrome.extension.sendMessage({fields: content}, function(response) {});

// get back a message containing the anchor url to download
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    
    // create an anchor
    var but = "<a class='downloader' style='font-size:0; text-decoration:none;' id='csv_download' download='installation_check.csv' href='" + request.uri + "'>Download CSV</a>";

    // check if exists and clean if so, append the anchor
    $('a.downloader').remove();
    $('#ui-dialog-title-6').append(but);

    // click on the anchor to start the download
    // we use fakeClick here because other methods (jQuery, vanilla) dont really work
    fakeClick(event, document.getElementById('csv_download'));
  });

console.log('init');