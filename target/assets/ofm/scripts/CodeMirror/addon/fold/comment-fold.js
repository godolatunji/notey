(function(e){if(typeof exports=="object"&&typeof module=="object")e(require("../../lib/codemirror"));else if(typeof define=="function"&&define.amd)define(["../../lib/codemirror"],e);else e(CodeMirror)})(function(e){"use strict";e.registerGlobalHelper("fold","comment",function(e){return e.blockCommentStart&&e.blockCommentEnd},function(t,n){var r=t.getModeAt(n),i=r.blockCommentStart,s=r.blockCommentEnd;if(!i||!s)return;var o=n.line,u=t.getLine(o);var a;for(var f=n.ch,l=0;;){var c=f<=0?-1:u.lastIndexOf(i,f-1);if(c==-1){if(l==1)return;l=1;f=u.length;continue}if(l==1&&c<n.ch)return;if(/comment/.test(t.getTokenTypeAt(e.Pos(o,c+1)))){a=c+i.length;break}f=c-1}var h=1,p=t.lastLine(),d,v;e:for(var m=o;m<=p;++m){var g=t.getLine(m),y=m==o?a:0;for(;;){var b=g.indexOf(i,y),w=g.indexOf(s,y);if(b<0)b=g.length;if(w<0)w=g.length;y=Math.min(b,w);if(y==g.length)break;if(y==b)++h;else if(!--h){d=m;v=y;break e}++y}}if(d==null||o==d&&v==a)return;return{from:e.Pos(o,a),to:e.Pos(d,v)}})})