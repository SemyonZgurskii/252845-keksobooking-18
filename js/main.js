'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
var FUETURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_SRCS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var AD_QUANTITY = 8;
var adList = [];
var pinsContainer = document.querySelector('.map__pins');
var pinsContainerWidth = pinsContainer.offsetWidth;
var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var fragment = document.createDocumentFragment();



var getRandomIndex = function (arr) {
  return arr[Math.ceil(Math.random() * (arr.length - 1))];
};

var getRandomLengthArr = function (arr) {
  var arrCopy = arr.slice(Math.round(Math.random() * (arr.length - 1)));
  return arrCopy;
};

var getUserData = function (counter) {
  var roomsQuantity = Math.ceil(Math.random() * 5);
  var locationX = Math.ceil(Math.random() * pinsContainerWidth);
  var locationY = Math.ceil(130 + Math.random() * 500);
  return {
    author: {
      avatar: 'img/avatars/user0' + (counter + 1) + '.png'
    },
    location: {
      x: locationX,
      y: locationY
    },
    offer: {
      title: 'заголовок предложения',
      adress: locationX + ', ' + locationY,
      price: Math.ceil(Math.random() * 1000),
      type: getRandomIndex(TYPES),
      rooms: roomsQuantity,
      guests: roomsQuantity * 2,
      checkin: getRandomIndex(CHECKIN_TIMES),
      checkout: getRandomIndex(CHECKOUT_TIMES),
      features: getRandomLengthArr(FUETURES_LIST),
      description: 'Какое-то описание',
      photos: getRandomLengthArr(PHOTOS_SRCS)
    }
  };
};

for (var i = 0; i < AD_QUANTITY; i++) {
  adList.push(getUserData(i));
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


for (var j = 0; j < adList.length; j++) {
  fragment.appendChild(renderPin(adList[j]));
}

// pinsContainer.appendChild(fragment);

// MODULE3-TASK3

var cardPopup = document.querySelector('#card')
.content
.querySelector('.map__card');

var secondFragment = document.createDocumentFragment();

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

  popupTitle.textContent = cardData.offer.tittle;
  popupAddress.textContent = cardData.offer.address;
  popupPrice.textContent = cardData.offer.price + '₽/ночь';
  if (cardData.offer.type === 'flat') {
    popupType.textcontent = 'Квартира';
  } else if (cardData.offer.type === 'bungalo') {
    popupType.textContent = 'Бунгала';
  } else if (cardData.offer.type === 'house') {
    popupType.textContent = 'Дом';
  } else if (cardData.offer.type === 'palace') {
    popupType.textContent = 'Дворец';
  }
  // switch (cardData.offer.type) {
  //   case 'flat':
  //     popupType.textcontent = 'Квартира';
  //     break;
  //   case 'bungalo':
  //     popupType.textcontent = 'Бунгала';
  //     break;
  //   case 'house':
  //     popupType.textcontent = 'Дом';
  //     break;
  //   case 'palace':
  //     popupType.textcontent = 'Дворец';
  //     break;
  // }
  popupCapacity.textContent = cardData.offer.rooms + ' компнаты для ' + cardData.offer.guests + ' гостей.';
  popupTime.textContent = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;
  popupDescription.textContent = cardData.offer.description;
  popupAvatar.src = cardData.author.avatar;

  fillFeatureList(cardData, popupFeatures);
  fillPhotosList(cardData, popupPhotos, popupPhotosImg);

  return popup;
};

secondFragment.appendChild(renderCardPopup(getRandomIndex(adList)));

var mapFilters = map.querySelector('.map__filters-container');

// MODULE4-TASK2

var pageFieldsets = document.querySelectorAll('fieldset');
var mainPin = map.querySelector('.map__pin--main');
var mainPinX = parseInt(mainPin.style.left, 10);
var mainPinY = parseInt(mainPin.style.top, 10);
var addressInput = document.querySelector('#address');
var activeMainPinX = mainPinX + mainPin.offsetWidth / 2;
var activeMainPinY = mainPinY + mainPin.offsetHeight;

var roomsSelect = document.querySelector('#room_number');
var guestsQuantitySelect = document.querySelector('#capacity');

var calculatePinLocation = function (x, y) {
  return Math.round(x) + ', ' + Math.round(y);
};

addressInput.value = calculatePinLocation(mainPinX, mainPinY);

for (var b = 0; b < pageFieldsets.length; b++) {
  pageFieldsets[b].setAttribute('disabled', '');
}

var activatePage = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  pinsContainer.appendChild(fragment);
  mapFilters.insertAdjacentElement('beforebegin', secondFragment.firstElementChild);
  for (var c = 0; c < pageFieldsets.length; c++) {
    pageFieldsets[c].removeAttribute('disabled');
  }
};

mainPin.addEventListener('mousedown', function () {
  activatePage();
  addressInput.value = calculatePinLocation(activeMainPinX, activeMainPinY);
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    activatePage();
    addressInput.value = calculatePinLocation(activeMainPinX, activeMainPinY);
  }
});

var submit = document.querySelector('.ad-form__submit');

var validate = function (rooms, guests) {
  var roomsNumber = rooms.value;
  var exception = '100';
  var guestsIndex = guests.options.selectedIndex;
  var guestsNumber = guests.options[guestsIndex].value;

  if (roomsNumber !== exception
      && guestsNumber === '0') {
    guests.setCustomValidity('Количество гостей долно быть больше нуля');
  } else if (roomsNumber === exception
             && guestsNumber !== '0') {
    guests.setCustomValidity('Количество гостей не может быть больше 0');
  } else if (guestsNumber > roomsNumber) {
    guests.setCustomValidity('Количество гостей не может превышать количество комнат');
  } else {
    guests.setCustomValidity('');
  }
};

submit.addEventListener('click', function () {
  validate(roomsSelect, guestsQuantitySelect);
});
