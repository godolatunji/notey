<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Notey | Sign-in</title>

    <!-- Bootstrap core CSS -->
    <asset:stylesheet src="bootstrap.min.css"/>
   <asset:stylesheet src="signin.css"/>


    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>

    <div class="container">
    	<div class="error btn-error">
    		<g:if test="${flash.message}">
				<div class="btn-error">
					${flash.message}
				</div>
			</g:if>
    	</div>
		
      <form class="form-signin" role="form" action="${createLink(uri: '/postLogin') }" name="signin_form" method="POST">
        <h2 class="form-signin-heading">Please sign in</h2>
        <input type="text" name="username"class="form-control" placeholder="Email address" required autofocus>
        <input type="password" name="password" class="form-control" placeholder="Password" required>
        
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>
      <div class="footer">
      	<p>Don't have an account? Click <a href="${createLink(uri: '/register') }">Here</a> to register</p>
      </div>

    </div> <!-- /container -->
  </body>
</html>
