<?php

namespace App\Repositories;

use App\Helpers\BaseResponse;
use App\Models\Color;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;


class AuthRepositories
{
    public function getAccountByEmail($email)
    {
        $user = User::query()->where('email', '=', $email)->first();
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

        $user->update([
            'name' => $request->input('name', $user->name),
            'phone_number' => $request->input('phoneNumber', $user->phone_number),
            'gender' => $request->input('gender', $user->gender),
            'image' => empty($imageLink) ? $user->image : $imageLink,
            'password' => Hash::make($request->input('password', $user->password)),
        ]);

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
        $user = User::query()->where('email', '=', $request->input('email'))->where('phone_number', '=', $request->input('phoneNumber'))->first();

        if (!$user) {
            BaseResponse::failure('400', 'size not found', 'size.not.found', []);
        }

        $newPassword = Str::random(8);

        $user->update([
            'password' => Hash::make($newPassword),
        ]);

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
