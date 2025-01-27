<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class produtsModel extends Model
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
}
