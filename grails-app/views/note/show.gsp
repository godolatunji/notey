
<%@ page import="notey.Note" %>
<!DOCTYPE html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'note.label', default: 'Note')}" />
		<title>Create A Note</title>
	</head>
	<body>
		<div class="container">
		<div class="row">
		<div class="col-md-2"></div>
		<div class="col-md-8 main-body">
			<g:if test="${flash.message}">
				<div class="alert alert-info" role="status">${flash.message}</div>
			</g:if>
			<div class="menu-buttons pull-right">
			<a href="${createLink(params: [id: note.id], uri: '/notes/edit/') }"><button class="btn btn-success">Edit</button></a>|
			<a href="${createLink(params: [id: note.id], uri: '/notes/delete/') }"><button class="btn btn-danger">Delete</button></a>|
			<a href="${createLink(uri: '/home') }" class="btn btn-primary">All Notes</a>
			</div>
			<div class="big-margin">
				<h2>${note.title }</h2>
				<blockquote>
					<p>${note.content }</p>
				</blockquote>
			</div>
		</div>
		<div class="col-md-2"></div>
		</div>
		</div>
	</body>
</html>
