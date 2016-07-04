
import XBBCODE from '../src/vendor/xbbcode';
import * as bbcode from '../src/vendor/bbcode';
var assert = require('chai').assert;

describe('BBCode render', function () {
  const bbcodes1 = {
    text: `
[b]bold[/b]
[i]italic[/i]
[u]underline[/u]
[s]strike[/s]
[quote]quote[/quote]
[quote="nickname"]quote nickname 1[/quote]
[quote=nickname]quote nickname 2[/quote]
[ol]
[li]ol[/li]
[li]first[/li]
[li]second[/li][/ol]
[ul][li]ul
[/li][li]111[/li]
[li]222[/li][/ul]
[url=getelementbyid.ru/]url[/url]
[url=http://getelementbyid.ru/]url[/url]
[url=#2]url[/url]
http://getelementbyid.ru/`.trim(),
    html: `<strong>bold</strong><br><em>italic</em><br><u>underline</u><br><strike>strike</strike><br><blockquote>quote</blockquote><blockquote><em>nickname</em><br>quote nickname 1</blockquote><blockquote><em>nickname</em><br>quote nickname 2</blockquote><ol><li>ol</li><li>first</li><li>second</li></ol><ul><li>ul<br></li><li>111</li><li>222</li></ul><a href="http://getelementbyid.ru/" target="_blank">url</a><br><a href="http://getelementbyid.ru/" target="_blank">url</a><br>url<br><a href="http://getelementbyid.ru/" target="_blank">http://getelementbyid.ru/</a>`.trim()//.replace(/<br>/g, '\n')
  };

  const quotes = {
    text: `[quote]quote[/quote]
[quote="nickname"]quote nickname 1[/quote]
[quote=nickname]quote nickname 2[/quote]`.trim(),
    html: `<blockquote>quote</blockquote><blockquote><em>nickname</em><br>quote nickname 1</blockquote><blockquote><em>nickname</em><br>quote nickname 2</blockquote>`.trim()
  };

  describe('XBBCODE', function() {
    // const xbbcode_wrapper = (text) => `<div style="white-space:pre-wrap;">${text}</div>`;
    const xbbcode_wrapper = (text) => text;

    it('should render [b]', function() {
      const actual = XBBCODE.process({text: '[b]bold[/b]'}).html;
      assert.equal(actual, xbbcode_wrapper(`<strong>bold</strong>`));
    });

    it('should render [quote]', function () {
      assert.equal(
        XBBCODE.process({text: `[quote]quote[/quote]`}).html,
        `<blockquote>quote</blockquote>`);
      assert.equal(
        XBBCODE.process({text: `[quote="nickname"]quote nickname 1[/quote]`}).html,
        `<blockquote><em>nickname</em><br>quote nickname 1</blockquote>`);
      assert.equal(
        XBBCODE.process({text: `[quote=nickname]quote nickname 1[/quote]`}).html,
        `<blockquote><em>nickname</em><br>quote nickname 1</blockquote>`);
      assert.equal(
        XBBCODE.process({text: quotes.text}).html,
        quotes.html
      )
    });

    it('should render gudilap bbcodes', function () {
      const actual = XBBCODE.process({text: bbcodes1.text}).html;
      assert.equal(actual, xbbcode_wrapper(bbcodes1.html));
    });
  });

  /*describe('bbcode', function() {
    const xbbcode_wrapper = (text) => `<div style="white-space:pre-wrap;">${text}</div>`;

    it('should render [b]', function() {
      const actual = bbcode.render('[b]bold[/b]');
      assert.equal(actual, `<strong>bold</strong>`);
    });

    it('should render [quote]', function () {
      assert.equal(bbcode.render(`[quote]quote[/quote]`), `<blockquote>quote</blockquote>`);
      assert.equal(bbcode.render(`[quote="nickname"]quote nickname 1[/quote]`), `<blockquote><em>nickname</em><br>quote nickname 1</blockquote>`);
      assert.equal(bbcode.render(`[quote=nickname]quote nickname 1[/quote]`), `<blockquote><em>nickname</em><br>quote nickname 1</blockquote>`);
    });

    it('should render gudilap bbcodes', function () {
      const actual = bbcode.render(bbcodes1.text);
      assert.equal(actual, bbcodes1.html);
    });
  });*/
});

