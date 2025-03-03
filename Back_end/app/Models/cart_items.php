<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class cart_items extends Model
{
    use HasFactory;
    protected $table = 'cart_items';
    protected $fillable = [
        'cart_id',
        'product_id',
        'product_variants_id',
        'quantity',
        'sub_total',
    ];

    public function cart()
    {
        return $this->belongsTo(Carts::class, 'cart_id');
    }

    public function productVariants()
    {
        return $this->belongsTo(ProductVariants::class, 'product_id');
    }
    public function product(){
        return $this->belongsTo(products::class, 'product_id');
    }
}
