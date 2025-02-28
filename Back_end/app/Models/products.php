<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
<<<<<<< HEAD

class products extends Model
{
    use HasFactory;
=======
use Illuminate\Database\Eloquent\SoftDeletes;

class products extends Model
{
    use HasFactory,SoftDeletes;
>>>>>>> master
    protected $table = 'products';
    protected $fillable = [
        'categories_id',
        'name_product',
<<<<<<< HEAD
=======
        'image',
>>>>>>> master
        'SKU',
        'base_stock',
        'price_regular',
        'price_sale',
        'description',
        'views',
        'content',
    ];

<<<<<<< HEAD
    // public function categories(){
    //     return $this->belongsTo(categories::class,'categories_id');
    // }
    public function cate (){
        return "hello";
=======
    public function categories (){
        return $this->belongsTo(categories::class,'categories_id');
    }

    public function productVariants(){
        return $this->hasMany(ProductVariants::class, 'product_id');
    }

    public function Imagelink(){
        return $this->hasMany(imageProduct::class);
>>>>>>> master
    }
}
