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
			<form method="POST" action="${createLink(uri: '/notes/store') }" role="form"  name="create_note_form">
				<g:render template="form" />
				<button type="submit" class="btn btn-primary">Save Note</button>
			</form>
			
		</div>
		<div class="col-md-2"></div>
		</div>
		</div>
	</body>
</html>
