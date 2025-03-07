<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ApiAuthController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        // Kiểm tra tài khoản có tồn tại không
        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'Tài khoản không tồn tại!',
            ], 404);
        }

        // Kiểm tra tài khoản có bị vô hiệu hóa không
        if ($user->is_active == 0) {
            return response()->json([
                'status' => 'error',
                'message' => 'Tài khoản của bạn đã bị vô hiệu hóa!',
            ], 403);
        }

        // Kiểm tra mật khẩu
        if (!Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Mật khẩu bạn nhập không đúng!',
            ], 401);
        }

        // Tạo token
        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'access_token' => $token,
            'type_token' => 'Bearer',
            'message' => 'Đăng nhập thành công!',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'user_image' => $user->user_image
            ]
        ], 200);
    }


    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|max:30',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'gender' => 'required',
            'phone' => 'required|digits:10'
        ], [
            'username.required' => 'Bạn chưa nhập tên!',
            'username.max' => 'Tên tối đa 30 ký tự!',
            'email.required' => 'Bạn chưa nhập email!',
            'email.email' => 'Email không hợp lệ!',
            'email.unique' => 'Email đã tồn tại!',
            'password.required' => 'Bạn chưa nhập mật khẩu!',
            'password.min' => 'Mật khẩu ít nhất 6 ký tự!',
            'gender.required' => 'Bạn chưa chọn giới tính!',
            'phone.required' => 'Bạn chưa nhập số điện thoại!',
            'phone.digits' => 'Số điện thoại phải có 10 chữ số!',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 400);
        }

        // Tạo user mới
        $user = User::create([
            'name' => $request->username,
            'email' => $request->email,
            'phone_number' => $request->phone,
            'gender' => $request->gender,
            'password' => Hash::make($request->password),
            'role' => 'Khách hàng',
            'is_active' => 1 // Mặc định tài khoản hoạt động
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Đăng ký thành công!',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ]
        ], 201);
    }


    public function user(Request $request)
    {
        return response()->json([
            'status' => 'success',
            'user' => [
                'id' => $request->user()->id,
                'name' => $request->user()->name,
                'email' => $request->user()->email,
                'role' => $request->user()->role,
                'user_image' => $request->user()->user_image
            ]
        ], 200);
    }
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'Đăng xuất thành công!'
        ], 200);
    }

}
