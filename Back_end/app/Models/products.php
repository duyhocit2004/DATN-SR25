<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class products extends Model
{
    use HasFactory,SoftDeletes;
    protected $table = 'products';
    protected $fillable = [
        'categories_id',
        'name_product',
        'image',
        'SKU',
        'base_stock',
        'price_regular',
        'price_sale',
        'description',
        'views',
        'content',
    ];

    public function categories (){
        return $this->belongsTo(categories::class,'categories_id');
    }

    public function productVariants(){
        return $this->hasMany(ProductVariants::class, 'product_id');
    }

    public function Imagelink(){
        return $this->hasMany(imageProduct::class,'products_id');
    }
}
