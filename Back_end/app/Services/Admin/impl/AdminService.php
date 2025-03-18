<?php

namespace App\Services\Admin\impl;

use App\Helpers\BaseResponse;
use App\Repositories\AuthRepositories;
use App\Repositories\BannersRepositories;
use App\Repositories\CategoriesRepositories;
use App\Repositories\ColorRepositories;
use App\Repositories\ProductRepositories;
use App\Repositories\SizeRepositories;
use App\Repositories\VariantRepositories;
use App\Repositories\VoucherRepositories;
use App\Services\Admin\IAdminService;
use Cloudinary\Cloudinary;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;


class AdminService implements IAdminService
{
    public ProductRepositories $productRepositories;
    public VariantRepositories $variantRepositories;
    public VoucherRepositories $voucherRepositories;
    public ColorRepositories $colorRepositories;
    public SizeRepositories $sizeRepositories;
    public CategoriesRepositories $categoriesRepositories;
    public AuthRepositories $authRepositories;
    public BannersRepositories $bannersRepositories;

    protected $cloudinary;

    public function __construct(ProductRepositories $productRepositories,
                                VariantRepositories $variantRepositories,
                                VoucherRepositories $voucherRepositories,
                                ColorRepositories $colorRepositories,
                                SizeRepositories $sizeRepositories,
                                CategoriesRepositories $categoriesRepositories,
                                AuthRepositories $authRepositories,
                                BannersRepositories $bannersRepositories,
                                Cloudinary $cloudinary)
    {
        $this->productRepositories = $productRepositories;
        $this->variantRepositories = $variantRepositories;
        $this->voucherRepositories = $voucherRepositories;
        $this->colorRepositories = $colorRepositories;
        $this->sizeRepositories = $sizeRepositories;
        $this->categoriesRepositories = $categoriesRepositories;
        $this->authRepositories = $authRepositories;
        $this->cloudinary = $cloudinary;
        $this->bannersRepositories = $bannersRepositories;
    }

    public function getAllUser(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        $userId = $user->id;
        if (empty($user) || (!empty($user) && $user->role !== config('constants.USER_TYPE_ADMIN'))) {
            JWTAuth::invalidate(JWTAuth::getToken());
            BaseResponse::failure(403, 'Forbidden: Access is denied', 'forbidden', []);
        }
        $user = $this->authRepositories->getAllUser($request);
        return $user;
    }

    public function deleteUser(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        if (empty($user) || (!empty($user) && $user->role !== config('constants.USER_TYPE_ADMIN'))) {
            JWTAuth::invalidate(JWTAuth::getToken());
            BaseResponse::failure(403, 'Forbidden: Access is denied', 'forbidden', []);
        }
        $user = $this->authRepositories->deleteUser($request);
        return $user;
    }

    public function getAllVoucher(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        $userId = $user->id;
        if (empty($user) || (!empty($user) && $user->role !== config('constants.USER_TYPE_ADMIN'))) {
            JWTAuth::invalidate(JWTAuth::getToken());
            BaseResponse::failure(403, 'Forbidden: Access is denied', 'forbidden', []);
        }
        $vouchers= $this->voucherRepositories->getAllVoucher($request);
        return $vouchers;
    }

    public function addVoucher(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        if (empty($user) || (!empty($user) && $user->role !== config('constants.USER_TYPE_ADMIN'))) {
            JWTAuth::invalidate(JWTAuth::getToken());
            BaseResponse::failure(403, 'Forbidden: Access is denied', 'forbidden', []);
        }

        $voucher = $this->voucherRepositories->addVoucher($request);
        return $voucher;
    }

    public function updateVoucher(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        if (empty($user) || (!empty($user) && $user->role !== config('constants.USER_TYPE_ADMIN'))) {
            JWTAuth::invalidate(JWTAuth::getToken());
            BaseResponse::failure(403, 'Forbidden: Access is denied', 'forbidden', []);
        }

        $voucher = $this->voucherRepositories->updateVoucher($request);
        return $voucher;
    }

    public function deleteVoucher(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        if (empty($user) || (!empty($user) && $user->role !== config('constants.USER_TYPE_ADMIN'))) {
            JWTAuth::invalidate(JWTAuth::getToken());
            BaseResponse::failure(403, 'Forbidden: Access is denied', 'forbidden', []);
        }

        $voucher = $this->voucherRepositories->deleteVoucher($request);
        return $voucher;
    }

    public function addColor(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        if (empty($user) || (!empty($user) && $user->role !== config('constants.USER_TYPE_ADMIN'))) {
            JWTAuth::invalidate(JWTAuth::getToken());
            BaseResponse::failure(403, 'Forbidden: Access is denied', 'forbidden', []);
        }

        $color = $this->colorRepositories->addColor($request);
        return $color;
    }

    public function updateColor(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        if (empty($user) || (!empty($user) && $user->role !== config('constants.USER_TYPE_ADMIN'))) {
            JWTAuth::invalidate(JWTAuth::getToken());
            BaseResponse::failure(403, 'Forbidden: Access is denied', 'forbidden', []);
        }

        $color = $this->colorRepositories->updateColor($request);
        return $color;
    }

    public function deleteColor(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        if (empty($user) || (!empty($user) && $user->role !== config('constants.USER_TYPE_ADMIN'))) {
            JWTAuth::invalidate(JWTAuth::getToken());
            BaseResponse::failure(403, 'Forbidden: Access is denied', 'forbidden', []);
        }

        $color = $this->colorRepositories->deleteColor($request);
        return $color;
    }

    public function getDataStats(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        if (empty($user) || (!empty($user) && $user->role !== config('constants.USER_TYPE_ADMIN'))) {
            JWTAuth::invalidate(JWTAuth::getToken());
            BaseResponse::failure(403, 'Forbidden: Access is denied', 'forbidden', []);
        }

        $dashboardSummary = $this->productRepositories->getDataStats($request);
        return $dashboardSummary;
    }

    public function getDashboardChart(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        if (empty($user) || (!empty($user) && $user->role !== config('constants.USER_TYPE_ADMIN'))) {
            JWTAuth::invalidate(JWTAuth::getToken());
            BaseResponse::failure(403, 'Forbidden: Access is denied', 'forbidden', []);
        }

        $dashboardRevenue = $this->productRepositories->getDashboardChart($request);
        return $dashboardRevenue;
    }

    public function getAllCategoriesNonTree(Request $request)
    {
        $categories= $this->categoriesRepositories->getAllCategoriesNonTree($request);
        $categories->getCollection()->transform(function ($category) {
            return [
                'id' => $category->id,
                'parentId' => $category->parent_id,
                'name' => $category->name,
                'image' => $category->image,
                'gender' => $category->gender,
                'createdAt' => $category->created_at,
                'updatedAt' => $category->updated_at,
                'description' => $category->description,
                'parentName' => $category->parent ? $category->parent->name : '',
            ];
        });
        return $categories;
    }

}
