'use strict';

(function () {

  var popup;
  var map = document.querySelector('.map');
  var cardPopup = document.querySelector('#card')
  .content
  .querySelector('.map__card');

  var addFeaturesElement = function (cardData, parentElement, counter) {
    var featuresLi = document.createElement('li');
    featuresLi.classList.add('popup__feature', 'popup__feature--' + cardData.offer.features[counter]);
    parentElement.appendChild(featuresLi);
  };

  var fillFeatureList = function (cardData, parentElement) {
    for (var d = 0; d < cardData.offer.features.length; d++) {
      addFeaturesElement(cardData, parentElement, d);
    }
  };

  var addPhotosElement = function (cardData, parentElement, counter) {
    var imgElement = document.createElement('img');
    imgElement.classList.add('popup__photo');
    imgElement.width = '45';
    imgElement.height = '40';
    imgElement.alt = 'Фотография жилья';
    imgElement.src = cardData.offer.photos[counter];

    parentElement.appendChild(imgElement);
  };

  var fillPhotosList = function (cardData, parentElement) {
    for (var a = 0; a < cardData.offer.photos.length; a++) {
      addPhotosElement(cardData, parentElement, a);
    }
  };

  var getHousingType = function (cardData) {
    var type = '';
    switch (cardData.offer.type) {
      case 'flat':
        type = 'Квартира';
        break;
      case 'bungalo':
        type = 'Бунгала';
        break;
      case 'house':
        type = 'Дом';
        break;
      case 'palace':
        type = 'Дворец';
        break;
    }
    return type;
  };

  var renderCardPopup = function (cardData) {
    popup = cardPopup.cloneNode(true);
    var popupTitle = popup.querySelector('.popup__title');
    var popupAddress = popup.querySelector('.popup__text--address');
    var popupPrice = popup.querySelector('.popup__text--price');
    var popupType = popup.querySelector('.popup__type');
    var popupCapacity = popup.querySelector('.popup__text--capacity');
    var popupTime = popup.querySelector('.popup__text--time');
    var popupDescription = popup.querySelector('.popup__description');
    var popupPhotos = popup.querySelector('.popup__photos');
    var popupAvatar = popup.querySelector('.popup__avatar');
    var popupFeatures = popup.querySelector('.popup__features');
    var popupCloseButton = popup.querySelector('.popup__close');

    popupTitle.textContent = cardData.offer.title;
    popupAddress.textContent = cardData.offer.address;
    popupPrice.textContent = cardData.offer.price + '₽/ночь';
    popupCapacity.textContent = cardData.offer.rooms + ' компнаты для ' + cardData.offer.guests + ' гостей.';
    popupTime.textContent = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;
    popupDescription.textContent = cardData.offer.description;
    popupAvatar.src = cardData.author.avatar;
    popupType.textContent = getHousingType(cardData);
    fillFeatureList(cardData, popupFeatures);
    fillPhotosList(cardData, popupPhotos);
    popupCloseButton.addEventListener('click', function () {
      deletePopup();
    });
    document.addEventListener('keydown', onEscPress);

    return popup;
  };

  var deletePopup = function () {
    if (popup) {
      popup.parentNode.removeChild(popup);
      popup = null;
      document.removeEventListener('keydown', onEscPress);
    }
  };

  var onEscPress = function (evt) {
    if (evt.keyCode === 27) {
      deletePopup();
    }
  };

  window.modal = {
    renderCardPopup: renderCardPopup,
    map: map,
    deletePopup: deletePopup,
  };

})();
