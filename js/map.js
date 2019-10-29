'use strict';

(function () {

  var mainContainer = window.modal.map;
  var setPoint = window.pin.setPoint;

  var pageFieldsets = document.querySelectorAll('fieldset');
  var addressInput = document.querySelector('#address');

  var onError = function (errorMessage) {
    var errorWindowTemplate = document.querySelector('#error').content
    .querySelector('.error');
    var errorWindow = errorWindowTemplate.cloneNode(true);
    var errorTextContainer = errorWindow.querySelector('.error__message');

    errorTextContainer.textContent = errorMessage;
    window.modal.map.appendChild(errorWindow);
  };

  var activatePage = function () {
    mainContainer.classList.remove('map--faded');
    window.form.adBlank.classList.remove('ad-form--disabled');
    window.backend.load(window.pin.getRenderedItems, onError);
    for (var c = 0; c < pageFieldsets.length; c++) {
      pageFieldsets[c].disabled = false;
    }
  };

  window.pin.mainItem.addEventListener('click', setPoint);

  for (var b = 0; b < pageFieldsets.length; b++) {
    pageFieldsets[b].disabled = true;
  }

  window.handler.drag(window.pin.mainItem, setPoint, addressInput);

  window.map = {
    activatePage: activatePage,
    pageFieldsets: pageFieldsets,
  };

})();
