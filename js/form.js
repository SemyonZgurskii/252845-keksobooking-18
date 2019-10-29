'use strict';

(function () {

  var adBlank = document.querySelector('.ad-form');
  var titleField = adBlank.querySelector('#title');
  var typeField = adBlank.querySelector('#type');
  var priceField = adBlank.querySelector('#price');
  var timeInField = adBlank.querySelector('#timein');
  var timeOutField = adBlank.querySelector('#timeout');
  var roomsSelect = document.querySelector('#room_number');
  var guestsQuantitySelect = document.querySelector('#capacity');
  var submit = document.querySelector('.ad-form__submit');

  var validateGuests = function (rooms, guests) {
    var roomsNumber = rooms.value;
    var exception = '100';
    var guestsIndex = guests.options.selectedIndex;
    var guestsNumber = guests.options[guestsIndex].value;

    guests.setCustomValidity('');
    if (roomsNumber !== exception && guestsNumber === '0') {
      guests.setCustomValidity('Количество гостей долно быть больше нуля');
    } else if (roomsNumber === exception && guestsNumber !== '0') {
      guests.setCustomValidity('Количество гостей не может быть больше 0');
    } else if (guestsNumber > roomsNumber) {
      guests.setCustomValidity('Количество гостей не может превышать количество комнат');
    }
  };

  var validateTitle = function () {
    titleField.setCustomValidity('');
    if (titleField.validity.valueMissing) {
      titleField.setCustomValidity('Обязательное поле');
    } else if (titleField.validity.tooShort) {
      titleField.setCustomValidity('Длина заголовка должна быть не менее ' + titleField.minLength + ' символов');
    }
  };

  var validatePrice = function () {
    priceField.setCustomValidity('');
    if (priceField.validity.valueMissing) {
      priceField.setCustomValidity('Обязатльное поле');
    } else if (priceField.validity.rangeUnderflow) {
      priceField.setCustomValidity('Минимально допустимое значение: ' + priceField.min);
    }
  };

  var setMinPrice = function (houseTypeInput, priceInput) {
    var type = houseTypeInput.value;
    switch (type) {
      case 'bungalo':
        priceInput.min = '0';
        priceInput.placeholder = '0';
        break;
      case 'flat':
        priceInput.min = '1000';
        priceInput.placeholder = '1000';
        break;
      case 'house':
        priceInput.min = '5000';
        priceInput.placeholder = '5000';
        break;
      case 'palace':
        priceInput.min = '10000';
        priceInput.placeholder = '10000';
        break;
    }
  };

  var syncronizeTime = function (masterField, syncronizedField) {
    syncronizedField.value = masterField.value;
  };

  var onLoad = function () {
    adBlank.reset();
    var activePins = window.pin.container.querySelectorAll('.map__pin--user');
    for (var i = 0; i < activePins.length; i++) {
      activePins[i].parentNode.removeChild(activePins[i]);
    }
    window.modal.deletePopup();
    window.pin.mainItem.style.left = window.pin.basicX + 'px';
    window.pin.mainItem.style.top = window.pin.basicY + 'px';
    window.modal.map.classList.add('map--faded');
    window.form.adBlank.classList.add('ad-form--disabled');
    for (var c = 0; c < window.map.pageFieldsets.length; c++) {
      window.map.pageFieldsets[c].disabled = true;
    }
    window.pin.isMapActive = false;
    window.pin.mainItem.removeEventListener('click', window.pin.setPoint);
    window.pin.mainItem.addEventListener('click', window.pin.setPoint);
  };

  typeField.addEventListener('change', function () {
    setMinPrice(typeField, priceField);
  });

  timeInField.addEventListener('change', function () {
    syncronizeTime(timeInField, timeOutField);
  });

  timeOutField.addEventListener('change', function () {
    syncronizeTime(timeOutField, timeInField);
  });

  titleField.addEventListener('invalid', function () {
    validateTitle();
  });
  titleField.addEventListener('input', function () {
    validateTitle();
  });

  priceField.addEventListener('invalid', function () {
    validatePrice();
  });
  priceField.addEventListener('input', function () {
    validatePrice();
  });

  submit.addEventListener('click', function () {
    validateGuests(roomsSelect, guestsQuantitySelect);
  });

  setMinPrice(typeField, priceField);

  adBlank.addEventListener('submit', function (evt) {
    // console.log('aoeusnthaoeu');
    window.backend.upLoad(new FormData(adBlank), function () {
      // console.log('yoooo');
      onLoad();
    });
    evt.preventDefault();
  });

  window.form = {
    adBlank: adBlank,
  };

})();
