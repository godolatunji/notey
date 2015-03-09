(function(e){if(typeof exports=="object"&&typeof module=="object")e(require("../../lib/codemirror"));else if(typeof define=="function"&&define.amd)define(["../../lib/codemirror"],e);else e(CodeMirror)})(function(e){"use strict";function n(e,t,n){var r=n.paragraphStart||e.getHelper(t,"paragraphStart");for(var i=t.line,s=e.firstLine();i>s;--i){var o=e.getLine(i);if(r&&r.test(o))break;if(!/\S/.test(o)){++i;break}}var u=n.paragraphEnd||e.getHelper(t,"paragraphEnd");for(var a=t.line+1,f=e.lastLine();a<=f;++a){var o=e.getLine(a);if(u&&u.test(o)){++a;break}if(!/\S/.test(o))break}return{from:i,to:a}}function r(e,t,n,r){for(var i=t;i>0;--i)if(n.test(e.slice(i-1,i+1)))break;if(i==0)i=t;var s=i;if(r)while(e.charAt(s-1)==" ")--s;return{from:s,to:i}}function i(n,i,s,o){i=n.clipPos(i);s=n.clipPos(s);var u=o.column||80;var a=o.wrapOn||/\s\S|-[^\.\d]/;var f=o.killTrailingSpace!==false;var l=[],c="",h=i.line;var p=n.getRange(i,s,false);if(!p.length)return null;var d=p[0].match(/^[ \t]*/)[0];for(var v=0;v<p.length;++v){var m=p[v],g=c.length,y=0;if(c&&m&&!a.test(c.charAt(c.length-1)+m.charAt(0))){c+=" ";y=1}var b="";if(v){b=m.match(/^\s*/)[0];m=m.slice(b.length)}c+=m;if(v){var w=c.length>u&&d==b&&r(c,u,a,f);if(!w||w.from!=g||w.to!=g+y){l.push({text:[y?" ":""],from:t(h,g),to:t(h+1,b.length)})}else{c=d+m;++h}}while(c.length>u){var E=r(c,u,a,f);l.push({text:["",d],from:t(h,E.from),to:t(h,E.to)});c=d+c.slice(E.to);++h}}if(l.length)n.operation(function(){for(var e=0;e<l.length;++e){var t=l[e];n.replaceRange(t.text,t.from,t.to)}});return l.length?{from:l[0].from,to:e.changeEnd(l[l.length-1])}:null}var t=e.Pos;e.defineExtension("wrapParagraph",function(e,r){r=r||{};if(!e)e=this.getCursor();var s=n(this,e,r);return i(this,t(s.from,0),t(s.to-1),r)});e.commands.wrapLines=function(e){e.operation(function(){var r=e.listSelections(),s=e.lastLine()+1;for(var o=r.length-1;o>=0;o--){var u=r[o],a;if(u.empty()){var f=n(e,u.head,{});a={from:t(f.from,0),to:t(f.to-1)}}else{a={from:u.from(),to:u.to()}}if(a.to.line>=s)continue;s=a.from.line;i(e,a.from,a.to,{})}})};e.defineExtension("wrapRange",function(e,t,n){return i(this,e,t,n||{})});e.defineExtension("wrapParagraphsInRange",function(e,r,s){s=s||{};var o=this,u=[];for(var a=e.line;a<=r.line;){var f=n(o,t(a,0),s);u.push(f);a=f.to}var l=false;if(u.length)o.operation(function(){for(var e=u.length-1;e>=0;--e)l=l||i(o,t(u[e].from,0),t(u[e].to-1),s)});return l})})