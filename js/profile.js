'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
  var titleField = adForm.querySelector('#title');
  var typeField = adForm.querySelector('#type');
  var priceField = adForm.querySelector('#price');
  var timeInField = adForm.querySelector('#timein');
  var timeOutField = adForm.querySelector('#timeout');
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

  window.profile = {
    adForm: adForm
  };

})();
