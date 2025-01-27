<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class sizesModel extends Model
{
    use HasFactory;
    protected $talbe = 'sizes';
    protected $fillable = [
        'name'
    ];
}
