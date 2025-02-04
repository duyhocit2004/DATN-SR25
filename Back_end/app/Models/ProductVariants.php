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
        'quanlity',
        'price',
    ];
    // public function color (){
    //     return $this->()
    // }
}
