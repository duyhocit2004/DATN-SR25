<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shipper extends Model
{
    use HasFactory;

    protected $table = 'shipper' ;
    protected $fillable = [
        'name_shipper',
        'phone1',
        'phone2',
    ];
}
