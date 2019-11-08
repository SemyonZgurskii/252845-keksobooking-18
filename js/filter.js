'use strict';

(function () {

  var Price = {
    LOW: 10000,
    HIGH: 50000,
  };
  var PINS_QUANTITY = 5;
  var container = document.querySelector('.map__filters');
  var controlsList = container.querySelectorAll('.map__filter');
  var housingType = container.querySelector('#housing-type');
  var housingRooms = container.querySelector('#housing-rooms');
  var housingGuests = container.querySelector('#housing-guests');
  var housingPrice = container.querySelector('#housing-price');
  var checkboxesContainer = document.querySelector('#housing-features');
  var checkboxes = checkboxesContainer.querySelectorAll('.map__checkbox');
  var checkboxesArr = Array.from(checkboxes);

  var checkType = function (typeData) {
    return typeData === housingType.value || housingType.value === 'any';
  };

  var checkRooms = function (roomsData) {
    return roomsData === Number(housingRooms.value) || housingRooms.value === 'any';
  };

  var checkGuests = function (guestsData) {
    return guestsData === Number(housingGuests.value) || housingGuests.value === 'any';
  };

  var checkFeatures = function (featuresData, selectedFeatures) {
    for (var i = 0; i < selectedFeatures.length; i++) {
      if (featuresData.indexOf(selectedFeatures[i].value) < 0) {
        return false;
      }
    }
    return true;
  };

  var checkPrice = function (priceData) {
    switch (housingPrice.value) {
      case ('middle'):
        return priceData > Price.LOW && priceData < Price.HIGH;
      case ('low'):
        return priceData <= Price.LOW;
      case ('high'):
        return priceData >= Price.HIGH;
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
  };

})();
