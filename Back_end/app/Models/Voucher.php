<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Voucher extends Model
{
    use HasFactory;
     protected $table  = 'vouchers'; 
     protected $fillable = [
        'code',
        'discount_type',
        'discount_value',
        'min_order_value',
        'max_discount',
        'quantity',
        'used',
        'user_id',
        'start_date',
        'end_date',
        'status',
     ];
}
