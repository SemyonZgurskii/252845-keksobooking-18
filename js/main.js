'use strict';

var adForm = window.profile.adForm;


var map = document.querySelector('.map');
var fragment = document.createDocumentFragment();

var cardPopup = document.querySelector('#card')
.content
.querySelector('.map__card');
var mapFilters = map.querySelector('.map__filters-container');
var pageFieldsets = document.querySelectorAll('fieldset');
var mainPin = map.querySelector('.map__pin--main');
var mainPinX = parseInt(mainPin.style.left, 10);
var mainPinY = parseInt(mainPin.style.top, 10);
var addressInput = document.querySelector('#address');
var activeMainPinX = mainPinX + mainPin.offsetWidth / 2;
var activeMainPinY = mainPinY + mainPin.offsetHeight;
var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var isMapActive = false;

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

var renderPin = function (pinData) {
  var pin = pinTemplate.cloneNode(true);

  pin.style = 'left: ' + (pinData.location.x - pin.offsetWidth / 2) + 'px; top: ' + (pinData.location.y - pin.offsetHeight) + 'px;';
  pin.querySelector('img').src = pinData.author.avatar;
  pin.querySelector('img').alt = pinData.offer.title;
  pin.classList.add('map__pin--user');

  return pin;
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
    var activePopup = map.querySelector('.popup');
    activePopup.parentNode.removeChild(activePopup);
  });

  return popup;
};

var calculatePinLocation = function (x, y) {
  return Math.round(x) + ', ' + Math.round(y);
};

var activatePage = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  window.data.pinsContainer.appendChild(fragment);
  mapFilters.insertAdjacentElement('beforebegin', renderCardPopup(window.data.getRandomIndex(window.data.adList)));
  for (var c = 0; c < pageFieldsets.length; c++) {
    pageFieldsets[c].removeAttribute('disabled');
  }
};

var addElementClickListener = function (element, elementData) {
  element.addEventListener('click', function () {
    if (map.querySelector('.popup')) {
      var activeCardPopup = map.querySelector('.popup');
      activeCardPopup.parentNode.removeChild(activeCardPopup);
    }
    mapFilters.insertAdjacentElement('beforebegin', renderCardPopup(elementData));
  });
};

var onEscPress = function (evt) {
  if (evt.keyCode === 27 && map.querySelector('.popup')) {
    var activePopup = map.querySelector('.popup');
    activePopup.parentNode.removeChild(activePopup);
    document.removeEventListener('keydown', onEscPress);
  }
};


document.addEventListener('keydown', function (evt) {
  onEscPress(evt);
});

mainPin.addEventListener('click', function () {
  if (!isMapActive) {
    activatePage();
    addressInput.value = calculatePinLocation(activeMainPinX, activeMainPinY);
    isMapActive = true;
  }
});


for (var j = 0; j < window.data.adList.length; j++) {
  var generatedPin = renderPin(window.data.adList[j]);
  addElementClickListener(generatedPin, window.data.adList[j]);
  fragment.appendChild(generatedPin);
}

addressInput.value = calculatePinLocation(mainPinX, mainPinY); // Переместить

for (var b = 0; b < pageFieldsets.length; b++) {
  pageFieldsets[b].disabled = true;
}

