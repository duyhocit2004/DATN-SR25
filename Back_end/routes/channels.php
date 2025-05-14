<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

// Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
//     return (int) $user->id === (int) $id;
// });
$user = auth()->user();
Broadcast::channel('admin.new-order', function ($user) {
    \Log::info('Channel admin.new-order', ['user' => $user, 'role' => $user ? $user->role : null]);
    return $user && in_array($user->role, ['Quản trị viên', 'Admin', 'Manager']);
});
\Log::info('Broadcasting auth', ['user' => auth()->user()]);

Broadcast::channel('user.{id}', function ($user, $id) {
    \Log::info('Channel user.{id}', ['user' => $user, 'id' => $id]);
    if (!$user) return false;
    return (int) $user->id === (int) $id;
});

Broadcast::channel('admin.notifications', function ($user) {
    \Log::info('Channel admin.notifications', ['user' => $user]);
    if (!$user) return false;
    return $user->role === 'Quản trị viên';
});

Broadcast::channel('notifications.{userId}', function ($user, $userId) {
    \Log::info('Channel notifications.{userId}', ['user' => $user, 'userId' => $userId]);
    return (int) $user->id === (int) $userId;
});