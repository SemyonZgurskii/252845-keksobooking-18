'use strict';

(function () {

  var GET_URL = 'https://js.dump.academy/keksobooking/data';
  var SEND_URL = 'https://js.dump.academy/keksobooking';
  var SUCCESS_CODE = 200;

  var transferData = function (method, url, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.open(method, url);
    xhr.send(data);
  };

  window.backend = {
    transferData: transferData,
    GET_URL: GET_URL,
    SEND_URL: SEND_URL,
  };

})();
