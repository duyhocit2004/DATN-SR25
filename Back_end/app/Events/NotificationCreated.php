<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\Notification;

class NotificationCreated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $notification;

    public function __construct(Notification $notification)
    {
        $this->notification = $notification;
    }

    public function broadcastOn(): array
    {
        // Nếu là thông báo cho admin
        if ($this->notification->type === 'new_order' || $this->notification->type === 'order_update') {
            return [
                new PrivateChannel('admin.notifications'),
                new PrivateChannel('user.' . $this->notification->user_id)
            ];
        }

        // Nếu là thông báo cho user thông thường
        return [
            new PrivateChannel('user.' . $this->notification->user_id)
        ];
    }

    public function broadcastWith()
    {
        return [
            'notification' => [
                'id' => $this->notification->id,
                'title' => $this->notification->title,
                'content' => $this->notification->content,
                'type' => $this->notification->type,
                'status' => $this->notification->status,
                'data' => $this->notification->data,
                'created_at' => $this->notification->created_at
            ]
        ];
    }
} 