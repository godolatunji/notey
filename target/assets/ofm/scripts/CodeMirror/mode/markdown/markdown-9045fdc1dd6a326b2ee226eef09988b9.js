(function(e){if(typeof exports=="object"&&typeof module=="object")e(require("../../lib/codemirror",require("../xml/xml")));else if(typeof define=="function"&&define.amd)define(["../../lib/codemirror","../xml/xml"],e);else e(CodeMirror)})(function(e){"use strict";e.defineMode("markdown",function(t,n){function O(e,t,n){t.f=t.inline=n;return n(e,t)}function M(e,t,n){t.f=t.block=n;return n(e,t)}function _(e){e.linkTitle=false;e.em=false;e.strong=false;e.quote=0;if(!r&&e.f==P){e.f=F;e.block=D}e.trailingSpace=0;e.trailingSpaceNewLine=false;e.thisLineHasContent=false;return null}function D(e,t){var r=e.sol();var i=t.list!==false;if(t.list!==false&&t.indentationDiff>=0){if(t.indentationDiff<4){t.indentation-=t.indentationDiff}t.list=null}else if(t.list!==false&&t.indentation>0){t.list=null;t.listDepth=Math.floor(t.indentation/4)}else if(t.list!==false){t.list=false;t.listDepth=0}var s=null;if(t.indentationDiff>=4){t.indentation-=4;e.skipToEnd();return f}else if(e.eatSpace()){return null}else if(s=e.match(k)){t.header=s[0].length<=6?s[0].length:6;if(n.highlightFormatting)t.formatting="header";t.f=t.inline;return B(t)}else if(t.prevLineHasContent&&(s=e.match(L))){t.header=s[0].charAt(0)=="="?1:2;if(n.highlightFormatting)t.formatting="header";t.f=t.inline;return B(t)}else if(e.eat(">")){t.indentation++;t.quote=r?1:t.quote+1;if(n.highlightFormatting)t.formatting="quote";e.eatSpace();return B(t)}else if(e.peek()==="["){return O(e,t,U)}else if(e.match(x,true)){return d}else if((!t.prevLineHasContent||i)&&(e.match(T,false)||e.match(N,false))){var u=null;if(e.match(T,true)){u="ul"}else{e.match(N,true);u="ol"}t.indentation+=4;t.list=true;t.listDepth++;if(n.taskLists&&e.match(C,false)){t.taskList=true}t.f=t.inline;if(n.highlightFormatting)t.formatting=["list","list-"+u];return B(t)}else if(n.fencedCodeBlocks&&e.match(/^```([\w+#]*)/,true)){t.localMode=o(RegExp.$1);if(t.localMode)t.localState=t.localMode.startState();M(e,t,H);if(n.highlightFormatting)t.formatting="code-block";t.code=true;return B(t)}return O(e,t,t.inline)}function P(e,t){var n=i.token(e,t.htmlState);if(r&&!t.htmlState.tagName&&!t.htmlState.context||t.md_inside&&e.current().indexOf(">")>-1){t.f=F;t.block=D;t.htmlState=null}return n}function H(e,t){if(e.sol()&&e.match(/^```/,true)){t.localMode=t.localState=null;t.f=F;t.block=D;if(n.highlightFormatting)t.formatting="code-block";t.code=true;var r=B(t);t.code=false;return r}else if(t.localMode){return t.localMode.token(e,t.localState)}else{e.skipToEnd();return f}}function B(e){var t=[];if(e.formatting){t.push(m);if(typeof e.formatting==="string")e.formatting=[e.formatting];for(var r=0;r<e.formatting.length;r++){t.push(m+"-"+e.formatting[r]);if(e.formatting[r]==="header"){t.push(m+"-"+e.formatting[r]+"-"+e.header)}if(e.formatting[r]==="quote"){if(!n.maxBlockquoteDepth||n.maxBlockquoteDepth>=e.quote){t.push(m+"-"+e.formatting[r]+"-"+e.quote)}else{t.push("error")}}}}if(e.taskOpen){t.push("meta");return t.length?t.join(" "):null}if(e.taskClosed){t.push("property");return t.length?t.join(" "):null}if(e.linkHref){t.push(w);return t.length?t.join(" "):null}if(e.strong){t.push(S)}if(e.em){t.push(E)}if(e.linkText){t.push(b)}if(e.code){t.push(f)}if(e.header){t.push(a);t.push(a+"-"+e.header)}if(e.quote){t.push(l);if(!n.maxBlockquoteDepth||n.maxBlockquoteDepth>=e.quote){t.push(l+"-"+e.quote)}else{t.push(l+"-"+n.maxBlockquoteDepth)}}if(e.list!==false){var i=(e.listDepth-1)%3;if(!i){t.push(c)}else if(i===1){t.push(h)}else{t.push(p)}}if(e.trailingSpaceNewLine){t.push("trailing-space-new-line")}else if(e.trailingSpace){t.push("trailing-space-"+(e.trailingSpace%2?"a":"b"))}return t.length?t.join(" "):null}function j(e,t){if(e.match(A,true)){return B(t)}return undefined}function F(t,r){var s=r.text(t,r);if(typeof s!=="undefined")return s;if(r.list){r.list=null;return B(r)}if(r.taskList){var o=t.match(C,true)[1]!=="x";if(o)r.taskOpen=true;else r.taskClosed=true;if(n.highlightFormatting)r.formatting="task";r.taskList=false;return B(r)}r.taskOpen=false;r.taskClosed=false;if(r.header&&t.match(/^#+$/,true)){if(n.highlightFormatting)r.formatting="header";return B(r)}var a=t.sol();var f=t.next();if(r.escape){r.escape=false;return B(r)}if(f==="\\"){if(n.highlightFormatting)r.formatting="escape";r.escape=true;return B(r)}if(r.linkTitle){r.linkTitle=false;var l=f;if(f==="("){l=")"}l=(l+"").replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1");var c="^\\s*(?:[^"+l+"\\\\]+|\\\\\\\\|\\\\.)"+l;if(t.match(new RegExp(c),true)){return w}}if(f==="`"){var h=r.formatting;if(n.highlightFormatting)r.formatting="code";var p=B(r);var d=t.pos;t.eatWhile("`");var m=1+t.pos-d;if(!r.code){u=m;r.code=true;return B(r)}else{if(m===u){r.code=false;return p}r.formatting=h;return B(r)}}else if(r.code){return B(r)}if(f==="!"&&t.match(/\[[^\]]*\] ?(?:\(|\[)/,false)){t.match(/\[[^\]]*\]/);r.inline=r.f=q;return v}if(f==="["&&t.match(/.*\](\(| ?\[)/,false)){r.linkText=true;if(n.highlightFormatting)r.formatting="link";return B(r)}if(f==="]"&&r.linkText){if(n.highlightFormatting)r.formatting="link";var b=B(r);r.linkText=false;r.inline=r.f=q;return b}if(f==="<"&&t.match(/^(https?|ftps?):\/\/(?:[^\\>]|\\.)+>/,false)){r.f=r.inline=I;if(n.highlightFormatting)r.formatting="link";var b=B(r);if(b){b+=" "}else{b=""}return b+g}if(f==="<"&&t.match(/^[^> \\]+@(?:[^\\>]|\\.)+>/,false)){r.f=r.inline=I;if(n.highlightFormatting)r.formatting="link";var b=B(r);if(b){b+=" "}else{b=""}return b+y}if(f==="<"&&t.match(/^\w/,false)){if(t.string.indexOf(">")!=-1){var E=t.string.substring(1,t.string.indexOf(">"));if(/markdown\s*=\s*('|"){0,1}1('|"){0,1}/.test(E)){r.md_inside=true}}t.backUp(1);r.htmlState=e.startState(i);return M(t,r,P)}if(f==="<"&&t.match(/^\/\w*?>/)){r.md_inside=false;return"tag"}var S=false;if(!n.underscoresBreakWords){if(f==="_"&&t.peek()!=="_"&&t.match(/(\w)/,false)){var x=t.pos-2;if(x>=0){var T=t.string.charAt(x);if(T!=="_"&&T.match(/(\w)/,false)){S=true}}}}if(f==="*"||f==="_"&&!S){if(a&&t.peek()===" "){}else if(r.strong===f&&t.eat(f)){if(n.highlightFormatting)r.formatting="strong";var p=B(r);r.strong=false;return p}else if(!r.strong&&t.eat(f)){r.strong=f;if(n.highlightFormatting)r.formatting="strong";return B(r)}else if(r.em===f){if(n.highlightFormatting)r.formatting="em";var p=B(r);r.em=false;return p}else if(!r.em){r.em=f;if(n.highlightFormatting)r.formatting="em";return B(r)}}else if(f===" "){if(t.eat("*")||t.eat("_")){if(t.peek()===" "){return B(r)}else{t.backUp(1)}}}if(f===" "){if(t.match(/ +$/,false)){r.trailingSpace++}else if(r.trailingSpace){r.trailingSpaceNewLine=true}}return B(r)}function I(e,t){var r=e.next();if(r===">"){t.f=t.inline=F;if(n.highlightFormatting)t.formatting="link";var i=B(t);if(i){i+=" "}else{i=""}return i+g}e.match(/^[^>]+/,true);return g}function q(e,t){if(e.eatSpace()){return null}var r=e.next();if(r==="("||r==="["){t.f=t.inline=R(r==="("?")":"]");if(n.highlightFormatting)t.formatting="link-string";t.linkHref=true;return B(t)}return"error"}function R(e){return function(t,r){var i=t.next();if(i===e){r.f=r.inline=F;if(n.highlightFormatting)r.formatting="link-string";var s=B(r);r.linkHref=false;return s}if(t.match(V(e),true)){t.backUp(1)}r.linkHref=true;return B(r)}}function U(e,t){if(e.match(/^[^\]]*\]:/,false)){t.f=z;e.next();if(n.highlightFormatting)t.formatting="link";t.linkText=true;return B(t)}return O(e,t,F)}function z(e,t){if(e.match(/^\]:/,true)){t.f=t.inline=W;if(n.highlightFormatting)t.formatting="link";var r=B(t);t.linkText=false;return r}e.match(/^[^\]]+/,true);return b}function W(e,t){if(e.eatSpace()){return null}e.match(/^[^\s]+/,true);if(e.peek()===undefined){t.linkTitle=true}else{e.match(/^(?:\s+(?:"(?:[^"\\]|\\\\|\\.)+"|'(?:[^'\\]|\\\\|\\.)+'|\((?:[^)\\]|\\\\|\\.)+\)))?/,true)}t.f=t.inline=F;return w}function V(e){if(!X[e]){e=(e+"").replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1");X[e]=new RegExp("^(?:[^\\\\]|\\\\.)*?("+e+")")}return X[e]}var r=e.modes.hasOwnProperty("xml");var i=e.getMode(t,r?{name:"xml",htmlMode:true}:"text/plain");var s={html:"htmlmixed",js:"javascript",json:"application/json",c:"text/x-csrc","c++":"text/x-c++src",java:"text/x-java",csharp:"text/x-csharp","c#":"text/x-csharp",scala:"text/x-scala"};var o=function(){var n,r={},i={},o;var u=[];for(var a in e.modes)if(e.modes.propertyIsEnumerable(a))u.push(a);for(n=0;n<u.length;n++){r[u[n]]=u[n]}var f=[];for(var a in e.mimeModes)if(e.mimeModes.propertyIsEnumerable(a))f.push({mime:a,mode:e.mimeModes[a]});for(n=0;n<f.length;n++){o=f[n].mime;i[o]=f[n].mime}for(var l in s){if(s[l]in r||s[l]in i)r[l]=s[l]}return function(n){return r[n]?e.getMode(t,r[n]):null}}();if(n.highlightFormatting===undefined)n.highlightFormatting=false;if(n.maxBlockquoteDepth===undefined)n.maxBlockquoteDepth=0;if(n.underscoresBreakWords===undefined)n.underscoresBreakWords=true;if(n.fencedCodeBlocks===undefined)n.fencedCodeBlocks=false;if(n.taskLists===undefined)n.taskLists=false;var u=0;var a="header",f="comment",l="quote",c="variable-2",h="variable-3",p="keyword",d="hr",v="tag",m="formatting",g="link",y="link",b="link",w="string",E="em",S="strong";var x=/^([*\-=_])(?:\s*\1){2,}\s*$/,T=/^[*\-+]\s+/,N=/^[0-9]+\.\s+/,C=/^\[(x| )\](?=\s)/,k=/^#+/,L=/^(?:\={1,}|-{1,})$/,A=/^[^#!\[\]*_\\<>` "'(]+/;var X=[];var $={startState:function(){return{f:D,prevLineHasContent:false,thisLineHasContent:false,block:D,htmlState:null,indentation:0,inline:F,text:j,escape:false,formatting:false,linkText:false,linkHref:false,linkTitle:false,em:false,strong:false,header:0,taskList:false,list:false,listDepth:0,quote:0,trailingSpace:0,trailingSpaceNewLine:false}},copyState:function(t){return{f:t.f,prevLineHasContent:t.prevLineHasContent,thisLineHasContent:t.thisLineHasContent,block:t.block,htmlState:t.htmlState&&e.copyState(i,t.htmlState),indentation:t.indentation,localMode:t.localMode,localState:t.localMode?e.copyState(t.localMode,t.localState):null,inline:t.inline,text:t.text,escape:false,formatting:false,linkTitle:t.linkTitle,em:t.em,strong:t.strong,header:t.header,taskList:t.taskList,list:t.list,listDepth:t.listDepth,quote:t.quote,trailingSpace:t.trailingSpace,trailingSpaceNewLine:t.trailingSpaceNewLine,md_inside:t.md_inside}},token:function(e,t){t.formatting=false;if(e.sol()){var n=e.match(/^\s*$/,true)||t.header;t.header=0;if(n){t.prevLineHasContent=false;return _(t)}else{t.prevLineHasContent=t.thisLineHasContent;t.thisLineHasContent=true}t.escape=false;t.taskList=false;t.code=false;t.trailingSpace=0;t.trailingSpaceNewLine=false;t.f=t.block;var r=e.match(/^\s*/,true)[0].replace(/\t/g,"    ").length;var i=Math.floor((r-t.indentation)/4)*4;if(i>4)i=4;var s=t.indentation+i;t.indentationDiff=s-t.indentation;t.indentation=s;if(r>0)return null}return t.f(e,t)},innerMode:function(e){if(e.block==P)return{state:e.htmlState,mode:i};if(e.localState)return{state:e.localState,mode:e.localMode};return{state:e,mode:$}},blankLine:_,getType:B,fold:"markdown"};return $},"xml");e.defineMIME("text/x-markdown","markdown")})