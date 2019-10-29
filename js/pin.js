'use strict';

(function () {

  var isMapActive = false;
  var container = document.querySelector('.map__pins');
  var mainItem = container.querySelector('.map__pin--main');
  var basicX = mainItem.offsetLeft;
  var basicY = mainItem.offsetTop;
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

  var getRenderedItems = function (itemsData) {
    for (var j = 0; j < itemsData.length; j++) {
      var generatedItem = createItem(itemsData[j]);
      addElementClickListener(generatedItem, itemsData[j]);
      fragment.appendChild(generatedItem);
    }
    container.appendChild(fragment);
  };


  var setPoint = function () {
    if (!isMapActive) {
      window.map.activatePage();
      isMapActive = true;
    }
  };

  window.pin = {
    getRenderedItems: getRenderedItems,
    setPoint: setPoint,
    container: container,
    mainItem: mainItem,
    basicX: basicX,
    basicY: basicY,
    isMapActive: isMapActive,
  };

})();
