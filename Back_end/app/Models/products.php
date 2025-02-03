<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class products extends Model
{
    use HasFactory;
    protected $table = 'products';
    protected $fillable = [
        'categories_id',
        'name_product',
        'SKU',
        'base_stock',
        'price_regular',
        'price_sale',
        'description',
        'views',
        'content',
    ];

    // public function categories(){
    //     return $this->belongsTo(categories::class,'categories_id');
    // }
    public function cate (){
        return "hello";
    }
}
