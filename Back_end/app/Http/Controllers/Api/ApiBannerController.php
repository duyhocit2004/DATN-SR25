<?php

namespace App\Http\Controllers\Api;

use App\Models\Banners;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Cloudinary\Cloudinary;
class ApiBannerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public $Cloudinary ;
    public function __construct(Cloudinary $Cloudinary){
        $this->Cloudinary = $Cloudinary;
    }
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
            ], 422);
        }

        $dataBanner = $request->all();
        if ($request->has('image')) {
           $file = $this->Cloudinary->uploadApi()->upload($request->file(key: 'image')->getRealPath());
           $dataBanner['image'] = $file['secure_url'];
        } else {
            $fileimage = null;
        }

        Banners::create([
            'image' => $dataBanner['image'],
            'status' => 1,
            'type' => $dataBanner['type'],

        ]);

        return response()->json([
            'success' => 'thêm thành công'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $Banner = Banners::query()->findOrFail($id);
        return response()->json([
            'data' => $Banner,
            'success'=>'lấy sản phẩm thành công',
        ],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $Banner = Banners::query()->findOrFail($id);

        $params = $request->all();

        if($request->hasfile('image')){
            if($Banner->image){
                $publicId = pathinfo($Banner->image, PATHINFO_FILENAME);
                $this->Cloudinary->adminApi()->deleteAssets([$publicId]);
            }
            $file = $this->Cloudinary->uploadApi()->upload($request->file(key: 'image')->getRealPath());
            $params['image'] = $file['secure_url'];
        }else{
            $params['image'] = $Banner->image;
        }

        $Banner->update([
            'image'=>$params['image'],
            'type'=>$params['type']
        ]);
        return response()->json([
                'data'=>$Banner,
                'massage'=>'sửa thành công',
            ],204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $delete = Banners::findOrFail($id);
        $delete->delete();
        return response()->json([
            'status' => true,
            'message'=>' xóa thành công',
        ]);
    }
}
