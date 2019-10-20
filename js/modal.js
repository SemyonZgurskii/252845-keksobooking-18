'use strict';

(function () {

  var map = document.querySelector('.map');
  var cardPopup = document.querySelector('#card')
  .content
  .querySelector('.map__card');

  var fillFeatureList = function (cardData, parentElement) {
    for (var d = 0; d < cardData.offer.features.length; d++) {
      var featuresLi = document.createElement('li');
      featuresLi.classList.add('popup__feature', 'popup__feature--' + cardData.offer.features[d]);
      parentElement.appendChild(featuresLi);
    }
  };

  var fillPhotosList = function (cardData, parentElement, imgElement) {
    if (cardData.offer.photos.length > 1) {
      for (var a = 1; a < cardData.offer.photos.length; a++) {
        var copyPopupPhotosImg = imgElement.cloneNode(true);
        copyPopupPhotosImg.src = cardData.offer.photos[a];
        parentElement.appendChild(copyPopupPhotosImg);
      }
    }
    imgElement.src = cardData.offer.photos[0];
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
    var popup = cardPopup.cloneNode(true);
    var popupTitle = popup.querySelector('.popup__title');
    var popupAddress = popup.querySelector('.popup__text--address');
    var popupPrice = popup.querySelector('.popup__text--price');
    var popupType = popup.querySelector('.popup__type');
    var popupCapacity = popup.querySelector('.popup__text--capacity');
    var popupTime = popup.querySelector('.popup__text--time');
    var popupDescription = popup.querySelector('.popup__description');
    var popupPhotos = popup.querySelector('.popup__photos');
    var popupPhotosImg = popupPhotos.querySelector('.popup__photo');
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
    fillPhotosList(cardData, popupPhotos, popupPhotosImg);
    popupCloseButton.addEventListener('click', function () {
      window.modal.popup.parentNode.removeChild(window.modal.popup);
      window.modal.popup = null;
    });
    window.modal.popup = popup;

    return popup;
  };

  window.modal = {
    renderCardPopup: renderCardPopup,
    map: map
  };

})();
