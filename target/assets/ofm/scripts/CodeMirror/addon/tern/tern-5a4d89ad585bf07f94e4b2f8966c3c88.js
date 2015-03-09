(function(e){if(typeof exports=="object"&&typeof module=="object")e(require("../../lib/codemirror"));else if(typeof define=="function"&&define.amd)define(["../../lib/codemirror"],e);else e(CodeMirror)})(function(e){"use strict";function i(e,t,n){var r=e.docs[t];if(r)n(P(e,r));else if(e.options.getFile)e.options.getFile(t,n);else n(null)}function s(e,t,n){for(var r in e.docs){var i=e.docs[r];if(i.doc==t)return i}if(!n)for(var s=0;;++s){r="[doc"+(s||"")+"]";if(!e.docs[r]){n=r;break}}return e.addDoc(n,t)}function o(e,t,n){var i=s(e,t);var o=e.cachedArgHints;if(o&&o.doc==t&&N(o.start,n.to)<=0)e.cachedArgHints=null;var a=i.changed;if(a==null)i.changed=a={from:n.from.line,to:n.from.line};var f=n.from.line+(n.text.length-1);if(n.from.line<a.to)a.to=a.to-(n.to.line-f);if(f>=a.to)a.to=f+1;if(a.from>n.from.line)a.from=n.from.line;if(t.lineCount()>r&&n.to-a.from>100)setTimeout(function(){if(i.changed&&i.changed.to-i.changed.from>100)u(e,i)},200)}function u(e,t){e.server.request({files:[{type:"full",name:t.name,text:P(e,t)}]},function(e){if(e)window.console.error(e);else t.changed=null})}function a(r,i,s){r.request(i,{type:"completions",types:true,docs:true,urls:true},function(o,u){if(o)return _(r,i,o);var a=[],l="";var c=u.start,h=u.end;if(i.getRange(t(c.line,c.ch-2),c)=='["'&&i.getRange(h,t(h.line,h.ch+2))!='"]')l='"]';for(var p=0;p<u.completions.length;++p){var d=u.completions[p],v=f(d.type);if(u.guess)v+=" "+n+"guess";a.push({text:d.name+l,displayText:d.name,className:v,data:d})}var m={from:c,to:h,list:a};var g=null;e.on(m,"close",function(){O(g)});e.on(m,"update",function(){O(g)});e.on(m,"select",function(e,t){O(g);var i=r.options.completionTip?r.options.completionTip(e.data):e.data.doc;if(i){g=A(t.parentNode.getBoundingClientRect().right+window.pageXOffset,t.getBoundingClientRect().top+window.pageYOffset,i);g.className+=" "+n+"hint-doc"}});s(m)})}function f(e){var t;if(e=="?")t="unknown";else if(e=="number"||e=="string"||e=="bool")t=e;else if(/^fn\(/.test(e))t="fn";else if(/^\[/.test(e))t="array";else t="object";return n+"completion "+n+"completion-"+t}function l(e,t,n){e.request(t,"type",function(n,r){if(n)return _(e,t,n);if(e.options.typeTip){var i=e.options.typeTip(r)}else{var i=C("span",null,C("strong",null,r.type||"not found"));if(r.doc)i.appendChild(document.createTextNode(" — "+r.doc));if(r.url){i.appendChild(document.createTextNode(" "));i.appendChild(C("a",null,"[docs]")).href=r.url}}L(t,i)},n)}function c(n,r){D(n);if(r.somethingSelected())return;var i=r.getTokenAt(r.getCursor()).state;var s=e.innerMode(r.getMode(),i);if(s.mode.name!="javascript")return;var o=s.state.lexical;if(o.info!="call")return;var u,a=o.pos||0,f=r.getOption("tabSize");for(var l=r.getCursor().line,c=Math.max(0,l-9),d=false;l>=c;--l){var v=r.getLine(l),m=0;for(var g=0;;){var y=v.indexOf("	",g);if(y==-1)break;m+=f-(y+m)%f-1;g=y+1}u=o.column-m;if(v.charAt(u)=="("){d=true;break}}if(!d)return;var b=t(l,u);var w=n.cachedArgHints;if(w&&w.doc==r.getDoc()&&N(b,w.start)==0)return h(n,r,a);n.request(r,{type:"type",preferFunction:true,end:b},function(e,t){if(e||!t.type||!/^fn\(/.test(t.type))return;n.cachedArgHints={start:g,type:p(t.type),name:t.exprName||t.name||"fn",guess:t.guess,doc:r.getDoc()};h(n,r,a)})}function h(e,t,r){D(e);var i=e.cachedArgHints,s=i.type;var o=C("span",i.guess?n+"fhint-guess":null,C("span",n+"fname",i.name),"(");for(var u=0;u<s.args.length;++u){if(u)o.appendChild(document.createTextNode(", "));var a=s.args[u];o.appendChild(C("span",n+"farg"+(u==r?" "+n+"farg-current":""),a.name||"?"));if(a.type!="?"){o.appendChild(document.createTextNode(": "));o.appendChild(C("span",n+"type",a.type))}}o.appendChild(document.createTextNode(s.rettype?") -> ":")"));if(s.rettype)o.appendChild(C("span",n+"type",s.rettype));var f=t.cursorCoords(null,"page");e.activeArgHints=A(f.right+1,f.bottom,o)}function p(e){function r(t){var r=0,i=n;for(;;){var s=e.charAt(n);if(t.test(s)&&!r)return e.slice(i,n);if(/[{\[\(]/.test(s))++r;else if(/[}\]\)]/.test(s))--r;++n}}var t=[],n=3;if(e.charAt(n)!=")")for(;;){var i=e.slice(n).match(/^([^, \(\[\{]+): /);if(i){n+=i[0].length;i=i[1]}t.push({name:i,type:r(/[\),]/)});if(e.charAt(n)==")")break;n+=2}var s=e.slice(n).match(/^\) -> (.*)$/);return{args:t,rettype:s&&s[1]}}function d(e,t){function n(n){var r={type:"definition",variable:n||null};var i=s(e,t.getDoc());e.server.request(x(e,i,r),function(n,r){if(n)return _(e,t,n);if(!r.file&&r.url){window.open(r.url);return}if(r.file){var s=e.docs[r.file],o;if(s&&(o=g(s.doc,r))){e.jumpStack.push({file:i.name,start:t.getCursor("from"),end:t.getCursor("to")});m(e,i,s,o.start,o.end);return}}_(e,t,"Could not find a definition.")})}if(!y(t))k(t,"Jump to variable",function(e){if(e)n(e)});else n()}function v(e,t){var n=e.jumpStack.pop(),r=n&&e.docs[n.file];if(!r)return;m(e,s(e,t.getDoc()),r,n.start,n.end)}function m(e,t,n,r,i){n.doc.setSelection(i,r);if(t!=n&&e.options.switchToDoc){D(e);e.options.switchToDoc(n.name)}}function g(e,n){var r=n.context.slice(0,n.contextOffset).split("\n");var i=n.start.line-(r.length-1);var s=t(i,(r.length==1?n.start.ch:e.getLine(i).length)-r[0].length);var o=e.getLine(i).slice(s.ch);for(var u=i+1;u<e.lineCount()&&o.length<n.context.length;++u)o+="\n"+e.getLine(u);if(o.slice(0,n.context.length)==n.context)return n;var a=e.getSearchCursor(n.context,0,false);var f,l=Infinity;while(a.findNext()){var c=a.from(),h=Math.abs(c.line-s.line)*1e4;if(!h)h=Math.abs(c.ch-s.ch);if(h<l){f=c;l=h}}if(!f)return null;if(r.length==1)f.ch+=r[0].length;else f=t(f.line+(r.length-1),r[r.length-1].length);if(n.start.line==n.end.line)var p=t(f.line,f.ch+(n.end.ch-n.start.ch));else var p=t(f.line+(n.end.line-n.start.line),n.end.ch);return{start:f,end:p}}function y(e){var t=e.getCursor("end"),n=e.getTokenAt(t);if(n.start<t.ch&&(n.type=="comment"||n.type=="string"))return false;return/\w/.test(e.getLine(t.line).slice(Math.max(t.ch-1,0),t.ch+1))}function b(e,t){var n=t.getTokenAt(t.getCursor());if(!/\w/.test(n.string))_(e,t,"Not at a variable");k(t,"New name for "+n.string,function(n){e.request(t,{type:"rename",newName:n,fullDocs:true},function(n,r){if(n)return _(e,t,n);S(e,r.changes)})})}function w(e,t){var n=t.getCursor(),r=t.getTokenAt(n);if(!/\w/.test(r.string))_(e,t,"Not at a variable");var i=s(e,t.doc).name;e.request(t,{type:"refs"},function(n,r){if(n)return _(e,t,n);var s=[],o=0;for(var u=0;u<r.refs.length;u++){var a=r.refs[u];if(a.file==i){s.push({anchor:a.start,head:a.end});if(N(o,a.start)>=0&&N(o,a.end)<=0)o=s.length-1}}t.setSelections(s,o)})}function S(e,t){var n=Object.create(null);for(var r=0;r<t.length;++r){var i=t[r];(n[i.file]||(n[i.file]=[])).push(i)}for(var s in n){var o=e.docs[s],u=n[s];if(!o)continue;u.sort(function(e,t){return N(t.start,e.start)});var a="*rename"+ ++E;for(var r=0;r<u.length;++r){var i=u[r];o.doc.replaceRange(i.text,i.start,i.end,a)}}}function x(e,n,i,s){var o=[],u=0,a=!i.fullDocs;if(!a)delete i.fullDocs;if(typeof i=="string")i={type:i};i.lineCharPositions=true;if(i.end==null){i.end=s||n.doc.getCursor("end");if(n.doc.somethingSelected())i.start=n.doc.getCursor("start")}var f=i.start||i.end;if(n.changed){if(n.doc.lineCount()>r&&a!==false&&n.changed.to-n.changed.from<100&&n.changed.from<=f.line&&n.changed.to>i.end.line){o.push(T(n,f,i.end));i.file="#0";var u=o[0].offsetLines;if(i.start!=null)i.start=t(i.start.line- -u,i.start.ch);i.end=t(i.end.line-u,i.end.ch)}else{o.push({type:"full",name:n.name,text:P(e,n)});i.file=n.name;n.changed=null}}else{i.file=n.name}for(var l in e.docs){var c=e.docs[l];if(c.changed&&c!=n){o.push({type:"full",name:c.name,text:P(e,c)});c.changed=null}}return{query:i,files:o}}function T(n,r,i){var s=n.doc;var o=null,u=null,a,f=4;for(var l=r.line-1,c=Math.max(0,l-50);l>=c;--l){var h=s.getLine(l),p=h.search(/\bfunction\b/);if(p<0)continue;var d=e.countColumn(h,null,f);if(o!=null&&o<=d)continue;o=d;u=l}if(u==null)u=c;var v=Math.min(s.lastLine(),i.line+20);if(o==null||o==e.countColumn(s.getLine(r.line),null,f))a=v;else for(a=i.line+1;a<v;++a){var d=e.countColumn(s.getLine(a),null,f);if(d<=o)break}var m=t(u,0);return{type:"part",name:n.name,offsetLines:m.line,text:s.getRange(m,t(a,0))}}function C(e,t){var n=document.createElement(e);if(t)n.className=t;for(var r=2;r<arguments.length;++r){var i=arguments[r];if(typeof i=="string")i=document.createTextNode(i);n.appendChild(i)}return n}function k(e,t,n){if(e.openDialog)e.openDialog(t+": <input type=text>",n);else n(prompt(t,""))}function L(e,t){function i(){if(!r.parentNode)return;e.off("cursorActivity",i);M(r)}var n=e.cursorCoords();var r=A(n.right+1,n.bottom,t);setTimeout(i,1700);e.on("cursorActivity",i)}function A(e,t,r){var i=C("div",n+"tooltip",r);i.style.left=e+"px";i.style.top=t+"px";document.body.appendChild(i);return i}function O(e){var t=e&&e.parentNode;if(t)t.removeChild(e)}function M(e){e.style.opacity="0";setTimeout(function(){O(e)},1100)}function _(e,t,n){if(e.options.showError)e.options.showError(t,n);else L(t,String(n))}function D(e){if(e.activeArgHints){O(e.activeArgHints);e.activeArgHints=null}}function P(e,t){var n=t.doc.getValue();if(e.options.fileFilter)n=e.options.fileFilter(n,t.name,t.doc);return n}function H(e){function s(e,i){if(i){e.id=++n;r[n]=i}t.postMessage(e)}var t=new Worker(e.options.workerScript);t.postMessage({type:"init",defs:e.options.defs,plugins:e.options.plugins,scripts:e.options.workerDeps});var n=0,r={};t.onmessage=function(t){var n=t.data;if(n.type=="getFile"){i(e,n.name,function(e,t){s({type:"getFile",err:String(e),text:t,id:n.id})})}else if(n.type=="debug"){window.console.log(n.message)}else if(n.id&&r[n.id]){r[n.id](n.err,n.body);delete r[n.id]}};t.onerror=function(e){for(var t in r)r[t](e);r={}};this.addFile=function(e,t){s({type:"add",name:e,text:t})};this.delFile=function(e){s({type:"del",name:e})};this.request=function(e,t){s({type:"req",body:e},t)}}e.TernServer=function(e){var t=this;this.options=e||{};var n=this.options.plugins||(this.options.plugins={});if(!n.doc_comment)n.doc_comment=true;if(this.options.useWorker){this.server=new H(this)}else{this.server=new tern.Server({getFile:function(e,n){return i(t,e,n)},async:true,defs:this.options.defs||[],plugins:n})}this.docs=Object.create(null);this.trackChange=function(e,n){o(t,e,n)};this.cachedArgHints=null;this.activeArgHints=null;this.jumpStack=[]};e.TernServer.prototype={addDoc:function(t,n){var r={doc:n,name:t,changed:null};this.server.addFile(t,P(this,r));e.on(n,"change",this.trackChange);return this.docs[t]=r},delDoc:function(t){var n=this.docs[t];if(!n)return;e.off(n.doc,"change",this.trackChange);delete this.docs[t];this.server.delFile(t)},hideDoc:function(e){D(this);var t=this.docs[e];if(t&&t.changed)u(this,t)},complete:function(t){var n=this;e.showHint(t,function(e,t){return a(n,e,t)},{async:true})},getHint:function(e,t){return a(this,e,t)},showType:function(e,t){l(this,e,t)},updateArgHints:function(e){c(this,e)},jumpToDef:function(e){d(this,e)},jumpBack:function(e){v(this,e)},rename:function(e){b(this,e)},selectName:function(e){w(this,e)},request:function(e,t,n,r){var i=this;var o=s(this,e.getDoc());var u=x(this,o,t,r);this.server.request(u,function(e,r){if(!e&&i.options.responseFilter)r=i.options.responseFilter(o,t,u,e,r);n(e,r)})}};var t=e.Pos;var n="CodeMirror-Tern-";var r=250;var E=0;var N=e.cmpPos})