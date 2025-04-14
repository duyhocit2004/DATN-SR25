<?php

namespace App\Repositories;

use App\Helpers\BaseResponse;
use App\Helpers\CommonHelper;
use App\Models\Banner;
use App\Models\Category;
use Illuminate\Http\Request;

class BannersRepositories
{
    public function getAllBanner()
    {
        $listBanners = Banner::all()->groupBy('type');
        return $listBanners;
    }

    public function getBannerPaging(Request $request)
    {
        $status = $request->get('status', null);
        $type = $request->get('type', null);
        $page = $request->get('pageNum', 1);
        $perPage = $request->get('pageSize', 10);

        $query = Banner::query();
        if (!empty($status)) {
            $query->where('status', '=', $status);
        }
        if (!empty($type)) {
            $query->where('type', '=', $type);
        }

        $listBanners = $query->paginate($perPage, ['*'], 'page', $page);
        return $listBanners;
    }


    public function addBanner(Request $request, $imageLink)
    {

        $banner = Banner::Create([
            'image' => empty($imageLink) ? null : $imageLink,
            'status' => 'ACTIVE',
            'link' => $request->input('link', null),
            'product_id' => $request->input('product_id', null),
            'type' => $request->input('type', 'advertisement'),
        ]);

        return $banner;
    }

    public function updateBanner(Request $request, $imageLink)
    {
        $banner = Banner::find($request->input('id'));

        if (!$banner) {
            BaseResponse::failure('400', 'banner not found', 'banner.not.found', []);
        }

        $banner->update([
            'image' => empty($imageLink) ? $banner->image : $imageLink,
            'status' => $request->input('status', $banner->status),
            'type' => $request->input('type', $banner->type),
            'link' => $request->input('link', $banner->link),
            'product_id' => $request->input('product_id', $banner->product_id),
        ]);

        return $banner;
    }

    public function deleteBanner(Request $request)
    {
        $banner = Banner::find($request->input('id'));

        if (!$banner) {
            BaseResponse::failure('400', 'banner not found', 'banner.not.found', []);
        }

        $banner->delete();

        return $banner;
    }
}
