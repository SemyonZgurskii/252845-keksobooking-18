'use strict';

(function () {

  var container = document.querySelector('.map__pins');
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
    window.pin.originalData = itemsData;
    window.filter.getProcessedData(itemsData).forEach(function (itemData) {
      var generatedItem = createItem(itemData);
      addElementClickListener(generatedItem, itemData);
      fragment.appendChild(generatedItem);
    });
    container.appendChild(fragment);
  };

  var removeActiveItems = function () {
    var activeItems = container.querySelectorAll('.map__pin--user');
    activeItems.forEach(function (item) {
      container.removeChild(item);
    });
  };

  window.pin = {
    getRenderedItems: getRenderedItems,
    container: container,
    removeActiveItems: removeActiveItems,
  };

})();
