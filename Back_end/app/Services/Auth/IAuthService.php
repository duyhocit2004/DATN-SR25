<?php
namespace App\Services\Auth;

use Illuminate\Http\Request;

interface IAuthService {
    public function login(Request $request);
    public function loginAdmin(Request $request);
    public function register(Request $request);
    public function logout(Request $request);
    public function getUser(Request $request);
    public function updateUserAdmin(Request $request);
    public function updateUser(Request $request);

    public function forgotPassword(Request $request);
    public function changePassword(Request $request);

}
