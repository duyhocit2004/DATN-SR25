<?php

namespace App\Repositories;

use App\Helpers\BaseResponse;
use App\Models\Voucher;
use App\Models\VoucherUsage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VoucherRepositories
{
    public function getVoucher(Request $request)
    {
        $voucherCode = $request->input('voucherCode');
        $userId = $request->input('userId');
        
        $voucher = Voucher::query()
            ->where('code', '=', $voucherCode)
            ->where('status', '=', 'ACTIVE')
            ->orderBy('id','desc')
            ->first();

        if (!$voucher) {
            return BaseResponse::failure('404', 'Voucher not found', 'voucher.not.found', []);
        }

        // Check if user has already used this voucher
        if ($voucher->hasUserUsed($userId)) {
            return BaseResponse::failure('400', 'You have already used this voucher', 'voucher.already.used', []);
        }

        return $voucher;
    }

    public function applyVoucher(Request $request)
    {
        $voucherCode = $request->input('voucherCode');
        $userId = $request->input('userId');
        $productPrice = $request->input('productPrice');

        $voucher = Voucher::query()
            ->where('code', '=', $voucherCode)
            ->where('status', '=', 'ACTIVE')
            ->first();

        if (!$voucher) {
            return BaseResponse::failure('404', 'Voucher not found', 'voucher.not.found', []);
        }

        // Kiểm tra user đã dùng voucher chưa, nếu rồi thì trả về lỗi business luôn, KHÔNG vào transaction
        if ($voucher->hasUserUsed($userId)) {
            return BaseResponse::failure('400', 'Bạn chỉ có thể sử dụng voucher này 1 lần!', 'voucher.already.used', []);
        }

        if ($voucher->max_product_price > 0 && $productPrice > $voucher->max_product_price) {
            return BaseResponse::failure('400', 'Product price exceeds voucher limit', 'voucher.price.exceeded', []);
        }

        DB::beginTransaction();
        try {
            VoucherUsage::create([
                'voucher_id' => $voucher->id,
                'user_id' => $userId
            ]);
            $voucher->increment('used');
            DB::commit();
            $voucher = $voucher->fresh();
            return BaseResponse::success([
                'id' => $voucher->id,
                'code' => $voucher->code,
                'voucherPrice' => $voucher->voucher_price,
                'quantity' => $voucher->quantity,
                'used' => $voucher->used,
                'startDate' => $voucher->start_date,
                'endDate' => $voucher->end_date,
                'minOrderValue' => $voucher->min_order_value,
                'maxProductPrice' => $voucher->max_product_price,
                'status' => $voucher->status,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Apply voucher failed: ' . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
            return BaseResponse::failure('500', 'Failed to apply voucher', 'voucher.apply.failed', []);
        }
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
            'max_product_price' => $request->input('max_product_price', 0),
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
            'min_order_value' => $request->input('minOrderValue', $voucher->min_order_value),
            'max_product_price' => $request->input('maxProductPrice', $voucher->max_product_price),
        ]);

        return $voucher;
    }

    public function deleteVoucher(Request $request)
    {
        $voucher = Voucher::find($request->input('id'));

        if (!$voucher) {
            return BaseResponse::failure('400', 'voucher not found', 'voucher.not.found', []);
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
        $startDate = $request->input('startDate');
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

        $vouchers = $query->paginate($perPage, ['*'], 'page', $page);
        return $vouchers;
    }

    public function findByCode(string $code)
    {
        return Voucher::where('code', $code)->first();
    }

    public function recordVoucherUsage($voucherId, $userId)
    {
        return VoucherUsage::create([
            'voucher_id' => $voucherId,
            'user_id' => $userId
        ]);
    }
}
