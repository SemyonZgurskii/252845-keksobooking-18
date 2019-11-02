'use strict';

(function () {

  window.pin.isMapActive = false;
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
    for (var j = 0; j < itemsData.length; j++) {
      var generatedItem = createItem(itemsData[j]);
      addElementClickListener(generatedItem, itemsData[j]);
      fragment.appendChild(generatedItem);
    }
    container.appendChild(fragment);
  };


  var setPoint = function () {
    if (!window.pin.isMapActive) {
      window.map.activatePage();
      window.pin.isMapActive = true;
    }
  };

  var setDefaultPosition = function () {
    mainItem.style.left = defaultX + 'px';
    mainItem.style.top = defaultY + 'px';
  };

  var removeActiveItems = function () {
    var activePins = container.querySelectorAll('.map__pin--user');
    for (var i = 0; i < activePins.length; i++) {
      activePins[i].parentNode.removeChild(activePins[i]);
    }
  };

  var dropToDefaultSettings = function () {
    removeActiveItems();
    setDefaultPosition();
    window.pin.isMapActive = false;
    mainItem.removeEventListener('click', setPoint);
    mainItem.addEventListener('click', setPoint);
  };

  mainItem.addEventListener('mousedown', setPoint);
  window.handler.drag(mainItem, addressInput);

  window.pin = {
    getRenderedItems: getRenderedItems,
    container: container,
    dropToDefaultSettings: dropToDefaultSettings,
  };

})();
