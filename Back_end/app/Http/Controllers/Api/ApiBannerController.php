<?php

namespace App\Http\Controllers\Api;

use App\Models\Banners;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class ApiBannerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $types = ['advertisement', 'intro', 'main'];
        $banners = [];

        foreach ($types as $type) {
            $banners[$type] = Banners::query()->where('type', '=', $type)->get();
        }

        return response()->json(['data' => $banners], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'type' => 'required'
        ], [
            'image.required' => 'bạn chưa chọn ảnh',
            'image.image' => 'phải là ảnh',
            'image.max' => 'tên ảnh tối đa 2048 ',
            'image.mimes' => 'ảnh được chọn phải là jpeg,png,jpg,gif,svg',
            'type.required' => 'bạn chưa chọn mục chinh cho ảnh',
        ]);

        if ($data->fails()) {
            return response()->json([
                'error' => $data->errors(),
            ],422);
        }

        if ($request->has('image')) {
            $fileimage = $request->file('image')->store('Banners', 'public');
        } else {
            $fileimage = null;
        }

        Banners::create([
            'image' => $fileimage,
            'status' => 1,
            'type' => $request->type,

        ]);

        return response()->json([
            'success' => 'thêm thành công'
        ],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request ,string $id)
    {
        if($request->route('type')){
            $type = $request->route('type');
            Banners::query()->where('type' ,'=','$type');
            return response()->json([
                'data' => $type
            ]);
        }ifel
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
