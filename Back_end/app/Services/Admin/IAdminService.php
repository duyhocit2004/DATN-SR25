<?php

namespace App\Services\Admin;

use Illuminate\Http\Request;

interface IAdminService
{
    public function getAllUser(Request $request);
    public function deleteUser(Request $request);

}
