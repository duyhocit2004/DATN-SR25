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

    protected $table = 'notifications';
    protected $fillable = [
        'user_id',
        'type',
        'title',
        'message',
        'link',
        'is_read'
    ];
    protected $casts = [
        'is_read' => 'boolean',
    ];

    
}
