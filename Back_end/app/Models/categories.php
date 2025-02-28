<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class categories extends Model
{
    use HasFactory;
    protected $table = 'categories';
    protected $fillable = [
        'name',
        'type'
    ];
    public function product (){
<<<<<<< HEAD
        return $this->hasOne(products::class);
=======
        return $this->hasOne(products::class,'categories_id');
>>>>>>> master
    }
}
