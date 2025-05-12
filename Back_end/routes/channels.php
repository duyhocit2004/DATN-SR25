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
    return $user->role === 'admin';
});
\Log::info('Broadcasting auth', ['user' => auth()->user()]);

Broadcast::channel('user.{id}', function ($user, $id) {
    \Log::info('Channel user.{id}', ['user' => $user, 'id' => $id]);
    return (int) $user->id === (int) $id;
});

Broadcast::channel('admin.notifications', function ($user) {
    \Log::info('Channel admin.notifications', ['user' => $user]);
    return $user->role === 'Admin';
});