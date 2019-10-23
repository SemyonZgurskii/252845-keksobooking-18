'use strict';

(function () {

  var mainContainer = window.modal.map;
  var setPoint = window.map.setPoint;

  var pageFieldsets = document.querySelectorAll('fieldset');
  var mainPin = mainContainer.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');

  // var isMapActive = false;

  var activatePage = function () {
    mainContainer.classList.remove('map--faded');
    window.form.adBlank.classList.remove('ad-form--disabled');
    window.data.pinsContainer.appendChild(window.pin.getRenderedItems());
    mainContainer.appendChild(window.modal.renderCardPopup(window.data.getRandomIndex(window.data.adList)));
    for (var c = 0; c < pageFieldsets.length; c++) {
      pageFieldsets[c].removeAttribute('disabled');
    }
  };

  // var setPoint = function () {
  //   if (!isMapActive) {
  //     activatePage();
  //     isMapActive = true;
  //   }
  // };

  mainPin.addEventListener('click', setPoint);


  for (var b = 0; b < pageFieldsets.length; b++) {
    pageFieldsets[b].disabled = true;
  }

  window.holder.drag(mainPin, setPoint, addressInput);

  window.map = {
    activatePage: activatePage,
  };

})();
