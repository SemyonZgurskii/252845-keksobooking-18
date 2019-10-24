'use strict';

(function () {
  var MIN_Y = 130;
  var MAX_Y = 630;
  var MIN_X = 0;
  var MAX_X = 1200;
  var POINTER_HEIGHT = 16;

  var drag = function (item, listenerToStop, fieldToFill) {
    item.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var dragged = false;

      var getLocationX = function () {
        return Math.round((item.offsetLeft + item.offsetWidth / 2));
      };

      var getLocationY = function () {
        return Math.round((item.offsetTop + item.offsetHeight + POINTER_HEIGHT));
      };

      var calculateLocation = function () {
        return getLocationX() + ', ' + getLocationY();
      };

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

        item.style.top = (item.offsetTop - shift.y) + 'px';
        item.style.left = (item.offsetLeft - shift.x) + 'px';

        var locationX = getLocationX();
        var locationY = getLocationY();

        if (locationY < MIN_Y || locationY > MAX_Y) {
          item.style.top = (item.offsetTop + shift.y) + 'px';
        }

        if (locationX < MIN_X || locationX > MAX_X) {
          item.style.left = (item.offsetLeft + shift.x) + 'px';
        }

        fieldToFill.value = calculateLocation();
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        item.addEventListener('click', listenerToStop);
        fieldToFill.value = calculateLocation();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (dragged) {
          var onClickPreventDefault = function (dragEvt) {
            dragEvt.preventDefault();
            item.removeEventListener('click', onClickPreventDefault);
          };
          item.removeEventListener('click', listenerToStop);
          item.addEventListener('click', onClickPreventDefault);
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

  window.handler = {
    drag: drag,
  };

})();
