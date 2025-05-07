<?php

namespace App\Repositories;

use App\Models\User;
use App\Models\Color;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Helpers\BaseResponse;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Tymon\JWTAuth\Facades\JWTAuth;



class AuthRepositories
{
    public function getAccountByEmail($email)
    {
        $user11 = User::query()->where('email', '=', $email)->first();
        
        if (!$user11) {
            return null;
        }

        $user = [
            "id"=>$user11->id,
            "name"=>$user11->name,
            "email"=>$user11->email,
            "phone_number"=>$user11->phone_number,
            "role"=>$user11->role,
            "email_verified_at"=>$user11->email_verified_at,
            "gender"=>$user11->gender,
            "userImage"=>$user11->user_image,
            "createdAt"=>$user11->created_at,
            "updatedAt"=>$user11->updated_at,
            "deletedAt"=>$user11->deleted_at,
            "status"=>$user11->status,
            "password"=>$user11->password
        ];
        return $user;
    }

    
    public function updateUserAdmin(Request $request, $imageLink)
    {
        $user = User::find($request->input('id'));
        if (!$user) {
            BaseResponse::failure('400', 'user not found', 'user.not.found', []);
        }

        // Get the currently logged in admin
        $currentAdmin = JWTAuth::parseToken()->authenticate();
        if (!$currentAdmin) {
            BaseResponse::failure(403, 'Forbidden: Access is denied', 'forbidden', []);
        }

        // If trying to change status to INACTIVE (lock account)
        if ($request->input('status') === 'INACTIVE') {
            // Don't allow locking the currently logged in admin
            if ($user->id === $currentAdmin->id) {
                BaseResponse::failure(400, 'Không thể khóa tài khoản đang đăng nhập', 'cannot.lock.current.account', []);
            }

            // If the account is an admin, check if it's the last admin
            if ($user->role === config('constants.USER_TYPE_ADMIN')) {
                $adminCount = User::where('role', config('constants.USER_TYPE_ADMIN'))
                    ->where('status', 'ACTIVE')
                    ->count();
                
                if ($adminCount <= 1) {
                    BaseResponse::failure(400, 'Không thể khóa tài khoản admin cuối cùng', 'cannot.lock.last.admin', []);
                }
            }
        }

        $user->update([
            'status' => $request->input('status', $user->status),
        ]);

        return $user;
    }

    public function updateUser($request, $imageUrl = null)
    {
        try {
            $user = User::findOrFail($request->input('id'));
            
            $updateData = [
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'phone_number' => $request->input('phoneNumber'),
                'gender' => $request->input('gender'),
            ];

            // Add image URL if provided
            if ($imageUrl) {
                $updateData['user_image'] = $imageUrl;
            }

            // Handle password change if oldPassword and newPassword are provided
            if ($request->has('oldPassword') && $request->has('newPassword')) {
                // Validate old password
                if (!Hash::check($request->input('oldPassword'), $user->password)) {
                    return BaseResponse::failure(400, 'Mật khẩu cũ không chính xác', 'old.password.incorrect', []);
                }

                // Validate new password
                $newPassword = $request->input('newPassword');
                if (strlen($newPassword) < 8) {
                    return BaseResponse::failure(400, 'Mật khẩu mới phải có ít nhất 8 ký tự', 'new.password.too.short', []);
                }

                // Validate password complexity
                if (!preg_match('/[A-Z]/', $newPassword)) {
                    return BaseResponse::failure(400, 'Mật khẩu mới phải chứa ít nhất 1 chữ hoa', 'new.password.no.uppercase', []);
                }

                if (!preg_match('/[a-z]/', $newPassword)) {
                    return BaseResponse::failure(400, 'Mật khẩu mới phải chứa ít nhất 1 chữ thường', 'new.password.no.lowercase', []);
                }

                if (!preg_match('/[0-9]/', $newPassword)) {
                    return BaseResponse::failure(400, 'Mật khẩu mới phải chứa ít nhất 1 số', 'new.password.no.number', []);
                }

                // Check if new password matches confirmation
                if ($request->input('newPassword') !== $request->input('confirmPassword')) {
                    return BaseResponse::failure(400, 'Xác nhận mật khẩu không khớp', 'password.confirmation.mismatch', []);
                }

                // Check if new password is same as old password
                if (Hash::check($newPassword, $user->password)) {
                    return BaseResponse::failure(400, 'Mật khẩu mới không được trùng với mật khẩu cũ', 'new.password.same.as.old', []);
                }

                $updateData['password'] = Hash::make($newPassword);
            }

            $user->update($updateData);

            // Get updated user data
            $updatedUser = [
                "id" => $user->id,
                "name" => $user->name,
                "email" => $user->email,
                "phone_number" => $user->phone_number,
                "role" => $user->role,
                "email_verified_at" => $user->email_verified_at,
                "gender" => $user->gender,
                "userImage" => $user->user_image,
                "createdAt" => $user->created_at,
                "updatedAt" => $user->updated_at,
                "deletedAt" => $user->deleted_at,
                "status" => $user->status
            ];

            return BaseResponse::success($updatedUser);
        } catch (Exception $e) {
            return BaseResponse::failure(500, $e->getMessage(), 'error', []);
        }
    }

    public function createUser($data)
    {
        return User::create($data);
    }

    public function getAllUser(Request $request)
    {
        $status = $request->input('status');
        $name = $request->input('name');
        $email = $request->input('email');
        $phoneNumber = $request->input('phoneNumber');
        $role = $request->input('role');
        $gender = $request->input('gender');
        $perPage = $request->input('pageSize', 10);
        $page = $request->input('pageNum', 1);

        $query = User::query();
        if(!empty($status)){
            $query->where('status', '=' ,$status);
        }
        if(!empty($name)){
            $query->where('name', 'like', '%' . $name . '%');
        }
        if(!empty($email)){
            $query->where('email', 'like' , '%' . $email.'%');
        }
        if(!empty($phoneNumber)){
            $query->where('phone_number', '=' ,$phoneNumber);
        }
        if(!empty($role)){
            $query->where('role', '=' ,$role);
        }
        if(!empty($gender)){
            $query->where('gender', '=' ,$gender);
        }

        $users = $query->orderBy('created_at','desc')->paginate($perPage, ['*'], 'page', $page);
        return $users;
    }

    public function deleteUser(Request $request)
    {
        $user = User::find($request->input('id'));

        if (!$user) {
            BaseResponse::failure('400', 'user not found', 'user.not.found', []);
        }

        $user->update([
            'status' => 'INACTIVE',
        ]);

        return $user;
    }

    public function forgotPassword(Request $request)
    {
        $user = User::query()->where('email', '=', $request->input('email'))
        ->first();

        if (!$user) {
            return ['success' => false, 'message' => 'Email không tồn tại trong hệ thống'];
        }

        $newPassword = Str::random(8);

        $user->update([
            'password' => Hash::make($newPassword),
        ]);
        
        try {
            Mail::send('forgotpassword', ['newPassword' => $newPassword], function ($message) use ($user) {
                $message->to($user->email);
                $message->subject('Mật khẩu mới của bạn');
            });
            return ['success' => true, 'message' => 'Mật khẩu mới đã được gửi đến email của bạn'];
        } catch (\Exception $e) {
            return ['success' => false, 'message' => 'Không thể gửi email. Vui lòng thử lại sau'];
        }
    }

    // public function changePassword($userId, $newPassword)
    // {
    //     $user = User::find($userId);

    //     $user->update([
    //         'password' => Hash::make($newPassword),
    //     ]);
    // }

}
