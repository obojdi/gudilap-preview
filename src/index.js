
import * as medley from './vendor/140medley';
import style from './index.css';
import XBBCODE from './vendor/xbbcode';

let oninput = function (id, handler) {
  // http://stackoverflow.com/questions/574941/best-way-to-track-onchange-as-you-type-in-input-type-text/26202266#26202266
  var $el = document.getElementById(id);
  $el.oninput = handler;
  $el.onpropertychange = $el.oninput; // for IE8
  // $el.onchange = $el.oninput; // FF needs this in <select><option>...
};

let $id_comment = document.getElementById('id_comment');
let show_preview = function () {
  let value = $id_comment.value;
  let $preview = document.getElementById('bbcode-preview__body');
  if ($preview) {
    $preview.innerHTML = XBBCODE.process({
      text: value,
      addInLineBreaks: false
    }).html;
  }
};

let insert_preview_template = function () {
  let $form = document.querySelector('form');
  let $el = medley.createDOM(`
  
<div class="bbcode-preview">
  <div class="bbcode-preview__divider">Предпросмотр</div>
  <div class="bbcode-preview__body" id="bbcode-preview__body"></div>
</div>
  
  
  `);
  $form.appendChild($el);
};

GM_addStyle(style);
insert_preview_template();
show_preview();
oninput('id_comment', show_preview);

/* надо попробовать в кнопка изменить текстом onclick. добавив после addtag мою функцию.
 * ну или вообще свой обработчик поставить с функцией. сперва addtag, потом превью  */

let after_toolbar_buttons_click = function (handler) {
  const toolbar_buttons = document.querySelectorAll('form > input[type=button]');
  for (const button of toolbar_buttons) {
    button.addEventListener('click', handler);
  }
};

after_toolbar_buttons_click(show_preview);