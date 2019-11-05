'use strict';

(function () {

  var popup;
  var map = document.querySelector('.map');
  var cardPopup = document.querySelector('#card')
  .content
  .querySelector('.map__card');

  var addFeaturesElement = function (feature, parentElement) {
    var featuresListItem = document.createElement('li');
    featuresListItem.classList.add('popup__feature', 'popup__feature--' + feature);
    parentElement.appendChild(featuresListItem);
  };

  var fillFeatureList = function (featuresArr, parentElement) {
    featuresArr.forEach(function (feature) {
      addFeaturesElement(feature, parentElement);
    });
  };

  var addPhotosElement = function (photoSrc, parentElement) {
    var imgElement = document.createElement('img');
    imgElement.classList.add('popup__photo');
    imgElement.width = '45';
    imgElement.height = '40';
    imgElement.alt = 'Фотография жилья';
    imgElement.src = photoSrc;

    parentElement.appendChild(imgElement);
  };

  var fillPhotosList = function (photosArr, parentElement) {
    photosArr.forEach(function (photo) {
      addPhotosElement(photo, parentElement);
    });
  };

  var getHousingType = function (housingType) {
    var type = '';
    switch (housingType) {
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
    popupType.textContent = getHousingType(cardData.offer.type);
    fillFeatureList(cardData.offer.features, popupFeatures);
    fillPhotosList(cardData.offer.photos, popupPhotos);
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
