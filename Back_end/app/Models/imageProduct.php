<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class imageProduct extends Model
{
    use HasFactory;

    protected $table = 'image_product';
    protected $fillable =[
        'products_id',
        'image_link',
    ];
    public function product (){
        return $this->belongsTo(products::class,'products_id','id');
    }
}
