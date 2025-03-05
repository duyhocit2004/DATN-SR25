<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class comments extends Model
{
    use HasFactory;

    protected $table = 'comments';
    protected $fillable = [
        'products_id',
        'user_id',
        'content',
        'rating'
    ];
    public function product(){
        return $this->belongsTo(products::class,'products_id');
    }
    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }
}
