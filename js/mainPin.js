'use strict';

(function () {
  var MIN_Y = 130;
  var MAX_Y = 630;
  var MIN_X = 0;
  var POINTER_HEIGHT = 16;
  var isMapActive = false;
  var mainItem = window.pin.container.querySelector('.map__pin--main');
  var defaultX = mainItem.offsetLeft;
  var defaultY = mainItem.offsetTop;

  var setDefaultPosition = function () {
    window.modal.map.classList.add('map--faded');
    mainItem.style.left = defaultX + 'px';
    mainItem.style.top = defaultY + 'px';
  };

  var dropToDefaultSettings = function () {
    window.pin.removeActiveItems();
    setDefaultPosition();
    isMapActive = false;
    mainItem.removeEventListener('mousedown', onMainItemMouseDown);
    mainItem.addEventListener('mousedown', onMainItemMouseDown);
  };

  var onMainItemMouseDown = function () {
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

      var onDocumentMouseMove = function (moveEvt) {
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

        if (getLocationX() < MIN_X || getLocationX() > window.modal.map.offsetWidth) {
          mainItem.style.left = (mainItem.offsetLeft + shift.x) + 'px';
        }

        window.form.setAddress(getLocationX(), getLocationY());
      };

      var onDocumentMouseUp = function (upEvt) {
        upEvt.preventDefault();

        window.form.setAddress(getLocationX(), getLocationY());
        document.removeEventListener('mousemove', onDocumentMouseMove);
        document.removeEventListener('mouseup', onDocumentMouseUp);

        if (dragged) {
          var onMainItemClick = function (dragEvt) {
            dragEvt.preventDefault();
            mainItem.removeEventListener('click', onMainItemClick);
          };
          mainItem.addEventListener('click', onMainItemClick);
        }
      };

      document.addEventListener('mousemove', onDocumentMouseMove);
      document.addEventListener('mouseup', onDocumentMouseUp);
    });
  };

  drag();
  mainItem.addEventListener('mousedown', onMainItemMouseDown);
  window.form.setAddress(getLocationX(), getDefaultLocationY());

  window.mainPin = {
    dropToDefaultSettings: dropToDefaultSettings,
  };

})();
