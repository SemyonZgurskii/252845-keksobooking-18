'use strict';

(function () {

  var pageMainContent = document.querySelector('main');
  var mainContainer = window.modal.map;
  var setPoint = window.pin.setPoint;

  var addressInput = document.querySelector('#address');

  var onError = function (errorMessage) {
    var errorWindowTemplate = document.querySelector('#error').content
    .querySelector('.error');
    var errorWindow = errorWindowTemplate.cloneNode(true);
    var errorTextContainer = errorWindow.querySelector('.error__message');
    var errorButton = errorWindow.querySelector('.error__button');
    errorTextContainer.textContent = errorMessage;

    pageMainContent.appendChild(errorWindow);

    errorButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      errorWindow.parentNode.removeChild(errorWindow);
    });

    window.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        errorWindow.parentNode.removeChild(errorWindow);
      }
    });

    window.addEventListener('click', function () {
      errorWindow.parentNode.removeChild(errorWindow);
    });
  };

  var activatePage = function () {
    mainContainer.classList.remove('map--faded');
    window.form.adBlank.classList.remove('ad-form--disabled');
    window.backend.transferData('GET', window.backend.GET_URL, window.pin.getRenderedItems, onError);
    window.form.toggleFieldsetsAllow(false);
  };

  window.pin.mainItem.addEventListener('mousedown', setPoint);

  window.handler.drag(window.pin.mainItem, addressInput);

  window.map = {
    activatePage: activatePage,
    onError: onError,
  };

})();
