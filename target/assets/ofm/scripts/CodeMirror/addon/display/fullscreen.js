(function(e){if(typeof exports=="object"&&typeof module=="object")e(require("../../lib/codemirror"));else if(typeof define=="function"&&define.amd)define(["../../lib/codemirror"],e);else e(CodeMirror)})(function(e){"use strict";function t(e){var t=e.getWrapperElement();e.state.fullScreenRestore={scrollTop:window.pageYOffset,scrollLeft:window.pageXOffset,width:t.style.width,height:t.style.height};t.style.width="";t.style.height="auto";t.className+=" CodeMirror-fullscreen";document.documentElement.style.overflow="hidden";e.refresh()}function n(e){var t=e.getWrapperElement();t.className=t.className.replace(/\s*CodeMirror-fullscreen\b/,"");document.documentElement.style.overflow="";var n=e.state.fullScreenRestore;t.style.width=n.width;t.style.height=n.height;window.scrollTo(n.scrollLeft,n.scrollTop);e.refresh()}e.defineOption("fullScreen",false,function(r,i,s){if(s==e.Init)s=false;if(!s==!i)return;if(i)t(r);else n(r)})})