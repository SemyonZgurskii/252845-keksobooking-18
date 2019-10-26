'use strict';

(function () {

  var URL = 'https://js.dump.academy/keksobooking/data';

  var load = function (onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });

    xhr.send();
  };

  window.backend = {
    load: load,
  };

})();
