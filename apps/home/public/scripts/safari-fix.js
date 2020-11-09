(function () {
  window.onpageshow = function (event) {
    console.log('safari cache fix loaded');
    if (event.persisted) window.location.reload();
  };
})();
