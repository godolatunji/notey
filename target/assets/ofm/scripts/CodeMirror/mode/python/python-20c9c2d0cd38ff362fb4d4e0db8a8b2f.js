(function(e){if(typeof exports=="object"&&typeof module=="object")e(require("../../lib/codemirror"));else if(typeof define=="function"&&define.amd)define(["../../lib/codemirror"],e);else e(CodeMirror)})(function(e){"use strict";e.defineMode("python",function(t,n){function i(e){return new RegExp("^(("+e.join(")|(")+"))\\b")}function E(e,t){if(e.sol()){var n=t.scopes[0].offset;if(e.eatSpace()){var i=e.indentation();if(i>n){w="indent"}else if(i<n){w="dedent"}return null}else{if(n>0){T(e,t)}}}if(e.eatSpace()){return null}var c=e.peek();if(c==="#"){e.skipToEnd();return"comment"}if(e.match(/^[0-9\.]/,false)){var p=false;if(e.match(/^\d*\.\d+(e[\+\-]?\d+)?/i)){p=true}if(e.match(/^\d+\.\d*/)){p=true}if(e.match(/^\.\d+/)){p=true}if(p){e.eat(/J/i);return"number"}var d=false;if(e.match(/^0x[0-9a-f]+/i)){d=true}if(e.match(/^0b[01]+/i)){d=true}if(e.match(/^0o[0-7]+/i)){d=true}if(e.match(/^[1-9]\d*(e[\+\-]?\d+)?/)){e.eat(/J/i);d=true}if(e.match(/^0(?![\dx])/i)){d=true}if(d){e.eat(/L/i);return"number"}}if(e.match(g)){t.tokenize=S(e.current());return t.tokenize(e,t)}if(e.match(f)||e.match(a)){return null}if(e.match(u)||e.match(s)||e.match(h)){return"operator"}if(e.match(o)){return null}if(e.match(y)){return"keyword"}if(e.match(b)){return"builtin"}if(e.match(/^(self|cls)\b/)){return"variable-2"}if(e.match(l)){if(t.lastToken=="def"||t.lastToken=="class"){return"def"}return"variable"}e.next();return r}function S(e){function s(s,o){while(!s.eol()){s.eatWhile(/[^'"\\]/);if(s.eat("\\")){s.next();if(t&&s.eol()){return i}}else if(s.match(e)){o.tokenize=E;return i}else{s.eat(/['"]/)}}if(t){if(n.singleLineStringErrors){return r}else{o.tokenize=E}}return i}while("rub".indexOf(e.charAt(0).toLowerCase())>=0){e=e.substr(1)}var t=e.length==1;var i="string";s.isString=true;return s}function x(e,n,r){r=r||"py";var i=0;if(r==="py"){if(n.scopes[0].type!=="py"){n.scopes[0].offset=e.indentation();return}for(var s=0;s<n.scopes.length;++s){if(n.scopes[s].type==="py"){i=n.scopes[s].offset+t.indentUnit;break}}}else if(e.match(/\s*($|#)/,false)){i=e.indentation()+c}else{i=e.column()+e.current().length}n.scopes.unshift({offset:i,type:r})}function T(e,t,n){n=n||"py";if(t.scopes.length==1)return;if(t.scopes[0].type==="py"){var r=e.indentation();var i=-1;for(var s=0;s<t.scopes.length;++s){if(r===t.scopes[s].offset){i=s;break}}if(i===-1){return true}while(t.scopes[0].offset!==r){t.scopes.shift()}return false}else{if(n==="py"){t.scopes[0].offset=e.indentation();return false}else{if(t.scopes[0].type!=n){return true}t.scopes.shift();return false}}}function N(e,t){w=null;var n=t.tokenize(e,t);var i=e.current();if(i==="."){n=e.match(l,false)?null:r;if(n===null&&t.lastStyle==="meta"){n="meta"}return n}if(i==="@"){return e.match(l,false)?"meta":r}if((n==="variable"||n==="builtin")&&t.lastStyle==="meta"){n="meta"}if(i==="pass"||i==="return"){t.dedent+=1}if(i==="lambda")t.lambda=true;if(i===":"&&!t.lambda&&t.scopes[0].type=="py"||w==="indent"){x(e,t)}var s="[({".indexOf(i);if(s!==-1){x(e,t,"])}".slice(s,s+1))}if(w==="dedent"){if(T(e,t)){return r}}s="])}".indexOf(i);if(s!==-1){if(T(e,t,i)){return r}}if(t.dedent>0&&e.eol()&&t.scopes[0].type=="py"){if(t.scopes.length>1)t.scopes.shift();t.dedent-=1}return n}var r="error";var s=n.singleOperators||new RegExp("^[\\+\\-\\*/%&|\\^~<>!]");var o=n.singleDelimiters||new RegExp("^[\\(\\)\\[\\]\\{\\}@,:`=;\\.]");var u=n.doubleOperators||new RegExp("^((==)|(!=)|(<=)|(>=)|(<>)|(<<)|(>>)|(//)|(\\*\\*))");var a=n.doubleDelimiters||new RegExp("^((\\+=)|(\\-=)|(\\*=)|(%=)|(/=)|(&=)|(\\|=)|(\\^=))");var f=n.tripleDelimiters||new RegExp("^((//=)|(>>=)|(<<=)|(\\*\\*=))");var l=n.identifiers||new RegExp("^[_A-Za-z][_A-Za-z0-9]*");var c=n.hangingIndent||n.indentUnit;var h=i(["and","or","not","is","in"]);var p=["as","assert","break","class","continue","def","del","elif","else","except","finally","for","from","global","if","import","lambda","pass","raise","return","try","while","with","yield"];var d=["abs","all","any","bin","bool","bytearray","callable","chr","classmethod","compile","complex","delattr","dict","dir","divmod","enumerate","eval","filter","float","format","frozenset","getattr","globals","hasattr","hash","help","hex","id","input","int","isinstance","issubclass","iter","len","list","locals","map","max","memoryview","min","next","object","oct","open","ord","pow","property","range","repr","reversed","round","set","setattr","slice","sorted","staticmethod","str","sum","super","tuple","type","vars","zip","__import__","NotImplemented","Ellipsis","__debug__"];var v={builtins:["apply","basestring","buffer","cmp","coerce","execfile","file","intern","long","raw_input","reduce","reload","unichr","unicode","xrange","False","True","None"],keywords:["exec","print"]};var m={builtins:["ascii","bytes","exec","print"],keywords:["nonlocal","False","True","None"]};if(n.extra_keywords!=undefined){p=p.concat(n.extra_keywords)}if(n.extra_builtins!=undefined){d=d.concat(n.extra_builtins)}if(!!n.version&&parseInt(n.version,10)===3){p=p.concat(m.keywords);d=d.concat(m.builtins);var g=new RegExp("^(([rb]|(br))?('{3}|\"{3}|['\"]))","i")}else{p=p.concat(v.keywords);d=d.concat(v.builtins);var g=new RegExp("^(([rub]|(ur)|(br))?('{3}|\"{3}|['\"]))","i")}var y=i(p);var b=i(d);var w=null;var C={startState:function(e){return{tokenize:E,scopes:[{offset:e||0,type:"py"}],lastStyle:null,lastToken:null,lambda:false,dedent:0}},token:function(e,t){var n=N(e,t);t.lastStyle=n;var r=e.current();if(r&&n){t.lastToken=r}if(e.eol()&&t.lambda){t.lambda=false}return n},indent:function(t){if(t.tokenize!=E){return t.tokenize.isString?e.Pass:0}return t.scopes[0].offset},lineComment:"#",fold:"indent"};return C});e.defineMIME("text/x-python","python");var t=function(e){return e.split(" ")};e.defineMIME("text/x-cython",{name:"python",extra_keywords:t("by cdef cimport cpdef ctypedef enum except"+"extern gil include nogil property public"+"readonly struct union DEF IF ELIF ELSE")})})