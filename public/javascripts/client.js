//var Orbit = function () {
//  this.response = '';
//};
//
//// Create the XHR object.
//function createCORSRequest(method, url) {
//  var xhr = new XMLHttpRequest();
//  if ("withCredentials" in xhr) {
//    // XHR for Chrome/Firefox/Opera/Safari.
//    xhr.open(method, url, true);
//  } else if (typeof XDomainRequest != "undefined") {
//    // XDomainRequest for IE.
//    xhr = new XDomainRequest();
//    xhr.open(method, url);
//  } else {
//    // CORS not supported.
//    xhr = null;
//  }
//  return xhr;
//}
//
//// Helper method to parse the title tag from the response.
//function getTitle(text) {
//  return text.match('<title>(.*)?</title>')[1];
//}
//
//// Make the actual CORS request.
//function makeCorsRequest() {
//  // All HTML5 Rocks properties support CORS.
//  var url = 'http://updates.html5rocks.com';
//
//  var xhr = createCORSRequest('GET', url);
//  if (!xhr) {
//    alert('CORS not supported');
//    return;
//  }
//
//  //
//
//Orbit.prototype.get = function (path, cb) {
//  request = new XMLHttpRequest();
//  request.open('GET', 'http://api.glassdoor.com/api/api.htm?t.p=40413&t.k=i3Jkf2NlUwQ&userip=0.0.0.0&useragent=&format=json&v=1&&action=employers');
//  request.setHeader('')
//  request.send();
//  request.responseType = 'json';
//  request.addEventListener('error', cb.bind(request));
//  request.addEventListener('load', cb.bind(request));
//  return request;
//};
//
//var orbit = new Orbit();
//
//document.getElementsByTagName('body')[0].addEventListener('click',function (target) {
//  orbit.get('', function() {
//    console.log(this.response)
//
//  })
//
//  //axios.get('http://cors.io/?u=http://api.glassdoor.com/api/api.htm?t.p=40413&t.k=i3Jkf2NlUwQ&userip=0.0.0.0&useragent=&format=json&v=1&&action=employers', {
//  //  params: {
//  //    'q' : document.getElementById('searchTerm').innerHTML,
//  //    'l' :'boulder'
//  //  }
//  //})
//  //  .then(function (response) {
//  //    console.log(response)})
//});
//
//
//
