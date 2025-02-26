<!DOCTYPE html>
<html lang="en">

<!-- Mirrored from admin.pixelstrap.net/admiro/template/cart.html by HTTrack Website Copier/3.x [XR&CO'2014], Fri, 17 Jan 2025 17:46:43 GMT -->

<head>
    @include('admin.layout.head')
</head>

<body>

    <!DOCTYPE html>
    <html lang="en">

    <!-- Mirrored from admin.pixelstrap.net/admiro/template/login.html by HTTrack Website Copier/3.x [XR&CO'2014], Fri, 17 Jan 2025 17:46:46 GMT -->

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description"
            content="Admiro admin is super flexible, powerful, clean &amp; modern responsive bootstrap 5 admin template with unlimited possibilities.">
        <meta name="keywords"
            content="admin template, Admiro admin template, best javascript admin, dashboard template, bootstrap admin template, responsive admin template, web app">
        <meta name="author" content="pixelstrap">
        <title>Admiro - Premium Admin Template</title>
        <!-- Favicon icon-->
        <link rel="icon" href="../assets/images/favicon.png" type="image/x-icon">
        <link rel="shortcut icon" href="../assets/images/favicon.png" type="image/x-icon">
        <!-- Google font-->
        <link rel="preconnect" href="https://fonts.googleapis.com/">
        <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin="">
        <link
            href="https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz,wght@6..12,200;6..12,300;6..12,400;6..12,500;6..12,600;6..12,700;6..12,800;6..12,900;6..12,1000&amp;display=swap"
            rel="stylesheet">
        <!-- Flag icon css -->
        <link rel="stylesheet" href="../assets/css/vendors/flag-icon.css">
        <!-- iconly-icon-->
        <link rel="stylesheet" href="../assets/css/iconly-icon.css">
        <link rel="stylesheet" href="../assets/css/bulk-style.css">
        <!-- iconly-icon-->
        <link rel="stylesheet" href="../assets/css/themify.css">
        <!--fontawesome-->
        <link rel="stylesheet" href="../assets/css/fontawesome-min.css">
        <!-- Whether Icon css-->
        <link rel="stylesheet" type="text/css" href="../assets/css/vendors/weather-icons/weather-icons.min.css">
        <!-- App css -->
        <link rel="stylesheet" href="../assets/css/style.css">
        <link id="color" rel="stylesheet" href="../assets/css/color-1.css" media="screen">
    </head>

    <body>
        <!-- tap on top starts-->
        <div class="tap-top"><i class="iconly-Arrow-Up icli"></i></div>
        <!-- tap on tap ends-->
        <!-- loader-->
        <div class="loader-wrapper">
            <div class="loader"><span></span><span></span><span></span><span></span><span></span></div>
        </div>
        <!-- login page start-->
        <div class="container-fluid p-0">
            <div class="row m-0">
                <div class="col-12 p-0">
                    <div class="login-card login-dark">
                        <div>
                            {{-- Ảnh logo --}}
                            {{-- <div><a class="logo" href="index.html"><img class="img-fluid for-light m-auto"
                                    src="../assets/images/logo/logo1.png" alt="looginpage"><img class="img-fluid for-dark" src="../assets/images/logo/logo-dark.png" alt="logo"></a></div> --}}

                            {{-- Form đăng nhập --}}
                            <div class="login-main">
                                <form class="theme-form" action="{{ route('post-login') }}" method="POST">
                                    @csrf
                                    <h2 class="text-center">Đăng nhập vào tài khoản</h2>
                                    <p class="text-center">Nhập email và &amp; mật khẩu để đăng nhập</p>

                                    @if ($message = Session::get('error'))
                                        <div class="alert alert-danger alert-block">
                                            <button type="button" class="close" data-dismiss="alert">x</button>
                                            <strong>{{ $message }}</strong>
                                        </div>
                                    @endif

                                    <div class="form-group">
                                        <label class="col-form-label">Email</label>
                                        <input class="form-control" type="email" name="email" placeholder="Nhập email">
                                        @error('email')
                                            <p style="color: red">{{ $message }}</p>
                                        @enderror
                                    </div>

                                    <div class="form-group">
                                        <label class="col-form-label">Mật khẩu</label>
                                        <div class="form-input position-relative">
                                            <input class="form-control" id="pass" type="password" name="password" placeholder="Nhập mật khẩu">
                                            <div class="show-hide"><span class="show" onclick="showPass()"></span></div>

                                            {{-- Show password --}}
                                            <script type="text/javascript">
                                            var x = true;
                                                function showPass(){
                                                   if(x){
                                                        document.getElementById('pass').type = "text";
                                                        x = false;
                                                   }else{
                                                        document.getElementById('pass').type = "password";
                                                        x = true;
                                                   }
                                                }
                                            </script>
                                        </div>
                                            @error('password')
                                                    <p style="color: red">{{ $message }}</p>
                                            @enderror
                                    </div>

                                    <div class="form-group mb-0 checkbox-checked">
                                        <div class="form-check checkbox-solid-info">
                                            <input class="form-check-input" id="solid6" type="checkbox" name="remember">
                                            <label class="form-check-label" for="solid6">Ghi nhớ mật khẩu</label>
                                        </div>
                                            {{-- <a class="link" href="forget-password.html">Quên mật khẩu?</a> --}}
                                        <div class="text-end mt-3">
                                            <button class="btn btn-primary btn-block w-100" type="submit">Đăng nhập</button>
                                        </div>
                                    </div>
                                    <p class="mt-4 mb-0 text-center">Bạn chưa có tài khoản?<a class="ms-2" href="{{ route('register') }}">Tạo tài khoản</a></p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- jquery-->
            <script src="../assets/js/vendors/jquery/jquery.min.js"></script>
            <!-- bootstrap js-->
            <script src="../assets/js/vendors/bootstrap/dist/js/bootstrap.bundle.min.js" defer=""></script>
            <script src="../assets/js/vendors/bootstrap/dist/js/popper.min.js" defer=""></script>
            <!--fontawesome-->
            <script src="../assets/js/vendors/font-awesome/fontawesome-min.js"></script>
            <!-- password_show-->
            <script src="../assets/js/password.js"></script>
            <!-- custom script -->
            <script src="../assets/js/script.js"></script>
        </div>
    </body>

    <!-- Mirrored from admin.pixelstrap.net/admiro/template/login.html by HTTrack Website Copier/3.x [XR&CO'2014], Fri, 17 Jan 2025 17:46:46 GMT -->

    </html>
    <!-- jquery-->
    @include('admin.layout.js')
</body>

<!-- Mirrored from admin.pixelstrap.net/admiro/template/cart.html by HTTrack Website Copier/3.x [XR&CO'2014], Fri, 17 Jan 2025 17:46:44 GMT -->

</html>
