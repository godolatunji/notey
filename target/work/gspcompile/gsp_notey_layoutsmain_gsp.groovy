import org.codehaus.groovy.grails.plugins.metadata.GrailsPlugin
import org.codehaus.groovy.grails.web.pages.GroovyPage
import org.codehaus.groovy.grails.web.taglib.*
import org.codehaus.groovy.grails.web.taglib.exceptions.GrailsTagException
import org.springframework.web.util.*
import grails.util.GrailsUtil

class gsp_notey_layoutsmain_gsp extends GroovyPage {
public String getGroovyPageFileName() { "/WEB-INF/grails-app/views/layouts/main.gsp" }
public Object run() {
Writer out = getOut()
Writer expressionOut = getExpressionOut()
registerSitemeshPreprocessMode()
printHtmlPart(0)
createTagBody(1, {->
printHtmlPart(1)
invokeTag('captureMeta','sitemesh',4,['gsp_sm_xmlClosingForEmptyTag':(""),'charset':("utf-8")],-1)
printHtmlPart(1)
invokeTag('captureMeta','sitemesh',5,['gsp_sm_xmlClosingForEmptyTag':(""),'http-equiv':("X-UA-Compatible"),'content':("IE=edge")],-1)
printHtmlPart(1)
invokeTag('captureMeta','sitemesh',6,['gsp_sm_xmlClosingForEmptyTag':(""),'name':("viewport"),'content':("width=device-width, initial-scale=1")],-1)
printHtmlPart(1)
invokeTag('captureMeta','sitemesh',7,['gsp_sm_xmlClosingForEmptyTag':(""),'name':("description"),'content':("")],-1)
printHtmlPart(1)
invokeTag('captureMeta','sitemesh',8,['gsp_sm_xmlClosingForEmptyTag':(""),'name':("author"),'content':("")],-1)
printHtmlPart(2)
createTagBody(2, {->
createTagBody(3, {->
invokeTag('layoutTitle','g',11,['default':("Notey")],-1)
})
invokeTag('captureTitle','sitemesh',11,[:],3)
})
invokeTag('wrapTitleTag','sitemesh',11,[:],2)
printHtmlPart(3)
invokeTag('stylesheet','asset',14,['src':("bootstrap.min.css")],-1)
printHtmlPart(4)
invokeTag('stylesheet','asset',15,['src':("style.css")],-1)
printHtmlPart(5)
})
invokeTag('captureHead','sitemesh',22,[:],1)
printHtmlPart(6)
createTagBody(1, {->
printHtmlPart(7)
expressionOut.print(createLink(uri: '/'))
printHtmlPart(8)
expressionOut.print(createLink(uri: '/home'))
printHtmlPart(9)
expressionOut.print(session.user?.firstName)
printHtmlPart(10)
expressionOut.print(session.user?.lastName)
printHtmlPart(11)
expressionOut.print(createLink(uri: '/logout'))
printHtmlPart(12)
invokeTag('layoutBody','g',48,[:],-1)
printHtmlPart(13)
invokeTag('javascript','asset',54,['src':("jquery.js")],-1)
printHtmlPart(1)
invokeTag('javascript','asset',55,['src':("bootstrap.min.js")],-1)
printHtmlPart(14)
})
invokeTag('captureBody','sitemesh',56,[:],1)
printHtmlPart(15)
}
public static final Map JSP_TAGS = new HashMap()
protected void init() {
	this.jspTags = JSP_TAGS
}
public static final String CONTENT_TYPE = 'text/html;charset=UTF-8'
public static final long LAST_MODIFIED = 1425835564312L
public static final String EXPRESSION_CODEC = 'html'
public static final String STATIC_CODEC = 'none'
public static final String OUT_CODEC = 'html'
public static final String TAGLIB_CODEC = 'none'
}
