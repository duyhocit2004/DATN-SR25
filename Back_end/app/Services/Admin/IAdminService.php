<?php

namespace App\Services\Admin;

use Illuminate\Http\Request;

interface IAdminService
{
    public function getAllUser(Request $request);
    public function deleteUser(Request $request);
    public function getAllVoucher(Request $request);
    public function addVoucher(Request $request);
    public function updateVoucher(Request $request);
    public function deleteVoucher(Request $request);

}
