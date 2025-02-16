<?php

namespace App\Http\Controllers\admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // Form đăng nhập
    public function formLogin()
    {
        return view('auth.login');
    }

    // Xử lý đăng nhập
    public function postLogin(Request $request)
    {
        //Validate đăng nhập
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6',
        ], [
            'email.required' => 'Vui lòng nhập email',
            'email.email' => 'Email không đúng định dạng',
            'password.required' => 'Vui lòng nhập mật khẩu',
            'password.unique' => 'Mật khẩu phải nhiều hơn 6 kí tự',
        ]);

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {

            return redirect()->route('product');
        }
        return redirect()->back()->with('error', 'Sai email hoặc mật khẩu');
    }

    // Form đăng kí
    public function formRegister()
    {
        return view('auth.register');
    }

    // Xử lý đăng kí
    public function postRegister(Request $request)
    {
        //Validate đăng kí
        $request->validate([
            'email' => 'required|email|unique:users,email',
            'name' => 'required|string|max:255',
            'phone_number' => 'required|regex:/^0[0-9]{9,10}$/',
            'password' => 'required|min:6|confirmed',
            'password_confirmation' => 'required'
        ], [
            'name.required' => 'Tên không được bỏ trống',
            'phone_number.required' => 'Số điện thoại không được bỏ trống',
            'email.required' => 'Email không được để trống.',
            'email.email' => 'Email không đúng định dạng.',
            'email.unique' => 'Email này đã tồn tại, vui lòng chọn email khác.',
            'password.required' => 'Vui lòng nhập mật khẩu',
            'password.min' => 'Mật khẩu phải nhiều hơn 6 kí tự',
            'password_confirmation.required' => 'Vui lòng xác nhận mật khẩu',
            'password.confirmed' => 'Xác nhận mật khẩu sai.',
        ]);

        $request->merge(['password' => Hash::make($request->password)]);

        try {
            User::create($request->all());
        } catch (\Throwable $th) {
            // dd($th);
        }
        return redirect()->route('login')->with('success', 'Đăng kí thành công');
    }

    // Đăng xuất
    public function logout()
    {
        Auth::logout();
        return redirect()->back();
    }
}
