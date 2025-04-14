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

    public function addVoucher(Request $request)
    {

        $voucher = Voucher::query()->where('code', '=', $request->input('voucherCode'))->first();
        if ($voucher) {
            return BaseResponse::failure('400', 'voucher is exist', 'voucher.is.exist', []);
        }
        $voucher = Voucher::create([
            'quantity' => $request->input('quantity'),
            'code' => $request->input('voucherCode'),
            'voucher_price' => $request->input('voucherPrice'),
            'start_date' => $request->input('startDate'),
            'end_date' => $request->input('endDate'),
            'min_order_value' => $request->input('min_order_value', 0),
            'status' => 'INACTIVE',
            'used' => 0,
        ]);

        return $voucher;
    }

    public function updateVoucher(Request $request)
    {
        $voucher = Voucher::find($request->input('id'));

        if (!$voucher) {
            return BaseResponse::failure(404, 'Voucher not found', 'voucher.not.found', []);
        }

        $voucher->update([
            'code' => $request->input('code', $voucher->code),
            'quantity' => $request->input('quantity', $voucher->quantity),
            'used' => $request->input('used', $voucher->used),
            'voucher_price' => $request->input('voucherPrice', $voucher->voucher_price),
            'start_date' => $request->input('startDate', $voucher->start_date),
            'end_date' => $request->input('endDate', $voucher->end_date),
            'status' => $request->input('status', $voucher->status),
            'min_order_value' => $request->input('min_order_value', 0),
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
    public function toggleStatus(Request $request)
    {
        $voucher = Voucher::find($request->input('id'));

        if (!$voucher) {
            return BaseResponse::failure(404, 'Voucher not found', 'voucher.not.found', []);
        }

        $newStatus = $voucher->status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
        $voucher->update(['status' => $newStatus]);

        return BaseResponse::success($voucher);
    }

    public function autoLockExpiredVouchers()
    {
        $now = now();
        info("Running auto-lock at: $now");
        $expiredVouchers = Voucher::where('end_date', '<=', $now)
            ->whereIn('status', ['ACTIVE', 'INACTIVE'])
            ->get();

        foreach ($expiredVouchers as $voucher) {
            $voucher->update(['status' => 'LOCKED']);
        }

        return count($expiredVouchers);
    }


    public function getAllVoucher(Request $request)
    {
        $status = $request->input('status');
        $code = $request->input('code');
        $quantity = $request->input('quantity');
        $used = $request->input('used');
        $voucherPrice = $request->input('voucherPrice');
        $startDate = $request->input(key: 'startDate');
        $endDate = $request->input('endDate');
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
        if (!empty($startDate)) {
            $query->whereDate('start_date', '>=', $startDate);
        }
        if (!empty($endDate)) {
            $query->whereDate('end_date', '<=', $endDate);
        }

        $users = $query->paginate($perPage, ['*'], 'page', $page);
        return $users;
    }

    public function findByCode(string $code)
    {
        return Voucher::where('code', $code)->first();
    }

}
