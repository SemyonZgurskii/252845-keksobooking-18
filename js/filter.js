'use strict';

(function () {

  var PINS_QUANTITY = 5;
  var container = document.querySelector('.map__filters');
  var housingType = container.querySelector('#housing-type');

  var getProcessedData = function (loadedData) {

    var sameHousingType = loadedData.filter(function (it) {
      return it.offer.type === housingType.value || housingType.value === 'any';
    });

    return sameHousingType.slice(0, PINS_QUANTITY);
  };

  housingType.addEventListener('change', function () {
    window.pin.removeActiveItems();
    window.pin.getRenderedItems(window.pin.originalData);
  });

  window.filter = {
    getProcessedData: getProcessedData,
  };

})();
