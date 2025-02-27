<aside class="page-sidebar">
    <div class="left-arrow" id="left-arrow"><i class="fas fa-palette"></i></div>
    <div class="main-sidebar" id="main-sidebar">
        <ul class="sidebar-menu" id="simple-bar">

            <li class="sidebar-list mb-2"> <a class="sidebar-link" href="javascript:void(0)">
                <h6 class=""><i class="fas fa-chart-line"></i> Bảng điều khiển</h6>
            </a>
            <ul class="sidebar-submenu">
                <li><a href="{{ route('/') }}">Thống kê</a></li>
            </ul>
        </li>
           

            <li class="sidebar-list mb-2"> <a class="sidebar-link" href="javascript:void(0)">
                    <h6 class=""><i class="fas fa-user"></i> Quản lý tài khoản</h6>
                </a>
                <ul class="sidebar-submenu">
                    <li><a href="{{ route('users.index') }}">quản trị</a></li>
                    <li><a href="{{ route('users.show') }}">người dùng</a></li>
                    <li><a href="{{ route('users.create') }}">Thêm tài khoản</a></li>   
                  
                </ul>
            </li>

            <li class="sidebar-list mb-2"> <a class="sidebar-link" href="javascript:void(0)">
                    <h6 class=""><i class="fas fa-box"></i> Quản lý sản phẩm</h6>
                </a>
                <ul class="sidebar-submenu">
                    <li> <a href="{{ route('product') }}">Danh sách </a></li>
                    <li><a href="{{ route('createProduct') }}">Thêm sản phẩm</a></li>
                    <li><a href="{{ route('variant.index') }}">Biến thể</a></li>
                    {{-- <li><a href="{{ route('variant.show') }}">Thêm biến thể</a></li> --}}
                    <li><a href="{{ route('ListDelete.Product') }}">Thùng rác</a></li>
                </ul>
            </li>

            <li class="sidebar-list mb-2"> <a class="sidebar-link" href="javascript:void(0)">
                    <h6 class=""><i class="fas fa-list"></i> Quản lý Danh mục</h6>
                </a>
                <ul class="sidebar-submenu">
                    <li><a href="{{ route('categories.index') }}">Danh sách</a></li>
                    <li><a href="{{ route('categories.create') }}">Thêm danh mục</a></li>
                </ul>
            </li>

            <li class="sidebar-list mb-2"> <a class="sidebar-link" href="javascript:void(0)">
                    <h6 class=""> <i class="fas fa-palette"></i> Quản lý màu sắc</h6>
                </a>
                <ul class="sidebar-submenu">
                    <li> <a href="{{ route('color') }}">Danh sách</a></li>
                    <li><a href="{{ route('createcolor') }}">Thêm màu sắc</a></li>
                </ul>
            </li>

            <li class="sidebar-list mb-2"> <a class="sidebar-link" href="javascript:void(0)">
                    <h6 class=""><i class="fas fa-ruler"></i> Quản lý size</h6>
                </a>
                <ul class="sidebar-submenu">
                    <li><a href="{{ route('sizes.index') }}">Danh sách</a></li>
                    <li><a href="{{ route('sizes.create') }}">Thêm size</a></li>
                </ul>
            </li>

            {{-- <li class="sidebar-list"> <a class="sidebar-link" href="javascript:void(0)">
                    <h6 class=""><i class="fas fa-shopping-cart"></i> Quản lý giỏ hàng</h6>
                </a>
                <ul class="sidebar-submenu">
                    <li><a href="{{ route('carts.index') }}">Danh sách</a></li>
                     <li><a href="{{ route('sizes.create') }}">Thêm size</a></li> 
                </ul>
            </li> --}}


            <li class="sidebar-list"> <a class="sidebar-link" href="javascript:void(0)">
                    <h6 class=""><i class="fas fa-box"></i>Quản lý đơn hàng</h6>
                </a>
                <ul class="sidebar-submenu">
                    <li> <a href="{{ route('orders.index') }}">Danh sách </a></li>
                    <li><a href="{{ route('orders.create') }}">Thêm đơn hàng</a></li>
                </ul>
            </li>
            
            <li class="sidebar-list"> <a class="sidebar-link" href="javascript:void(0)">
                    <h6 class=""><i class="fas fa-ticket-alt"></i> Voucher</h6>
                </a>
                <ul class="sidebar-submenu">
                    <li><a href="{{ route('Voucher.index') }}"> Danh sách</a></li>
                    <li><a href="{{ route('sizes.create') }}">Thêm Voucher</a></li>
                </ul>

            </li>

            <li class="sidebar-list"> <a class="sidebar-link" href="javascript:void(0)">
                    <h6 class=""><i class="fas fa-comments"></i> Tin nhắn(chưa làm)</h6>
                </a>
                <ul class="sidebar-submenu">
                    <li><a href="{{ route('boxchat.index') }}">Hộp thư</a></li>
                </ul>

            <li class="sidebar-list"> <a class="sidebar-link" href="javascript:void(0)">
                    <h6 class=""><i class="fas fa-comment"></i> Bình luận</h6>
                </a>
                <ul class="sidebar-submenu">
                    <li><a href="{{ route('comment.index') }}">Danh sách</a></li>
                </ul>

            </li>
        </ul>
    </div>
    <div class="right-arrow" id="right-arrow"><i data-feather="arrow-right"></i></div>
</aside>
