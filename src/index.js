import * as page from './page';
import XBBCODE from './vendor/xbbcode';

import style from './index.css';
GM_addStyle(style);

let show_preview = function () {
  let value = page.$id_comment.value;
  let $preview = document.getElementById('bbcode-preview__body');
  if ($preview) {
    $preview.innerHTML = XBBCODE.process({
      text: value,
      addInLineBreaks: false
    }).html;
  }
};

page.insert_preview_template(); // вставляем шаблон предпросмотра
page.textarea_input(show_preview); // когда вводят текст в поле - генерируем предпросмотр
page.after_toolbar_buttons_click(show_preview); // если нажимают кнопки тулбара - генерируем предпросмотр
show_preview(); // сразу генерируем предпросмотр на тот случай, если текст в поле уже есть
