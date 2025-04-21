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
        $user = [
            "id"=>$user11->id,
            "name"=>$user11->name,
            "email"=>$user11->email,
            "phoneNumber"=>$user11->phoneNumber,
            "role"=>$user11->role,
            "emailVerifiedAt"=>$user11->emailVerifiedAt,
            "gender"=>$user11->gender,
            "userImage"=>$user11->userImage,
            "createdAt"=>$user11->createdAt,
            "updatedAt"=>$user11->updatedAt,
            "deletedAt"=>$user11->deletedAt,
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

        $users = $query->paginate($perPage, ['*'], 'page', $page);
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
            BaseResponse::failure('400', 'size not found', 'size.not.found', []);
        }

        $newPassword = Str::random(8);

        $user->update([
            'password' => Hash::make($newPassword),
        ]);
        
        Mail::send('forgotpassword', ['newPassword' => $newPassword], function ($message) use ($user) {
            $message->to($user->email);
            $message->subject('Mật khẩu mới của bạn');
        });
        return $newPassword;
    }

    public function changePassword($userId, $newPassword)
    {
        $user = User::find($userId);

        $user->update([
            'password' => Hash::make($newPassword),
        ]);
    }


}
