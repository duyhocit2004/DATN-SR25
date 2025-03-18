<?php

namespace App\Services\Client\order;

use Illuminate\Http\Request;

interface IOrderService
{
    public function getVoucher(Request $request);

}
