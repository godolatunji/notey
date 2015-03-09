(function(e){if(typeof exports=="object"&&typeof module=="object")e(require("../../lib/codemirror"));else if(typeof define=="function"&&define.amd)define(["../../lib/codemirror"],e);else e(CodeMirror)})(function(e){"use strict";e.defineMode("sieve",function(e){function t(e){var t={},n=e.split(" ");for(var r=0;r<n.length;++r)t[n[r]]=true;return t}function s(e,t){var i=e.next();if(i=="/"&&e.eat("*")){t.tokenize=u;return u(e,t)}if(i==="#"){e.skipToEnd();return"comment"}if(i=='"'){t.tokenize=a(i);return t.tokenize(e,t)}if(i=="("){t._indent.push("(");t._indent.push("{");return null}if(i==="{"){t._indent.push("{");return null}if(i==")"){t._indent.pop();t._indent.pop()}if(i==="}"){t._indent.pop();return null}if(i==",")return null;if(i==";")return null;if(/[{}\(\),;]/.test(i))return null;if(/\d/.test(i)){e.eatWhile(/[\d]/);e.eat(/[KkMmGg]/);return"number"}if(i==":"){e.eatWhile(/[a-zA-Z_]/);e.eatWhile(/[a-zA-Z0-9_]/);return"operator"}e.eatWhile(/\w/);var s=e.current();if(s=="text"&&e.eat(":")){t.tokenize=o;return"string"}if(n.propertyIsEnumerable(s))return"keyword";if(r.propertyIsEnumerable(s))return"atom";return null}function o(e,t){t._multiLineString=true;if(!e.sol()){e.eatSpace();if(e.peek()=="#"){e.skipToEnd();return"comment"}e.skipToEnd();return"string"}if(e.next()=="."&&e.eol()){t._multiLineString=false;t.tokenize=s}return"string"}function u(e,t){var n=false,r;while((r=e.next())!=null){if(n&&r=="/"){t.tokenize=s;break}n=r=="*"}return"comment"}function a(e){return function(t,n){var r=false,i;while((i=t.next())!=null){if(i==e&&!r)break;r=!r&&i=="\\"}if(!r)n.tokenize=s;return"string"}}var n=t("if elsif else stop require");var r=t("true false not");var i=e.indentUnit;return{startState:function(e){return{tokenize:s,baseIndent:e||0,_indent:[]}},token:function(e,t){if(e.eatSpace())return null;return(t.tokenize||s)(e,t);},indent:function(e,t){var n=e._indent.length;if(t&&t[0]=="}")n--;if(n<0)n=0;return n*i},electricChars:"}"}});e.defineMIME("application/sieve","sieve")})