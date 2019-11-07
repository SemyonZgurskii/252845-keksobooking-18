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
      if (featuresData.indexOf(selectedFeatures[i]) < 0) {
        return false;
      }
    }
    return true;
  };

  var checkPrice = function (priceData) {
    if (housingPrice.value === 'middle') {
      return priceData > Price.LOW && priceData < Price.HIGH;
    } else if (housingPrice.value === 'low') {
      return priceData <= Price.LOW;
    } else if (housingPrice.value === 'high') {
      return priceData >= Price.HIGH;
    }
    return true;
  };

  var getProcessedData = function (loadedData) {
    var selectedFeatures = checkboxesArr.filter(function (it) {
      return it.checked === true;
    })
      .map(function (it) {
        return it.value;
      });

    var processedData = loadedData.filter(function (it) {
      return checkType(it.offer.type)
        && checkRooms(it.offer.rooms)
        && checkGuests(it.offer.guests)
        && checkFeatures(it.offer.features, selectedFeatures)
        && checkPrice(it.offer.price);
    });

    return processedData.slice(0, PINS_QUANTITY);
  };

  var onValueChange = function (control) {
    control.addEventListener('change', function () {
      valueChange();
    });
  };

  var valueChange = window.debounce(function () {
    window.pin.removeActiveItems();
    window.pin.getRenderedItems(window.pin.originalData);
  });

  controlsList.forEach(function (it) {
    onValueChange(it);
  });

  checkboxes.forEach(function (it) {
    onValueChange(it);
  });

  window.filter = {
    getProcessedData: getProcessedData,
  };

})();
