<!DOCTYPE html>
<html lang="en">
  <head>
  	<ckeditor:resources/>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="../../favicon.ico">

    <title><g:layoutTitle default="Notey"/></title>

    <!-- Bootstrap core CSS -->
    <asset:stylesheet src="bootstrap.min.css"/>
   	<asset:stylesheet src="style.css"/>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>

    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="${createLink(uri: '/') }">Notey</a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav pull-right">
            <li class="active"><a href="${createLink(uri: '/home') }">Home</a></li>
            <li><a href="#"><b>${session.user?.firstName}&nbsp;${session.user?.lastName}</b></a></li>
            <li>|</li>
            <li><a href="${createLink(uri: '/logout') }">Logout</a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>
	
	<g:layoutBody/>


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <asset:javascript src="jquery.js"/>
    <asset:javascript src="bootstrap.min.js"/>
  </body>
</html>
