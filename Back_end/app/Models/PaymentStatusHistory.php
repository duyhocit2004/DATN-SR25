<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PaymentStatusHistory extends Model
{
    use HasFactory;

    protected $table = 'payment_status_histories';

    protected $fillable = [
        'order_id',
        'old_status',
        'new_status',
        'name_change',
        'role_change',
        'note',
        'change_at'
    ];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
} 