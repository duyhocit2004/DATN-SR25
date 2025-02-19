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
           
        </div>
        <div class="nav-right">
            <ul class="header-right">
                <li class="custom-dropdown">
                    <div class="translate_wrapper">
                        <div class="current_lang"><a class="lang" href="javascript:void(0)"><i
                                    class="flag-icon flag-icon-us"></i>
                                <h6 class="lang-txt f-w-700">ENG</h6>
                            </a></div>
                        <ul class="custom-menu profile-menu language-menu py-0 more_lang">
                            <li class="d-block"><a class="lang" href="#" data-value="English"><i
                                        class="flag-icon flag-icon-us"></i>
                                    <div class="lang-txt">English</div>
                                </a></li>
                            <li class="d-block"><a class="lang" href="#" data-value="fr"><i
                                        class="flag-icon flag-icon-fr"></i>
                                    <div class="lang-txt">Français</div>
                                </a></li>
                            <li class="d-block"><a class="lang" href="#" data-value="es"><i
                                        class="flag-icon flag-icon-es"></i>
                                    <div class="lang-txt">Español</div>
                                </a></li>
                        </ul>
                    </div>
                </li>
                
                
                
                
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
