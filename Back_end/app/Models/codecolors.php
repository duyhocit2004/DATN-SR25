<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class codecolors extends Model
{
    use HasFactory;
    protected $table = 'code_colors' ;
    protected $fillable = [
        'colors_id',
        'CodeColor'
    ];
    public function user(){
        return $this->belongsTo(color::class);
    }
}
