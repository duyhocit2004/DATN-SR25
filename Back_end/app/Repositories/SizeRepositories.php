<?php

namespace App\Repositories;

use App\Helpers\BaseResponse;
use App\Models\Color;
use App\Models\ProductVariant;
use App\Models\Size;
use Illuminate\Http\Request;

class SizeRepositories
{

    public function getAllSizes()
    {
        $sizes = Size::all();
        return $sizes;
    }

    public function getSizesPaging(Request $request)
    {
        $size = $request->get('size', null);
        $page = $request->get('pageNum', 1);
        $perPage = $request->get('pageSize', 10);

        $query = Size::query();
        if (!empty($size)) {
            $query->where('size', '=', $size);
        }

        $sizes = $query->paginate($perPage, ['*'], 'page', $page);
        return $sizes;
    }

}
