<?php

namespace App\Services\Auth\impl;

use App\Helpers\BaseResponse;
<<<<<<< HEAD
use App\Models\User;
use App\Repositories\AuthRepositories;
use App\Services\Auth\IAuthService;
use Cloudinary\Cloudinary;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
=======
use App\Repositories\AuthRepositories;
use App\Services\Auth\IAuthService;
use Cloudinary\Cloudinary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use function PHPUnit\Framework\isEmpty;
>>>>>>> a9bca3b99d94a1587f7c59610338b86ac9f82d21


class AuthService implements IAuthService
{
    public AuthRepositories $authRepositories;

    protected $cloudinary;

    public function __construct(AuthRepositories $authRepositories,
<<<<<<< HEAD
                                Cloudinary       $cloudinary)
=======
                                Cloudinary $cloudinary)
>>>>>>> a9bca3b99d94a1587f7c59610338b86ac9f82d21
    {
        $this->authRepositories = $authRepositories;
        $this->cloudinary = $cloudinary;
    }


    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                BaseResponse::failure(401, '', 'email.or.password.is.wrong', []);
            }
        } catch (JWTException $e) {
            BaseResponse::failure(500, '', 'Could not create token', []);
        }

        $user = auth()->user();
        if (!empty($user) && $user->status !== config('constants.STATUS_ACTIVE')) {
            BaseResponse::failure(400, 'User does not active', 'user.does.not.active', []);
        }

        $payload = JWTAuth::setToken($token)->getPayload();
        $expiresIn = $payload['exp'] - time();

        return [
            "accessToken" => $token,
            "tokenType" => "Bearer",
            "expiresIn" => $expiresIn * 1000,
            "expiresTime" => $payload['exp'],
        ];
    }

    public function loginAdmin(Request $request)
    {
        try {
            $credentials = $request->only('email', 'password');

            if (!$token = JWTAuth::attempt($credentials)) {
                BaseResponse::failure(401, '', 'email.or.password.is.wrong', []);
            }

            JWTAuth::setToken($token);
            $user = auth()->user();

            // Kiểm tra xem người dùng có phải là admin không
            if (!empty($user) && $user->role !== config('constants.USER_TYPE_ADMIN')) {
                // Hủy token nếu không phải admin
                JWTAuth::invalidate(JWTAuth::getToken());
                BaseResponse::failure(403, 'Forbidden: Access is denied', 'forbidden', []);
            }

            if (!empty($user) && $user->status !== config('constants.STATUS_ACTIVE')) {
                BaseResponse::failure(400, 'User does not active', 'user.does.not.active', []);
            }


        } catch (JWTException $e) {
            BaseResponse::failure(500, '', 'Could not create token', []);
        }

        $payload = JWTAuth::setToken($token)->getPayload();
        $expiresIn = $payload['exp'] - time();

        return [
            "accessToken" => $token,
            "tokenType" => "Bearer",
            "expiresIn" => $expiresIn * 1000,
            "expiresTime" => $payload['exp'],
        ];
    }

    public function register(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'name' => 'required|max:30',
            'email' => 'required',
            'password' => 'required',
            'gender' => 'required',
            'phoneNumber' => 'required'
        ], [
            'name.required' => 'name là bắt buộc',
            'name.max:30' => 'số lượng ký tự đối ta cho name là 30',
            'email.required' => 'email là bắt buộc',
            'password.required' => 'password là bắt buộc',
            'gender.required' => 'gender là bắt buộc',
            'phoneNumber.required' => 'phoneNumber là bắt buộc',
        ]);
        if ($validate->fails()) {
            BaseResponse::failure(400, '', $validate->errors()->first(), []);
        };

        $checkUser = $this->authRepositories->getAccountByEmail($request->input('email'));
        if ($checkUser) {
            BaseResponse::failure(400, '', "email.is.exist", []);
        }

        $user = $this->authRepositories->createUser([
            'name' => $request->name,
            'email' => $request->email,
            'phone_number' => $request->phoneNumber,
            'role' => 'customer',
            'email_verified_at' => null,
            'gender' => $request->gender,
            'user_image' => null,
            'status' => 'ACTIVE',
            'password' => Hash::make($request->password),
            'remember_token' => null,
        ]);

        return $user;
    }

    public function logout(Request $request)
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());
            return [];
        } catch (JWTException $e) {
            BaseResponse::failure(400, '', "failed.to.logout", []);
        }
    }

    public function getUser(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        if (empty($user) || (!empty($user) && $user->role !== config('constants.USER_TYPE_ADMIN'))) {
            JWTAuth::invalidate(JWTAuth::getToken());
            BaseResponse::failure(403, 'Forbidden: Access is denied', 'forbidden', []);
        }
        $user = $this->authRepositories->getAccountByEmail($request->input('email'));
        return $user;
    }

    public function updateUserAdmin(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        if (empty($user) || (!empty($user) && $user->role !== config('constants.USER_TYPE_ADMIN'))) {
            JWTAuth::invalidate(JWTAuth::getToken());
            BaseResponse::failure(403, 'Forbidden: Access is denied', 'forbidden', []);
        }

        $uploadedFile = null;
        if ($request->hasFile('image')) {
            $uploadedFile = $this->cloudinary->uploadApi()->upload($request->file('image')->getRealPath(), ['folder' => 'products', 'verify' => false]);
        }

        $secureUrl = (isset($uploadedFile['secure_url']) && !empty($uploadedFile['secure_url']))
            ? $uploadedFile['secure_url']
            : null;
        $user = $this->authRepositories->updateUserAdmin($request, $secureUrl);
        return $user;
    }

    public function updateUser(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        $userId = $user->id;

<<<<<<< HEAD
        if ($userId != $request->input('id')) {
=======
        if($userId == $request->input('id')){
>>>>>>> a9bca3b99d94a1587f7c59610338b86ac9f82d21
            BaseResponse::failure(401, 'unauthorized', 'unauthorized', []);
        }

        $uploadedFile = null;
        if ($request->hasFile('image')) {
            $uploadedFile = $this->cloudinary->uploadApi()->upload($request->file('image')->getRealPath(), ['folder' => 'products', 'verify' => false]);
        }
        $secureUrl = (isset($uploadedFile['secure_url']) && !empty($uploadedFile['secure_url']))
            ? $uploadedFile['secure_url']
            : null;
        $user = $this->authRepositories->updateUser($request, $secureUrl, $userId);
        return $user;
    }

<<<<<<< HEAD
    public function forgotPassword($request)
    {

        $validate = Validator::make($request->all(), [
            'email' => 'required',
            'phoneNumber' => 'required'
        ], [
            'email.required' => 'name là bắt buộc',
            'phoneNumber.required' => 'phoneNumber là bắt buộc',
        ]);
        if ($validate->fails()) {
            BaseResponse::failure(400, '', $validate->errors()->first(), []);
        };

        $newPassword = $this->authRepositories->forgotPassword($request);
        return $newPassword;
    }

    public function changePassword($request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        $userId = $user->id;

        if (empty($user)) {
            JWTAuth::invalidate(JWTAuth::getToken());
            BaseResponse::failure(403, 'Forbidden: Access is denied', 'forbidden', []);
        }

        if ($userId != $request->input('id')) {
            BaseResponse::failure(401, 'unauthorized', 'unauthorized', []);
        }

        $this->authRepositories->changePassword($userId, $request->input('newPassword'));
        JWTAuth::invalidate(JWTAuth::getToken());
=======
    public function requestPasswordReset($email)
    {
        $user = User::where('email', $email)->first();
        if ($user) {
            // Xóa token cũ để tránh xung đột
            PasswordReset::where('user_id', $user->id)->delete();
            $token = Str::random(64);
            $expiresAt = Carbon\Carbon::now()->addMinutes(30);
            PasswordReset::create(['user_id' => $user->id, 'token' => $token, 'expires_at' => $expiresAt]);
            try {
                Mail::send('emails.reset_password', ['token' => $token], function ($message) use ($user) {
                    $message->to($user->email)->subject('Reset your password');
                });
            } catch (\Exception $e) {
                \Log::error('Failed to send password reset email: ' . $e->getMessage());
            }
        }
        return true;
    }
    
    public function resetPassword($token, $newPassword)
    {
        $resetToken = PasswordReset::where('token', $token)->first();
        if (!$resetToken || $resetToken->expires_at < Carbon\Carbon::now()) {
            throw new \Exception('Invalid or expired token.', 400);
        }
        $user = User::find($resetToken->user_id);
        if (!$user) {
            throw new \Exception('User not found.', 404);
        }
        $user->password = Hash::make($newPassword);
        $user->save();
        $resetToken->delete();
        return true;
>>>>>>> a9bca3b99d94a1587f7c59610338b86ac9f82d21
    }
}
