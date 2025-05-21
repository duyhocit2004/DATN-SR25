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

    public function getSizesByType($type)
    {
        $sizes = Size::where('type', $type)->get();
        return $sizes;
    }

    public function getSizesPaging(Request $request)
    {
        $size = $request->get('size', null);
        $type = $request->get('type', null);
        $page = $request->get('pageNum', 1);
        $perPage = $request->get('pageSize', 10);

        $query = Size::query();
        if (!empty($size)) {
            $query->where('size', '=', $size);
        }
        if (!empty($type)) {
            $query->where('type', '=', $type);
        }

        $sizes = $query->paginate($perPage, ['*'], 'page', $page);
        return $sizes;
    }

    public function addSize(Request $request)
    {
        // Check if size already exists
        $existingSize = Size::where('size', $request->input('size'))
            ->where('type', $request->input('type'))
            ->first();
        if ($existingSize) {
            return [
                'status' => '400',
                'message' => 'Kích thước này đã tồn tại trong hệ thống',
                'messageKey' => 'size.already.exists',
                'data' => []
            ];
        }

        // Validate size type
        $type = $request->input('type', 'numeric');
        $size = $request->input('size');
        
        if ($type === 'numeric' && !is_numeric($size)) {
            return [
                'status' => '400',
                'message' => 'Kích thước số phải là một số!',
                'messageKey' => 'size.invalid.numeric',
                'data' => []
            ];
        }
        
        if ($type === 'text' && is_numeric($size)) {
            return [
                'status' => '400',
                'message' => 'Kích thước chữ không được là số!',
                'messageKey' => 'size.invalid.text',
                'data' => []
            ];
        }

        $size = Size::create([
            'size' => $request->input('size'),
            'type' => $type
        ]);
        return $size;
    }

    public function updateSize(Request $request)
    {
        $size = Size::find($request->input('id'));

        if (!$size) {
            return [
                'status' => '400',
                'message' => 'Kích thước không tồn tại',
                'messageKey' => 'size.not.found',
                'data' => []
            ];
        }

        // Check if new size already exists for other sizes
        $existingSize = Size::where('size', $request->input('size'))
            ->where('type', $request->input('type'))
            ->where('id', '!=', $size->id)
            ->first();
        if ($existingSize) {
            return [
                'status' => '400',
                'message' => 'Kích thước này đã tồn tại trong hệ thống',
                'messageKey' => 'size.already.exists',
                'data' => []
            ];
        }

        // Validate size type
        $type = $request->input('type', $size->type);
        $newSize = $request->input('size', $size->size);
        
        if ($type === 'numeric' && !is_numeric($newSize)) {
            return [
                'status' => '400',
                'message' => 'Kích thước số phải là một số!',
                'messageKey' => 'size.invalid.numeric',
                'data' => []
            ];
        }
        
        if ($type === 'text' && is_numeric($newSize)) {
            return [
                'status' => '400',
                'message' => 'Kích thước chữ không được là số!',
                'messageKey' => 'size.invalid.text',
                'data' => []
            ];
        }

        $size->update([
            'size' => $newSize,
            'type' => $type
        ]);

        return $size;
    }

    public function deleteSize(Request $request)
    {
        $size = Size::find($request->input('id'));

        if (!$size) {
            return [
                'status' => '400',
                'message' => 'Kích thước không tồn tại',
                'messageKey' => 'size.not.found',
                'data' => []
            ];
        }

        $size->delete();
        return $size;
    }
}
