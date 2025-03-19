<?php

namespace App\Services\Common;

use Illuminate\Http\Request;

interface ICommonService
{
    public function uploadImage(Request $request);

}
