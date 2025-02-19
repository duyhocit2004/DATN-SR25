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
        'product_variants_id',
        'quantity',
        'sub_total',
    ];

<<<<<<< HEAD
    // public function 
=======
    public function cart()
    {
        return $this->belongsTo(Carts::class, 'cart_id');
    }

    public function product()
    {
        return $this->belongsTo(products::class, 'product_variants_id');
    }
>>>>>>> namnguyen
}
