'use strict';

(function () {

  var pageMainContent = document.querySelector('main');
  var mainContainer = window.modal.map;

  var onError = function (errorMessage) {
    var errorWindowTemplate = document.querySelector('#error').content
    .querySelector('.error');
    var errorWindow = errorWindowTemplate.cloneNode(true);
    var errorTextContainer = errorWindow.querySelector('.error__message');
    var errorButton = errorWindow.querySelector('.error__button');

    var removeErrorWindow = function () {
      pageMainContent.removeChild(errorWindow);
    };

    errorTextContainer.textContent = errorMessage;

    pageMainContent.appendChild(errorWindow);

    errorButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      removeErrorWindow();
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        removeErrorWindow();
      }
    });

    document.addEventListener('click', function () {
      removeErrorWindow();
    });
  };

  var activatePage = function () {
    mainContainer.classList.remove('map--faded');
    window.form.adBlank.classList.remove('ad-form--disabled');
    window.backend.transferData('GET', window.backend.urlToDownload, window.pin.getRenderedItems, onError);
    window.form.toggleFieldsets(false);
  };

  window.map = {
    activatePage: activatePage,
    onError: onError,
  };

})();
