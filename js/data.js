'use strict';

(function () {
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
  var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
  var FUETURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS_SRCS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var AD_QUANTITY = 8;
  var adList = [];
  var pinsContainer = document.querySelector('.map__pins');
  var pinsContainerWidth = pinsContainer.offsetWidth;

  var getRandomIndex = function (arr) {
    return arr[Math.ceil(Math.random() * (arr.length - 1))];
  };

  var getRandomLengthArr = function (arr) {
    return arr.slice(Math.round(Math.random() * (arr.length - 1)));
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

  window.data = {
    adList: adList,
    pinsContainer: pinsContainer,
    getRandomIndex: getRandomIndex
  };

})();
