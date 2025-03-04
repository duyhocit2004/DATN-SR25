<header class="page-header row">
    <div class="logo-wrapper d-flex align-items-center col-auto"><a href="index.html"><img class="light-logo img-fluid"
                src="{{ asset('logo.png') }}" alt="logo" /><img class="dark-logo img-fluid"
                src="{{ asset('logo.png') }}" alt="logo" /></a><a class="" href="">
        </a></div>
    <div class="page-main-header col">
        <div class="header-left">
        </div>
        <div class="nav-right">
            <ul class="header-right">
                <li class="custom-dropdown">
                    {{-- <div class="translate_wrapper">
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
                    </div> --}}
                </li>

                <li class="profile-nav custom-dropdown">
                    <div class="user-wrap position-relative">
                        <div class="user-content">
                            @if (Auth::check())
                                <div class="dropdown">
                                    <button
                                        class="btn btn-profile d-flex align-items-center gap-2 rounded-pill shadow-sm"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        <div class="avatar-container position-relative">
                                            <img src="{{ Auth::user()->user_image }}" {{-- alt="{{ Auth::user()->name }}'s Avatar" --}}
                                                class="rounded-circle object-fit-cover" width="45" height="45">
                                            <span class="status-dot position-absolute bg-success rounded-circle"></span>
                                        </div>
                                        <div class="user-info">
                                            <span class="fw-bold text-primary">{{ Auth::user()->name }}</span>
                                            {{-- <small class="d-block text-muted">@{{ strtolower(Auth::user() - > name) }}</small> --}}
                                        </div>
                                    </button>

                                    <ul
                                        class="dropdown-menu dropdown-menu-end mt-2 shadow border-0 rounded-3 animate__animated animate__fadeIn">
                                        <li class="dropdown-header px-3 py-2">
                                            <span class="text-muted text-uppercase small">Account</span>
                                        </li>
                                        <li>
                                            <a class="dropdown-item d-flex align-items-center gap-2 px-3 py-2"
                                                href="#">
                                                <i class="bi bi-person fs-5"></i>
                                                <span>Profile</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item d-flex align-items-center gap-2 px-3 py-2"
                                                href="#">
                                                <i class="bi bi-gear fs-5"></i>
                                                <span>Settings</span>
                                            </a>
                                        </li>
                                        <li>
                                            <hr class="dropdown-divider mx-2">
                                        </li>
                                        <li>
                                            <a class="dropdown-item d-flex align-items-center gap-2 px-3 py-2 text-danger"
                                                href="{{ route('logout') }}">
                                                <i class="bi bi-box-arrow-right fs-5"></i>
                                                <span>Logout</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            @else
                                <a href="{{ route('login') }}"
                                    class="btn btn-outline-primary rounded-pill px-4 py-2 d-flex align-items-center gap-2">
                                    <i class="bi bi-box-arrow-in-right"></i>
                                    <span>Login</span>
                                </a>
                            @endif
                        </div>
                </li>
            </ul>
        </div>
    </div>
</header>
