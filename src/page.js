import * as medley from './vendor/140medley';

const textarea_id = 'id_comment';
export let $id_comment = document.getElementById(textarea_id);

let oninput = function (id, handler) {
  // http://stackoverflow.com/a/26202266/136559
  var $el = document.getElementById(id);
  $el.oninput = handler;
  $el.onpropertychange = $el.oninput; // for IE8
  // $el.onchange = $el.oninput; // FF needs this in <select><option>...
};

export function after_toolbar_buttons_click(handler) {
  const toolbar_buttons = document.querySelectorAll('form > input[type=button]');
  for (const button of toolbar_buttons) {
    button.addEventListener('click', handler);
  }
}

export function insert_preview_template() {
  let $form = document.querySelector('form');
  let $el = medley.createDOM(`
  
<div class="bbcode-preview" style="width: ${$id_comment.offsetWidth}px">
  <div class="bbcode-preview__divider">Предпросмотр</div>
  <div class="bbcode-preview__body" id="bbcode-preview__body"></div>
</div>
  
  `);
  $form.appendChild($el);
}

export function textarea_input(handler) {
  oninput(textarea_id, handler);
}
