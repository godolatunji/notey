<%@ page import="notey.Note" %>

<div class="form-group">
	<label for="title">Title: </label>
	<input type="text" name="title" class="form-control" placeholder="Enter note title" required autofocus/>
</div>
<div class="form-group">
	<label for="content">Content: </label>
	<ckeditor:editor height="400px" width="100%" name="content">
	</ckeditor:editor>
</div>
