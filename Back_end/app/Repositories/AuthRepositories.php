<?php

namespace App\Repositories;

use App\Models\User;
use App\Models\Color;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Helpers\BaseResponse;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;



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

    
    public function updateUserAdmin($request, $imageLink)
    {
        $user = User::find($request->input('id'));

        if (!$user) {
            BaseResponse::failure('400', 'user not found', 'user.not.found', []);
        }

        $user->update([
            'name' => $request->input('name', $user->name),
            'phone_number' => $request->input('phoneNumber', $user->phone_number),
            'gender' => $request->input('gender', $user->gender),
            'status' => $request->input('status', $user->status),
            'image' => empty($imageLink) ? $user->image : $imageLink,
        ]);

        return $user;
    }

    public function updateUser($request, $imageLink, $userId)
    {
        $user = User::find($userId);

        if (!$user) {
            BaseResponse::failure('400', 'user not found', 'user.not.found', []);
        }

        $updateData = [
            'name' => $request->input('name', $user->name),
            'phone_number' => $request->input('phoneNumber', $user->phone_number),
            'gender' => $request->input('gender', $user->gender),
            'image' => empty($imageLink) ? $user->image : $imageLink,
        ];

        // Only update password if it's provided in the request
        if ($request->has('newPassword')) {
            $updateData['password'] = Hash::make($request->input('newPassword'));
        }

        $user->update($updateData);

        return $user;
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
