(function(e){if(typeof exports=="object"&&typeof module=="object")e(require("../../lib/codemirror"),require("../markdown/markdown"),require("../../addon/mode/overlay"));else if(typeof define=="function"&&define.amd)define(["../../lib/codemirror","../markdown/markdown","../../addon/mode/overlay"],e);else e(CodeMirror)})(function(e){"use strict";e.defineMode("gfm",function(t,n){function i(e){e.code=false;return null}var r=0;var s={startState:function(){return{code:false,codeBlock:false,ateSpace:false}},copyState:function(e){return{code:e.code,codeBlock:e.codeBlock,ateSpace:e.ateSpace}},token:function(e,t){if(t.codeBlock){if(e.match(/^```/)){t.codeBlock=false;return null}e.skipToEnd();return null}if(e.sol()){t.code=false}if(e.sol()&&e.match(/^```/)){e.skipToEnd();t.codeBlock=true;return null}if(e.peek()==="`"){e.next();var n=e.pos;e.eatWhile("`");var i=1+e.pos-n;if(!t.code){r=i;t.code=true}else{if(i===r){t.code=false}}return null}else if(t.code){e.next();return null}if(e.eatSpace()){t.ateSpace=true;return null}if(e.sol()||t.ateSpace){t.ateSpace=false;if(e.match(/^(?:[a-zA-Z0-9\-_]+\/)?(?:[a-zA-Z0-9\-_]+@)?(?:[a-f0-9]{7,40}\b)/)){return"link"}else if(e.match(/^(?:[a-zA-Z0-9\-_]+\/)?(?:[a-zA-Z0-9\-_]+)?#[0-9]+\b/)){return"link"}}if(e.match(/^((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]|\([^\s()<>]*\))+(?:\([^\s()<>]*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/i)&&e.string.slice(e.start-2,e.start)!="]("){return"link"}e.next();return null},blankLine:i};var o={underscoresBreakWords:false,taskLists:true,fencedCodeBlocks:true};for(var u in n){o[u]=n[u]}o.name="markdown";e.defineMIME("gfmBase",o);return e.overlayMode(e.getMode(t,"gfmBase"),s)},"markdown")})