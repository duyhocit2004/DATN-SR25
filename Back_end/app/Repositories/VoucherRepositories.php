<?php

namespace App\Repositories;

use App\Helpers\BaseResponse;
use App\Models\Voucher;
use Illuminate\Http\Request;

class VoucherRepositories
{
    public function getVoucher(Request $request)
    {
        $voucherCode = $request->input('voucherCode');
        $voucher = Voucher::query()->where('code', '=', $voucherCode)->first();
        return $voucher;
    }

}
