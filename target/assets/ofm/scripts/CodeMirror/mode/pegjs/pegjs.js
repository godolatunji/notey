(function(e){if(typeof exports=="object"&&typeof module=="object")e(require("../../lib/codemirror"),require("../javascript/javascript"));else if(typeof define=="function"&&define.amd)define(["../../lib/codemirror","../javascript/javascript"],e);else e(CodeMirror)})(function(e){"use strict";e.defineMode("pegjs",function(t){function r(e){return e.match(/^[a-zA-Z_][a-zA-Z0-9_]*/)}var n=e.getMode(t,"javascript");return{startState:function(){return{inString:false,stringType:null,inComment:false,inChracterClass:false,braced:0,lhs:true,localState:null}},token:function(e,t){if(e)if(!t.inString&&!t.inComment&&(e.peek()=='"'||e.peek()=="'")){t.stringType=e.peek();e.next();t.inString=true}if(!t.inString&&!t.inComment&&e.match(/^\/\*/)){t.inComment=true}if(t.inString){while(t.inString&&!e.eol()){if(e.peek()===t.stringType){e.next();t.inString=false}else if(e.peek()==="\\"){e.next();e.next()}else{e.match(/^.[^\\\"\']*/)}}return t.lhs?"property string":"string"}else if(t.inComment){while(t.inComment&&!e.eol()){if(e.match(/\*\//)){t.inComment=false}else{e.match(/^.[^\*]*/)}}return"comment"}else if(t.inChracterClass){while(t.inChracterClass&&!e.eol()){if(!(e.match(/^[^\]\\]+/)||e.match(/^\\./))){t.inChracterClass=false}}}else if(e.peek()==="["){e.next();t.inChracterClass=true;return"bracket"}else if(e.match(/^\/\//)){e.skipToEnd();return"comment"}else if(t.braced||e.peek()==="{"){if(t.localState===null){t.localState=n.startState()}var i=n.token(e,t.localState);var s=e.current();if(!i){for(var o=0;o<s.length;o++){if(s[o]==="{"){t.braced++}else if(s[o]==="}"){t.braced--}}}return i}else if(r(e)){if(e.peek()===":"){return"variable"}return"variable-2"}else if(["[","]","(",")"].indexOf(e.peek())!=-1){e.next();return"bracket"}else if(!e.eatSpace()){e.next()}return null}}},"javascript")})