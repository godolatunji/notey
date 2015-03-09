<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Notey | Welcome</title>

    <!-- Bootstrap core CSS -->
   <asset:stylesheet src="bootstrap.min.css"/>
   <asset:stylesheet src="cover.css"/>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>

    <div class="site-wrapper">

      <div class="site-wrapper-inner">

        <div class="cover-container">

          <div class="masthead clearfix">
            <div class="inner">
              <h3 class="masthead-brand">Notey</h3>
              <ul class="nav masthead-nav">
                <li class="active"><a href="${createLink(uri: '/login') }">Login</a></li>
              </ul>
            </div>
          </div>

          <div class="inner cover">
            <h1 class="cover-heading">Notey</h1>
            <p class="lead">Save your notes for you & access them anytime and anywhere</p>
            <p class="lead">
              <a href="${createLink(uri: '/register') }" class="btn btn-lg btn-default">Sign-Up</a>
            </p>
          </div>

          <div class="mastfoot">
            <div class="inner">
              <p><a href="#">Olatunji Ayodabo</a></p>
            </div>
          </div>

        </div>

      </div>

    </div>
  </body>
</html>
