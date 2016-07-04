// https://github.com/DigitalRootsCRM/bbcode

var VERSION = '0.4.0',
// default options
    defaults = {
        showQuotePrefix: false,
        classPrefix: 'bbcode_',
        mentionPrefix: '@'
    };

export var version = VERSION;

// copied from here:
// http://blog.mattheworiordan.com/post/13174566389/url-regular-expression-for-links-with-or-without-the had to make an
// update to allow / in the query string, since some sites will have a / there made another update to support colons in
// the query string made another update to disallow an ending dot(.)
var URL_PATTERN = new RegExp("(" // overall match
    + "(" // brackets covering match for protocol (optional) and domain
    + "([A-Za-z]{3,9}:(?:\\/\\/)?)" // allow something@ for email addresses
    + "(?:[\\-;:&=\\+\\$,\\w]+@)?[A-Za-z0-9\\.\\-]+[A-Za-z0-9\\-]"
    // anything looking at all like a domain, non-unicode domains
    + "|" // or instead of above
    + "(?:www\\.|[\\-;:&=\\+\\$,\\w]+@)" // starting with something@ or www.
    + "[A-Za-z0-9\\.\\-]+[A-Za-z0-9\\-]" // anything looking at all like a domain
    + ")" // end protocol/domain
    + "(" // brackets covering match for path, query string and anchor
    + "(?:\\/[\\+~%\\/\\.\\w\\-_]*)?" // allow optional /path
    + "\\??(?:[\\-\\+=&;%@\\.\\w_\\/:]*)" // allow optional query string starting with ?
    + "#?(?:[\\.\\!\\/\\\\\\w]*)" // allow optional anchor #anchor
    + ")?" // make URL suffix optional
    + ")");

function doReplace(content, matches, options) {
    var i, obj, regex, hasMatch, tmp;
    // match/replace until we don't change the input anymore
    do {
        hasMatch = false;
        for (i = 0; i < matches.length; ++i) {
            obj = matches[i];
            regex = new RegExp(obj.e, 'gi');
            tmp = content.replace(regex, obj.func.bind(undefined, options));
            if (tmp !== content) {
                content = tmp;
                hasMatch = true;
            }
        }
    } while (hasMatch);
    return content;
}

function listItemReplace(options, fullMatch, tag, value) {
    return '<li>' + value.trim() + '</li>';
}

export var extractQuotedText = function (value, parts) {
    var quotes = ["\"", "'"], i, quote, nextPart;

    for (i = 0; i < quotes.length; ++i) {
        quote = quotes[i];
        if (value && value[0] === quote) {
            value = value.slice(1);
            if (value[value.length - 1] !== quote) {
                while (parts && parts.length) {
                    nextPart = parts.shift();
                    value += " " + nextPart;
                    if (nextPart[nextPart.length - 1] === quote) {
                        break;
                    }
                }
            }
            value = value.replace(new RegExp("[" + quote + "]+$"), '');
            break;
        }
    }
    return [value, parts];
};

export var parseParams = function (tagName, params) {

    var parts, rv, part, index, paramMap = {};

    if (!params) {
        return paramMap;
    }

    // first, collapse spaces next to equals
    params = params.replace(/\s*[=]\s*/g, "=");
    parts = params.split(/\s+/);

    while (parts.length) {
        part = parts.shift();
        // check if the param itself is a valid url
        if (!URL_PATTERN.exec(part)) {
            index = part.indexOf('=');
            if (index > 0) {
                rv = extractQuotedText(part.slice(index + 1), parts);
                paramMap[part.slice(0, index).toLowerCase()] = rv[0];
                parts = rv[1];
            }
            else {
                rv = extractQuotedText(part, parts);
                paramMap[tagName] = rv[0];
                parts = rv[1];
            }
        } else {
            rv = extractQuotedText(part, parts);
            paramMap[tagName] = rv[0];
            parts = rv[1];
        }
    }
    return paramMap;
};


function tagReplace(options, fullMatch, tag, params, value) {
    var tmp, className, inlineValue, i, val;

    tag = tag.toLowerCase();
    params = parseParams(tag, params || undefined);
    inlineValue = params[tag];

    switch (tag) {
        case 'quote':
            let author = '';
            for (i in params) {
                tmp = params[i];
                if (!inlineValue && (i === 'author' || i === 'name')) {
                    inlineValue = tmp;
                } else if (i !== tag) {
                    val += ' data-' + i + '="' + tmp + '"';
                }
            }

            if (inlineValue) {
                author = `<em>${inlineValue}</em><br>`;
            }

          return `<blockquote>${author}${value}</blockquote>`;
        case 'url':
            return '<a href="' + (inlineValue || value) + '">' + value + '</a>';
        case 'b':
            return '<strong>' + value + '</strong>';
        case 'i':
            return '<em>' + value + '</em>';
        case 'u':
            return '<u>' + value + '</u>';
        case 's':
            return '<strike>' + value + '</strike>';
        case 'list':
            tag = 'ul';
            className = options.classPrefix + 'list';
            if (inlineValue && /[1Aa]/.test(inlineValue)) {
                tag = 'ol';
                if (/1/.test(inlineValue)) {
                    className += '_numeric';
                }
                else if (/A/.test(inlineValue)) {
                    className += '_alpha';
                }
                else if (/a/.test(inlineValue)) {
                    className += '_alpha_lower';
                }
            }
            val = '<' + tag + ' class="' + className + '">';
            //  parse the value
            val += doReplace(value, [{e: '\\[([*])\\]([^\r\n\\[\\<]+)', func: listItemReplace}], options);
            return val + '</' + tag + '>';
        case 'code':
            return '<div class="code"><pre>' + value + '</pre></div>';
    }
    // return the original
    return fullMatch;
}

/**
 * Renders the content as html
 * @param content   the given content to render
 * @param options   optional object with control parameters
 * @returns rendered html
 */
export var render = function (content, options) {
    var matches = [], tmp;

    options = options || {};
    for (tmp in defaults) {
        if (!Object.prototype.hasOwnProperty.call(options, tmp)) {
            options[tmp] = defaults[tmp];
        }
    }
    // for now, only one rule
    matches.push({e: '\\[(\\w+)(?:[= ]([^\\]]+))?]((?:.|[\r\n])*?)\\[/\\1]', func: tagReplace});
    return doReplace(content, matches, options);
};
