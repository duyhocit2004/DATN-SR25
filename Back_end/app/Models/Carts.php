<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Carts extends Model
{
    use HasFactory;
    protected $table = "carts";
    protected $fillable = [
        'guest_id',
        'cart_items',
        'user_id',
    ];

    // public function cart_times(){
    //     return $this->hasMany(cart_items::class);
    // }
    public function user(){
        return $this->belongsTo(User::class);
    }
}
