(function(e){if(typeof exports=="object"&&typeof module=="object")e(require("../../lib/codemirror"));else if(typeof define=="function"&&define.amd)define(["../../lib/codemirror"],e);else e(CodeMirror)})(function(e){"use strict";var t=/[\w$]+/,n=500;e.registerHelper("hint","anyword",function(r,i){var s=i&&i.word||t;var o=i&&i.range||n;var u=r.getCursor(),a=r.getLine(u.line);var f=u.ch,l=f;while(l<a.length&&s.test(a.charAt(l)))++l;while(f&&s.test(a.charAt(f-1)))--f;var c=f!=l&&a.slice(f,l);var h=[],p={};var d=new RegExp(s.source,"g");for(var v=-1;v<=1;v+=2){var m=u.line,g=Math.min(Math.max(m+v*o,r.firstLine()),r.lastLine())+v;for(;m!=g;m+=v){var y=r.getLine(m),b;while(b=d.exec(y)){if(m==u.line&&b[0]===c)continue;if((!c||b[0].lastIndexOf(c,0)==0)&&!Object.prototype.hasOwnProperty.call(p,b[0])){p[b[0]]=true;h.push(b[0])}}}}return{list:h,from:e.Pos(u.line,f),to:e.Pos(u.line,l)}})})