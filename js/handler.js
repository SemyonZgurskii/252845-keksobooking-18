'use strict';

(function () {
  var MIN_Y = 130;
  var MAX_Y = 630;
  var MIN_X = 0;
  var MAX_X = 1200;

  var drag = function (item, x, y, inputFiller) {
    item.addEventListener('mousedown', function (evt) {
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

        item.style.top = (item.offsetTop - shift.y) + 'px';
        item.style.left = (item.offsetLeft - shift.x) + 'px';

        if (y() < MIN_Y || y() > MAX_Y) {
          item.style.top = (item.offsetTop + shift.y) + 'px';
        }

        if (x() < MIN_X || x() > MAX_X) {
          item.style.left = (item.offsetLeft + shift.x) + 'px';
        }

        inputFiller(x(), y());
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        inputFiller(x(), y());
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (dragged) {
          var onClickPreventDefault = function (dragEvt) {
            dragEvt.preventDefault();
            item.removeEventListener('click', onClickPreventDefault);
          };
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
