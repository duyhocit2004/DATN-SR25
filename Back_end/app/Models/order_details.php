<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class order_details extends Model
{
    use HasFactory;

    protected $table = "order_detail";
    protected $fillable = [
        'Order_id',
        'product_id',
        'color',
        'size',
        'quantity',
        'total_price',
    ];
}
