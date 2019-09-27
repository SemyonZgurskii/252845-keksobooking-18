'use strict';

var types = ['palace', 'flat', 'house', 'bungalo'];
var checkinTimes = ['12:00', '13:00', '14:00'];
var checkoutTimes = ['12:00', '13:00', '14:00'];
var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosSrcs = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var adQuantity = 8;
var adList = [];
var pinsContainer = document.querySelector('.map__pins');
var pinsContainerWidth = pinsContainer.offsetWidth;
var map = document.querySelector('.map');

map.classList.remove('map--faded'); // Временно

var getRandomIndex = function (arr) {
  return arr[Math.ceil(Math.random() * (arr.length - 1))];
};

var getRandomLengthArr = function (arr) {
  arr.length = Math.ceil(Math.random() * arr.length);
  return arr;
}

for (var i = 0; i < adQuantity; i++) {
  var roomsQuantity = Math.ceil(Math.random() * 5);
  var locationX = Math.ceil(Math.random() * pinsContainerWidth);
  var locationY = Math.ceil(130 + Math.random() * 500);
  adList.push({
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    },
    location: {
      x: locationX,
      y: locationY
    },
    offer: {
      title: 'заголовок предложения',
      adress: locationX + ', ' + locationY,
      price: Math.ceil(Math.random() * 1000),
      type: getRandomIndex(types),
      rooms: roomsQuantity,
      guests: roomsQuantity * 2,
      checkin: getRandomIndex(checkinTimes),
      checkout: getRandomIndex(checkoutTimes),
      features: getRandomLengthArr(featuresList),
      description: 'Какое-то описание',
      photos: getRandomLengthArr(photosSrcs)
    }
  });
}

var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var renderPin = function (pinData) {
  var pin = pinTemplate.cloneNode(true);

  pin.style = 'left: ' + (pinData.location.x - pin.offsetWidth / 2) + 'px; top: ' + (pinData.location.y - pin.offsetHeight) + 'px;';
  pin.querySelector('img').src = pinData.author.avatar;
  pin.querySelector('img').alt = pinData.offer.title;

  return pin;
};

var fragment = document.createDocumentFragment();

for (var j = 0; j < adList.length; j++) {
  fragment.appendChild(renderPin(adList[j]));
}

pinsContainer.appendChild(fragment);

// MODULE3-TASK3

var cardPopup = document.querySelector('#card')
  .content
  .querySelector('.map__card');

var secondFragment = document.createDocumentFragment();

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
  var popupFeaturesWifi = popup.querySelector('.popup__feature--wifi');
  var popupFeaturesDishwasher = popup.querySelector('.popup__feature--dishwasher');
  var popupFeaturesParking = popup.querySelector('.popup__feature--parking');
  var popupFeaturesWasher = popup.querySelector('.popup__feature--washer');
  var popupFeaturesElevator = popup.querySelector('.popup__feature--elevator');
  var popupFeaturesConditioner = popup.querySelector('.popup__feature--conditioner');

  popupTitle.textContent = cardData.offer.tittle;
  popupAddress.textContent = cardData.offer.address;
  popupPrice.textContent = cardData.offer.price + '₽/ночь';
  // popupType.textContent = cardData.offer.type === 'flat' ? 'Квартира' :
  //   cardData.offer.type === 'bungalo' ? 'Бунгала' :
  //   cardData.offer.type === 'house' ? 'Дом' :
  //   cardData.offer.type === 'palace' ? 'Дворец';
  if (cardData.offer.type === 'flat') {
    popupType.textcontent = 'Квартира';
  } else if (cardData.offer.type === 'bungalo') {
    popupType.textContent = 'Бунгала';
  } else if (cardData.offer.type === 'house') {
    popupType.textContent = 'Дом';
  } else if (cardData.offer.type === 'palace') {
    popupType.textContent = 'Дворец';
  }
  popupCapacity.textContent = cardData.offer.rooms + ' компнаты для ' + cardData.offer.guests + ' гостей.';
  popupTime.textContent = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;
  popupDescription.textContent = cardData.offer.description;
  popupAvatar.src = cardData.author.avatar;

  // popupPhotos.src = cardData.offer.photos;

  // for (var i = 0; i < cardData.offer.features.length; i++) {
  //   var popupFeaturesElem = popupFeatures.querySelectorAll('.popup__feature');
  //   popupFeaturesElem[i].textContent = cardData.offer.features[i];
  // }

  // var popupFeaturesElem = popupFeatures.querySelectorAll('.popup__feature');
  // popupFeaturesElem.length = cardData.offer.features.length;


  if (cardData.offer.photos.length > 1) {
    for (var j = 1; j < cardData.offer.photos.length; j++) {
      var copyPopupPhotosImg = popupPhotosImg.cloneNode(true);
      copyPopupPhotosImg.src = cardData.offer.photos[j];
      popupPhotos.appendChild(copyPopupPhotosImg);
    }
  }
  popupPhotosImg.src = cardData.offer.photos[0];

  return popup;
};

var mapFilters = map.querySelector('.map__filters-container');
var cardPopupData = renderCardPopup(adList[3]);
mapFilters.insertAdjacentElement('beforebegin', cardPopupData);
