<!DOCTYPE html>
<html>
	<head>
		<meta name="layout" content="main"/>
		<title>Notey |Welcome Home</title>
	</head>
	<body>
		<div class="container">
		<div class="row">
		<div class="col-md-2"></div>
		<div class="col-md-10 main-body">
			<g:if test="${flash.message}">
				<div class="alert alert-info" role="status">${flash.message}</div>
			</g:if>
			<div class="menu-buttons pull-right">
				<a href="${createLink(uri: '/notes/create') }" class="btn btn-primary">Create New Note</a>
			</div>
			<div class="table-responsive big-margin">
			<table class="table table-striped">
				<thead>
				<!--  	<td>S/N</td> -->
					<th>Title</th>
					<th>Last Updated</th>
					<th>Date Created</th>
					<th style="width: 100px"></th>
					<th style="width: 100px"></th>
				</thead>
				<tbody>
					<g:each in="${result}" var="note"> 
						<tr>
							<td><a href="${createLink(params: [id: note.id], uri: '/notes/show/') }"> ${note}</a></td>
							<td>${note.lastUpdated }</td>
							<td>${note.dateCreated }</td>
							<td>
								<a href="${createLink(params: [id: note.id], uri: '/notes/edit/') }"><button class="btn btn-success">Edit</button></a>
							</td>
							<td>
								<a href="${createLink(params: [id: note.id], uri: '/notes/delete/') }"><button class="btn btn-danger">Delete</button></a>
							</td>
						</tr>
					</g:each>
				</tbody>
			</table>
			</div>
		</div>
		</div>
		</div>
	</body>
</html>