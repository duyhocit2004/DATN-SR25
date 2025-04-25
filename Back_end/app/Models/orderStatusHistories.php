<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
/**
 * Class ImageProduct
 * 
 * @property int $order_id
 * @property string|null $old_status
 * @property string|null $new_status
 * @property string|null $role_change
 * @property string|null $change_at
 * 
 * @property Product $product
 *
 * @package App\Models
 */
class orderStatusHistories extends Model
{
    use HasFactory;
    
    protected $table = 'order_status_histories';
    protected $fillable = [
        'order_id',
        'old_status',
        'new_status',
        'name_change',
        'role_change',
        'change_at'
    ];
    protected $hidden = [
        'created_at',
        'updated_at'
    ];
    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }
    
    
}
