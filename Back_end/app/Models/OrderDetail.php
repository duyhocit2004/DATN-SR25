<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetail  extends Model
{
    use HasFactory;

    protected $table = "order_detail";

    protected $fillable = [
        'order_id',
        'product_id',
        'color',
        'size',
        'quantity',
        'total_price',
        'status'
    ];

    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }

    public function product()
    {
        return $this->belongsTo(products::class, 'product_id');
    }
}
