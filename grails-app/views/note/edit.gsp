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
		<div class="pull-right">
			<a href="${createLink(uri: '/home') }" class="btn btn-primary">All Notes</a>
		</div>
			<g:if test="${flash.message}">
				<div class="alert alert-info" role="status">${flash.message}</div>
			</g:if>
			<form method="PUT" action="${createLink(params: [id:note.id], uri: '/notes/update') }" role="form"  name="create_note_form" class="big-margin">
				<input type="hidden" value="${note.id}" name="id" />
				<div class="form-group">
					<label for="title">Title: </label>
					<input type="text" name="title" class="form-control" placeholder="Enter note title" value="${note.title }" required autofocus/>
				</div>
				<div class="form-group">
					<label for="content">Content: </label>
					<textarea name="content" class="form-control" placeholder="Enter note contents" rows="15">${note.content }</textarea>
				</div>
				<button type="submit" class="btn btn-primary">Save Note</button>
			</form>
			
		</div>
		<div class="col-md-2"></div>
		</div>
		</div>
	</body>
</html>