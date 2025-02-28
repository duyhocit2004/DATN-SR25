
<!DOCTYPE html >
<html lang="en">

<!-- Mirrored from admin.pixelstrap.net/admiro/template/cart.html by HTTrack Website Copier/3.x [XR&CO'2014], Fri, 17 Jan 2025 17:46:43 GMT -->
<head>
    @include('admin.layout.head')
  </head>
  <body>
    <!-- page-wrapper Start-->
    <!-- tap on top starts-->
    <!-- tap on tap ends-->
    <!-- loader-->
    <div class="loader-wrapper">
      <div class="loader"><span></span><span></span><span></span><span></span><span></span></div>
    </div>
    <div class="page-wrapper compact-wrapper" id="pageWrapper">

      <!-- header_Start-->
     @include('admin.layout.header')
     <!-- header_End-->

      <!-- Page Body Start-->
      <div class="page-body-wrapper">
        <!-- Page sidebar start-->
          @include('admin.layout.aside')
        <!-- Page sidebar end-->
            @yield('main')
            {{-- @yield('contents') --}}
          @include('admin.layout.footer')

      </div>
    </div>
    <!-- jquery-->
      @include('admin.layout.js')

      @yield('js_main')

  </body>

<!-- Mirrored from admin.pixelstrap.net/admiro/template/cart.html by HTTrack Website Copier/3.x [XR&CO'2014], Fri, 17 Jan 2025 17:46:44 GMT -->
</html>
