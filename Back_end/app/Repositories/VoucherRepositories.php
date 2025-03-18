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

    public function getAllVoucher(Request $request)
    {
        $status = $request->input('status');
        $code = $request->input('code');
        $quantity = $request->input('quantity');
        $used = $request->input('used');
        $voucherPrice = $request->input('voucherPrice');
        $perPage = $request->input('pageSize', 10);
        $page = $request->input('pageNum', 1);

        $query = Voucher::query();
        if (!empty($status)) {
            $query->where('status', '=', $status);
        }
        if (!empty($code)) {
            $query->where('code', 'like', '%' . $code . '%');
        }
        if (!empty($quantity)) {
            $query->where('quantity', '=', $quantity);
        }
        if (!empty($used)) {
            $query->where('used', '=', $used);
        }
        if (!empty($voucherPrice)) {
            $query->where('voucher_price', '=', $voucherPrice);
        }

        $users = $query->paginate($perPage, ['*'], 'page', $page);
        return $users;
    }

    public function addVoucher(Request $request)
    {

        $voucher = Voucher::query()->where('code', '=', $request->input('voucherCode'))->first();;

        if ($voucher) {
            BaseResponse::failure('400', 'voucher is exist', 'voucher.is.exist', []);
        }

        $voucher = Voucher::create([
            'quantity' => $request->input('quantity'),
            'code' => $request->input('voucherCode'),
            'voucher_price' => $request->input('voucherPrice'),
            'status' => 'ACTIVE',
            'used' => 0,
        ]);

        return $voucher;
    }

    public function updateVoucher(Request $request)
    {

        $voucher = Voucher::find($request->input('id'));

        if (!$voucher) {
            BaseResponse::failure('400', 'voucher not found', 'voucher.not.found', []);
        }

        $voucher->update([
            'code' => $request->input('voucherCode', $voucher->code),
            'quantity' => $request->input('quantity', $voucher->quantity),
            'used' => $request->input('used', $voucher->used),
            'voucher_price' => $request->input('voucherPrice', $voucher->voucher_price),
            'start_date' => $request->input('startDate', $voucher->start_date),
            'end_date' => $request->input('endDate', $voucher->end_date),
            'status' => $request->input('status', $voucher->status),
        ]);

        return $voucher;
    }

    public function deleteVoucher(Request $request)
    {

        $voucher = Voucher::find($request->input('id'));

        if (!$voucher) {
            BaseResponse::failure('400', 'voucher not found', 'voucher.not.found', []);
        }

        $voucher->delete();

        return $voucher;
    }

}
