(function(e){if(typeof exports=="object"&&typeof module=="object")e(require("../../lib/codemirror"));else if(typeof define=="function"&&define.amd)define(["../../lib/codemirror"],e);else e(CodeMirror)})(function(e){"use strict";e.defineMode("turtle",function(e){function r(e){return new RegExp("^(?:"+e.join("|")+")$","i")}function u(e,t){var r=e.next();n=null;if(r=="<"&&!e.match(/^[\s\u00a0=]/,false)){e.match(/^[^\s\u00a0>]*>?/);return"atom"}else if(r=='"'||r=="'"){t.tokenize=a(r);return t.tokenize(e,t)}else if(/[{}\(\),\.;\[\]]/.test(r)){n=r;return null}else if(r=="#"){e.skipToEnd();return"comment"}else if(o.test(r)){e.eatWhile(o);return null}else if(r==":"){return"operator"}else{e.eatWhile(/[_\w\d]/);if(e.peek()==":"){return"variable-3"}else{var u=e.current();if(s.test(u)){return"meta"}if(r>="A"&&r<="Z"){return"comment"}else{return"keyword"}}var u=e.current();if(i.test(u))return null;else if(s.test(u))return"meta";else return"variable"}}function a(e){return function(t,n){var r=false,i;while((i=t.next())!=null){if(i==e&&!r){n.tokenize=u;break}r=!r&&i=="\\"}return"string"}}function f(e,t,n){e.context={prev:e.context,indent:e.indent,col:n,type:t}}function l(e){e.indent=e.context.indent;e.context=e.context.prev}var t=e.indentUnit;var n;var i=r([]);var s=r(["@prefix","@base","a"]);var o=/[*+\-<>=&|]/;return{startState:function(){return{tokenize:u,context:null,indent:0,col:0}},token:function(e,t){if(e.sol()){if(t.context&&t.context.align==null)t.context.align=false;t.indent=e.indentation()}if(e.eatSpace())return null;var r=t.tokenize(e,t);if(r!="comment"&&t.context&&t.context.align==null&&t.context.type!="pattern"){t.context.align=true}if(n=="(")f(t,")",e.column());else if(n=="[")f(t,"]",e.column());else if(n=="{")f(t,"}",e.column());else if(/[\]\}\)]/.test(n)){while(t.context&&t.context.type=="pattern")l(t);if(t.context&&n==t.context.type)l(t)}else if(n=="."&&t.context&&t.context.type=="pattern")l(t);else if(/atom|string|variable/.test(r)&&t.context){if(/[\}\]]/.test(t.context.type))f(t,"pattern",e.column());else if(t.context.type=="pattern"&&!t.context.align){t.context.align=true;t.context.col=e.column()}}return r},indent:function(e,n){var r=n&&n.charAt(0);var i=e.context;if(/[\]\}]/.test(r))while(i&&i.type=="pattern")i=i.prev;var s=i&&r==i.type;if(!i)return 0;else if(i.type=="pattern")return i.col;else if(i.align)return i.col+(s?0:1);else return i.indent+(s?0:t)}}});e.defineMIME("text/turtle","turtle")})