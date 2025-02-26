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
        $user = User::query()->where('email', '=', $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'mật khẩu bạn nhập không đúng',
            ]);
        }
        $token = $user->createToken('authToken')->plainTextToken;
        return response()->json([
            'access_token' => $token,
            'type_token' => 'Bearer ',
            'success' => 'đăng nhập thành công'
        ], 200);
    }

    public function register(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'username' => 'required|max:30',
            'email' => 'required',
            'password' => 'required',
            'gender' => 'required',
            'phone' => 'required'
        ], [
            'username.required' => 'bạn chưa nhập tên',
            'username.max:30' => 'số lượng ký tự đối ta là 30',
            'email.required' => 'bạn chưa nhập email',
            'password.required' => 'bạn chưa nhập mật khẩu',
            'gender.required' => 'bạn chưa chọn giới tính',
            'phone.required' => 'bạn chưa nhập số điện thoại',
        ]);
        if ($validate->fails()) {
            return response()->json([
                'message' => $validate->errors()
            ], 400);
        }
        ;
        User::create([
            'name' => $request->username,
            'email' => $request->email,
            'phone_number' => $request->phone,
            'gender' => $request->gender,
            'password' => hash::make($request->password),
            'role' => 'Khách hàng',
        ]);

        return response()->json([
            'message' => 'đăng kí thành công',
        ], 201);
    }

    public function user(Request $request)
    {
        return response()->json([
            'role' => $request->user()->role,
        ]);
    }
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully'], 200);
    }
}
