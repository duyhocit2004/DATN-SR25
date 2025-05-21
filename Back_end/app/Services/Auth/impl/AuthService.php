<?php


namespace App\Services\Auth\impl;


use App\Helpers\BaseResponse;


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


class AuthService implements IAuthService
{
    public AuthRepositories $authRepositories;

    protected $cloudinary;

    public function __construct(AuthRepositories $authRepositories,

 Cloudinary $cloudinary)

    {
        $this->authRepositories = $authRepositories;
        $this->cloudinary = $cloudinary;
    }


    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return BaseResponse::failure(401, 'Tài khoản hoặc mật khẩu không đúng', 'email.or.password.is.wrong', []);
            }

            $user = auth()->user();
            if (!$user) {
                return BaseResponse::failure(401, 'Tài khoản hoặc mật khẩu không đúng', 'email.or.password.is.wrong', []);
            }

            if ($user->status !== config('constants.STATUS_ACTIVE')) {
                JWTAuth::invalidate(JWTAuth::getToken());
                return BaseResponse::failure(403, 'Tài khoản của bạn đã bị khóa hoặc không hoạt động.', 'account.locked', []);
            }

            $payload = JWTAuth::setToken($token)->getPayload();
            $expiresIn = $payload['exp'] - time();

            return [
                "accessToken" => $token,
                "tokenType" => "Bearer",
                "expiresIn" => $expiresIn * 1000,
                "expiresTime" => $payload['exp'],
                "user" => [
                    "id" => $user->id,
                    "name" => $user->name,
                    "email" => $user->email,
                    "phone_number" => $user->phone_number,
                    "role" => $user->role,
                    "gender" => $user->gender,
                    "userImage" => $user->user_image,
                    "status" => $user->status
                ]
            ];
        } catch (JWTException $e) {
            return BaseResponse::failure(500, 'Lỗi hệ thống', 'Could not create token', []);
        }
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

            // Kiểm tra xem người dùng có phải là admin hoặc manager không
            if (!empty($user) && $user->role !== config('constants.USER_TYPE_ADMIN') && $user->role !== config('constants.USER_TYPE_MANAGER')) {
                // Hủy token nếu không phải admin hoặc manager
                JWTAuth::invalidate(JWTAuth::getToken());
                BaseResponse::failure(403, 'Forbidden: Access is denied', 'forbidden', []);
            }

            if (!empty($user) && $user->status !== config('constants.STATUS_ACTIVE')) {
                JWTAuth::invalidate(JWTAuth::getToken());
                BaseResponse::failure(400, 'User does not active', 'user.does.not.active', []);
            }

            $payload = JWTAuth::setToken($token)->getPayload();
            $expiresIn = $payload['exp'] - time();

            return [
                "accessToken" => $token,
                "tokenType" => "Bearer",
                "expiresIn" => $expiresIn * 1000,
                "expiresTime" => $payload['exp'],
                "user" => [
                    "id" => $user->id,
                    "name" => $user->name,
                    "email" => $user->email,
                    "phone_number" => $user->phone_number,
                    "role" => $user->role,
                    "gender" => $user->gender,
                    "userImage" => $user->user_image,
                    "status" => $user->status
                ]
            ];
        } catch (JWTException $e) {
            BaseResponse::failure(500, '', 'Could not create token', []);
        }
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
            'role' => 'Khách hàng',
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
        $email = $request->input('email');
        if ($email) {
            $user = $this->authRepositories->getAccountByEmail($email);
            if (!$user) {
                return \App\Helpers\BaseResponse::failure(404, 'User not found', 'user.not.found', []);
            }
            return $user;
        }

        // Nếu không truyền email thì lấy user từ token (giữ nguyên logic cũ)
        $user = \Tymon\JWTAuth\Facades\JWTAuth::parseToken()->authenticate();
        if (empty($user)) {
            \Tymon\JWTAuth\Facades\JWTAuth::invalidate(\Tymon\JWTAuth\Facades\JWTAuth::getToken());
            return \App\Helpers\BaseResponse::failure(403, 'Forbidden: Access is denied', 'forbidden', []);
        }
        return $user;
    }

    public function updateUserAdmin(Request $request)
    {
        $currentUser = JWTAuth::parseToken()->authenticate();
        if (empty($currentUser) || (!empty($currentUser) && $currentUser->role !== config('constants.USER_TYPE_ADMIN') && $currentUser->role !== config('constants.USER_TYPE_MANAGER')) || $currentUser->status == config('constants.STATUS_INACTIVE')) {
            JWTAuth::invalidate(JWTAuth::getToken());
            BaseResponse::failure(403, 'Forbidden: Access is denied', 'forbidden', []);
        }

        // Get the target user to update
        $targetUser = User::find($request->input('id'));
        if (!$targetUser) {
            return BaseResponse::failure(404, 'User not found', 'user.not.found', []);
        }

        // Check if trying to lock the current user's account
        if ($targetUser->id === $currentUser->id) {
            return BaseResponse::failure(400, 'Không thể khóa tài khoản đang đăng nhập', 'cannot.lock.current.account', []);
        }

        // Check if trying to lock the last admin account
        if ($targetUser->role === config('constants.USER_TYPE_ADMIN') && $request->input('status') === config('constants.STATUS_INACTIVE')) {
            $adminCount = User::where('role', config('constants.USER_TYPE_ADMIN'))
                            ->where('status', config('constants.STATUS_ACTIVE'))
                            ->count();
            if ($adminCount <= 1) {
                return BaseResponse::failure(400, 'Không thể khóa tài khoản admin cuối cùng', 'cannot.lock.last.admin', []);
            }
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
        if (empty($user)) {
            JWTAuth::invalidate(JWTAuth::getToken());
            return BaseResponse::failure(403, 'Forbidden: Access is denied', 'forbidden', []);
        }

        // Handle image upload to Cloudinary if present
        $uploadedFile = null;
        if ($request->hasFile('image')) {
            try {
                $uploadedFile = $this->cloudinary->uploadApi()->upload(
                    $request->file('image')->getRealPath(), 
                    ['folder' => 'avatars', 'verify' => false]
                );
            } catch (Exception $e) {
                return BaseResponse::failure(500, 'Error uploading image', $e->getMessage(), []);
            }
        }

        // Get secure URL from Cloudinary response
        $secureUrl = (isset($uploadedFile['secure_url']) && !empty($uploadedFile['secure_url']))
            ? $uploadedFile['secure_url']
            : null;

        // Update user with image URL
        $user = $this->authRepositories->updateUser($request, $secureUrl);
        return $user;
    }

    public function forgotPassword(Request $request)
    {
        $result = $this->authRepositories->forgotPassword($request);
        return $result;
    }

    // public function changePassword($request)
    // {
    //     $user = JWTAuth::parseToken()->authenticate();
    //     $userId = $user->id;

    //     if (empty($user)) {
    //         JWTAuth::invalidate(JWTAuth::getToken());
    //         BaseResponse::failure(403, 'Forbidden: Access is denied', 'forbidden', []);
    //     }

    //     if ($userId != $request->input('id')) {
    //         BaseResponse::failure(401, 'unauthorized', 'unauthorized', []);
    //     }

    //     $this->authRepositories->changePassword($userId, $request->input('newPassword'));
    //     JWTAuth::invalidate(JWTAuth::getToken());
    // }
}

