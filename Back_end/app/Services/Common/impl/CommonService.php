<?php

namespace App\Services\Common\impl;

use App\Helpers\BaseResponse;
use App\Services\Common\ICommonService;
use Cloudinary\Cloudinary;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;


class CommonService implements ICommonService
{

    protected $cloudinary;

    public function __construct(Cloudinary $cloudinary)
    {
        $this->cloudinary = $cloudinary;
    }

    public function uploadImage(Request $request)
    {

        $user = JWTAuth::parseToken()->authenticate();
        $userId = $user->id;
        if (empty($user) || (!empty($user) && $user->role !== config('constants.USER_TYPE_ADMIN'))) {
            JWTAuth::invalidate(JWTAuth::getToken());
            return BaseResponse::failure(403, 'Forbidden: Access is denied', 'forbidden', []);
        }

        if ($request->hasFile('image')) {
            $uploadedFile = $this->cloudinary->uploadApi()->upload($request->file('image')->getRealPath(), ['folder' => 'products', 'verify' => false]);
        }

        return $uploadedFile['secure_url'];
    }

}
