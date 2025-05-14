<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class UserNotification implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $order ;
    /**
     * Create a new event instance.
     */
    public function __construct($order)
    {
        $this->order = $order;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('user'.$this->order->users_id),
        ];
    }
    public function broadcastWith()
    {
        if($this->order->status == 'Confirmed'){
            return [
                'data' => $this->order,
                'message' => 'Đơn hàng'.$this->order->code. 'của bạn đã được xác nhận'
            ];
        }else if($this->order->status == 'Cancel Confirm'){
            return [
                'data' => $this->order,
                'message' => 'Đơn hàng'.$this->order->code. 'của bạn đã hủy xác nhận'
            ];
        }else if($this->order->status == 'Processing'){
            return [
                'data' => $this->order,
                'message' => 'Đơn hàng'.$this->order->code. 'của bạn đang được xử lý'
            ];
        }else if($this->order->status == 'Shipping'){
            return [
                'data' => $this->order,
                'message' => 'Đơn hàng'.$this->order->code. 'của bạn đang giao hàng'
            ];
        }else if($this->order->status == 'Delivered'){
            return [
                'data' => $this->order,
                'message' => 'Đơn hàng'.$this->order->code. 'của bạn đã được giao '
            ];
        }
        // return [
        //     'data' => $this->order,
        //     'message' => 'Đơn hàng'.$this->order->code. 'của bạn đã được cập nhật trạng thái thành'.$this->order->status
        // ];
    }
}
