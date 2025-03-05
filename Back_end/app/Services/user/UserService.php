<?php

namespace App\Services\user;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Repositories\SizeRepositories;

class UserService
{
    public function getAllUsers()
    {
        return User::all();
    }

    public function getUserById($id)
    {
        return User::findOrFail($id);
    }

    public function createUser($data)
    {
        $data['password'] = Hash::make($data['password']);
        return User::create($data);
    }

    public function updateUser($id, $data)
    {
        $user = User::findOrFail($id);

        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        $user->update($data);
        return $user;
    }

    public function deleteUser($id)
    {
        return User::destroy($id);
    }
}
