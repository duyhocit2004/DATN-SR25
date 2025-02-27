<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductVariants extends Model
{
    use HasFactory;
    protected $table = 'product_variants';
    protected $fillable = [
       'product_id',
        'color_id',
        'categories_id',
        'size_id',
        'quantity',
        'price',
    ];
    public function color (){
        return $this->belongsTo(color::class,'color_id');
    }
    public function products(){
        return $this->belongsTo(Products::class, 'product_id');
    }
    public function categories(){
        return $this->belongto(categories::class,'categories_id');
    }
    public function size(){
        return $this->belongsTo(size::class,'size_id');
    }
    public function cartItems(){
        return $this->hasMany(cart_items::class);
    }
}
