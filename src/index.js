
let oninput = function (id, handler) {
  // http://stackoverflow.com/questions/574941/best-way-to-track-onchange-as-you-type-in-input-type-text/26202266#26202266
  var el = document.getElementById(id);
  el.oninput = handler;
  el.onpropertychange = el.oninput; // for IE8
  // el.onchange = el.oninput; // FF needs this in <select><option>...
};

oninput('id_comment', function () {
  let value = this.value;
  console.log(value);
});

