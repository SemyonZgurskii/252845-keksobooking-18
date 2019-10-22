'use strict';

(function () {

  var letItemDrag = function (item, listenerToStop, fieldToFill) {
    item.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var dragged = false;

      var calculateLocation = function () {
        return Math.round((item.offsetLeft + item.offsetWidth / 2)) + ', ' + Math.round((item.offsetTop + item.offsetHeight));
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

        if (item.offsetTop < 130 || item.offsetTop > 630) {
          item.style.top = (item.offsetTop + shift.y) + 'px';
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

  window.holder = {
    letItemDrag: letItemDrag,
  };

})();
