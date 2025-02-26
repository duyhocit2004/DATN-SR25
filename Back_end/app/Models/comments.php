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
}
