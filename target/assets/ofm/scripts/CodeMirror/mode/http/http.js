(function(e){if(typeof exports=="object"&&typeof module=="object")e(require("../../lib/codemirror"));else if(typeof define=="function"&&define.amd)define(["../../lib/codemirror"],e);else e(CodeMirror)})(function(e){"use strict";e.defineMode("http",function(){function e(e,t){e.skipToEnd();t.cur=o;return"error"}function t(t,r){if(t.match(/^HTTP\/\d\.\d/)){r.cur=n;return"keyword"}else if(t.match(/^[A-Z]+/)&&/[ \t]/.test(t.peek())){r.cur=i;return"keyword"}else{return e(t,r)}}function n(t,n){var i=t.match(/^\d+/);if(!i)return e(t,n);n.cur=r;var s=Number(i[0]);if(s>=100&&s<200){return"positive informational"}else if(s>=200&&s<300){return"positive success"}else if(s>=300&&s<400){return"positive redirect"}else if(s>=400&&s<500){return"negative client-error"}else if(s>=500&&s<600){return"negative server-error"}else{return"error"}}function r(e,t){e.skipToEnd();t.cur=o;return null}function i(e,t){e.eatWhile(/\S/);t.cur=s;return"string-2"}function s(t,n){if(t.match(/^HTTP\/\d\.\d$/)){n.cur=o;return"keyword"}else{return e(t,n)}}function o(e){if(e.sol()&&!e.eat(/[ \t]/)){if(e.match(/^.*?:/)){return"atom"}else{e.skipToEnd();return"error"}}else{e.skipToEnd();return"string"}}function u(e){e.skipToEnd();return null}return{token:function(e,t){var n=t.cur;if(n!=o&&n!=u&&e.eatSpace())return null;return n(e,t)},blankLine:function(e){e.cur=u},startState:function(){return{cur:t}}}});e.defineMIME("message/http","http")})