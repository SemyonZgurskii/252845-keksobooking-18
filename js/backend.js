'use strict';

(function () {

  var urlToDownload = 'https://js.dump.academy/keksobooking/data';
  var urlToSend = 'https://js.dump.academy/keksobooking';

  var transferData = function (method, URL, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.open(method, URL);
    xhr.send(data);
  };

  window.backend = {
    transferData: transferData,
    urlToDownload: urlToDownload,
    urlToSend: urlToSend,
  };

})();
