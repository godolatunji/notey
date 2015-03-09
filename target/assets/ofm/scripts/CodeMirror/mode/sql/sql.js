(function(e){if(typeof exports=="object"&&typeof module=="object")e(require("../../lib/codemirror"));else if(typeof define=="function"&&define.amd)define(["../../lib/codemirror"],e);else e(CodeMirror)})(function(e){"use strict";e.defineMode("sql",function(e,t){"use strict";function l(e,t){var l=e.next();if(a[l]){var p=a[l](e,t);if(p!==false)return p}if(u.hexNumber==true&&(l=="0"&&e.match(/^[xX][0-9a-fA-F]+/)||(l=="x"||l=="X")&&e.match(/^'[0-9a-fA-F]+'/))){return"number"}else if(u.binaryNumber==true&&((l=="b"||l=="B")&&e.match(/^'[01]+'/)||l=="0"&&e.match(/^b[01]+/))){return"number"}else if(l.charCodeAt(0)>47&&l.charCodeAt(0)<58){e.match(/^[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/);u.decimallessFloat==true&&e.eat(".");return"number"}else if(l=="?"&&(e.eatSpace()||e.eol()||e.eat(";"))){return"variable-3"}else if(l=="'"||l=='"'&&u.doubleQuote){t.tokenize=c(l);return t.tokenize(e,t)}else if((u.nCharCast==true&&(l=="n"||l=="N")||u.charsetCast==true&&l=="_"&&e.match(/[a-z][a-z0-9]*/i))&&(e.peek()=="'"||e.peek()=='"')){return"keyword"}else if(/^[\(\),\;\[\]]/.test(l)){return null}else if(u.commentSlashSlash&&l=="/"&&e.eat("/")){e.skipToEnd();return"comment"}else if(u.commentHash&&l=="#"||l=="-"&&e.eat("-")&&(!u.commentSpaceRequired||e.eat(" "))){e.skipToEnd();return"comment"}else if(l=="/"&&e.eat("*")){t.tokenize=h;return t.tokenize(e,t)}else if(l=="."){if(u.zerolessFloat==true&&e.match(/^(?:\d+(?:e[+-]?\d+)?)/i)){return"number"}if(u.ODBCdotTable==true&&e.match(/^[a-zA-Z_]+/)){return"variable-2"}}else if(o.test(l)){e.eatWhile(o);return null}else if(l=="{"&&(e.match(/^( )*(d|D|t|T|ts|TS)( )*'[^']*'( )*}/)||e.match(/^( )*(d|D|t|T|ts|TS)( )*"[^"]*"( )*}/))){return"number"}else{e.eatWhile(/^[_\w\d]/);var d=e.current().toLowerCase();if(f.hasOwnProperty(d)&&(e.match(/^( )+'[^']*'/)||e.match(/^( )+"[^"]*"/)))return"number";if(r.hasOwnProperty(d))return"atom";if(i.hasOwnProperty(d))return"builtin";if(s.hasOwnProperty(d))return"keyword";if(n.hasOwnProperty(d))return"string-2";return null}}function c(e){return function(t,n){var r=false,i;while((i=t.next())!=null){if(i==e&&!r){n.tokenize=l;break}r=!r&&i=="\\"}return"string"}}function h(e,t){while(true){if(e.skipTo("*")){e.next();if(e.eat("/")){t.tokenize=l;break}}else{e.skipToEnd();break}}return"comment"}function p(e,t,n){t.context={prev:t.context,indent:e.indentation(),col:e.column(),type:n}}function d(e){e.indent=e.context.indent;e.context=e.context.prev}var n=t.client||{},r=t.atoms||{"false":true,"true":true,"null":true},i=t.builtin||{},s=t.keywords||{},o=t.operatorChars||/^[*+\-%<>!=&|~^]/,u=t.support||{},a=t.hooks||{},f=t.dateSQL||{date:true,time:true,timestamp:true};return{startState:function(){return{tokenize:l,context:null}},token:function(e,t){if(e.sol()){if(t.context&&t.context.align==null)t.context.align=false}if(e.eatSpace())return null;var n=t.tokenize(e,t);if(n=="comment")return n;if(t.context&&t.context.align==null)t.context.align=true;var r=e.current();if(r=="(")p(e,t,")");else if(r=="[")p(e,t,"]");else if(t.context&&t.context.type==r)d(t);return n},indent:function(t,n){var r=t.context;if(!r)return 0;var i=n.charAt(0)==r.type;if(r.align)return r.col+(i?0:1);else return r.indent+(i?0:e.indentUnit)},blockCommentStart:"/*",blockCommentEnd:"*/",lineComment:u.commentSlashSlash?"//":u.commentHash?"#":null}});(function(){"use strict";function t(e){var t;while((t=e.next())!=null){if(t=="`"&&!e.eat("`"))return"variable-2"}return null}function n(e){if(e.eat("@")){e.match(/^session\./);e.match(/^local\./);e.match(/^global\./)}if(e.eat("'")){e.match(/^.*'/);return"variable-2"}else if(e.eat('"')){e.match(/^.*"/);return"variable-2"}else if(e.eat("`")){e.match(/^.*`/);return"variable-2"}else if(e.match(/^[0-9a-zA-Z$\.\_]+/)){return"variable-2"}return null}function r(e){if(e.eat("N")){return"atom"}return e.match(/^[a-zA-Z.#!?]/)?"variable-2":null}function s(e){var t={},n=e.split(" ");for(var r=0;r<n.length;++r)t[n[r]]=true;return t}var i="alter and as asc between by count create delete desc distinct drop from having in insert into is join like not on or order select set table union update values where ";e.defineMIME("text/x-sql",{name:"sql",keywords:s(i+"begin"),builtin:s("bool boolean bit blob enum long longblob longtext medium mediumblob mediumint mediumtext time timestamp tinyblob tinyint tinytext text bigint int int1 int2 int3 int4 int8 integer float float4 float8 double char varbinary varchar varcharacter precision real date datetime year unsigned signed decimal numeric"),atoms:s("false true null unknown"),operatorChars:/^[*+\-%<>!=]/,dateSQL:s("date time timestamp"),support:s("ODBCdotTable doubleQuote binaryNumber hexNumber")});e.defineMIME("text/x-mssql",{name:"sql",client:s("charset clear connect edit ego exit go help nopager notee nowarning pager print prompt quit rehash source status system tee"),keywords:s(i+"begin trigger proc view index for add constraint key primary foreign collate clustered nonclustered"),builtin:s("bigint numeric bit smallint decimal smallmoney int tinyint money float real char varchar text nchar nvarchar ntext binary varbinary image cursor timestamp hierarchyid uniqueidentifier sql_variant xml table "),atoms:s("false true null unknown"),operatorChars:/^[*+\-%<>!=]/,dateSQL:s("date datetimeoffset datetime2 smalldatetime datetime time"),hooks:{"@":n}});e.defineMIME("text/x-mysql",{name:"sql",client:s("charset clear connect edit ego exit go help nopager notee nowarning pager print prompt quit rehash source status system tee"),keywords:s(i+"accessible action add after algorithm all analyze asensitive at authors auto_increment autocommit avg avg_row_length before binary binlog both btree cache call cascade cascaded case catalog_name chain change changed character check checkpoint checksum class_origin client_statistics close coalesce code collate collation collations column columns comment commit committed completion concurrent condition connection consistent constraint contains continue contributors convert cross current current_date current_time current_timestamp current_user cursor data database databases day_hour day_microsecond day_minute day_second deallocate dec declare default delay_key_write delayed delimiter des_key_file describe deterministic dev_pop dev_samp deviance diagnostics directory disable discard distinctrow div dual dumpfile each elseif enable enclosed end ends engine engines enum errors escape escaped even event events every execute exists exit explain extended fast fetch field fields first flush for force foreign found_rows full fulltext function general get global grant grants group groupby_concat handler hash help high_priority hosts hour_microsecond hour_minute hour_second if ignore ignore_server_ids import index index_statistics infile inner innodb inout insensitive insert_method install interval invoker isolation iterate key keys kill language last leading leave left level limit linear lines list load local localtime localtimestamp lock logs low_priority master master_heartbeat_period master_ssl_verify_server_cert masters match max max_rows maxvalue message_text middleint migrate min min_rows minute_microsecond minute_second mod mode modifies modify mutex mysql_errno natural next no no_write_to_binlog offline offset one online open optimize option optionally out outer outfile pack_keys parser partition partitions password phase plugin plugins prepare preserve prev primary privileges procedure processlist profile profiles purge query quick range read read_write reads real rebuild recover references regexp relaylog release remove rename reorganize repair repeatable replace require resignal restrict resume return returns revoke right rlike rollback rollup row row_format rtree savepoint schedule schema schema_name schemas second_microsecond security sensitive separator serializable server session share show signal slave slow smallint snapshot soname spatial specific sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_no_cache sql_small_result sqlexception sqlstate sqlwarning ssl start starting starts status std stddev stddev_pop stddev_samp storage straight_join subclass_origin sum suspend table_name table_statistics tables tablespace temporary terminated to trailing transaction trigger triggers truncate uncommitted undo uninstall unique unlock upgrade usage use use_frm user user_resources user_statistics using utc_date utc_time utc_timestamp value variables varying view views warnings when while with work write xa xor year_month zerofill begin do then else loop repeat"),builtin:s("bool boolean bit blob decimal double float long longblob longtext medium mediumblob mediumint mediumtext time timestamp tinyblob tinyint tinytext text bigint int int1 int2 int3 int4 int8 integer float float4 float8 double char varbinary varchar varcharacter precision date datetime year unsigned signed numeric"),atoms:s("false true null unknown"),operatorChars:/^[*+\-%<>!=&|^]/,dateSQL:s("date time timestamp"),support:s("ODBCdotTable decimallessFloat zerolessFloat binaryNumber hexNumber doubleQuote nCharCast charsetCast commentHash commentSpaceRequired"),hooks:{"@":n,"`":t,"\\":r}});e.defineMIME("text/x-mariadb",{name:"sql",client:s("charset clear connect edit ego exit go help nopager notee nowarning pager print prompt quit rehash source status system tee"),keywords:s(i+"accessible action add after algorithm all always analyze asensitive at authors auto_increment autocommit avg avg_row_length before binary binlog both btree cache call cascade cascaded case catalog_name chain change changed character check checkpoint checksum class_origin client_statistics close coalesce code collate collation collations column columns comment commit committed completion concurrent condition connection consistent constraint contains continue contributors convert cross current current_date current_time current_timestamp current_user cursor data database databases day_hour day_microsecond day_minute day_second deallocate dec declare default delay_key_write delayed delimiter des_key_file describe deterministic dev_pop dev_samp deviance diagnostics directory disable discard distinctrow div dual dumpfile each elseif enable enclosed end ends engine engines enum errors escape escaped even event events every execute exists exit explain extended fast fetch field fields first flush for force foreign found_rows full fulltext function general generated get global grant grants group groupby_concat handler hard hash help high_priority hosts hour_microsecond hour_minute hour_second if ignore ignore_server_ids import index index_statistics infile inner innodb inout insensitive insert_method install interval invoker isolation iterate key keys kill language last leading leave left level limit linear lines list load local localtime localtimestamp lock logs low_priority master master_heartbeat_period master_ssl_verify_server_cert masters match max max_rows maxvalue message_text middleint migrate min min_rows minute_microsecond minute_second mod mode modifies modify mutex mysql_errno natural next no no_write_to_binlog offline offset one online open optimize option optionally out outer outfile pack_keys parser partition partitions password persistent phase plugin plugins prepare preserve prev primary privileges procedure processlist profile profiles purge query quick range read read_write reads real rebuild recover references regexp relaylog release remove rename reorganize repair repeatable replace require resignal restrict resume return returns revoke right rlike rollback rollup row row_format rtree savepoint schedule schema schema_name schemas second_microsecond security sensitive separator serializable server session share show shutdown signal slave slow smallint snapshot soft soname spatial specific sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_no_cache sql_small_result sqlexception sqlstate sqlwarning ssl start starting starts status std stddev stddev_pop stddev_samp storage straight_join subclass_origin sum suspend table_name table_statistics tables tablespace temporary terminated to trailing transaction trigger triggers truncate uncommitted undo uninstall unique unlock upgrade usage use use_frm user user_resources user_statistics using utc_date utc_time utc_timestamp value variables varying view views virtual warnings when while with work write xa xor year_month zerofill begin do then else loop repeat"),builtin:s("bool boolean bit blob decimal double float long longblob longtext medium mediumblob mediumint mediumtext time timestamp tinyblob tinyint tinytext text bigint int int1 int2 int3 int4 int8 integer float float4 float8 double char varbinary varchar varcharacter precision date datetime year unsigned signed numeric"),atoms:s("false true null unknown"),operatorChars:/^[*+\-%<>!=&|^]/,dateSQL:s("date time timestamp"),support:s("ODBCdotTable decimallessFloat zerolessFloat binaryNumber hexNumber doubleQuote nCharCast charsetCast commentHash commentSpaceRequired"),hooks:{"@":n,"`":t,"\\":r}});e.defineMIME("text/x-cassandra",{name:"sql",client:{},keywords:s("use select from using consistency where limit first reversed first and in insert into values using consistency ttl update set delete truncate begin batch apply create keyspace with columnfamily primary key index on drop alter type add any one quorum all local_quorum each_quorum"),builtin:s("ascii bigint blob boolean counter decimal double float int text timestamp uuid varchar varint"),atoms:s("false true"),operatorChars:/^[<>=]/,dateSQL:{},support:s("commentSlashSlash decimallessFloat"),hooks:{}});e.defineMIME("text/x-plsql",{name:"sql",client:s("appinfo arraysize autocommit autoprint autorecovery autotrace blockterminator break btitle cmdsep colsep compatibility compute concat copycommit copytypecheck define describe echo editfile embedded escape exec execute feedback flagger flush heading headsep instance linesize lno loboffset logsource long longchunksize markup native newpage numformat numwidth pagesize pause pno recsep recsepchar release repfooter repheader serveroutput shiftinout show showmode size spool sqlblanklines sqlcase sqlcode sqlcontinue sqlnumber sqlpluscompatibility sqlprefix sqlprompt sqlterminator suffix tab term termout time timing trimout trimspool ttitle underline verify version wrap"),keywords:s("abort accept access add all alter and any array arraylen as asc assert assign at attributes audit authorization avg base_table begin between binary_integer body boolean by case cast char char_base check close cluster clusters colauth column comment commit compress connect connected constant constraint crash create current currval cursor data_base database date dba deallocate debugoff debugon decimal declare default definition delay delete desc digits dispose distinct do drop else elseif elsif enable end entry escape exception exception_init exchange exclusive exists exit external fast fetch file for force form from function generic goto grant group having identified if immediate in increment index indexes indicator initial initrans insert interface intersect into is key level library like limited local lock log logging long loop master maxextents maxtrans member minextents minus mislabel mode modify multiset new next no noaudit nocompress nologging noparallel not nowait number_base object of off offline on online only open option or order out package parallel partition pctfree pctincrease pctused pls_integer positive positiven pragma primary prior private privileges procedure public raise range raw read rebuild record ref references refresh release rename replace resource restrict return returning returns reverse revoke rollback row rowid rowlabel rownum rows run savepoint schema segment select separate session set share snapshot some space split sql start statement storage subtype successful synonym tabauth table tables tablespace task terminate then to trigger truncate type union unique unlimited unrecoverable unusable update use using validate value values variable view views when whenever where while with work"),builtin:s("abs acos add_months ascii asin atan atan2 average bfile bfilename bigserial bit blob ceil character chartorowid chr clob concat convert cos cosh count dec decode deref dual dump dup_val_on_index empty error exp false float floor found glb greatest hextoraw initcap instr instrb int integer isopen last_day least lenght lenghtb ln lower lpad ltrim lub make_ref max min mlslabel mod months_between natural naturaln nchar nclob new_time next_day nextval nls_charset_decl_len nls_charset_id nls_charset_name nls_initcap nls_lower nls_sort nls_upper nlssort no_data_found notfound null number numeric nvarchar2 nvl others power rawtohex real reftohex round rowcount rowidtochar rowtype rpad rtrim serial sign signtype sin sinh smallint soundex sqlcode sqlerrm sqrt stddev string substr substrb sum sysdate tan tanh to_char text to_date to_label to_multi_byte to_number to_single_byte translate true trunc uid unlogged upper user userenv varchar varchar2 variance varying vsize xml"),operatorChars:/^[*+\-%<>!=~]/,dateSQL:s("date time timestamp"),support:s("doubleQuote nCharCast zerolessFloat binaryNumber hexNumber")});e.defineMIME("text/x-hive",{name:"sql",keywords:s("select alter $elem$ $key$ $value$ add after all analyze and archive as asc before between binary both bucket buckets by cascade case cast change cluster clustered clusterstatus collection column columns comment compute concatenate continue create cross cursor data database databases dbproperties deferred delete delimited desc describe directory disable distinct distribute drop else enable end escaped exclusive exists explain export extended external false fetch fields fileformat first format formatted from full function functions grant group having hold_ddltime idxproperties if import in index indexes inpath inputdriver inputformat insert intersect into is items join keys lateral left like limit lines load local location lock locks mapjoin materialized minus msck no_drop nocompress not of offline on option or order out outer outputdriver outputformat overwrite partition partitioned partitions percent plus preserve procedure purge range rcfile read readonly reads rebuild recordreader recordwriter recover reduce regexp rename repair replace restrict revoke right rlike row schema schemas semi sequencefile serde serdeproperties set shared show show_database sort sorted ssl statistics stored streamtable table tables tablesample tblproperties temporary terminated textfile then tmp to touch transform trigger true unarchive undo union uniquejoin unlock update use using utc utc_tmestamp view when where while with"),builtin:s("bool boolean long timestamp tinyint smallint bigint int float double date datetime unsigned string array struct map uniontype"),atoms:s("false true null unknown"),operatorChars:/^[*+\-%<>!=]/,dateSQL:s("date timestamp"),support:s("ODBCdotTable doubleQuote binaryNumber hexNumber")})})()})