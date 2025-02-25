<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Carts extends Model
{
    use HasFactory;

    protected $table = "carts";

    //  protected $attributes = [
    //     'user_id' => null,
    // ];

    protected $fillable = [
        'guest_id',
        'cart_items',
        'user_id',
    ];

    public function items()
    {
        return $this->hasMany(cart_items::class, 'cart_id');
    }
}
