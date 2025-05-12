<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
/**
 * Class Cart
 * 
 * @property int $id
 * @property int $user_id
 * @property int $order_id
 * @property string|null $title
 * @property string|null $message
 * @property boolean $is_read
 * @property string $recipient_type
 *
 * @package App\Models
 */
class Notification extends Model
{
    use HasFactory;

    protected $table = 'notification';
    protected $fillable = [
        'user_id',
        'order_id',
        'message',
        'title',
        'is_read',
        'recipient_type'
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }
    public function scopeUnread($query)
    {
        return $query->where('is_read', false);
    }
    public function scopeRead($query)
    {
        return $query->where('is_read', true);
    }
}
