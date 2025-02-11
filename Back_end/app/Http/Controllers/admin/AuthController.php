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
        //Validate
        $request->validate([
            'email' => 'required|email|unique:users,email',
            'name' => 'required|string|max:255',
            'phone_number' => 'required|regex:/^0[0-9]{9,10}$/',
            'role' => 'required',
            'password' => 'required|min:6',
        ], [
            'email.required' => 'Email không được để trống.',
            'email.email' => 'Email không đúng định dạng.',
            'email.unique' => 'Email này đã tồn tại, vui lòng chọn email khác.',
        ]);

        $request->merge(['password' => Hash::make($request->password)]);

        try {
            User::create($request->all());
        } catch (\Throwable $th) {
            // dd($th);
        }
        return redirect()->route('login');
    }

    public function logout()
    {
        Auth::logout();
        return redirect()->back();
    }
}
