'use strict';

(function () {

  var adBlank = document.querySelector('.ad-form');
  var pageFieldsets = document.querySelectorAll('fieldset');
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


  var showSuccessMessage = function () {
    var successWindowTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
    var successWindow = successWindowTemplate.cloneNode(true);
    window.modal.map.appendChild(successWindow);

    var onWindowEsc = function (evt) {
      if (evt.keyCode === 27) {
        successWindow.parentNode.removeChild(successWindow);
        document.removeEventListener('keydown', onWindowEsc);
      }
    };

    var onWindowClick = function () {
      successWindow.parentNode.removeChild(successWindow);
      document.removeEventListener('click', onWindowClick);
    };

    document.addEventListener('keydown', onWindowEsc);
    document.addEventListener('click', onWindowClick);
  };

  var onDataLoad = function () {
    adBlank.reset();
    window.modal.deletePopup();
    window.modal.map.classList.add('map--faded');
    window.form.adBlank.classList.add('ad-form--disabled');
    window.pin.dropToDefaultSettings();
    toggleFieldsets(false);
    showSuccessMessage();
  };

  var onAdBlankSubmit = function (evt) {
    window.backend.transferData('POST', window.backend.urlToSend, onDataLoad, window.map.onError, new FormData(adBlank));
    evt.preventDefault();
  };

  var toggleFieldsets = function (isDisabled) {
    for (var b = 0; b < pageFieldsets.length; b++) {
      pageFieldsets[b].disabled = isDisabled;
    }
  };

  toggleFieldsets(true);

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

  adBlank.addEventListener('submit', onAdBlankSubmit);

  window.form = {
    adBlank: adBlank,
    pageFieldsets: pageFieldsets,
    toggleFieldsets: toggleFieldsets,
  };

})();
