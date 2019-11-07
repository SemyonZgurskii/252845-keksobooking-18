'use strict';

(function () {

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

  var compareFeatures = function (dataFeatures, selectedFeatures) {
    for (var i = 0; i < selectedFeatures.length; i++) {
      if (dataFeatures.indexOf(selectedFeatures[i]) < 0) {
        return false;
      }
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
      return it.offer.type === housingType.value || housingType.value === 'any';
    })
      .filter(function (it) {
        return it.offer.rooms === Number(housingRooms.value) || housingRooms.value === 'any';
      })
      .filter(function (it) {
        return it.offer.guests === Number(housingGuests.value) || housingGuests.value === 'any';
      })
      .filter(function (it) {
        return compareFeatures(it.offer.features, selectedFeatures);
      })
      .filter(function (it) {
        if (housingPrice.value === 'middle') {
          return it.offer.price > 10000 && it.offer.price < 50000;
        } else if (housingPrice.value === 'low') {
          return it.offer.price <= 10000;
        } else if (housingPrice.value === 'high') {
          return it.offer.price >= 50000;
        }
        return true;
      });


    return processedData.slice(0, PINS_QUANTITY);
  };

  var onValueChange = function (control) {
    control.addEventListener('change', function () {
      window.pin.removeActiveItems();
      window.pin.getRenderedItems(window.pin.originalData);
    });
  };

  controlsList.forEach(function (it) {
    onValueChange(it);
  });

  window.filter = {
    getProcessedData: getProcessedData,
  };

})();
