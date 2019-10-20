'use strict';

(function () {

  var mainContainer = window.modal.map;

  var pageFieldsets = document.querySelectorAll('fieldset');
  var mainPin = mainContainer.querySelector('.map__pin--main');
  var mainPinX = parseInt(mainPin.style.left, 10);
  var mainPinY = parseInt(mainPin.style.top, 10);
  var addressInput = document.querySelector('#address');
  var activeMainPinX = mainPinX + mainPin.offsetWidth / 2;
  var activeMainPinY = mainPinY + mainPin.offsetHeight;

  var isMapActive = false;

  var calculatePinLocation = function (x, y) {
    return Math.round(x) + ', ' + Math.round(y);
  };

  var activatePage = function () {
    mainContainer.classList.remove('map--faded');
    window.form.adBlank.classList.remove('ad-form--disabled');
    window.data.pinsContainer.appendChild(window.pin.getRenderedItems());
    mainContainer.appendChild(window.modal.renderCardPopup(window.data.getRandomIndex(window.data.adList)));
    for (var c = 0; c < pageFieldsets.length; c++) {
      pageFieldsets[c].removeAttribute('disabled');
    }
  };

  var onEscPress = function (evt) {
    if (evt.keyCode === 27 && window.modal.popup) {
      window.modal.deletePopup();
      document.removeEventListener('keydown', onEscPress);
    }
  };

  mainPin.addEventListener('click', function () {
    if (!isMapActive) {
      activatePage();
      addressInput.value = calculatePinLocation(activeMainPinX, activeMainPinY);
      isMapActive = true;
    }
  });

  document.addEventListener('keydown', function (evt) {
    onEscPress(evt);
  });

  for (var b = 0; b < pageFieldsets.length; b++) {
    pageFieldsets[b].disabled = true;
  }

  addressInput.value = calculatePinLocation(mainPinX, mainPinY); // в каком файле его место ?

})();
