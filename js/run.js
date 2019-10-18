'use strict';

(function () {

  var adForm = window.profile.adForm;
  var adList = window.data.adList;
  var renderCardPopup = window.modal.renderCardPopup;
  var map = window.modal.map;

  var fragment = document.createDocumentFragment();
  var mapFilters = map.querySelector('.map__filters-container');
  var pageFieldsets = document.querySelectorAll('fieldset');
  var mainPin = map.querySelector('.map__pin--main');
  var mainPinX = parseInt(mainPin.style.left, 10);
  var mainPinY = parseInt(mainPin.style.top, 10);
  var addressInput = document.querySelector('#address');
  var activeMainPinX = mainPinX + mainPin.offsetWidth / 2;
  var activeMainPinY = mainPinY + mainPin.offsetHeight;
  var pinTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');

  var isMapActive = false;

  var renderPin = function (cardData) {
    var pin = pinTemplate.cloneNode(true);

    pin.style = 'left: ' + (cardData.location.x - pin.offsetWidth / 2) + 'px; top: ' + (cardData.location.y - pin.offsetHeight) + 'px;';
    pin.querySelector('img').src = cardData.author.avatar;
    pin.querySelector('img').alt = cardData.offer.title;
    pin.classList.add('map__pin--user');

    return pin;
  };

  var calculatePinLocation = function (x, y) {
    return Math.round(x) + ', ' + Math.round(y);
  };

  var activatePage = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.data.pinsContainer.appendChild(fragment);
    mapFilters.insertAdjacentElement('beforebegin', renderCardPopup(window.data.getRandomIndex(adList)));
    for (var c = 0; c < pageFieldsets.length; c++) {
      pageFieldsets[c].removeAttribute('disabled');
    }
  };

  var addElementClickListener = function (element, elementData) {
    element.addEventListener('click', function () {
      if (map.querySelector('.popup')) {
        var activeCardPopup = map.querySelector('.popup');
        activeCardPopup.parentNode.removeChild(activeCardPopup);
      }
      mapFilters.insertAdjacentElement('beforebegin', renderCardPopup(elementData));
    });
  };

  var onEscPress = function (evt) {
    if (evt.keyCode === 27 && map.querySelector('.popup')) {
      var activePopup = map.querySelector('.popup');
      activePopup.parentNode.removeChild(activePopup);
      document.removeEventListener('keydown', onEscPress);
    }
  };

  document.addEventListener('keydown', function (evt) {
    onEscPress(evt);
  });

  mainPin.addEventListener('click', function () {
    if (!isMapActive) {
      activatePage();
      addressInput.value = calculatePinLocation(activeMainPinX, activeMainPinY);
      isMapActive = true;
    }
  });

  for (var j = 0; j < adList.length; j++) {
    var generatedPin = renderPin(adList[j]);
    addElementClickListener(generatedPin, adList[j]);
    fragment.appendChild(generatedPin);
  }

  for (var b = 0; b < pageFieldsets.length; b++) {
    pageFieldsets[b].disabled = true;
  }

  addressInput.value = calculatePinLocation(mainPinX, mainPinY); // в каком файле его место ?

})();
