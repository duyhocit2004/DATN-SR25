<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class imageProduct extends Model
{
    use HasFactory;

    protected $table = 'image_product';
    protected $fillable =[
        'products_id',
        'image_link',
    ];
}
