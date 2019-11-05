'use strict';

(function () {

  var PINS_QUANTITY = 5;
  var container = document.querySelector('.map__filters');
  var housingType = container.querySelector('#housing-type');

  var getProcessedData = function (loadedData) {

    var sameHousingType = loadedData.filter(function (it) {
      return it.offer.type === housingType.value;
    });

    var selectedData = sameHousingType.concat(window.backend.originalData);
    var uniqueData = selectedData.filter(function (it, i) {
      return selectedData.indexOf(it) === i;
    });

    return uniqueData.slice(0, PINS_QUANTITY);
  };

  housingType.addEventListener('change', function () {
    window.pin.removeActiveItems();
    window.pin.getRenderedItems(window.backend.originalData);
  });

  window.filter = {
    getProcessedData: getProcessedData,
  };

})();
