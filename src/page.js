import * as medley from './vendor/140medley';

const TEXTAREA_ID = 'id_comment';
export let $id_comment = document.getElementById(TEXTAREA_ID);

let oninput = function (id, handler) {
  // http://stackoverflow.com/a/26202266/136559
  var $el = document.getElementById(id);
  $el.oninput = handler;
  $el.onpropertychange = $el.oninput; // for IE8
  // $el.onchange = $el.oninput; // FF needs this in <select><option>...
};

function insert_tag_even_if_empty(tag) {
  const selectedText = $id_comment.value.substring($id_comment.selectionStart, $id_comment.selectionEnd);
  if (selectedText.length > 0) return;

  const beforeText = $id_comment.value.substring(0, $id_comment.selectionStart);
  const afterText = $id_comment.value.substring($id_comment.selectionEnd, $id_comment.value.length);
  let tagOpen = '';
  let tagClose = '';
  const tagLower = tag.toLowerCase();

  switch (tagLower) {
    case 'url':
      return;
    case 'strike':
      tagOpen = `[s]`;
      tagClose = `[/s]`;
      break;
    default:
      tagOpen = `[${tagLower}]`;
      tagClose = `[/${tagLower}]`;
      break;
  }

  if (tagOpen.length === 0 && tagClose.length === 0) return;

  $id_comment.value = `${beforeText}${tagOpen}${tagClose}${afterText}`;
  setCaretPosition(TEXTAREA_ID, `${beforeText}${tagOpen}`.length); // перемещаем курсор по центру тега
}

// http://stackoverflow.com/a/512542/136559
function setCaretPosition(elemId, caretPos) {
  var elem = document.getElementById(elemId);

  if (elem != null) {
    if (elem.createTextRange) {
      var range = elem.createTextRange();
      range.move('character', caretPos);
      range.select();
    }
    else {
      if (elem.selectionStart) {
        elem.focus();
        elem.setSelectionRange(caretPos, caretPos);
      }
      else
        elem.focus();
    }
  }
}

export function after_toolbar_buttons_click(handler) {
  const toolbar_buttons = document.querySelectorAll('form > input[type=button]');
  for (const button of toolbar_buttons) {

    // вызываем эту функцию как бы до события click
    // если никакой текст не выделен - то вставляем пустые теги
    button.addEventListener('mouseup', function (e) {
      insert_tag_even_if_empty(this.value);
    });

    // после нажатия кнопки вызываем handler
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
  oninput(TEXTAREA_ID, handler);
}
