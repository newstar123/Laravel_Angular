<!DOCTYPE html>
<html lang="en" data-ng-app="Auth" ng-controller="AppCtrl">

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!--<base href="http://blueholding.mx/fund/public/">-->
        <!--<link rel="shortcut icon" href="/app/client/images/favicon.ico">-->
       
        <title>Login</title>

        <!--Core CSS -->
        <link href="app/bs3/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">

        <!-- Custom styles for this template -->
        <link href="app/css/style.css" rel="stylesheet">
        <link href="app/css/style-responsive.css" rel="stylesheet" />

        <!-- Custom styles for notification template -->
        <link href="app/css/ns-default.css" rel="stylesheet">
        <link href="app/css/ns-style-attached.css" rel="stylesheet">
    </head>

    <body class="login-body">

        <div class="container" ui-view></div>
        <!-- jquery Js -->
        <script src="app/js/jquery.js"></script>

        <!-- Notification Js -->
        <script src="app/js/modernizr.custom.js"></script>
        <script src="app/js/classie.js"></script>
        <script src="app/js/notificationFx.js"></script>

        <!-- Angular Libraries -->
        <script src="app/bower_components/angular/angular.min.js"></script>
        <script src="app/bower_components/angular-ui-router/release/angular-ui-router.min.js"></script>

        <!-- Auth Controller -->
        <script src="app/partials/auth/index.js"></script>


    </body>

</html>
