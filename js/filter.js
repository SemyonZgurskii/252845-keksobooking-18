'use strict';

(function () {

  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;
  var PINS_QUANTITY = 5;
  var DEFUALT_SELECT_VALUE = 'any';
  var container = document.querySelector('.map__filters');
  var controlsList = container.querySelectorAll('.map__filter');
  var housingType = container.querySelector('#housing-type');
  var housingRooms = container.querySelector('#housing-rooms');
  var housingGuests = container.querySelector('#housing-guests');
  var housingPrice = container.querySelector('#housing-price');
  var checkboxesContainer = document.querySelector('#housing-features');
  var checkboxes = checkboxesContainer.querySelectorAll('.map__checkbox');
  var checkboxesArr = Array.from(checkboxes);

  var toggleControls = function (isDisabled) {
    controlsList.forEach(function (control) {
      control.disabled = isDisabled;
    });
  };

  toggleControls(true);

  var checkType = function (typeData) {
    return typeData === housingType.value || housingType.value === DEFUALT_SELECT_VALUE;
  };

  var checkRooms = function (roomsData) {
    return roomsData === Number(housingRooms.value) || housingRooms.value === DEFUALT_SELECT_VALUE;
  };

  var checkGuests = function (guestsData) {
    return guestsData === Number(housingGuests.value) || housingGuests.value === DEFUALT_SELECT_VALUE;
  };

  var checkFeatures = function (featuresData, selectedFeatures) {
    return selectedFeatures.every(function (feature) {
      return featuresData.indexOf(feature.value) > -1;
    });
  };

  var checkPrice = function (priceData) {
    switch (housingPrice.value) {
      case ('middle'):
        return priceData > LOW_PRICE && priceData < HIGH_PRICE;
      case ('low'):
        return priceData <= LOW_PRICE;
      case ('high'):
        return priceData >= HIGH_PRICE;
      default:
        return true;
    }
  };

  var getSelectedFeatures = function (inputCollection) {
    var selectedFeatures = inputCollection.filter(function (it) {
      return it.checked === true;
    });
    return selectedFeatures;
  };

  var getProcessedData = function (loadedData) {
    var processedData = loadedData.filter(function (it) {
      return checkType(it.offer.type)
        && checkRooms(it.offer.rooms)
        && checkGuests(it.offer.guests)
        && checkFeatures(it.offer.features, getSelectedFeatures(checkboxesArr))
        && checkPrice(it.offer.price);
    });

    return processedData.slice(0, PINS_QUANTITY);
  };

  var addChangeListener = function (control) {
    control.addEventListener('change', function () {
      valueChange();
    });
  };

  var valueChange = window.debounce(function () {
    window.modal.deletePopup();
    window.pin.removeActiveItems();
    window.pin.getRenderedItems(window.pin.originalData);
  });

  controlsList.forEach(function (it) {
    addChangeListener(it);
  });

  checkboxes.forEach(function (it) {
    addChangeListener(it);
  });

  window.filter = {
    getProcessedData: getProcessedData,
    toggleControls: toggleControls,
    controlsList: controlsList,
    DEFUALT_SELECT_VALUE: DEFUALT_SELECT_VALUE,
  };

})();
