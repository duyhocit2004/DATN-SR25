<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Admin\IAdminService;

class notificationController extends Controller
{
    public $Notification;
    public function __construct(IAdminService $Notification)
    {
        $this->Notification = $Notification;
    }
    public function getAllNotification(Request $request)
    {
        $result = $this->Notification->getAllNotification($request);
        return response()->json($result);
    }

    public function markAsRead(Request $request)
    {
        $result = $this->Notification->markAsRead($request);
        return response()->json($result);
    }
}
