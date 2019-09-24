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

for (var i = 0; i < adQuantity; i++) {
  var roomsQuantity = Math.ceil(Math.random() * 5);
  featuresList.length = Math.ceil(Math.random() * featuresList.length);
  adList.push({
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    },
    location: {
      x: Math.ceil(Math.random() * pinsContainerWidth),
      y: Math.ceil(130 + Math.random() * 500)
    },
    offer: {
      title: 'заголовок предложения',
      adress: this.location.x + ', ' + this.location.y,
      price: Math.ceil(Math.random() * 1000),
      type: getRandomIndex(types),
      rooms: roomsQuantity,
      guests: roomsQuantity * 2,
      checkin: getRandomIndex(checkinTimes),
      checkout: getRandomIndex(checkoutTimes),
      features: featuresList.length.toString(),
      description: 'Какое-то описание',
      photos: getRandomIndex(photosSrcs).toString()
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
