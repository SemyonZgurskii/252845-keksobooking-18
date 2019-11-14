'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var AVATAR_DEFAULT_PICTURE = 'img/muffin-grey.svg';
  var adBlank = document.querySelector('.ad-form');
  var pageFieldsets = document.querySelectorAll('fieldset');
  var pageCheckboxes = document.querySelectorAll('[type="checkbox"]');
  var addressInput = document.querySelector('#address');
  var titleField = adBlank.querySelector('#title');
  var typeField = adBlank.querySelector('#type');
  var priceField = adBlank.querySelector('#price');
  var timeInField = adBlank.querySelector('#timein');
  var timeOutField = adBlank.querySelector('#timeout');
  var roomsSelect = document.querySelector('#room_number');
  var guestsQuantitySelect = document.querySelector('#capacity');
  var submitButton = document.querySelector('.ad-form__submit');
  var resetButton = adBlank.querySelector('.ad-form__reset');
  var avatarLoader = adBlank.querySelector('#avatar');
  var avatarPreview = adBlank
    .querySelector('.ad-form-header__preview')
    .querySelector('img');
  var housePhotoLoader = adBlank.querySelector('#images');
  var housePhotoContainer = adBlank.querySelector('.ad-form__photo-container');
  var housePhotoPreview = housePhotoContainer.querySelector('.ad-form__photo');
  var housePhotoBlank = document.createDocumentFragment();

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
      if (evt.keyCode === window.modal.ESC_KEYCODE) {
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

  var setFilterDefaultValue = function () {
    window.filter.controlsList.forEach(function (control) {
      control.value = window.filter.DEFUALT_SELECT_VALUE;
    });
  };

  var uncheckCheckboxes = function () {
    pageCheckboxes.forEach(function (checkbox) {
      checkbox.checked = false;
    });
  };

  var clearPage = function () {
    resetAll();
    setFilterDefaultValue();
    uncheckCheckboxes();
    window.modal.deletePopup();
    window.mainPin.dropToDefaultSettings();
  };

  var onDataLoad = function () {
    clearPage();
    window.modal.map.classList.add('map--faded');
    window.form.adBlank.classList.add('ad-form--disabled');
    window.filter.toggleControls(true);
    toggleFieldsets(true);
    showSuccessMessage();
  };

  var onAdBlankSubmit = function (evt) {
    window.backend.transferData('POST', window.backend.SEND_URL, onDataLoad, window.map.onError, new FormData(adBlank));
    evt.preventDefault();
  };

  var setLoadedPicture = function (filechooser, containerCb) {
    var file = filechooser.files[0];

    if (file) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          containerCb(reader.result);
        });

        reader.readAsDataURL(file);
      }
    }
  };

  var setElementBackground = function (element, image) {
    element.style.backgroundImage = 'url(' + image + ')';
    element.style.backgroundSize = 'cover';
  };

  var addHousePhoto = function (photo) {
    var addedPhoto = housePhotoPreview.cloneNode(true);
    housePhotoBlank.appendChild(housePhotoPreview);
    setElementBackground(addedPhoto, photo);
    housePhotoContainer.appendChild(addedPhoto);
  };

  var removeHousePhotos = function () {
    var photosList = housePhotoContainer.querySelectorAll('.ad-form__photo');
    photosList.forEach(function (photoElement) {
      housePhotoContainer.removeChild(photoElement);
    });
    housePhotoContainer.appendChild(housePhotoBlank);
  };

  var addAvatarPhoto = function (photo) {
    avatarPreview.src = photo;
  };

  var removeAvatarPhoto = function () {
    avatarPreview.src = AVATAR_DEFAULT_PICTURE;
  };

  var resetAll = function () {
    adBlank.reset();
    removeAvatarPhoto();
    removeHousePhotos();
  };

  var toggleFieldsets = function (isDisabled) {
    pageFieldsets.forEach(function (fieldset) {
      fieldset.disabled = isDisabled;
    });
  };

  var setAddress = function (locationX, locationY) {
    addressInput.value = locationX + ', ' + locationY;
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

  submitButton.addEventListener('click', function () {
    validateGuests(roomsSelect, guestsQuantitySelect);
  });

  resetButton.addEventListener('click', clearPage);

  setMinPrice(typeField, priceField);

  adBlank.addEventListener('submit', onAdBlankSubmit);

  avatarLoader.addEventListener('change', function () {
    setLoadedPicture(avatarLoader, addAvatarPhoto);
  });

  housePhotoLoader.addEventListener('change', function () {
    setLoadedPicture(housePhotoLoader, addHousePhoto);
  });

  window.form = {
    adBlank: adBlank,
    pageFieldsets: pageFieldsets,
    toggleFieldsets: toggleFieldsets,
    setAddress: setAddress,
  };

})();
