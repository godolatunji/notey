(function(e){if(typeof exports=="object"&&typeof module=="object")e(require("../../lib/codemirror"));else if(typeof define=="function"&&define.amd)define(["../../lib/codemirror"],e);else e(CodeMirror)})(function(e){"use strict";function t(e){var t={};for(var n=0;n<e.length;++n){t[e[n]]=true}return t}function m(e,t){var n=false,r;while((r=e.next())!=null){if(n&&r=="/"){t.tokenize=null;break}n=r=="*"}return["comment","comment"]}function g(e,t){if(e.skipTo("-->")){e.match("-->");t.tokenize=null}else{e.skipToEnd()}return["comment","comment"]}e.defineMode("css",function(t,n){function v(e,t){p=t;return e}function m(e,t){var n=e.next();if(i[n]){var r=i[n](e,t);if(r!==false)return r}if(n=="@"){e.eatWhile(/[\w\\\-]/);return v("def",e.current())}else if(n=="="||(n=="~"||n=="|")&&e.eat("=")){return v(null,"compare")}else if(n=='"'||n=="'"){t.tokenize=g(n);return t.tokenize(e,t)}else if(n=="#"){e.eatWhile(/[\w\\\-]/);return v("atom","hash")}else if(n=="!"){e.match(/^\s*\w*/);return v("keyword","important")}else if(/\d/.test(n)||n=="."&&e.eat(/\d/)){e.eatWhile(/[\w.%]/);return v("number","unit")}else if(n==="-"){if(/[\d.]/.test(e.peek())){e.eatWhile(/[\w.%]/);return v("number","unit")}else if(e.match(/^[^-]+-/)){return v("meta","meta")}}else if(/[,+>*\/]/.test(n)){return v(null,"select-op")}else if(n=="."&&e.match(/^-?[_a-z][_a-z0-9-]*/i)){return v("qualifier","qualifier")}else if(/[:;{}\[\]\(\)]/.test(n)){return v(null,n)}else if(n=="u"&&e.match("rl(")){e.backUp(1);t.tokenize=y;return v("property","word")}else if(/[\w\\\-]/.test(n)){e.eatWhile(/[\w\\\-]/);return v("property","word")}else{return v(null,null)}}function g(e){return function(t,n){var r=false,i;while((i=t.next())!=null){if(i==e&&!r){if(e==")")t.backUp(1);break}r=!r&&i=="\\"}if(i==e||!r&&e!=")")n.tokenize=null;return v("string","string")}}function y(e,t){e.next();if(!e.match(/\s*[\"\']/,false))t.tokenize=g(")");else t.tokenize=null;return v(null,"(")}function b(e,t,n){this.type=e;this.indent=t;this.prev=n}function w(e,t,n){e.context=new b(n,t.indentation()+r,e.context);return n}function E(e){e.context=e.context.prev;return e.context.type}function S(e,t,n){return N[n.context.type](e,t,n)}function x(e,t,n,r){for(var i=r||1;i>0;i--)n.context=n.context.prev;return S(e,t,n)}function T(e){var t=e.current().toLowerCase();if(l.hasOwnProperty(t))d="atom";else if(f.hasOwnProperty(t))d="keyword";else d="variable"}if(!n.propertyKeywords)n=e.resolveMode("text/css");var r=t.indentUnit,i=n.tokenHooks,s=n.mediaTypes||{},o=n.mediaFeatures||{},u=n.propertyKeywords||{},a=n.nonStandardPropertyKeywords||{},f=n.colorKeywords||{},l=n.valueKeywords||{},c=n.fontProperties||{},h=n.allowNested;var p,d;var N={};N.top=function(e,t,n){if(e=="{"){return w(n,t,"block")}else if(e=="}"&&n.context.prev){return E(n)}else if(e=="@media"){return w(n,t,"media")}else if(e=="@font-face"){return"font_face_before"}else if(/^@(-(moz|ms|o|webkit)-)?keyframes$/.test(e)){return"keyframes"}else if(e&&e.charAt(0)=="@"){return w(n,t,"at")}else if(e=="hash"){d="builtin"}else if(e=="word"){d="tag"}else if(e=="variable-definition"){return"maybeprop"}else if(e=="interpolation"){return w(n,t,"interpolation")}else if(e==":"){return"pseudo"}else if(h&&e=="("){return w(n,t,"params")}return n.context.type};N.block=function(e,t,n){if(e=="word"){var r=t.current().toLowerCase();if(u.hasOwnProperty(r)){d="property";return"maybeprop"}else if(a.hasOwnProperty(r)){d="string-2";return"maybeprop"}else if(h){d=t.match(/^\s*:/,false)?"property":"tag";return"block"}else{d+=" error";return"maybeprop"}}else if(e=="meta"){return"block"}else if(!h&&(e=="hash"||e=="qualifier")){d="error";return"block"}else{return N.top(e,t,n)}};N.maybeprop=function(e,t,n){if(e==":")return w(n,t,"prop");return S(e,t,n)};N.prop=function(e,t,n){if(e==";")return E(n);if(e=="{"&&h)return w(n,t,"propBlock");if(e=="}"||e=="{")return x(e,t,n);if(e=="(")return w(n,t,"parens");if(e=="hash"&&!/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(t.current())){d+=" error"}else if(e=="word"){T(t)}else if(e=="interpolation"){return w(n,t,"interpolation")}return"prop"};N.propBlock=function(e,t,n){if(e=="}")return E(n);if(e=="word"){d="property";return"maybeprop"}return n.context.type};N.parens=function(e,t,n){if(e=="{"||e=="}")return x(e,t,n);if(e==")")return E(n);return"parens"};N.pseudo=function(e,t,n){if(e=="word"){d="variable-3";return n.context.type}return S(e,t,n)};N.media=function(e,t,n){if(e=="(")return w(n,t,"media_parens");if(e=="}")return x(e,t,n);if(e=="{")return E(n)&&w(n,t,h?"block":"top");if(e=="word"){var r=t.current().toLowerCase();if(r=="only"||r=="not"||r=="and")d="keyword";else if(s.hasOwnProperty(r))d="attribute";else if(o.hasOwnProperty(r))d="property";else d="error"}return n.context.type};N.media_parens=function(e,t,n){if(e==")")return E(n);if(e=="{"||e=="}")return x(e,t,n,2);return N.media(e,t,n)};N.font_face_before=function(e,t,n){if(e=="{")return w(n,t,"font_face");return S(e,t,n)};N.font_face=function(e,t,n){if(e=="}")return E(n);if(e=="word"){if(!c.hasOwnProperty(t.current().toLowerCase()))d="error";else d="property";return"maybeprop"}return"font_face"};N.keyframes=function(e,t,n){if(e=="word"){d="variable";return"keyframes"}if(e=="{")return w(n,t,"top");return S(e,t,n)};N.at=function(e,t,n){if(e==";")return E(n);if(e=="{"||e=="}")return x(e,t,n);if(e=="word")d="tag";else if(e=="hash")d="builtin";return"at"};N.interpolation=function(e,t,n){if(e=="}")return E(n);if(e=="{"||e==";")return x(e,t,n);if(e!="variable")d="error";return"interpolation"};N.params=function(e,t,n){if(e==")")return E(n);if(e=="{"||e=="}")return x(e,t,n);if(e=="word")T(t);return"params"};return{startState:function(e){return{tokenize:null,state:"top",context:new b("top",e||0,null)}},token:function(e,t){if(!t.tokenize&&e.eatSpace())return null;var n=(t.tokenize||m)(e,t);if(n&&typeof n=="object"){p=n[1];n=n[0]}d=n;t.state=N[t.state](p,e,t);return d},indent:function(e,t){var n=e.context,i=t&&t.charAt(0);var s=n.indent;if(n.type=="prop"&&i=="}")n=n.prev;if(n.prev&&(i=="}"&&(n.type=="block"||n.type=="top"||n.type=="interpolation"||n.type=="font_face")||i==")"&&(n.type=="parens"||n.type=="params"||n.type=="media_parens")||i=="{"&&(n.type=="at"||n.type=="media"))){s=n.indent-r;n=n.prev}return s},electricChars:"}",blockCommentStart:"/*",blockCommentEnd:"*/",fold:"brace"}});var n=["all","aural","braille","handheld","print","projection","screen","tty","tv","embossed"],r=t(n);var i=["width","min-width","max-width","height","min-height","max-height","device-width","min-device-width","max-device-width","device-height","min-device-height","max-device-height","aspect-ratio","min-aspect-ratio","max-aspect-ratio","device-aspect-ratio","min-device-aspect-ratio","max-device-aspect-ratio","color","min-color","max-color","color-index","min-color-index","max-color-index","monochrome","min-monochrome","max-monochrome","resolution","min-resolution","max-resolution","scan","grid"],s=t(i);var o=["align-content","align-items","align-self","alignment-adjust","alignment-baseline","anchor-point","animation","animation-delay","animation-direction","animation-duration","animation-fill-mode","animation-iteration-count","animation-name","animation-play-state","animation-timing-function","appearance","azimuth","backface-visibility","background","background-attachment","background-clip","background-color","background-image","background-origin","background-position","background-repeat","background-size","baseline-shift","binding","bleed","bookmark-label","bookmark-level","bookmark-state","bookmark-target","border","border-bottom","border-bottom-color","border-bottom-left-radius","border-bottom-right-radius","border-bottom-style","border-bottom-width","border-collapse","border-color","border-image","border-image-outset","border-image-repeat","border-image-slice","border-image-source","border-image-width","border-left","border-left-color","border-left-style","border-left-width","border-radius","border-right","border-right-color","border-right-style","border-right-width","border-spacing","border-style","border-top","border-top-color","border-top-left-radius","border-top-right-radius","border-top-style","border-top-width","border-width","bottom","box-decoration-break","box-shadow","box-sizing","break-after","break-before","break-inside","caption-side","clear","clip","color","color-profile","column-count","column-fill","column-gap","column-rule","column-rule-color","column-rule-style","column-rule-width","column-span","column-width","columns","content","counter-increment","counter-reset","crop","cue","cue-after","cue-before","cursor","direction","display","dominant-baseline","drop-initial-after-adjust","drop-initial-after-align","drop-initial-before-adjust","drop-initial-before-align","drop-initial-size","drop-initial-value","elevation","empty-cells","fit","fit-position","flex","flex-basis","flex-direction","flex-flow","flex-grow","flex-shrink","flex-wrap","float","float-offset","flow-from","flow-into","font","font-feature-settings","font-family","font-kerning","font-language-override","font-size","font-size-adjust","font-stretch","font-style","font-synthesis","font-variant","font-variant-alternates","font-variant-caps","font-variant-east-asian","font-variant-ligatures","font-variant-numeric","font-variant-position","font-weight","grid","grid-area","grid-auto-columns","grid-auto-flow","grid-auto-position","grid-auto-rows","grid-column","grid-column-end","grid-column-start","grid-row","grid-row-end","grid-row-start","grid-template","grid-template-areas","grid-template-columns","grid-template-rows","hanging-punctuation","height","hyphens","icon","image-orientation","image-rendering","image-resolution","inline-box-align","justify-content","left","letter-spacing","line-break","line-height","line-stacking","line-stacking-ruby","line-stacking-shift","line-stacking-strategy","list-style","list-style-image","list-style-position","list-style-type","margin","margin-bottom","margin-left","margin-right","margin-top","marker-offset","marks","marquee-direction","marquee-loop","marquee-play-count","marquee-speed","marquee-style","max-height","max-width","min-height","min-width","move-to","nav-down","nav-index","nav-left","nav-right","nav-up","opacity","order","orphans","outline","outline-color","outline-offset","outline-style","outline-width","overflow","overflow-style","overflow-wrap","overflow-x","overflow-y","padding","padding-bottom","padding-left","padding-right","padding-top","page","page-break-after","page-break-before","page-break-inside","page-policy","pause","pause-after","pause-before","perspective","perspective-origin","pitch","pitch-range","play-during","position","presentation-level","punctuation-trim","quotes","region-break-after","region-break-before","region-break-inside","region-fragment","rendering-intent","resize","rest","rest-after","rest-before","richness","right","rotation","rotation-point","ruby-align","ruby-overhang","ruby-position","ruby-span","shape-inside","shape-outside","size","speak","speak-as","speak-header","speak-numeral","speak-punctuation","speech-rate","stress","string-set","tab-size","table-layout","target","target-name","target-new","target-position","text-align","text-align-last","text-decoration","text-decoration-color","text-decoration-line","text-decoration-skip","text-decoration-style","text-emphasis","text-emphasis-color","text-emphasis-position","text-emphasis-style","text-height","text-indent","text-justify","text-outline","text-overflow","text-shadow","text-size-adjust","text-space-collapse","text-transform","text-underline-position","text-wrap","top","transform","transform-origin","transform-style","transition","transition-delay","transition-duration","transition-property","transition-timing-function","unicode-bidi","vertical-align","visibility","voice-balance","voice-duration","voice-family","voice-pitch","voice-range","voice-rate","voice-stress","voice-volume","volume","white-space","widows","width","word-break","word-spacing","word-wrap","z-index","clip-path","clip-rule","mask","enable-background","filter","flood-color","flood-opacity","lighting-color","stop-color","stop-opacity","pointer-events","color-interpolation","color-interpolation-filters","color-profile","color-rendering","fill","fill-opacity","fill-rule","image-rendering","marker","marker-end","marker-mid","marker-start","shape-rendering","stroke","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width","text-rendering","baseline-shift","dominant-baseline","glyph-orientation-horizontal","glyph-orientation-vertical","kerning","text-anchor","writing-mode"],u=t(o);var a=["scrollbar-arrow-color","scrollbar-base-color","scrollbar-dark-shadow-color","scrollbar-face-color","scrollbar-highlight-color","scrollbar-shadow-color","scrollbar-3d-light-color","scrollbar-track-color","shape-inside","searchfield-cancel-button","searchfield-decoration","searchfield-results-button","searchfield-results-decoration","zoom"],a=t(a);var f=["aliceblue","antiquewhite","aqua","aquamarine","azure","beige","bisque","black","blanchedalmond","blue","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","cyan","darkblue","darkcyan","darkgoldenrod","darkgray","darkgreen","darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen","darkslateblue","darkslategray","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dodgerblue","firebrick","floralwhite","forestgreen","fuchsia","gainsboro","ghostwhite","gold","goldenrod","gray","grey","green","greenyellow","honeydew","hotpink","indianred","indigo","ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow","lightgray","lightgreen","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightsteelblue","lightyellow","lime","limegreen","linen","magenta","maroon","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","navy","oldlace","olive","olivedrab","orange","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum","powderblue","purple","red","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna","silver","skyblue","slateblue","slategray","snow","springgreen","steelblue","tan","teal","thistle","tomato","turquoise","violet","wheat","white","whitesmoke","yellow","yellowgreen"],l=t(f);var c=["above","absolute","activeborder","activecaption","afar","after-white-space","ahead","alias","all","all-scroll","alternate","always","amharic","amharic-abegede","antialiased","appworkspace","arabic-indic","armenian","asterisks","auto","avoid","avoid-column","avoid-page","avoid-region","background","backwards","baseline","below","bidi-override","binary","bengali","blink","block","block-axis","bold","bolder","border","border-box","both","bottom","break","break-all","break-word","button","button-bevel","buttonface","buttonhighlight","buttonshadow","buttontext","cambodian","capitalize","caps-lock-indicator","caption","captiontext","caret","cell","center","checkbox","circle","cjk-earthly-branch","cjk-heavenly-stem","cjk-ideographic","clear","clip","close-quote","col-resize","collapse","column","compact","condensed","contain","content","content-box","context-menu","continuous","copy","cover","crop","cross","crosshair","currentcolor","cursive","dashed","decimal","decimal-leading-zero","default","default-button","destination-atop","destination-in","destination-out","destination-over","devanagari","disc","discard","document","dot-dash","dot-dot-dash","dotted","double","down","e-resize","ease","ease-in","ease-in-out","ease-out","element","ellipse","ellipsis","embed","end","ethiopic","ethiopic-abegede","ethiopic-abegede-am-et","ethiopic-abegede-gez","ethiopic-abegede-ti-er","ethiopic-abegede-ti-et","ethiopic-halehame-aa-er","ethiopic-halehame-aa-et","ethiopic-halehame-am-et","ethiopic-halehame-gez","ethiopic-halehame-om-et","ethiopic-halehame-sid-et","ethiopic-halehame-so-et","ethiopic-halehame-ti-er","ethiopic-halehame-ti-et","ethiopic-halehame-tig","ew-resize","expanded","extra-condensed","extra-expanded","fantasy","fast","fill","fixed","flat","footnotes","forwards","from","geometricPrecision","georgian","graytext","groove","gujarati","gurmukhi","hand","hangul","hangul-consonant","hebrew","help","hidden","hide","higher","highlight","highlighttext","hiragana","hiragana-iroha","horizontal","hsl","hsla","icon","ignore","inactiveborder","inactivecaption","inactivecaptiontext","infinite","infobackground","infotext","inherit","initial","inline","inline-axis","inline-block","inline-table","inset","inside","intrinsic","invert","italic","justify","kannada","katakana","katakana-iroha","keep-all","khmer","landscape","lao","large","larger","left","level","lighter","line-through","linear","lines","list-item","listbox","listitem","local","logical","loud","lower","lower-alpha","lower-armenian","lower-greek","lower-hexadecimal","lower-latin","lower-norwegian","lower-roman","lowercase","ltr","malayalam","match","media-controls-background","media-current-time-display","media-fullscreen-button","media-mute-button","media-play-button","media-return-to-realtime-button","media-rewind-button","media-seek-back-button","media-seek-forward-button","media-slider","media-sliderthumb","media-time-remaining-display","media-volume-slider","media-volume-slider-container","media-volume-sliderthumb","medium","menu","menulist","menulist-button","menulist-text","menulist-textfield","menutext","message-box","middle","min-intrinsic","mix","mongolian","monospace","move","multiple","myanmar","n-resize","narrower","ne-resize","nesw-resize","no-close-quote","no-drop","no-open-quote","no-repeat","none","normal","not-allowed","nowrap","ns-resize","nw-resize","nwse-resize","oblique","octal","open-quote","optimizeLegibility","optimizeSpeed","oriya","oromo","outset","outside","outside-shape","overlay","overline","padding","padding-box","painted","page","paused","persian","plus-darker","plus-lighter","pointer","polygon","portrait","pre","pre-line","pre-wrap","preserve-3d","progress","push-button","radio","read-only","read-write","read-write-plaintext-only","rectangle","region","relative","repeat","repeat-x","repeat-y","reset","reverse","rgb","rgba","ridge","right","round","row-resize","rtl","run-in","running","s-resize","sans-serif","scroll","scrollbar","se-resize","searchfield","searchfield-cancel-button","searchfield-decoration","searchfield-results-button","searchfield-results-decoration","semi-condensed","semi-expanded","separate","serif","show","sidama","single","skip-white-space","slide","slider-horizontal","slider-vertical","sliderthumb-horizontal","sliderthumb-vertical","slow","small","small-caps","small-caption","smaller","solid","somali","source-atop","source-in","source-out","source-over","space","square","square-button","start","static","status-bar","stretch","stroke","sub","subpixel-antialiased","super","sw-resize","table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row","table-row-group","telugu","text","text-bottom","text-top","textarea","textfield","thai","thick","thin","threeddarkshadow","threedface","threedhighlight","threedlightshadow","threedshadow","tibetan","tigre","tigrinya-er","tigrinya-er-abegede","tigrinya-et","tigrinya-et-abegede","to","top","transparent","ultra-condensed","ultra-expanded","underline","up","upper-alpha","upper-armenian","upper-greek","upper-hexadecimal","upper-latin","upper-norwegian","upper-roman","uppercase","urdu","url","vertical","vertical-text","visible","visibleFill","visiblePainted","visibleStroke","visual","w-resize","wait","wave","wider","window","windowframe","windowtext","x-large","x-small","xor","xx-large","xx-small"],h=t(c);var p=["font-family","src","unicode-range","font-variant","font-feature-settings","font-stretch","font-weight","font-style"],d=t(p);var v=n.concat(i).concat(o).concat(a).concat(f).concat(c);e.registerHelper("hintWords","css",v);e.defineMIME("text/css",{mediaTypes:r,mediaFeatures:s,propertyKeywords:u,nonStandardPropertyKeywords:a,colorKeywords:l,valueKeywords:h,fontProperties:d,tokenHooks:{"<":function(e,t){if(!e.match("!--"))return false;t.tokenize=g;return g(e,t)},"/":function(e,t){if(!e.eat("*"))return false;t.tokenize=m;return m(e,t)}},name:"css"});e.defineMIME("text/x-scss",{mediaTypes:r,mediaFeatures:s,propertyKeywords:u,nonStandardPropertyKeywords:a,colorKeywords:l,valueKeywords:h,fontProperties:d,allowNested:true,tokenHooks:{"/":function(e,t){if(e.eat("/")){e.skipToEnd();return["comment","comment"]}else if(e.eat("*")){t.tokenize=m;return m(e,t)}else{return["operator","operator"]}},":":function(e){if(e.match(/\s*{/))return[null,"{"];return false},$:function(e){e.match(/^[\w-]+/);if(e.match(/^\s*:/,false))return["variable-2","variable-definition"];return["variable-2","variable"]},"#":function(e){if(!e.eat("{"))return false;return[null,"interpolation"]}},name:"css",helperType:"scss"});e.defineMIME("text/x-less",{mediaTypes:r,mediaFeatures:s,propertyKeywords:u,nonStandardPropertyKeywords:a,colorKeywords:l,valueKeywords:h,fontProperties:d,allowNested:true,tokenHooks:{"/":function(e,t){if(e.eat("/")){e.skipToEnd();return["comment","comment"]}else if(e.eat("*")){t.tokenize=m;return m(e,t)}else{return["operator","operator"]}},"@":function(e){if(e.match(/^(charset|document|font-face|import|(-(moz|ms|o|webkit)-)?keyframes|media|namespace|page|supports)\b/,false))return false;e.eatWhile(/[\w\\\-]/);if(e.match(/^\s*:/,false))return["variable-2","variable-definition"];return["variable-2","variable"]},"&":function(){return["atom","atom"]}},name:"css",helperType:"less"})})