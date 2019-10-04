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
var adForm = document.querySelector('.ad-form');

// map.classList.remove('map--faded'); // Временно

function getRandomIndex (arr) {
  return arr[Math.ceil(Math.random() * (arr.length - 1))];
}

function getRandomLengthArr (arr) {
  var arrCopy = arr.slice(Math.round(Math.random() * (arr.length - 1)));
  return arrCopy;
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

function renderPin (pinData) {
  var pin = pinTemplate.cloneNode(true);

  pin.style = 'left: ' + (pinData.location.x - pin.offsetWidth / 2) + 'px; top: ' + (pinData.location.y - pin.offsetHeight) + 'px;';
  pin.querySelector('img').src = pinData.author.avatar;
  pin.querySelector('img').alt = pinData.offer.title;

  return pin;
}

var fragment = document.createDocumentFragment();

for (var j = 0; j < adList.length; j++) {
  fragment.appendChild(renderPin(adList[j]));
}

// pinsContainer.appendChild(fragment);

// MODULE3-TASK3

var cardPopup = document.querySelector('#card')
  .content
  .querySelector('.map__card');

var secondFragment = document.createDocumentFragment();

function renderCardPopup (cardData) {
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
  popupCapacity.textContent = cardData.offer.rooms + ' компнаты для ' + cardData.offer.guests + ' гостей.';
  popupTime.textContent = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;
  popupDescription.textContent = cardData.offer.description;
  popupAvatar.src = cardData.author.avatar;


  for (var d = 0; d < cardData.offer.features.length; d++) {
    var featuresLi = document.createElement('li');
    featuresLi.classList.add('popup__feature', 'popup__feature--' + cardData.offer.features[d]);
    popupFeatures.appendChild(featuresLi);
  }


  if (cardData.offer.photos.length > 1) {
    for (var a = 1; a < cardData.offer.photos.length; a++) {
      var copyPopupPhotosImg = popupPhotosImg.cloneNode(true);
      copyPopupPhotosImg.src = cardData.offer.photos[a];
      popupPhotos.appendChild(copyPopupPhotosImg);
    }
  }
  popupPhotosImg.src = cardData.offer.photos[0];


  return popup;
};

secondFragment.appendChild(renderCardPopup(getRandomIndex(adList)));

var mapFilters = map.querySelector('.map__filters-container');
// mapFilters.insertAdjacentElement('beforebegin', secondFragment.firstElementChild);


// MODULE4-TASK2

var pageFieldsets = document.querySelectorAll('fieldset');
var mainPin = map.querySelector('.map__pin--main');
var mainPinX = parseInt(mainPin.style.left, 10);
var mainPinY = parseInt(mainPin.style.top, 10);
var addressInput = document.querySelector('#address');
var activeMainPinX = mainPinX + mainPin.offsetWidth / 2;
var activeMainPinY = mainPinY + mainPin.offsetHeight;

var roomsSelect = document.querySelector('#housing-rooms');
var guestsQuantitySelect = document.querySelector('#housing-guests');

function calculatePinLocation (x, y) {
  return Math.round(x) + ', ' + Math.round(y);
}

addressInput.value = calculatePinLocation(mainPinX, mainPinY);

for (var b = 0; b < pageFieldsets.length; b++) {
  pageFieldsets[b].setAttribute('disabled','');
}

function activatePage () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  pinsContainer.appendChild(fragment);
  mapFilters.insertAdjacentElement('beforebegin', secondFragment.firstElementChild);
  for (var c = 0; c < pageFieldsets.length; c++) {
    pageFieldsets[c].removeAttribute('disabled');
  }
}

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

if (roomsSelect.options.value === 1) {
  console.log('6546l');
  // guestsQuantitySelect.querySelectorAll('option:not([value="1"])').value.disabled = 'true';
}
