(function(e){if(typeof exports=="object"&&typeof module=="object")e(require("../../lib/codemirror"));else if(typeof define=="function"&&define.amd)define(["../../lib/codemirror"],e);else e(CodeMirror)})(function(e){function t(e,t,n){var r=e.getWrapperElement();var i;i=r.appendChild(document.createElement("div"));if(n){i.className="CodeMirror-dialog CodeMirror-dialog-bottom"}else{i.className="CodeMirror-dialog CodeMirror-dialog-top"}if(typeof t=="string"){i.innerHTML=t}else{i.appendChild(t)}return i}function n(e,t){if(e.state.currentNotificationClose)e.state.currentNotificationClose();e.state.currentNotificationClose=t}e.defineExtension("openDialog",function(r,i,s){function f(){if(u)return;u=true;o.parentNode.removeChild(o)}n(this,null);var o=t(this,r,s&&s.bottom);var u=false,a=this;var l=o.getElementsByTagName("input")[0],c;if(l){if(s&&s.value)l.value=s.value;e.on(l,"keydown",function(t){if(s&&s.onKeyDown&&s.onKeyDown(t,l.value,f)){return}if(t.keyCode==13||t.keyCode==27){l.blur();e.e_stop(t);f();a.focus();if(t.keyCode==13)i(l.value)}});if(s&&s.onKeyUp){e.on(l,"keyup",function(e){s.onKeyUp(e,l.value,f)})}if(s&&s.value)l.value=s.value;l.focus();e.on(l,"blur",f)}else if(c=o.getElementsByTagName("button")[0]){e.on(c,"click",function(){f();a.focus()});c.focus();e.on(c,"blur",f)}return f});e.defineExtension("openConfirm",function(r,i,s){function c(){if(a)return;a=true;o.parentNode.removeChild(o);f.focus()}n(this,null);var o=t(this,r,s&&s.bottom);var u=o.getElementsByTagName("button");var a=false,f=this,l=1;u[0].focus();for(var h=0;h<u.length;++h){var p=u[h];(function(t){e.on(p,"click",function(n){e.e_preventDefault(n);c();if(t)t(f)})})(i[h]);e.on(p,"blur",function(){--l;setTimeout(function(){if(l<=0)c()},200)});e.on(p,"focus",function(){++l})}});e.defineExtension("openNotification",function(r,i){function f(){if(u)return;u=true;clearTimeout(a);s.parentNode.removeChild(s)}n(this,f);var s=t(this,r,i&&i.bottom);var o=i&&(i.duration===undefined?5e3:i.duration);var u=false,a;e.on(s,"click",function(t){e.e_preventDefault(t);f()});if(o)a=setTimeout(f,i.duration)})})