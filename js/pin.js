'use strict';

(function () {

  var adList = window.data.adList;
  var container = window.data.pinsContainer;

  var template = document.querySelector('#pin')
      .content
    .querySelector('.map__pin');
  var fragment = document.createDocumentFragment();

  var createItem = function (cardData) {
    var item = template.cloneNode(true);

    item.style = 'left: ' + (cardData.location.x - item.offsetWidth / 2) + 'px; top: ' + (cardData.location.y - item.offsetHeight) + 'px;';
    item.querySelector('img').src = cardData.author.avatar;
    item.querySelector('img').alt = cardData.offer.title;
    item.classList.add('map__pin--user');

    return item;
  };

  var addElementClickListener = function (element, elementData) {
    element.addEventListener('click', function () {
      window.modal.deletePopup();
      container.appendChild(window.modal.renderCardPopup(elementData));
    });
  };

  var getRenderedItems = function () {
    for (var j = 0; j < adList.length; j++) {
      var generatedItem = createItem(adList[j]);
      addElementClickListener(generatedItem, adList[j]);
      fragment.appendChild(generatedItem);
    }
    return fragment;
  };

  window.pin = {
    getRenderedItems: getRenderedItems,
  };

})();
