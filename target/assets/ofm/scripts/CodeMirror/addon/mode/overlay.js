(function(e){if(typeof exports=="object"&&typeof module=="object")e(require("../../lib/codemirror"));else if(typeof define=="function"&&define.amd)define(["../../lib/codemirror"],e);else e(CodeMirror)})(function(e){"use strict";e.overlayMode=function(t,n,r){return{startState:function(){return{base:e.startState(t),overlay:e.startState(n),basePos:0,baseCur:null,overlayPos:0,overlayCur:null}},copyState:function(r){return{base:e.copyState(t,r.base),overlay:e.copyState(n,r.overlay),basePos:r.basePos,baseCur:null,overlayPos:r.overlayPos,overlayCur:null}},token:function(e,i){if(e.start==i.basePos){i.baseCur=t.token(e,i.base);i.basePos=e.pos}if(e.start==i.overlayPos){e.pos=e.start;i.overlayCur=n.token(e,i.overlay);i.overlayPos=e.pos}e.pos=Math.min(i.basePos,i.overlayPos);if(e.eol())i.basePos=i.overlayPos=0;if(i.overlayCur==null)return i.baseCur;if(i.baseCur!=null&&r)return i.baseCur+" "+i.overlayCur;else return i.overlayCur},indent:t.indent&&function(e,n){return t.indent(e.base,n)},electricChars:t.electricChars,innerMode:function(e){return{state:e.base,mode:t}},blankLine:function(e){if(t.blankLine)t.blankLine(e.base);if(n.blankLine)n.blankLine(e.overlay)}}}})