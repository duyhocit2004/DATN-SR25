<aside class="page-sidebar">
    <div class="left-arrow" id="left-arrow"><i data-feather="arrow-left"></i></div>
    <div class="main-sidebar" id="main-sidebar">
      <ul class="sidebar-menu" id="simple-bar">

        <li class="sidebar-list"> <a class="sidebar-link" href="javascript:void(0)">
            <h6 class="">Quản lý thông tin TK </h6><i class=""></i></a>
          <ul class="sidebar-submenu">
            <li> <a href="{{ route('users.index') }}">Danh sách</a></li>
            <li><a href="{{ route('users.create') }}">thêm tài khoản</a></li>
          </ul>
        </li>

        <li class="sidebar-list"> <a class="sidebar-link" href="javascript:void(0)">
            <h6 class="">Quản lý màu sắc</h6><i class=""></i></a>
          <ul class="sidebar-submenu">
            <li> <a href="{{route('color')}}">Danh sách</a></li>
            <li><a href="{{route('createcolor')}}">thêm màu</a></li>
          </ul>
        </li>

        <li class="sidebar-list"> <a class="sidebar-link" href="javascript:void(0)">
            <h6 class="">Quản lý sản phẩm </h6><i class=""></i></a>
          <ul class="sidebar-submenu">
            <li> <a href="{{route('product')}}">danh sách </a></li>
            <li><a href="{{route('createProduct')}}">thêm sản phẩm</a></li>
            <li><a href="{{route('variant.index')}}">biến thể</a></li>

          </ul>
        </li>

      </ul>
    </div>
    <div class="right-arrow" id="right-arrow"><i data-feather="arrow-right"></i></div>
  </aside>
