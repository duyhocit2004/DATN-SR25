<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'user_id',
        'order_code',
        'shipping_fee',
        'shipper_id',
        'voucher_id',
        'date',
        'user_name',
        'email',
        'phone_number',
        'total_price',
        'address',
        'note'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function shipper()
    {
        return $this->belongsTo(Shipper::class);
    }
    public function voucher()
    {
        return $this->belongsTo(Voucher::class);
    }
    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class, 'order_id');
    }
}
