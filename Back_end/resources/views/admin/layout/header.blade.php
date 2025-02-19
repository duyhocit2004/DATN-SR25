<header class="page-header row">
    <div class="logo-wrapper d-flex align-items-center col-auto"><a href="index.html"><img class="light-logo img-fluid"
                src="../assets/images/logo/logo1.png" alt="logo" /><img class="dark-logo img-fluid"
                src="../assets/images/logo/logo-dark.png" alt="logo" /></a><a class="close-btn toggle-sidebar"
            href="javascript:void(0)">
            <svg class="svg-color">
                <use href="https://admin.pixelstrap.net/admiro/assets/svg/iconly-sprite.svg#Category"></use>
            </svg></a></div>
    <div class="page-main-header col">
        <div class="header-left">
            <form class="form-inline search-full col" action="#" method="get">
                <div class="form-group w-100">
                    <div class="Typeahead Typeahead--twitterUsers">
                        <div class="u-posRelative">
                            <input class="demo-input Typeahead-input form-control-plaintext w-100" type="text"
                                placeholder="Search Admiro .." name="q" title="" autofocus="autofocus" />
                            <div class="spinner-border Typeahead-spinner" role="status"><span
                                    class="sr-only">Loading...</span></div><i class="close-search" data-feather="x"></i>
                        </div>
                        <div class="Typeahead-menu"></div>
                    </div>
                </div>
            </form>
            <div class="form-group-header d-lg-block d-none">
                <div class="Typeahead Typeahead--twitterUsers">
                    <div class="u-posRelative d-flex align-items-center">
                        <input class="demo-input py-0 Typeahead-input form-control-plaintext w-100" type="text"
                            placeholder="Type to Search..." name="q" title="" /><i
                            class="search-bg iconly-Search icli"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="nav-right">
                <li class="profile-nav custom-dropdown">
                    <div class="user-wrap">

                        <div class="user-content">
                            @if (Auth::check())
                                <div class="dropdown">
                                    <button class="btn btn-primary"  data-bs-toggle="dropdown">
                                        <h5>{{ Auth::user()->name }}</h5>
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a class="" href="#">Tài khoản</a></li>
                                        <li><a class="" href="#">Another action</a></li>
                                        <li><a class="" href="{{ route('logout') }}">Đăng xuất</a></li>
                                    </ul>
                                </div>
                            @else
                                <a href="{{ route('login') }}">
                                    <h5>Login</h5>
                                </a>
                            @endif
                        </div>
                    </div>
                    <div class="custom-menu overflow-hidden">
                        <ul class="profile-body">
                            <li class="d-flex">
                                <svg class="svg-color">
                                    <use
                                        href="https://admin.pixelstrap.net/admiro/assets/svg/iconly-sprite.svg#Profile">
                                    </use>
                                </svg><a class="ms-2" href="user-profile.html">Account</a>
                            </li>
                            <li class="d-flex">
                                <svg class="svg-color">
                                    <use
                                        href="https://admin.pixelstrap.net/admiro/assets/svg/iconly-sprite.svg#Message">
                                    </use>
                                </svg><a class="ms-2" href="letter-box.html">Inbox</a>
                            </li>
                            <li class="d-flex">
                                <svg class="svg-color">
                                    <use
                                        href="https://admin.pixelstrap.net/admiro/assets/svg/iconly-sprite.svg#Document">
                                    </use>
                                </svg><a class="ms-2" href="to-do.html">Task</a>
                            </li>


                            <li class="d-flex">
                                <svg class="svg-color">
                                    <use href="https://admin.pixelstrap.net/admiro/assets/svg/iconly-sprite.svg#Login">
                                    </use>
                                </svg><a class="ms-2" href="{{ route('logout') }}">Log Out</a>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</header>
