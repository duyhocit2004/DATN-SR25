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

    public function addSize(Request $request)
    {
        $size = Size::create([
            'size' => $request->input('size'),
        ]);
        return $size;
    }

    public function updateSize(Request $request)
    {
        $size= Size::find($request->input('id'));

        if (!$size) {
            BaseResponse::failure('400', 'size not found', 'size.not.found', []);
        }

        $size->update([
            'size' => $request->input('size', $size->size),
        ]);

        return $size;
    }

    public function deleteSize(Request $request)
    {
        $size= Size::find($request->input('id'));

        if (!$size) {
            BaseResponse::failure('400', 'size not found', 'size.not.found', []);
        }

        //không cần check các bảng sử dụng size_id là khoá ngoại để xoá theo vì trong database đã set on delete cascade
        $size->delete();

        return $size;
    }
}
