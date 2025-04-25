<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderStatusHistory extends Model
{
    use HasFactory;

    protected $table = 'order_status_histories';

    // Specify fillable fields if you intend to use mass assignment
    protected $fillable = [
        'order_id',
        'old_status',
        'new_status',
        'name_change',
        'role_change',
        'note',
        'change_at',
        'updated_by'
    ];

    // Define the inverse relationship back to Order (optional but good practice)
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    // Disable timestamps since we use change_at
    public $timestamps = false;

    // Ensure timestamps are handled correctly if your table doesn't use Laravel's defaults
    // public $timestamps = false; // Uncomment if your table doesn't have created_at/updated_at

    // Cast the change_at attribute to a Carbon instance
    protected $casts = [
        'change_at' => 'datetime'
    ];
} 