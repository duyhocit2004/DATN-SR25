
<!DOCTYPE html >
<html lang="en">
  
<!-- Mirrored from admin.pixelstrap.net/admiro/template/cart.html by HTTrack Website Copier/3.x [XR&CO'2014], Fri, 17 Jan 2025 17:46:43 GMT -->
<head>
    @include('admin.layout.head')
  </head>
  <body>
    <!-- page-wrapper Start-->
    <!-- tap on top starts-->
    <div class="tap-top"><i class="iconly-Arrow-Up icli"></i></div>
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
        <div class="page-body">
          <div class="container-fluid">
            <div class="page-title">
              <div class="row">
                <div class="col-sm-6 col-12"> 
                  <h2>Cart</h2>
                </div>
                <div class="col-sm-6 col-12">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="index.html"><i class="iconly-Home icli svg-color"></i></a></li>
                    <li class="breadcrumb-item">ECommerce</li>
                    <li class="breadcrumb-item active">Cart</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <!-- Container-fluid starts-->
          <div class="container-fluid">
            <div class="row">
              <div class="col-sm-12">
                <div class="card">
                  <div class="card-header card-no-border pb-0">
                    <h3>Cart</h3>
                  </div>
                  <div class="card-body">
                    <div class="row">
                      <div class="order-history table-responsive wishlist">
                        <table class="table table-bordered">
                          <thead>
                            <tr>
                              <th>Prdouct</th>
                              <th>Prdouct Name</th>
                              <th>Price</th>
                              <th>Quantity</th>
                              <th>Action</th>
                              <th>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td><img class="img-fluid img-40" src="../assets/images/product/1.png" alt="#"/></td>
                              <td>
                                <div class="product-name"><a href="#">Long Top</a></div>
                              </td>
                              <td>$21</td>
                              <td>
                                <fieldset class="qty-box">
                                  <div class="input-group">
                                    <input class="touchspin text-center" type="text" value="5"/>
                                  </div>
                                </fieldset>
                              </td>
                              <td><i data-feather="x-circle"></i></td>
                              <td>$12456</td>
                            </tr>
                            <tr>
                              <td><img class="img-fluid img-40" src="../assets/images/product/13.png" alt="#"/></td>
                              <td>
                                <div class="product-name"><a href="#">Fancy watch</a></div>
                              </td>
                              <td>$50</td>
                              <td>
                                <fieldset class="qty-box">
                                  <div class="input-group">
                                    <input class="touchspin text-center" type="text" value="5"/>
                                  </div>
                                </fieldset>
                              </td>
                              <td><i data-feather="x-circle"></i></td>
                              <td>$12456</td>
                            </tr>
                            <tr>
                              <td><img class="img-fluid img-40" src="../assets/images/product/4.png" alt="#"/></td>
                              <td>
                                <div class="product-name"><a href="#">Man shoes</a></div>
                              </td>
                              <td>$11</td>
                              <td>
                                <fieldset class="qty-box">
                                  <div class="input-group">
                                    <input class="touchspin text-center" type="text" value="5"/>
                                  </div>
                                </fieldset>
                              </td>
                              <td><i data-feather="x-circle"></i></td>
                              <td>$12456</td>
                            </tr>
                            <tr>
                              <td colspan="4">                                           
                                <div class="input-group">
                                  <input class="form-control me-2" type="text" placeholder="Enter coupan code"/><a class="btn btn-primary" href="#">Apply</a>
                                </div>
                              </td>
                              <td class="total-amount">
                                <h6 class="m-0 text-end"><span class="f-w-600">Total Price :</span></h6>
                              </td>
                              <td><span>$6935.00  </span></td>
                            </tr>
                            <tr>
                              <td class="text-end" colspan="5"><a class="btn btn-secondary cart-btn-transform" href="product.html">continue shopping</a></td>
                              <td><a class="btn btn-success cart-btn-transform" href="checkout.html">check out</a></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer class="footer"> 
          <div class="container-fluid">
            <div class="row"> 
              <div class="col-md-6 footer-copyright">
                <p class="mb-0">Copyright 2024 © Admiro theme by pixelstrap.</p>
              </div>
              <div class="col-md-6">
                <p class="float-end mb-0">Hand crafted &amp; made with
                  <svg class="svg-color footer-icon">
                    <use href="https://admin.pixelstrap.net/admiro/assets/svg/iconly-sprite.svg#heart"></use>
                  </svg>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
    <!-- jquery-->
    <script src="{{asset('admin/js/vendors/jquery/jquery.min.js')}}"></script>
    <!-- bootstrap js-->
    <script src="{{asset('admin/js/vendors/bootstrap/dist/js/bootstrap.bundle.min.js')}}" defer=""></script>
    <script src="{{asset('admin/js/vendors/bootstrap/dist/js/popper.min.js')}}" defer=""></script>
    <!--fontawesome-->
    <script src="{{asset('admin/js/vendors/font-awesome/fontawesome-min.js')}}"></script>
    <!-- feather-->
    <script src="{{asset('admin/js/vendors/feather-icon/feather.min.js')}}"></script>
    <script src="{{asset('admin/js/vendors/feather-icon/custom-script.js')}}"></script>
    <!-- sidebar -->
    <script src="{{asset('admin/js/sidebar.js')}}"></script>
    <!-- scrollbar-->
    <script src="{{asset('admin/js/scrollbar/simplebar.js')}}"></script>
    <script src="{{asset('admin/js/scrollbar/custom.js')}}"></script>
    <!-- slick-->
    <script src="{{asset('admin/js/slick/slick.min.js')}}"></script>
    <script src="{{asset('admin/js/slick/slick.js')}}"></script>
    <!-- touchspin-->
    <script src="{{asset('admin/js/touchspin/touchspin.js')}}"></script>
    <script src="{{asset('admin/js/touchspin/input-groups.min.js')}}"></script>
    <!-- theme_customizer-->
    <script src="{{asset('admin/js/theme-customizer/customizer.js')}}"></script>
    <!-- custom script -->
    <script src="{{asset('admin/js/script.js')}}"></script>
  </body>

<!-- Mirrored from admin.pixelstrap.net/admiro/template/cart.html by HTTrack Website Copier/3.x [XR&CO'2014], Fri, 17 Jan 2025 17:46:44 GMT -->
</html>