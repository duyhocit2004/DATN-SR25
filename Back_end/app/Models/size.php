<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class size extends Model
{
    use HasFactory;
    protected $talbe = 'sizes';
    protected $fillable = [
        'name'
    ];
    public function variant(){
        return $this->hasMany(ProductVariants::class , 'size_id');
    }
}
