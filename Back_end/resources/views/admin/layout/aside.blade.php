<aside class="page-sidebar">
    <div class="left-arrow" id="left-arrow"><i data-feather="arrow-left"></i></div>
    <div class="main-sidebar" id="main-sidebar">
        <ul class="sidebar-menu" id="simple-bar">

            <li class="sidebar-list"> <a class="sidebar-link" href="javascript:void(0)">
                    <h6 class=""><i class="fas fa-user"></i> Quản lý thông tin TK </h6>
                </a>
                <ul class="sidebar-submenu">
                    <li> <a href="{{ route('users.index') }}">Danh sách</a></li>
                    <li><a href="{{ route('users.create') }}">thêm tài khoản</a></li>
                </ul>
            </li>

            <li class="sidebar-list"> <a class="sidebar-link" href="javascript:void(0)">
                    <h6 class=""> <i class="fas fa-palette"></i> Quản lý màu sắc</h6>
                </a>
                <ul class="sidebar-submenu">
                    <li> <a href="{{ route('color') }}">Danh sách</a></li>
                    <li><a href="{{ route('createcolor') }}">thêm màu</a></li>
                </ul>
            </li>

            <li class="sidebar-list"> <a class="sidebar-link" href="javascript:void(0)">
                    <h6 class=""><i class="fas fa-sort"></i>Quản lý size</h6>
                </a>
                <ul class="sidebar-submenu">
                    <li><a href="{{ route('sizes.index') }}">Danh sách</a></li>
                    <li><a href="{{ route('sizes.create') }}">Thêm size</a></li>
                </ul>
            </li>

            <li class="sidebar-list"> <a class="sidebar-link" href="javascript:void(0)">
                    <h6 class=""><i class="fas fa-box"></i>Quản lý sản phẩm</h6>
                </a>
                <ul class="sidebar-submenu">
                    <li> <a href="{{ route('product') }}">Danh sách </a></li>
                    <li><a href="{{ route('createProduct') }}">Thêm sản phẩm</a></li>
                    <li><a href="{{ route('variant.index') }}">Biến thể</a></li>
                    <li><a href="{{ route('variant.show') }}">Thêm biến thể</a></li>
                    <li><a href="{{ route('ListDelete.Product') }}">Thùng rác</a></li>
                </ul>
            </li>
        </ul>
    </div>
    <div class="right-arrow" id="right-arrow"><i data-feather="arrow-right"></i></div>
</aside>
