'use strict';

(function () {

  var mainContainer = window.modal.map;
  var adList = window.data.adList;

  var filters = mainContainer.querySelector('.map__filters-container');
  var template = document.querySelector('#pin')
      .content
    .querySelector('.map__pin');
  var fragment = document.createDocumentFragment();

  var renderItem = function (cardData) {
    var item = template.cloneNode(true);

    item.style = 'left: ' + (cardData.location.x - item.offsetWidth / 2) + 'px; top: ' + (cardData.location.y - item.offsetHeight) + 'px;';
    item.querySelector('img').src = cardData.author.avatar;
    item.querySelector('img').alt = cardData.offer.title;
    item.classList.add('map__pin--user');

    return item;
  };

  var addElementClickListener = function (element, elementData) {
    element.addEventListener('click', function () {
      if (mainContainer.querySelector('.popup')) {
        var activeCardPopup = mainContainer.querySelector('.popup');
        activeCardPopup.parentNode.removeChild(activeCardPopup);
      }
      filters.insertAdjacentElement('beforebegin', window.modal.renderCardPopup(elementData));
    });
  };

  var fillFragment = function () {
    for (var j = 0; j < adList.length; j++) {
      var generatedItem = renderItem(adList[j]);
      addElementClickListener(generatedItem, adList[j]);
      fragment.appendChild(generatedItem);
    }
    return fragment;
  };

  window.pin = {
    fragment: fillFragment,
    filters: filters,
  };

})();
