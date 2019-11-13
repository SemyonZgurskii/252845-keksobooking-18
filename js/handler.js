'use strict';

(function () {
  var MIN_Y = 130;
  var MAX_Y = 630;
  var MIN_X = 0;
  var MAX_X = 1200;
  var POINTER_HEIGHT = 16;
  var isMapActive = false;
  var mainItem = window.pin.container.querySelector('.map__pin--main');
  var defaultX = mainItem.offsetLeft;
  var defaultY = mainItem.offsetTop;

  var setDefaultPosition = function () {
    mainItem.style.left = defaultX + 'px';
    mainItem.style.top = defaultY + 'px';
  };

  var dropToDefaultSettings = function () {
    window.pin.removeActiveItems();
    setDefaultPosition();
    isMapActive = false;
    mainItem.removeEventListener('click', setPoint);
    mainItem.addEventListener('click', setPoint);
  };

  var setPoint = function () {
    if (!isMapActive) {
      window.map.activatePage();
      isMapActive = true;
    }
  };

  var getLocationX = function () {
    return Math.round((mainItem.offsetLeft + mainItem.offsetWidth / 2));
  };

  var getDefaultLocationY = function () {
    return Math.round(mainItem.offsetTop + mainItem.offsetHeight / 2);
  };

  var getLocationY = function () {
    return Math.round((mainItem.offsetTop + mainItem.offsetHeight + POINTER_HEIGHT));
  };

  var drag = function () {
    mainItem.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var dragged = false;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        dragged = true;

        var shift = {
          x: startCords.x - moveEvt.clientX,
          y: startCords.y - moveEvt.clientY
        };

        startCords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        mainItem.style.top = (mainItem.offsetTop - shift.y) + 'px';
        mainItem.style.left = (mainItem.offsetLeft - shift.x) + 'px';

        if (getLocationY() < MIN_Y || getLocationY() > MAX_Y) {
          mainItem.style.top = (mainItem.offsetTop + shift.y) + 'px';
        }

        if (getLocationX() < MIN_X || getLocationX() > MAX_X) {
          mainItem.style.left = (mainItem.offsetLeft + shift.x) + 'px';
        }

        window.form.fillCordinationsInput(getLocationX(), getLocationY());
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        window.form.fillCordinationsInput(getLocationX(), getLocationY());
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (dragged) {
          var onClickPreventDefault = function (dragEvt) {
            dragEvt.preventDefault();
            mainItem.removeEventListener('click', onClickPreventDefault);
          };
          mainItem.addEventListener('click', onClickPreventDefault);
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

  drag();
  mainItem.addEventListener('mousedown', setPoint);
  window.form.fillCordinationsInput(getLocationX(), getDefaultLocationY());

  window.handler = {
    dropToDefaultSettings: dropToDefaultSettings,
  };

})();
