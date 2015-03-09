(function(e){if(typeof exports=="object"&&typeof module=="object")e(require("../../lib/codemirror"),require("../../mode/sql/sql"));else if(typeof define=="function"&&define.amd)define(["../../lib/codemirror","../../mode/sql/sql"],e);else e(CodeMirror)})(function(e){"use strict";function s(t){var n=t.doc.modeOption;if(n==="sql")n="text/x-sql";return e.resolveMode(n).keywords}function o(e,t){var n=e.length;var r=t.substr(0,n);return e.toUpperCase()===r.toUpperCase()}function u(e,t,n,r){for(var i in n){if(!n.hasOwnProperty(i))continue;if(Array.isArray(n)){i=n[i]}if(o(t,i)){e.push(r(i))}}}function a(e,n){var r=n.getCursor();var s=n.getTokenAt(r);var o=s.string.substr(1);var a=i(r.line,s.start);var f=n.getTokenAt(a).string;if(!t.hasOwnProperty(f)){f=h(f,n)}var l=t[f];if(!l){return}u(e,o,l,function(e){return"."+e})}function f(e,t){if(!e){return}var n=/[,;]/g;var r=e.split(" ");for(var i=0;i<r.length;i++){t(r[i]?r[i].replace(n,""):"")}}function l(e){return e.line+e.ch/Math.pow(10,6)}function c(e){return i(Math.floor(e),+e.toString().split(".").pop())}function h(e,n){var s=n.doc;var o=s.getValue();var u=e.toUpperCase();var a="";var h="";var p=[];var d={start:i(0,0),end:i(n.lastLine(),n.getLineHandle(n.lastLine()).length)};var v=o.indexOf(r.QUERY_DIV);while(v!=-1){p.push(s.posFromIndex(v));v=o.indexOf(r.QUERY_DIV,v+1)}p.unshift(i(0,0));p.push(i(n.lastLine(),n.getLineHandle(n.lastLine()).text.length));var m=0;var g=l(n.getCursor());for(var y=0;y<p.length;y++){var b=l(p[y]);if(g>m&&g<=b){d={start:c(m),end:c(b)};break}m=b}var w=s.getRange(d.start,d.end,false);for(var y=0;y<w.length;y++){var E=w[y];f(E,function(e){var n=e.toUpperCase();if(n===u&&t.hasOwnProperty(a)){h=a}if(n!==r.ALIAS_KEYWORD){a=e}});if(h){break}}return h}function p(e,r){t=r&&r.tables||{};n=n||s(e);var o=e.getCursor();var f=e.getTokenAt(o),l=f.end;var c=[];var h=f.string.trim();if(h.charAt(0)=="."){a(c,e);if(!c.length){while(f.start&&h.charAt(0)=="."){f=e.getTokenAt(i(o.line,f.start-1));h=f.string+h}u(c,h,t,function(e){return e})}}else{u(c,h,n,function(e){return e.toUpperCase()});u(c,h,t,function(e){return e})}return{list:c,from:i(o.line,f.start),to:i(o.line,l)}}var t;var n;var r={QUERY_DIV:";",ALIAS_KEYWORD:"AS"};var i=e.Pos;e.registerHelper("hint","sql",p)})