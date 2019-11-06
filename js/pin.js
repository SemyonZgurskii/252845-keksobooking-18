'use strict';

(function () {

  var isMapActive = false;
  var container = document.querySelector('.map__pins');
  var mainItem = container.querySelector('.map__pin--main');
  var defaultX = mainItem.offsetLeft;
  var defaultY = mainItem.offsetTop;
  var template = document.querySelector('#pin')
      .content
    .querySelector('.map__pin');
  var fragment = document.createDocumentFragment();
  var addressInput = document.querySelector('#address');

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
    window.pin.originalData = itemsData;
    window.filter.getProcessedData(itemsData).forEach(function (itemData) {
      var generatedItem = createItem(itemData);
      addElementClickListener(generatedItem, itemData);
      fragment.appendChild(generatedItem);
    });
    container.appendChild(fragment);
  };


  var setPoint = function () {
    if (!isMapActive) {
      window.map.activatePage();
      isMapActive = true;
    }
  };

  var setDefaultPosition = function () {
    mainItem.style.left = defaultX + 'px';
    mainItem.style.top = defaultY + 'px';
  };

  var removeActiveItems = function () {
    var activeItems = container.querySelectorAll('.map__pin--user');
    activeItems.forEach(function (item) {
      container.removeChild(item);
    });
  };

  var dropToDefaultSettings = function () {
    removeActiveItems();
    setDefaultPosition();
    isMapActive = false;
    mainItem.removeEventListener('click', setPoint);
    mainItem.addEventListener('click', setPoint);
  };

  mainItem.addEventListener('mousedown', setPoint);
  window.handler.drag(mainItem, addressInput);

  window.pin = {
    getRenderedItems: getRenderedItems,
    container: container,
    dropToDefaultSettings: dropToDefaultSettings,
    removeActiveItems: removeActiveItems,
  };

})();
