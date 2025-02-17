<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ApiUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(User::all(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'phone_number' => 'required|string|max:15',
            'password' => 'required|min:6',
            'user_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('user_image')) {
            $imagePath = $request->file('user_image')->store('users', 'public');
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'password' => Hash::make($request->password),
            'user_image' => $imagePath,
        ]);

        return response()->json(['message' => 'Tài khoản đã được thêm', 'user' => $user], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'Không tìm thấy người dùng'], 404);
        }

        return response()->json(['data' => $user], 200);
    }
    
    public function update(Request $request, string $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'Không tìm thấy người dùng'], 404);
        }

        $validate = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:users,email,' . $user->id,
            'phone_number' => 'sometimes|required|string|max:15',
            'password' => 'nullable|min:6',
            'user_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ], [
            'name.required' => 'Bạn chưa nhập tên.',
            'email.required' => 'Bạn chưa nhập email.',
            'email.unique' => 'Email này đã được sử dụng.',
            'phone_number.required' => 'Bạn chưa nhập số điện thoại.',
            'password.min' => 'Mật khẩu phải có ít nhất 6 ký tự.',
            'user_image.image' => 'Tệp tải lên phải là một hình ảnh.',
            'user_image.mimes' => 'Chỉ chấp nhận các định dạng jpeg, png, jpg, gif.',
            'user_image.max' => 'Kích thước hình ảnh tối đa là 2MB.',
        ]);

        if ($validate->fails()) {
            return response()->json([
                'message' => 'Sửa không thành công',
                'errors' => $validate->errors()
            ], 400);
        }
        if ($request->hasFile('user_image')) {
            if ($user->user_image) {
                Storage::disk('public')->delete($user->user_image);
            }
            $user->user_image = $request->file('user_image')->store('users', 'public');
        }

        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->fill($request->except(['password', 'user_image']));

        // Kiểm tra xem có thay đổi không
        if (!$user->isDirty() && !$request->hasFile('user_image') && !$request->filled('password')) {
            return response()->json(['user' => $user], 200);
        }
        $user->save();

        return response()->json(['message' => 'Tài khoản đã được cập nhật', 'user' => $user], 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        if ($user->user_image) {
            Storage::disk('public')->delete($user->user_image);
        }

        $user->delete();
        return response()->json(['message' => 'Đã xóa thành công'], 204);
    }
}
