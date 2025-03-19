<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Voucher extends Model
{
    use HasFactory;

    protected $fillable = [
        'code', 'discount_type', 'discount_value', 'min_order_value',
        'max_discount', 'quantity', 'used', 'start_date', 'end_date', 'status'
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
    ];

    /**
     * Kiểm tra và cập nhật trạng thái voucher
     */
    public function updateStatus()
    {
        $now = Carbon::now();

        if ($this->status === 'disabled') {
            return;
        }

        if ($this->end_date && $now->gt($this->end_date)) {
            $this->status = 'expired';
        } elseif ($this->used >= $this->quantity) {
            $this->status = 'used_up';
        } else {
            $this->status = 'active';
        }

        $this->save();
    }
}
