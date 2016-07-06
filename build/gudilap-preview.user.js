// ==UserScript==
// @name        Gudilap preview
// @description Добавляет предпросмотр на форум Гудилапа
// @namespace   https://github.com/pongo
// @include     http://gudilap.ru/commentadd/*
// @include     http://www.gudilap.ru/commentadd/*
// @include     http://gudilap.ru/topicadd/*
// @include     http://www.gudilap.ru/topicadd/*
// @version     2
// @grant       console.log
// @grant       GM_addStyle
// @updateURL   https://github.com/pongo/gudilap-preview/raw/master/build/gudilap-preview.meta.js
// @downloadURL https://github.com/pongo/gudilap-preview/raw/master/build/gudilap-preview.user.js
// ==/UserScript==

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _page = __webpack_require__(2);

	var page = _interopRequireWildcard(_page);

	var _xbbcode = __webpack_require__(4);

	var _xbbcode2 = _interopRequireDefault(_xbbcode);

	var _index = __webpack_require__(8);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	GM_addStyle(_index2.default);

	var show_preview = function show_preview() {
	  var value = page.$id_comment.value;
	  var $preview = document.getElementById('bbcode-preview__body');
	  if ($preview) {
	    $preview.innerHTML = _xbbcode2.default.process({
	      text: value,
	      addInLineBreaks: false
	    }).html;
	  }
	};

	page.insert_preview_template(); // вставляем шаблон предпросмотра
	page.textarea_input(show_preview); // когда вводят текст в поле - генерируем предпросмотр
	page.after_toolbar_buttons_click(show_preview); // если нажимают кнопки тулбара - генерируем предпросмотр
	show_preview(); // сразу генерируем предпросмотр на тот случай, если текст в поле уже есть

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.$id_comment = undefined;
	exports.after_toolbar_buttons_click = after_toolbar_buttons_click;
	exports.insert_preview_template = insert_preview_template;
	exports.textarea_input = textarea_input;

	var _medley = __webpack_require__(3);

	var medley = _interopRequireWildcard(_medley);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var textarea_id = 'id_comment';
	var $id_comment = exports.$id_comment = document.getElementById(textarea_id);

	var oninput = function oninput(id, handler) {
	  // http://stackoverflow.com/a/26202266/136559
	  var $el = document.getElementById(id);
	  $el.oninput = handler;
	  $el.onpropertychange = $el.oninput; // for IE8
	  // $el.onchange = $el.oninput; // FF needs this in <select><option>...
	};

	function after_toolbar_buttons_click(handler) {
	  var toolbar_buttons = document.querySelectorAll('form > input[type=button]');
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = toolbar_buttons[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var button = _step.value;

	      button.addEventListener('click', handler);
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }
	}

	function insert_preview_template() {
	  var $form = document.querySelector('form');
	  var $el = medley.createDOM('\n  \n<div class="bbcode-preview" style="width: ' + $id_comment.offsetWidth + 'px">\n  <div class="bbcode-preview__divider">Предпросмотр</div>\n  <div class="bbcode-preview__body" id="bbcode-preview__body"></div>\n</div>\n  \n  ');
	  $form.appendChild($el);
	}

	function textarea_input(handler) {
	  oninput(textarea_id, handler);
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createDOM = createDOM;
	exports.selector = selector;
	/*
	 * 140 medley
	 * (c) 2011 - Honza Pokorny
	 * Licensed under the terms of the BSD license
	 *
	 * This is a micro-framework or a collection of small, helpful utilities for
	 * common javascript tasks.
	 *
	 * Size:
	 *   Source:  8.6 kb
	 *   Minified: 821 bytes
	 *   gzipped: 504 bytes
	 *
	 * Features:
	 *  - templating - t();
	 *  - local storage - s();
	 *  - bind/unbind events - b();
	 *  - create DOM elements - m();
	 *  - DOM selector - $();
	 *  - Get cross-browser xhr - j();
	 *
	 */

	/*
	 * Create DOM element
	 *
	 * Usage:
	 *   var el = m('<h1>Hello</h1>');
	 *   document.body.appendChild(el);
	 *
	 *
	 *            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
	 *                    Version 2, December 2004
	 *
	 * Copyright (C) 2011 Jed Schmidt <http://jed.is> - WTFPL
	 * More: https://gist.github.com/966233
	 *
	 */

	function createDOM(a, // an HTML string
	b, // placeholder
	c // placeholder
	) {
	  b = document; // get the document,
	  c = b.createElement("p"); // create a container element,
	  c.innerHTML = a; // write the HTML to it, and
	  a = b.createDocumentFragment(); // create a fragment.

	  while ( // while
	  b = c.firstChild // the container element has a first child
	  ) {
	    a.appendChild(b);
	  } // append the child to the fragment,

	  return a; // and then return the fragment.
	}

	/*
	 * DOM selector
	 *
	 * Usage:
	 *   $('div');
	 *   $('#name');
	 *   $('.name');
	 *
	 *
	 * Copyright (C) 2011 Jed Schmidt <http://jed.is> - WTFPL
	 * More: https://gist.github.com/991057
	 *
	 */

	function selector(a, // take a simple selector like "name", "#name", or ".name", and
	b // an optional context, and
	) {
	  a = a.match(/^(\W)?(.*)/); // split the selector into name and symbol.
	  return ( // return an element or list, from within the scope of
	  b // the passed context
	  || document // or document,
	  )["getElement" + ( // obtained by the appropriate method calculated by
	  a[1] ? a[1] == "#" ? "ById" // the node by ID,
	  : "sByClassName" // the nodes by class name, or
	  : "sByTagName" // the nodes by tag name,
	  )](a[2] // called with the name.
	  );
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/*
	Copyright (C) 2011 Patrick Gillespie, http://patorjk.com/

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
	*/

	/*
	    Extendible BBCode Parser v1.0.0
	    By Patrick Gillespie (patorjk@gmail.com)
	    Website: http://patorjk.com/

	    This module allows you to parse BBCode and to extend to the mark-up language
	    to add in your own tags.
	*/

	var XBBCODE = function () {
	    "use strict";

	    // -----------------------------------------------------------------------------
	    // Set up private variables
	    // -----------------------------------------------------------------------------

	    var me = {},
	        urlPattern = /^(?:https?|file|c):(?:\/{1,3}|\\{1})[-a-zA-Z0-9:;@#%&()~_?\+=\/\\\.]*$/,
	        colorNamePattern = /^(?:aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen)$/,
	        colorCodePattern = /^#?[a-fA-F0-9]{6}$/,
	        emailPattern = /[^\s@]+@[^\s@]+\.[^\s@]+/,
	        fontFacePattern = /^([a-z][a-z0-9_]+|"[a-z][a-z0-9_\s]+")$/i,
	        tags,
	        tagList,
	        tagsNoParseList = [],
	        bbRegExp,
	        pbbRegExp,
	        pbbRegExp2,
	        openTags,
	        closeTags;

	    /* -----------------------------------------------------------------------------
	     * tags
	     * This object contains a list of tags that your code will be able to understand.
	     * Each tag object has the following properties:
	     *
	     *   openTag - A function that takes in the tag's parameters (if any) and its
	     *             contents, and returns what its HTML open tag should be.
	     *             Example: [color=red]test[/color] would take in "=red" as a
	     *             parameter input, and "test" as a content input.
	     *             It should be noted that any BBCode inside of "content" will have
	     *             been processed by the time it enter the openTag function.
	     *
	     *   closeTag - A function that takes in the tag's parameters (if any) and its
	     *              contents, and returns what its HTML close tag should be.
	     *
	     *   displayContent - Defaults to true. If false, the content for the tag will
	     *                    not be displayed. This is useful for tags like IMG where
	     *                    its contents are actually a parameter input.
	     *
	     *   restrictChildrenTo - A list of BBCode tags which are allowed to be nested
	     *                        within this BBCode tag. If this property is omitted,
	     *                        any BBCode tag may be nested within the tag.
	     *
	     *   restrictParentsTo - A list of BBCode tags which are allowed to be parents of
	     *                       this BBCode tag. If this property is omitted, any BBCode
	     *                       tag may be a parent of the tag.
	     *
	     *   noParse - true or false. If true, none of the content WITHIN this tag will be
	     *             parsed by the XBBCode parser.
	     *
	     *
	     *
	     * LIMITIONS on adding NEW TAGS:
	     *  - Tag names should be alphanumeric (including underscores) and all tags should have an opening tag
	     *    and a closing tag.
	     *    The [*] tag is an exception because it was already a standard
	     *    bbcode tag. Technecially tags don't *have* to be alphanumeric, but since
	     *    regular expressions are used to parse the text, if you use a non-alphanumeric
	     *    tag names, just make sure the tag name gets escaped properly (if needed).
	     * --------------------------------------------------------------------------- */

	    tags = {
	        "b": {
	            openTag: function openTag(params, content) {
	                return '<strong>';
	            },
	            closeTag: function closeTag(params, content) {
	                return '</strong>';
	            }
	        },
	        /*
	            This tag does nothing and is here mostly to be used as a classification for
	            the bbcode input when evaluating parent-child tag relationships
	        */
	        "bbcode": {
	            openTag: function openTag(params, content) {
	                return '';
	            },
	            closeTag: function closeTag(params, content) {
	                return '';
	            }
	        },
	        "code": {
	            openTag: function openTag(params, content) {
	                return '<div class="code"><pre>';
	            },
	            closeTag: function closeTag(params, content) {
	                return '</pre></div>';
	            },
	            noParse: true
	        },
	        "color": {
	            openTag: function openTag(params, content) {

	                var colorCode = params.substr(1).toLowerCase() || "black";
	                colorNamePattern.lastIndex = 0;
	                colorCodePattern.lastIndex = 0;
	                if (!colorNamePattern.test(colorCode)) {
	                    if (!colorCodePattern.test(colorCode)) {
	                        colorCode = "black";
	                    } else {
	                        if (colorCode.substr(0, 1) !== "#") {
	                            colorCode = "#" + colorCode;
	                        }
	                    }
	                }

	                return '<span style="color:' + colorCode + '">';
	            },
	            closeTag: function closeTag(params, content) {
	                return '</span>';
	            }
	        },
	        "i": {
	            openTag: function openTag(params, content) {
	                return '<em>';
	            },
	            closeTag: function closeTag(params, content) {
	                return '</em>';
	            }
	        },
	        "li": {
	            openTag: function openTag(params, content) {
	                return "<li>";
	            },
	            closeTag: function closeTag(params, content) {
	                return "</li>";
	            },
	            restrictParentsTo: ["list", "ul", "ol"]
	        },
	        "ol": {
	            openTag: function openTag(params, content) {
	                return '<ol>';
	            },
	            closeTag: function closeTag(params, content) {
	                return '</ol>';
	            },
	            restrictChildrenTo: ["*", "li"]
	        },
	        "quote": {
	            openTag: function openTag(params, content) {
	                var author = '';
	                if (params) {
	                    var param = params.substr(1).replace(/^["']+|['"]+$/g, '');
	                    author = "<em>" + param + "</em><br>";
	                }
	                return "<blockquote>" + author;
	            },
	            closeTag: function closeTag(params, content) {
	                return '</blockquote>';
	            }
	        },
	        "s": {
	            openTag: function openTag(params, content) {
	                return '<strike>';
	            },
	            closeTag: function closeTag(params, content) {
	                return '</strike>';
	            }
	        },
	        "u": {
	            openTag: function openTag(params, content) {
	                return '<u>';
	            },
	            closeTag: function closeTag(params, content) {
	                return '</u>';
	            }
	        },
	        "ul": {
	            openTag: function openTag(params, content) {
	                return '<ul>';
	            },
	            closeTag: function closeTag(params, content) {
	                return '</ul>';
	            },
	            restrictChildrenTo: ["*", "li"]
	        },
	        "url": {
	            openTag: function openTag(params, content) {

	                var myUrl;

	                if (!params) {
	                    myUrl = content.replace(/<.*?>/g, "");
	                } else {
	                    myUrl = params.substr(1);
	                }

	                urlPattern.lastIndex = 0;
	                if (!urlPattern.test(myUrl)) {
	                    if (!myUrl.startsWith('#')) {
	                        myUrl = "http://" + myUrl;
	                    } else {
	                        return '<a>';
	                    }
	                }

	                return '<a href="' + myUrl + '" target="_blank">';
	            },
	            closeTag: function closeTag(params, content) {
	                return '</a>';
	            }
	        },
	        /*
	            The [*] tag is special since the user does not define a closing [/*] tag when writing their bbcode.
	            Instead this module parses the code and adds the closing [/*] tag in for them. None of the tags you
	            add will act like this and this tag is an exception to the others.
	        */
	        "*": {
	            openTag: function openTag(params, content) {
	                return "<li>";
	            },
	            closeTag: function closeTag(params, content) {
	                return "</li>";
	            },
	            restrictParentsTo: ["list", "ul", "ol"]
	        }
	    };

	    // create tag list and lookup fields
	    function initTags() {
	        tagList = [];
	        var prop, ii, len;
	        for (prop in tags) {
	            if (tags.hasOwnProperty(prop)) {
	                if (prop === "*") {
	                    tagList.push("\\" + prop);
	                } else {
	                    tagList.push(prop);
	                    if (tags[prop].noParse) {
	                        tagsNoParseList.push(prop);
	                    }
	                }

	                tags[prop].validChildLookup = {};
	                tags[prop].validParentLookup = {};
	                tags[prop].restrictParentsTo = tags[prop].restrictParentsTo || [];
	                tags[prop].restrictChildrenTo = tags[prop].restrictChildrenTo || [];

	                len = tags[prop].restrictChildrenTo.length;
	                for (ii = 0; ii < len; ii++) {
	                    tags[prop].validChildLookup[tags[prop].restrictChildrenTo[ii]] = true;
	                }
	                len = tags[prop].restrictParentsTo.length;
	                for (ii = 0; ii < len; ii++) {
	                    tags[prop].validParentLookup[tags[prop].restrictParentsTo[ii]] = true;
	                }
	            }
	        }

	        bbRegExp = new RegExp("<bbcl=([0-9]+) (" + tagList.join("|") + ")([ =][^>]*?)?>((?:.|[\\r\\n])*?)<bbcl=\\1 /\\2>", "gi");
	        pbbRegExp = new RegExp("\\[(" + tagList.join("|") + ")([ =][^\\]]*?)?\\]([^\\[]*?)\\[/\\1\\]", "gi");
	        pbbRegExp2 = new RegExp("\\[(" + tagsNoParseList.join("|") + ")([ =][^\\]]*?)?\\]([\\s\\S]*?)\\[/\\1\\]", "gi");

	        // create the regex for escaping ['s that aren't apart of tags
	        (function () {
	            var closeTagList = [];
	            for (var ii = 0; ii < tagList.length; ii++) {
	                if (tagList[ii] !== "\\*") {
	                    // the * tag doesn't have an offical closing tag
	                    closeTagList.push("/" + tagList[ii]);
	                }
	            }

	            openTags = new RegExp("(\\[)((?:" + tagList.join("|") + ")(?:[ =][^\\]]*?)?)(\\])", "gi");
	            closeTags = new RegExp("(\\[)(" + closeTagList.join("|") + ")(\\])", "gi");
	        })();
	    }
	    initTags();

	    // -----------------------------------------------------------------------------
	    // private functions
	    // -----------------------------------------------------------------------------

	    function checkParentChildRestrictions(parentTag, bbcode, bbcodeLevel, tagName, tagParams, tagContents, errQueue) {

	        errQueue = errQueue || [];
	        bbcodeLevel++;

	        // get a list of all of the child tags to this tag
	        var reTagNames = new RegExp("(<bbcl=" + bbcodeLevel + " )(" + tagList.join("|") + ")([ =>])", "gi"),
	            reTagNamesParts = new RegExp("(<bbcl=" + bbcodeLevel + " )(" + tagList.join("|") + ")([ =>])", "i"),
	            matchingTags = tagContents.match(reTagNames) || [],
	            cInfo,
	            errStr,
	            ii,
	            childTag,
	            pInfo = tags[parentTag] || {};

	        reTagNames.lastIndex = 0;

	        if (!matchingTags) {
	            tagContents = "";
	        }

	        for (ii = 0; ii < matchingTags.length; ii++) {
	            reTagNamesParts.lastIndex = 0;
	            childTag = matchingTags[ii].match(reTagNamesParts)[2].toLowerCase();

	            if (pInfo && pInfo.restrictChildrenTo && pInfo.restrictChildrenTo.length > 0) {
	                if (!pInfo.validChildLookup[childTag]) {
	                    errStr = "The tag \"" + childTag + "\" is not allowed as a child of the tag \"" + parentTag + "\".";
	                    errQueue.push(errStr);
	                }
	            }
	            cInfo = tags[childTag] || {};
	            if (cInfo.restrictParentsTo.length > 0) {
	                if (!cInfo.validParentLookup[parentTag]) {
	                    errStr = "The tag \"" + parentTag + "\" is not allowed as a parent of the tag \"" + childTag + "\".";
	                    errQueue.push(errStr);
	                }
	            }
	        }

	        tagContents = tagContents.replace(bbRegExp, function (matchStr, bbcodeLevel, tagName, tagParams, tagContents) {
	            errQueue = checkParentChildRestrictions(tagName.toLowerCase(), matchStr, bbcodeLevel, tagName, tagParams, tagContents, errQueue);
	            return matchStr;
	        });
	        return errQueue;
	    }

	    /*
	        This function updates or adds a piece of metadata to each tag called "bbcl" which
	        indicates how deeply nested a particular tag was in the bbcode. This property is removed
	        from the HTML code tags at the end of the processing.
	    */
	    function updateTagDepths(tagContents) {
	        tagContents = tagContents.replace(/\<([^\>][^\>]*?)\>/gi, function (matchStr, subMatchStr) {
	            var bbCodeLevel = subMatchStr.match(/^bbcl=([0-9]+) /);
	            if (bbCodeLevel === null) {
	                return "<bbcl=0 " + subMatchStr + ">";
	            } else {
	                return "<" + subMatchStr.replace(/^(bbcl=)([0-9]+)/, function (matchStr, m1, m2) {
	                    return m1 + (parseInt(m2, 10) + 1);
	                }) + ">";
	            }
	        });
	        return tagContents;
	    }

	    /*
	        This function removes the metadata added by the updateTagDepths function
	    */
	    function unprocess(tagContent) {
	        return tagContent.replace(/<bbcl=[0-9]+ \/\*>/gi, "").replace(/<bbcl=[0-9]+ /gi, "&#91;").replace(/>/gi, "&#93;");
	    }

	    var replaceFunct = function replaceFunct(matchStr, bbcodeLevel, tagName, tagParams, tagContents) {

	        tagName = tagName.toLowerCase();

	        var processedContent = tags[tagName].noParse ? unprocess(tagContents) : tagContents.replace(bbRegExp, replaceFunct),
	            openTag = tags[tagName].openTag(tagParams, processedContent),
	            closeTag = tags[tagName].closeTag(tagParams, processedContent);

	        if (tags[tagName].displayContent === false) {
	            processedContent = "";
	        }

	        return openTag + processedContent + closeTag;
	    };

	    function parse(config) {
	        var output = config.text;
	        output = output.replace(bbRegExp, replaceFunct);
	        return output;
	    }

	    /*
	        The star tag [*] is special in that it does not use a closing tag. Since this parser requires that tags to have a closing
	        tag, we must pre-process the input and add in closing tags [/*] for the star tag.
	        We have a little levaridge in that we know the text we're processing wont contain the <> characters (they have been
	        changed into their HTML entity form to prevent XSS and code injection), so we can use those characters as markers to
	        help us define boundaries and figure out where to place the [/*] tags.
	    */
	    function fixStarTag(text) {
	        text = text.replace(/\[(?!\*[ =\]]|list([ =][^\]]*)?\]|\/list[\]])/ig, "<");
	        text = text.replace(/\[(?=list([ =][^\]]*)?\]|\/list[\]])/ig, ">");

	        while (text !== (text = text.replace(/>list([ =][^\]]*)?\]([^>]*?)(>\/list])/gi, function (matchStr, contents, endTag) {

	            var innerListTxt = matchStr;
	            while (innerListTxt !== (innerListTxt = innerListTxt.replace(/\[\*\]([^\[]*?)(\[\*\]|>\/list])/i, function (matchStr, contents, endTag) {
	                if (endTag.toLowerCase() === ">/list]") {
	                    endTag = "</*]</list]";
	                } else {
	                    endTag = "</*][*]";
	                }
	                return "<*]" + contents + endTag;
	            }))) {}

	            innerListTxt = innerListTxt.replace(/>/g, "<");
	            return innerListTxt;
	        }))) {}

	        // add ['s for our tags back in
	        text = text.replace(/</g, "[");
	        return text;
	    }

	    function addBbcodeLevels(text) {
	        while (text !== (text = text.replace(pbbRegExp, function (matchStr, tagName, tagParams, tagContents) {
	            matchStr = matchStr.replace(/\[/g, "<");
	            matchStr = matchStr.replace(/\]/g, ">");
	            return updateTagDepths(matchStr);
	        }))) {}
	        return text;
	    }

	    // -----------------------------------------------------------------------------
	    // public functions
	    // -----------------------------------------------------------------------------

	    // API, Expose all available tags
	    me.tags = function () {
	        return tags;
	    };

	    // API
	    me.addTags = function (newtags) {
	        var tag;
	        for (tag in newtags) {
	            tags[tag] = newtags[tag];
	        }
	        initTags();
	    };

	    me.process = function (config) {

	        var ret = { html: "", error: false },
	            errQueue = [];

	        config.text = config.text.replace(/</g, "&lt;"); // escape HTML tag brackets
	        config.text = config.text.replace(/>/g, "&gt;"); // escape HTML tag brackets

	        config.text = config.text.replace(openTags, function (matchStr, openB, contents, closeB) {
	            return "<" + contents + ">";
	        });
	        config.text = config.text.replace(closeTags, function (matchStr, openB, contents, closeB) {
	            return "<" + contents + ">";
	        });

	        config.text = config.text.replace(/\[/g, "&#91;"); // escape ['s that aren't apart of tags
	        config.text = config.text.replace(/\]/g, "&#93;"); // escape ['s that aren't apart of tags
	        config.text = config.text.replace(/</g, "["); // escape ['s that aren't apart of tags
	        config.text = config.text.replace(/>/g, "]"); // escape ['s that aren't apart of tags

	        // process tags that don't have their content parsed
	        while (config.text !== (config.text = config.text.replace(pbbRegExp2, function (matchStr, tagName, tagParams, tagContents) {
	            tagContents = tagContents.replace(/\[/g, "&#91;");
	            tagContents = tagContents.replace(/\]/g, "&#93;");
	            tagParams = tagParams || "";
	            tagContents = tagContents || "";
	            return "[" + tagName + tagParams + "]" + tagContents + "[/" + tagName + "]";
	        }))) {}

	        config.text = fixStarTag(config.text); // add in closing tags for the [*] tag
	        config.text = addBbcodeLevels(config.text); // add in level metadata

	        errQueue = checkParentChildRestrictions("bbcode", config.text, -1, "", "", config.text);

	        ret.html = parse(config);

	        if (ret.html.indexOf("[") !== -1 || ret.html.indexOf("]") !== -1) {
	            errQueue.push("Some tags appear to be misaligned.");
	        }

	        if (config.removeMisalignedTags) {
	            ret.html = ret.html.replace(/\[.*?\]/g, "");
	        }
	        if (config.addInLineBreaks) {
	            ret.html = '<div style="white-space:pre-wrap;">' + ret.html + '</div>';
	        }

	        if (!config.escapeHtml) {
	            ret.html = ret.html.replace("&#91;", "["); // put ['s back in
	            ret.html = ret.html.replace("&#93;", "]"); // put ['s back in
	        }

	        // убираем лишние <br> вокруг блоковых тегов
	        ret.html = ret.html.replace(/\r?\n|\r/g, '<br>');
	        ret.html = ret.html.replace(/(<\/blockquote>|<\/ol>|<\/ul>|<\/li>|<ol>|<ul>)<br>/g, '$1');
	        ret.html = ret.html.replace(/<br>(<li>)/g, '$1');

	        // убираем пустые <a>
	        ret.html = ret.html.replace(/<a>(.+?)<\/a>/g, '$1');
	        ret.html = ret.html.replace(/<a target="_blank">(.+?)<\/a>/g, '$1');

	        // plain urls to <a>
	        ret.html = ret.html.replace(/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '<a href="$1" target="_blank">$1</a>');

	        ret.error = errQueue.length !== 0;
	        ret.errorQueue = errQueue;

	        return ret;
	    };

	    return me;
	}();

	// for node
	if (module) {
	    module.exports = XBBCODE;
	}

	exports.default = { XBBCODE: XBBCODE };
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)(module)))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports


	// module
	exports.push([module.id, ".bbcode-preview__divider {\n  margin: 1rem 0rem;\n  height: 0em;\n  font-weight: bold;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: rgba(0, 0, 0, 0.85);\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  display: table;\n  white-space: nowrap;\n  height: auto;\n  margin: '';\n  line-height: 1;\n  text-align: center;\n}\n.bbcode-preview__divider:before,\n.bbcode-preview__divider:after {\n  content: '';\n  display: table-cell;\n  position: relative;\n  top: 50%;\n  width: 50%;\n  background-repeat: no-repeat;\n  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABaAAAAACCAYAAACuTHuKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1OThBRDY4OUNDMTYxMUU0OUE3NUVGOEJDMzMzMjE2NyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1OThBRDY4QUNDMTYxMUU0OUE3NUVGOEJDMzMzMjE2NyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjU5OEFENjg3Q0MxNjExRTQ5QTc1RUY4QkMzMzMyMTY3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjU5OEFENjg4Q0MxNjExRTQ5QTc1RUY4QkMzMzMyMTY3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+VU513gAAADVJREFUeNrs0DENACAQBDBIWLGBJQby/mUcJn5sJXQmOQMAAAAAAJqt+2prAAAAAACg2xdgANk6BEVuJgyMAAAAAElFTkSuQmCC');\n}\n.bbcode-preview__divider:before {\n  background-position: right 1em top 50%;\n}\n.bbcode-preview__divider:after {\n  background-position: left 1em top 50%;\n}\n.bbcode-preview__body {\n  background-color: #FFFFCC;\n  padding: 2px;\n  border: 1px solid gray;\n  min-height: 1em;\n}\n", ""]);

	// exports


/***/ },
/* 6 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(5);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(7)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./index.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./index.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }
/******/ ]);